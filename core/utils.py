def get_user_profile(user):
    return getattr(user, "student_profile", None)

def get_role(user):
    profile = get_user_profile(user)
    return profile.role if profile else None
