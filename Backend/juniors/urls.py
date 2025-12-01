from django.urls import path
from . import views
from .views import DashboardView, MessagesView, ExperiencesView, StatisticsView, LiveUpdates, RecentExperiences, CompanyUpdates, UpcomingHighValuePlacements

urlpatterns = [
    path('', views.api_home, name='api_home'),
    path('dashboard/', DashboardView.as_view()),
    path('messages/', MessagesView.as_view()),
    path('experiences/', ExperiencesView.as_view()),
    path('statistics/', StatisticsView.as_view()),
    path('live-updates/static/', LiveUpdates.as_view()),
    path('recent-experiences/', RecentExperiences.as_view()),
    path('company-updates/', CompanyUpdates.as_view()),
    path('upcoming-high-value-placements/', UpcomingHighValuePlacements.as_view()),
]
