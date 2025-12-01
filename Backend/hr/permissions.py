from rest_framework.permissions import BasePermission

class IsHR(BasePermission):
    """Allow access only to HR Representatives"""

    def has_permission(self, request, view):
        user = getattr(request, "user", None)
        if not user or not user.is_authenticated:
            return False

        profile = getattr(user, "student_profile", None)
        return bool(profile and profile.role == "HR")
