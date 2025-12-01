from django.urls import path
from .views import (
    CompanyListCreateView, CompanyDetailView,
    PlacementDriveListCreateView, PlacementDriveDetailView
)

urlpatterns = [
    path('', CompanyListCreateView.as_view()),
    path('<int:pk>/', CompanyDetailView.as_view()),

    path('drives/', PlacementDriveListCreateView.as_view()),
    path('drives/<int:pk>/', PlacementDriveDetailView.as_view()),
]
