from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth.models import User
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

        user = User.objects.create_user(
            username=username,
            password=password,
            email=data.get("email", "")
        )

        role_kw = (data.get("role_keyword") or "").upper()
        year = int(data.get("year", 1))

        if role_kw == "PC": role = "PC"
        elif role_kw == "HR": role = "HR"
        elif year >= 2: role = "Senior"
        else: role = "Junior"

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
