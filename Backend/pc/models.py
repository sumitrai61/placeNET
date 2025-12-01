from django.db import models
from companies.models import Company


class LivePlacement(models.Model):
    MODE_CHOICES = [
        ("ON_CAMPUS", "On-Campus"),
        ("POOL_CAMPUS", "Pool Campus"),
        ("OFF_CAMPUS", "Off-Campus"),
    ]

    CATEGORY_CHOICES = [
        ("PRODUCT", "Product"),
        ("SERVICE", "Service"),
        ("IT", "IT"),
    ]

    student_name = models.CharField(max_length=200)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    role = models.CharField(max_length=200)
    package_lpa = models.FloatField()
    location = models.CharField(max_length=200)
    mode = models.CharField(max_length=20, choices=MODE_CHOICES)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    placed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student_name} -> {self.company.name}"
