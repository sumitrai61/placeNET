from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from accounts.models import Student
from companies.models import Company, PlacementDrive

class HRDashboardView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        eligible_students = Student.objects.filter(cgpa__gte=8.0).count()
        total_students = Student.objects.count()
        active_companies = Company.objects.filter(status="ACTIVE").count()
        upcoming_drives = PlacementDrive.objects.all().order_by("date")[:3]

        data = {
            "total_students": total_students,
            "eligible_students": eligible_students,
            "active_companies": active_companies,
            "upcoming_drives": [
                {
                    "company": d.company.name,
                    "date": d.date,
                    "time": d.time,
                    "location": d.location,
                }
                for d in upcoming_drives
            ]
        }
        return Response(data)


class StudentFilterView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        cgpa_min = float(request.GET.get("cgpa", 0))
        skill = request.GET.get("skill", "")

        students = Student.objects.filter(cgpa__gte=cgpa_min)

        if skill:
            students = [s for s in students if skill.lower() in s.skills.lower()]

        data = [{
            "name": s.user.username,
            "cgpa": s.cgpa,
            "skills": s.skills,
            "college": s.college
        } for s in students]

        return Response(data)
