from django.urls import path
from .views import (
    PCDashboardView, PCStudentsView,
    PlacementDriveView, PlacementDriveUpdateDeleteView,
    PCLivePlacementsView
)

urlpatterns = [
    path('dashboard/', PCDashboardView.as_view()),
    path('students/', PCStudentsView.as_view()),
    path('drives/', PlacementDriveView.as_view()),
    path('drives/<int:id>/', PlacementDriveUpdateDeleteView.as_view()),
    path('placements/', PCLivePlacementsView.as_view()),
]
