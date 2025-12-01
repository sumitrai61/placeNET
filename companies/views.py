from rest_framework import generics, permissions
from .models import Company, PlacementDrive
from .serializers import CompanySerializer, PlacementDriveSerializer


# ===================== COMPANY LIST + CRUD =====================

class CompanyListCreateView(generics.ListCreateAPIView):
    queryset = Company.objects.all().order_by("-created_at")
    serializer_class = CompanySerializer
    permission_classes = [permissions.AllowAny]


class CompanyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.AllowAny]


# ===================== PLACEMENT DRIVES (Only PC Can Create) =====================

class PlacementDriveListCreateView(generics.ListCreateAPIView):
    queryset = PlacementDrive.objects.all().order_by("-date")
    serializer_class = PlacementDriveSerializer
    permission_classes = [permissions.AllowAny]


class PlacementDriveDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PlacementDrive.objects.all()
    serializer_class = PlacementDriveSerializer
    permission_classes = [permissions.AllowAny]




