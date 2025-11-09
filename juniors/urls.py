from django.urls import path
from . import views
from .views import DashboardView, MessagesView, LivePlacementsView, ExperiencesView, StatisticsView

urlpatterns = [
    path('', views.api_home, name='api_home'),
    path('dashboard/', DashboardView.as_view()),
    path('messages/', MessagesView.as_view()),
    path('placements/', LivePlacementsView.as_view()),
    path('experiences/', ExperiencesView.as_view()),
    path('statistics/', StatisticsView.as_view()),
]
