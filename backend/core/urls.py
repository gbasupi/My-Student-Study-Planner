# --------------------------------------------------------------
# URL configuration for the core app of the Student Study Planner application.
# --------------------------------------------------------------
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from .views import (
    RegisterView,
    ModuleViewSet,
    ExamViewSet,
    AssignmentViewSet,
    StudyTaskViewSet,
    CurrentUserView,
)

# Route variables for the API endpoints using DRF's DefaultRouter.
router = DefaultRouter() 
router.register("modules", ModuleViewSet, basename="modules")
router.register("exams", ExamViewSet, basename="exams")
router.register("assignments", AssignmentViewSet, basename="assignments")
router.register("tasks", StudyTaskViewSet, basename="tasks")

# URL patterns for the my student study planner application
urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/token/", obtain_auth_token, name="api_token_auth"),
    path("auth/user/", CurrentUserView.as_view(), name="current-user"), 
    path("", include(router.urls)),
]