from rest_framework import serializers
from .models import Experience

from rest_framework import serializers
from .models import Experience
from companies.models import Company   # IMPORTANT
from juniors.models import LivePlacement

class ExperienceSerializer(serializers.ModelSerializer):
    # Read-only fields
    student_name = serializers.CharField(source="student.user.get_full_name", read_only=True)
    student_username = serializers.CharField(source="student.user.username", read_only=True)
    year = serializers.IntegerField(source="student.year", read_only=True)
    company_name = serializers.CharField(source="company.name", read_only=True)

    # Accept company ID as input and convert correctly to Company instance
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all())

    class Meta:
        model = Experience
        fields = [
            "id",
            "company",          # write
            "company_name",     # read
            "student_name",
            "student_username",
            "year",
            "role_title",
            "rating",
            "package_lpa",
            "difficulty",
            "category",
            "summary",
            "details",
            "tips",
            "rounds",
            "likes",
            "comments_count",
            "created_at",
        ]


