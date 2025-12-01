from rest_framework.permissions import BasePermission

class IsPC(BasePermission):
    """
    PC (Placement Coordinator) has full access.
    Others (Senior/Junior/HR) are read-only.
    """

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return request.user.student_profile.role == "PC"
        return False


class ReadOnlyOrPC(BasePermission):
    """
    GET allowed for all authenticated users
    POST/PUT/DELETE only for PC
    """
    def has_permission(self, request, view):
        if request.method in ("GET", "HEAD", "OPTIONS"):
            return request.user.is_authenticated
        if request.user.is_authenticated:
            return request.user.student_profile.role == "PC"
        return False
