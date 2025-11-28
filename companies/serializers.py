from rest_framework import serializers
from .models import Company, PlacementDrive


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class PlacementDriveSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source="company.name", read_only=True)

    class Meta:
        model = PlacementDrive
        fields = ['id', 'company', 'company_name', 'date', 'time', 'location', 'applicants']
        read_only_fields = ['applicants']
