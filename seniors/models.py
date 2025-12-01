from django.db import models
from accounts.models import Student
from companies.models import Company

DIFFICULTY_CHOICES = (
    ("Easy", "Easy"),
    ("Medium", "Medium"),
    ("Hard", "Hard"),
)

CATEGORY_CHOICES = (
    ("Product", "Product"),
    ("Service", "Service"),
    ("IT", "IT"),
)

class Experience(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="experiences")
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="experiences")
    role_title = models.CharField(max_length=100)
    rating = models.FloatField(default=0.0)
    package_lpa = models.FloatField(default=0.0)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    summary = models.TextField()
    details = models.TextField(blank=True)
    tips = models.TextField(blank=True)  # newline separated tips
    rounds = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    comments_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.user.username} - {self.company.name}"
