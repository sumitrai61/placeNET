from rest_framework.permissions import BasePermission

def get_user_role(user):
    return getattr(getattr(user, "student_profile", None), "role", None)

class IsPC(BasePermission):
    def has_permission(self, request, view):
        return get_user_role(request.user) == "PC"

class IsSenior(BasePermission):
    def has_permission(self, request, view):
        return get_user_role(request.user) == "Senior"

class IsHR(BasePermission):
    def has_permission(self, request, view):
        return get_user_role(request.user) == "HR"

class IsJunior(BasePermission):
    def has_permission(self, request, view):
        return get_user_role(request.user) == "Junior"
