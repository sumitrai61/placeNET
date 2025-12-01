from accounts.models import Student
from django.db import models
from django.contrib.auth.models import User

ROLE_CHOICES = (
    ('Junior', 'Junior'),
    ('Senior', 'Senior'),
    ('PC', 'Placement Coordinator'),
    ('HR', 'HR'),
)

# class Student(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
#     roll_number = models.CharField(max_length=50, blank=True, null=True)
#     year = models.IntegerField(default=1)
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Junior')
#     college = models.CharField(max_length=200, blank=True)

class Company(models.Model):
    name = models.CharField(max_length=200)
    difficulty = models.CharField(max_length=50, blank=True)
    avg_package = models.FloatField(default=0.0)

class Placement(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="placements")
    role = models.CharField(max_length=100)
    package_lpa = models.FloatField()
    placed_on = models.DateField(auto_now_add=True)


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='sent_messages')
    recipient = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='received_messages')
    subject = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)



class PremiumOpportunity(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    package_lpa = models.FloatField()
    date = models.DateField()
    difficulty = models.CharField(max_length=50)
    required_skills = models.TextField()

def __str__(self):
    return f"{self.company.name} ({self.package_lpa} LPA)"



# 👇 Add this at the bottom of juniors/models.py

# Live placements : juniors can read/view only

class LivePlacement(models.Model):
    MODE_CHOICES = [
        ("ON_CAMPUS", "On-Campus"),
        ("POOL", "Pool Campus"),
        ("OFF_CAMPUS", "Off-Campus"),
    ]

    CATEGORY_CHOICES = [
        ("PRODUCT", "Product"),
        ("SERVICE", "Service"),
        ("IT", "IT"),
    ]

    student_name = models.CharField(max_length=100)
    batch_year = models.IntegerField(default=2023)

    company = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    package_lpa = models.FloatField()

    location = models.CharField(max_length=100)
    mode = models.CharField(max_length=20, choices=MODE_CHOICES, default="ON_CAMPUS")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="IT")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student_name} → {self.company} ({self.package_lpa} LPA)"

