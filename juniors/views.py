from django.contrib.auth.models import User
from django.db.models import Avg,Q
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from .models import Student, Company, Placement, Message, PremiumOpportunity
from seniors.models import Experience
from .serializers import (
    StudentSerializer, CompanySerializer, PlacementSerializer,
    MessageSerializer,  PremiumOpportunitySerializer,
    UserSerializer,LivePlacementSerializer
)

from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import LivePlacement
from seniors.serializers import ExperienceSerializer


@api_view(['GET'])
def api_home(request):
    return JsonResponse({
        "message": "Welcome to the DU MCA Placement Portal API 🎓",
        "available_endpoints": {
            "register": "/api/register/",
            "login": "/api/login/",
            "dashboard": "/api/dashboard/",
            "messages": "/api/messages/",
            "placements": "/api/placements/",
            "experiences": "/api/experiences/",
            "statistics": "/api/statistics/",
        }
    })



# =========================  AUTH / REGISTER  =========================
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data
        username = data.get("username")
        password = data.get("password")
        if not username or not password:
            return Response({"detail": "username and password required"}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"detail": "username exists"}, status=400)

        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=data.get("first_name", ""),
            last_name=data.get("last_name", ""),
            email=data.get("email", "")
        )

        year = int(data.get("year", 1))
        role_kw = (data.get("role_keyword") or "").strip().upper()

        if role_kw == "PC":
            role = "PC"
        elif role_kw == "HR":
            role = "HR"
        elif year >= 2:
            role = "Senior"
        else:
            role = "Junior"

        student = Student.objects.create(
            user=user,
            year=year,
            role=role,
            roll_number=data.get("roll_number", ""),
            college=data.get("college", "")
        )

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "user": UserSerializer(user).data,
            "student": StudentSerializer(student).data
        }, status=201)


# =========================  LOGIN  =========================
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if not username or not password:
            return Response({"detail": "username and password required"}, status=400)

        try:
            user = User.objects.get(username=username)
            if not user.check_password(password):
                raise Exception("bad credentials")
        except Exception:
            return Response({"detail": "invalid credentials"}, status=401)

        token, _ = Token.objects.get_or_create(user=user)
        student = getattr(user, "student_profile", None)
        return Response({
            "token": token.key,
            "user": UserSerializer(user).data,
            "student": StudentSerializer(student).data if student else None
        })


# =========================  DASHBOARD  =========================
class DashboardView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        total_students = Student.objects.count()
        total_placed = Placement.objects.values("student").distinct().count()
        placement_rate = round((total_placed / total_students * 100) if total_students else 0, 2)
        avg_package = Placement.objects.aggregate(avg=Avg("package_lpa"))["avg"] or 0.0
        highest_pkg = Placement.objects.order_by("-package_lpa").first()
        companies_count = Company.objects.count()
        still_looking = max(0, total_students - total_placed)

        data = {
            "placement_rate_percent": placement_rate,
            "placed_students_count": total_placed,
            "total_students_count": total_students,
            "avg_package_lpa": round(avg_package, 2),
            "highest_package_lpa": highest_pkg.package_lpa if highest_pkg else 0.0,
            "companies_count": companies_count,
            "still_looking": still_looking,
            "live_updates": {
                "placements": PlacementSerializer(Placement.objects.order_by("-placed_on")[:5], many=True).data,
                "messages": MessageSerializer(Message.objects.order_by("-created_at")[:5], many=True).data,
                "experiences": ExperienceSerializer(Experience.objects.order_by("-created_at")[:5], many=True).data,
            },
            "premium_upcoming": PremiumOpportunitySerializer(
                PremiumOpportunity.objects.order_by("date")[:5], many=True
            ).data,
        }
        return Response(data)


# =========================  MESSAGES  =========================
class MessagesView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        msgs = Message.objects.filter(recipient=request.user).order_by("-created_at")
        return Response(MessageSerializer(msgs, many=True).data)

    def post(self, request):
        sender = request.user
        recipient_name = request.data.get("recipient")
        subject = request.data.get("subject", "")
        body = request.data.get("body", "")
        try:
            recipient = User.objects.get(username=recipient_name)
        except User.DoesNotExist:
            return Response({"detail": "recipient not found"}, status=404)
        msg = Message.objects.create(sender=sender, recipient=recipient, subject=subject, body=body)
        return Response(MessageSerializer(msg).data, status=201)


# =========================  LIVE PLACEMENTS  =========================
class LivePlacementsView(APIView):
    
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        qs = LivePlacement.objects.all().order_by("-created_at")


        # Optional: search by name/company/role
        q = request.query_params.get("q")
        if q:
            qs = qs.filter(
                Q(student_name__icontains=q) |
                Q(company__name__icontains=q) |   # FIXED LINE
                Q(role__icontains=q)
            )

        # Optional filters like ?mode=ON_CAMPUS, ?category=PRODUCT
        mode = request.query_params.get("mode")
        if mode:
            qs = qs.filter(mode=mode.upper())

        category = request.query_params.get("category")
        if category:
            qs = qs.filter(category=category.upper())

        qs = qs[:50]
        data = LivePlacementSerializer(qs, many=True).data
        return Response(data, status=status.HTTP_200_OK)




# =========================  EXPERIENCES  =========================
class ExperiencesView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        experiences = Experience.objects.order_by("-id")[:50]
        return Response(ExperienceSerializer(experiences, many=True).data)


# =========================  STATISTICS  =========================
class StatisticsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        buckets = {
            "0-3": Placement.objects.filter(package_lpa__lt=3).count(),
            "3-6": Placement.objects.filter(package_lpa__gte=3, package_lpa__lt=6).count(),
            "6-9": Placement.objects.filter(package_lpa__gte=6, package_lpa__lt=9).count(),
            "9-12": Placement.objects.filter(package_lpa__gte=9, package_lpa__lt=12).count(),
            "12+": Placement.objects.filter(package_lpa__gte=12).count(),
        }

        top_companies_data = []
        for c in Company.objects.all()[:10]:
            top_companies_data.append({
                "name": c.name,
                "avg_package": c.avg_package,
                "hired": c.placements.count(),
                "difficulty": c.difficulty,
            })

        return Response({
            "package_distribution": buckets,
            "top_companies": top_companies_data
        })





class LiveUpdates(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Return static dummy data matching LivePlacement structure
        data = [
            {
                "id": 1,
                "student_name": "Rahul Sharma",
                "initials": "RS",
                "company": "Amazon",
                "company_name": "Amazon",
                "role": "SDE I",
                "package_lpa": 15.5,
                "location": "Bangalore",
                "mode": "ON_CAMPUS",
                "category": "PRODUCT",
                "created_at": "2025-01-20T10:00:00Z",
                "placed_on": "2025-01-20"
            },
            {
                "id": 2,
                "student_name": "Priya Mehta",
                "initials": "PM",
                "company": "Tech Mahindra",
                "company_name": "Tech Mahindra",
                "role": "Full Stack Developer",
                "package_lpa": 6.5,
                "location": "Pune",
                "mode": "ON_CAMPUS",
                "category": "IT",
                "created_at": "2025-01-20T08:00:00Z",
                "placed_on": "2025-01-20"
            },
            {
                "id": 3,
                "student_name": "Vikash Kumar",
                "initials": "VK",
                "company": "Microsoft",
                "company_name": "Microsoft",
                "role": "Software Engineer",
                "package_lpa": 18.5,
                "location": "Hyderabad",
                "mode": "ON_CAMPUS",
                "category": "PRODUCT",
                "created_at": "2025-01-19T16:00:00Z",
                "placed_on": "2025-01-19"
            },
            {
                "id": 4,
                "student_name": "Sneha Agarwal",
                "initials": "SA",
                "company": "Infosys",
                "company_name": "Infosys",
                "role": "System Engineer",
                "package_lpa": 5.2,
                "location": "Mysore",
                "mode": "ON_CAMPUS",
                "category": "SERVICE",
                "created_at": "2025-01-19T14:00:00Z",
                "placed_on": "2025-01-19"
            },
            {
                "id": 5,
                "student_name": "Aditya Verma",
                "initials": "AV",
                "company": "Google",
                "company_name": "Google",
                "role": "Software Engineer Intern",
                "package_lpa": 20.0,
                "location": "Bangalore",
                "mode": "ON_CAMPUS",
                "category": "PRODUCT",
                "created_at": "2025-01-18T12:00:00Z",
                "placed_on": "2025-01-18"
            },
            {
                "id": 6,
                "student_name": "Khushi Jain",
                "initials": "KJ",
                "company": "Adobe",
                "company_name": "Adobe",
                "role": "Frontend Developer",
                "package_lpa": 16.8,
                "location": "Noida",
                "mode": "ON_CAMPUS",
                "category": "PRODUCT",
                "created_at": "2025-01-18T10:00:00Z",
                "placed_on": "2025-01-18"
            },
            {
                "id": 7,
                "student_name": "Ravi Singh",
                "initials": "RS",
                "company": "TCS",
                "company_name": "TCS",
                "role": "Digital Engineer",
                "package_lpa": 7.0,
                "location": "Chennai",
                "mode": "ON_CAMPUS",
                "category": "SERVICE",
                "created_at": "2025-01-17T15:00:00Z",
                "placed_on": "2025-01-17"
            },
            {
                "id": 8,
                "student_name": "Aman Gupta",
                "initials": "AG",
                "company": "IBM",
                "company_name": "IBM",
                "role": "Cloud Engineer",
                "package_lpa": 12.0,
                "location": "Bangalore",
                "mode": "ON_CAMPUS",
                "category": "IT",
                "created_at": "2025-01-17T11:00:00Z",
                "placed_on": "2025-01-17"
            }
        ]

        return Response(data)

class RecentExperiences(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        data = [
            {
                "company": "Amazon",
                "role_title": "SDE I",
                "rating": 4.5,
                "package_lpa": 15.5,
                "difficulty": "Hard",
                "summary": "Challenging but rewarding experience. Focus on DSA and system design...",
                "student_name": "Vikash Kumar",
                "initials": "VK",
                "read_more_id": 1,
                "created_at": "2024-12-20"
            },
            {
                "company": "Tech Mahindra",
                "role_title": "Full Stack Developer",
                "rating": 4.2,
                "package_lpa": 6.5,
                "difficulty": "Medium",
                "summary": "Great company culture. Live coding session was the key round...",
                "student_name": "Sneha Agarwal",
                "initials": "SA",
                "read_more_id": 2,
                "created_at": "2024-12-18"
            },
            {
                "company": "Infosys",
                "role_title": "System Engineer",
                "rating": 4.0,
                "package_lpa": 5.2,
                "difficulty": "Easy",
                "summary": "Well-organized process. Focus on Java and database concepts...",
                "student_name": "Rahul Sharma",
                "initials": "RS",
                "read_more_id": 3,
                "created_at": "2024-12-15"
            }
        ]

        return Response(data)


class CompanyUpdates(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        data = [
            {
                "company": "Tech Mahindra",
                "status": "Active",
                "package_lpa": 6.5,
                "rounds": 4,
                "difficulty": "Medium",
                "hired_students": 12,
                "skills": ["Full Stack", "React", "Node.js"],
                "application_deadline": "2025-01-30"
            },
            {
                "company": "Infosys",
                "status": "Active",
                "package_lpa": 5.2,
                "rounds": 3,
                "difficulty": "Easy",
                "hired_students": 18,
                "skills": ["Java", "Spring Boot", "MySQL"],
                "application_deadline": "2025-02-05"
            },
            {
                "company": "TCS",
                "status": "Active",
                "package_lpa": 4.8,
                "rounds": 2,
                "difficulty": "Easy",
                "hired_students": 25,
                "skills": ["Python", "Data Analysis", "SQL"],
                "application_deadline": "2025-02-10"
            },
            {
                "company": "Amazon",
                "status": "Completed",
                "package_lpa": 15.5,
                "rounds": 5,
                "difficulty": "Hard",
                "hired_students": 3,
                "skills": ["DSA", "System Design", "AWS"],
                "application_deadline": None
            }
        ]

        return Response(data)

class UpcomingHighValuePlacements(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        data = [
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
        ]

        return Response(data)