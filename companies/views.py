from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Company, PlacementDrive
from .serializers import CompanySerializer, PlacementDriveSerializer
from .permissions import ReadOnlyOrPC, IsPC


# ===================== COMPANY LIST + CRUD =====================

class CompanyListCreateView(generics.ListCreateAPIView):
    queryset = Company.objects.all().order_by("-created_at")
    serializer_class = CompanySerializer
    permission_classes = [ReadOnlyOrPC]


class CompanyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [ReadOnlyOrPC]


# ===================== PLACEMENT DRIVES (Only PC Can Create) =====================

class PlacementDriveListCreateView(generics.ListCreateAPIView):
    queryset = PlacementDrive.objects.all().order_by("-date")
    serializer_class = PlacementDriveSerializer
    permission_classes = [ReadOnlyOrPC]


class PlacementDriveDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PlacementDrive.objects.all()
    serializer_class = PlacementDriveSerializer
    permission_classes = [ReadOnlyOrPC]




