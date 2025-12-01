from django.urls import path
from .views import HRDashboardView, StudentFilterView

urlpatterns = [
    path('dashboard/', HRDashboardView.as_view()),
    path('students/', StudentFilterView.as_view()),
]
