from juniors.models import LivePlacement
from juniors.serializers import LivePlacementSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.models import Student
from companies.models import Company, PlacementDrive
from seniors.models import Experience
from .permissions import IsPC
from rest_framework import status

from companies.serializers import PlacementDriveSerializer

from rest_framework import permissions
from .models import LivePlacement





class PCDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsPC]

    def get(self, request):
        total_students = Student.objects.count()
        placed_students = Student.objects.filter(role="Senior").count()  # To update after placements
        active_companies = Company.objects.filter(status="ACTIVE").count()
        pending_responses = Company.objects.filter(status="UPCOMING").count()

        # Upcoming Placement Drives
        upcoming_drives = PlacementDrive.objects.all().order_by("date")[:3]

        # Latest Activity
        activity = [
            f"New Experience Shared By {exp.student.user.username}"
            for exp in Experience.objects.order_by("-id")[:3]
        ]

        data = {
            "total_students": total_students,
            "placed_students": placed_students,
            "active_companies": active_companies,
            "pending_responses": pending_responses,
            "upcoming_drives": [
                {
                    "company": d.company.name,
                    "date": d.date,
                    "time": d.time,
                    "location": d.location,
                }
                for d in upcoming_drives
            ],
            "recent_activity": activity,
        }
        return Response(data)


class PCStudentsView(APIView):
    permission_classes = [IsAuthenticated, IsPC]

    def get(self, request):
        students = Student.objects.all().order_by("-cgpa")

        data = [
            {
                "name": s.user.username,
                "role": s.role,
                "year": s.year,
                "roll_number": s.roll_number,
                "cgpa": s.cgpa,
                "skills": s.skills,
                "college": s.college,
            }
            for s in students
        ]
        return Response(data, status=status.HTTP_200_OK)



class PCLivePlacementsView(APIView):
    """
    Only PC can create / view live placements.
    Juniors isko /api/placements/ se dekhenge.
    """
    permission_classes = [IsAuthenticated, IsPC]

    def get(self, request):
        placements = LivePlacement.objects.order_by("-created_at")[:50]
        data = LivePlacementSerializer(placements, many=True).data
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = LivePlacementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





# ================================================================#

class PlacementDriveView(APIView):
    permission_classes = [IsAuthenticated, IsPC]

    # GET → list all drives
    def get(self, request):
        drives = PlacementDrive.objects.all().order_by("date")
        return Response(PlacementDriveSerializer(drives, many=True).data)

    # POST → add new drive
    def post(self, request):
        serializer = PlacementDriveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Placement drive added", "data": serializer.data}, status=201)
        return Response(serializer.errors, status=400)

class PlacementDriveUpdateDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsPC]

    # PUT → update
    def put(self, request, id):
        try:
            drive = PlacementDrive.objects.get(id=id)
        except PlacementDrive.DoesNotExist:
            return Response({"error": "Drive not found"}, status=404)

        serializer = PlacementDriveSerializer(drive, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Drive updated", "data": serializer.data})
        return Response(serializer.errors, status=400)

    # DELETE → delete
    def delete(self, request, id):
        try:
            drive = PlacementDrive.objects.get(id=id)
        except PlacementDrive.DoesNotExist:
            return Response({"error": "Drive not found"}, status=404)

        drive.delete()
        return Response({"message": "Drive deleted"}, status=200)





class LivePlacementCRUD(APIView):

    def get_permissions(self):
        if self.request.method in ["POST", "PUT", "DELETE"]:
            return [IsPC()]
        return [permissions.IsAuthenticated()]

    def get(self, request):
        qs = LivePlacement.objects.all().order_by("-placed_at")
        return Response(LivePlacementSerializer(qs, many=True).data)

    def post(self, request):
        serializer = LivePlacementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)