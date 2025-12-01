from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth.models import User
from datetime import datetime
import re
from .models import Student
from .serializers import UserSerializer, StudentSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return Response({"error": "Username & password required"}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "User already exists"}, status=400)

        first_name = data.get("first_name") or data.get("name") or ""
        last_name = data.get("last_name") or ""

        user = User.objects.create_user(
            username=username,
            password=password,
            email=data.get("email", ""),
            first_name=first_name,
            last_name=last_name
        )

        role_kw = (data.get("role_keyword") or "").upper()

        # Base year logic:
        # - Emails containing "pc" before @ => Placement Coordinator (PC)
        # - Emails with "25" before @ => Junior (year 1)
        # - Emails with "24" before @ => Senior (year 2)
        # If an explicit year is sent, we still respect it as a fallback.
        raw_year = data.get("year")
        try:
            year = int(raw_year) if raw_year is not None else 1
        except ValueError:
            year = 1

        email = (data.get("email") or username or "").lower()
        local_part = email.split("@")[0]

        if role_kw == "PC":
            role = "PC"
        elif role_kw == "HR":
            role = "HR"
        else:
            # derive from email pattern first
            if "pc" in local_part:
                role = "PC"
                year = max(year, 2)
            elif "25" in local_part:
                # base batch 25 -> current juniors
                role = "Junior"
                year = 1
            elif "24" in local_part:
                # base batch 24 -> current seniors
                role = "Senior"
                year = max(year, 2)
            else:
                # fallback: infer from numeric year
                role = "Senior" if year >= 2 else "Junior"

        student = Student.objects.create(
            user=user,
            year=year,
            role=role,
            roll_number=data.get("roll_number", ""),
            college=data.get("college", ""),
            cgpa=data.get("cgpa", 0.0)
        )

        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            "token": token.key,
            "user": UserSerializer(user).data,
            "student": StudentSerializer(student).data
        }, status=201)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        try:
            user = User.objects.get(username=username)
            if not user.check_password(password):
                raise Exception()
        except:
            return Response({"error": "Invalid credentials"}, status=401)

        token, _ = Token.objects.get_or_create(user=user)
        student = getattr(user, "student_profile", None)

        return Response({
            "token": token.key,
            "user": UserSerializer(user).data,
            "student": StudentSerializer(student).data if student else None
        })
