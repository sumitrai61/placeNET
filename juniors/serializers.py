from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

from .models import LivePlacement
from companies.models import Company



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Student
        fields = ['user', 'roll_number', 'year', 'role', 'college']

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

from rest_framework import serializers
from .models import Placement

class PlacementSerializer(serializers.ModelSerializer):
    placed_on = serializers.SerializerMethodField()

    class Meta:
        model = Placement
        fields = '__all__'

    def get_placed_on(self, obj):
        # Return only the date part
        if obj.placed_on:
            return obj.placed_on.date()
        return None


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    recipient = UserSerializer()
    class Meta:
        model = Message
        fields = '__all__'



class PremiumOpportunitySerializer(serializers.ModelSerializer):
    company = CompanySerializer()
    class Meta:
        model = PremiumOpportunity
        fields = '__all__'




class LivePlacementSerializer(serializers.ModelSerializer):
    initials = serializers.SerializerMethodField()
    company_name = serializers.CharField(source="company.name", read_only=True)

    class Meta:
        model = LivePlacement
        fields = [
            "id",
            "student_name",
            "initials",
            "company",
            "company_name",
            "role",
            "package_lpa",
            "location",
            "mode",
            "category",
            "created_at",
        ]

    def get_initials(self, obj):
        name = (obj.student_name or "").strip()
        if not name:
            return ""
        parts = name.split()
        if len(parts) == 1:
            return parts[0][0].upper()
        return (parts[0][0].upper() + parts[-1][0].upper())


