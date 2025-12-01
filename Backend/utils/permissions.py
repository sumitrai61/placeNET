from rest_framework.permissions import BasePermission

class IsSenior(BasePermission):
    message = "Only Seniors are allowed to perform this action."

    def has_permission(self, request, view):
        student = getattr(request.user, "student_profile", None)
        return bool(student and student.role == "Senior")
