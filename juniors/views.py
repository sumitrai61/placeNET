from django.contrib.auth.models import User
from django.db.models import Avg
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Student, Company, Placement, Message, Experience, PremiumOpportunity
from .serializers import (
    StudentSerializer, CompanySerializer, PlacementSerializer,
    MessageSerializer, ExperienceSerializer, PremiumOpportunitySerializer,
    UserSerializer
)

from rest_framework.decorators import api_view
from django.http import JsonResponse

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
    permission_classes = [permissions.IsAuthenticated]

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
    permission_classes = [permissions.IsAuthenticated]

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
    permission_classes = [permissions.IsAuthenticated]

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
    permission_classes = [permissions.IsAuthenticated]

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
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        placements = Placement.objects.order_by("-placed_on")[:50]
        return Response(PlacementSerializer(placements, many=True).data)


# =========================  EXPERIENCES  =========================
class ExperiencesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        experiences = Experience.objects.order_by("-id")[:50]
        return Response(ExperienceSerializer(experiences, many=True).data)


# =========================  STATISTICS  =========================
class StatisticsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

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
