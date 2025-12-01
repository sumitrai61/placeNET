from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from .models import Experience
from .serializers import ExperienceSerializer
from utils.permissions import IsSenior




class SeniorDashboard(APIView):
    """
    DU MCA Portal - Senior Student Dashboard
    Pure dummy data based on Figma/UI you shared.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        data = {
            "user": {
                "username": "rahulc.mca25",      # for now dummy
                "role": "Senior Student"
            },
            "stats": {
                "active_companies": 3,
                "students_placed": 89,
                "upcoming_drives": 3
            },
            "active_companies": [
                {
                    "name": "Tech Mahindra",
                    "status": "Active",
                    "package_lpa": 6.5,
                    "rounds": 4,
                    "difficulty": "Medium",
                    "hired_students": 12,
                    "skills": ["Full Stack", "React", "Node.js"],
                    "application_deadline": "2025-01-30"
                },
                {
                    "name": "Infosys",
                    "status": "Active",
                    "package_lpa": 5.2,
                    "rounds": 3,
                    "difficulty": "Easy",
                    "hired_students": 18,
                    "skills": ["Java", "Spring Boot", "MySQL"],
                    "application_deadline": "2025-02-05"
                },
                {
                    "name": "TCS",
                    "status": "Active",
                    "package_lpa": 4.8,
                    "rounds": 2,
                    "difficulty": "Easy",
                    "hired_students": 25,
                    "skills": ["Python", "Data Analysis", "SQL"],
                    "application_deadline": "2025-02-10"
                },
                {
                    "name": "Amazon",
                    "status": "Completed",
                    "package_lpa": 15.5,
                    "rounds": 5,
                    "difficulty": "Hard",
                    "hired_students": 3,
                    "skills": ["DSA", "System Design", "AWS"],
                    "application_deadline": None
                }
            ],
            "upcoming_high_value": [
                {
                    "company": "Microsoft",
                    "date": "2025-02-15",
                    "package_lpa": 18.5
                },
                {
                    "company": "Google",
                    "date": "2025-02-20",
                    "package_lpa": 22.0
                },
                {
                    "company": "Adobe",
                    "date": "2025-02-25",
                    "package_lpa": 16.8
                }
            ],
            "placement_experiences": [
                {
                    "initials": "VK",
                    "name": "Vikash Kumar",
                    "date": "2024-12-20",
                    "company": "Amazon",
                    "role": "SDE I",
                    "package_lpa": 15.5,
                    "difficulty": "Hard",
                    "rounds": 5,
                    "summary": "The interview process was rigorous but fair. Started with an online assessment focusing on DSA. Technical rounds covered system design and coding problems. HR round was straightforward. Practice LeetCode medium/hard problems.",
                    "key_tips": [
                        "Focus on DSA fundamentals",
                        "Practice system design",
                        "Be confident in HR round"
                    ],
                    "likes": 23,
                    "comments": 8
                },
                {
                    "initials": "SA",
                    "name": "Sneha Agarwal",
                    "date": "2024-12-18",
                    "company": "Tech Mahindra",
                    "role": "Full Stack Developer",
                    "package_lpa": 6.5,
                    "difficulty": "Medium",
                    "rounds": 4,
                    "summary": "Great experience overall. They focus more on practical knowledge than theoretical concepts. Live coding session was the key round.",
                    "key_tips": [
                        "Build a strong portfolio",
                        "Practice live coding",
                        "Know your projects inside out"
                    ],
                    "likes": 15,
                    "comments": 5
                },
                {
                    "initials": "RS",
                    "name": "Rahul Sharma",
                    "date": "2024-12-15",
                    "company": "Infosys",
                    "role": "System Engineer",
                    "package_lpa": 5.2,
                    "difficulty": "Easy",
                    "rounds": 3,
                    "summary": "The process was smooth and well-organized. Online test covered aptitude, logical reasoning, and basic programming.",
                    "key_tips": [
                        "Strong basics in programming",
                        "Practice aptitude questions",
                        "Revise DBMS concepts"
                    ],
                    "likes": 12,
                    "comments": 3
                }
            ]
        }
        return Response(data)


class ExperienceCRUD(APIView):
    # Senior can create/update/delete, junior can only view
    def get_permissions(self):
        if self.request.method in ["POST", "PUT", "DELETE"]:
            return [IsSenior()]
        return [permissions.IsAuthenticated()]
    
    def get(self, request, id=None):
        if id:
            try:
                exp = Experience.objects.get(id=id)
                return Response(ExperienceSerializer(exp).data)
            except Experience.DoesNotExist:
                return Response({"detail": "Not found"}, status=404)
        experiences = Experience.objects.all().order_by("-id")
        return Response(ExperienceSerializer(experiences, many=True).data)

    def post(self, request):
        serializer = ExperienceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(student=request.user.student_profile)  # no company_id manually!
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request, id=None):
        try:
            exp = Experience.objects.get(id=id, student=request.user.student_profile)
        except Experience.DoesNotExist:
            return Response({"detail": "Not allowed!"}, status=403)
        serializer = ExperienceSerializer(exp, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, id=None):
        try:
            exp = Experience.objects.get(id=id, student=request.user.student_profile)
            exp.delete()
            return Response({"detail": "Deleted successfully"})
        except Experience.DoesNotExist:
            return Response({"detail": "Not allowed!"}, status=403)
