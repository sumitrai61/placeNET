import json
from django.db import models
from django.contrib.auth.models import User

# -------------- DEFAULT VALUES -----------------
def default_skills():
    return json.dumps([])

# -------------- MAIN STUDENT MODEL --------------
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="student_profile")
    role = models.CharField(max_length=20, choices=(
        ("Junior", "Junior"),
        ("Senior", "Senior"),
        ("PC", "Placement Coordinator"),
        ("HR", "HR Representative"),
    ), default="Junior")
    year = models.IntegerField(default=1)
    roll_number = models.CharField(max_length=50, null=True, blank=True)
    college = models.CharField(max_length=200, blank=True)
    cgpa = models.FloatField(default=0.0)
    skills = models.TextField(default=default_skills)

    def __str__(self):
        return f"{self.user.username} ({self.role})"
