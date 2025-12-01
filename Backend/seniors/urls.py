from django.urls import path
from .views import ExperienceCRUD, SeniorDashboard

urlpatterns = [
    path('dashboard/', SeniorDashboard.as_view()),
    path('experience/', ExperienceCRUD.as_view()),
    path('experience/<int:id>/', ExperienceCRUD.as_view()),
]
