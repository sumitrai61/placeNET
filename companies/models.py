from django.db import models
from accounts.models import Student

# ===================== Company =====================

class Company(models.Model):
    STATUS_CHOICES = [
        ('ACTIVE', 'Active'),
        ('COMPLETED', 'Completed'),
        ('UPCOMING', 'Upcoming'),
    ]

    DIFFICULTY_CHOICES = [
        ('EASY', 'Easy'),
        ('MEDIUM', 'Medium'),
        ('HARD', 'Hard'),
    ]

    name = models.CharField(max_length=200)
    package_lpa = models.FloatField()
    rounds = models.IntegerField(default=1)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    hired_count = models.IntegerField(default=0)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='UPCOMING')
    required_skills = models.TextField(help_text="Comma separated skills like: React, Node.js, DSA")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.package_lpa} LPA)"


# ===================== Placement Drive =====================

class PlacementDrive(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="drives")
    role = models.CharField(max_length=200)
    package_lpa = models.FloatField()
    eligibility_cgpa = models.FloatField(default=0.0)

    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=200)

    rounds = models.CharField(max_length=100, default="Written + Technical + HR")
    description = models.TextField(blank=True)

    status = models.CharField(max_length=20, choices=(
        ("UPCOMING", "Upcoming"),
        ("ACTIVE", "Active"),
        ("COMPLETED", "Completed"),
    ), default="UPCOMING")

    def __str__(self):
        return f"{self.company.name} Drive ({self.role})"



