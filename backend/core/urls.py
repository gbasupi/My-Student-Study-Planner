# urls class for the core app - defines the URL patterns for the core app
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import RegisterView, ModuleViewSet, ExamViewSet, AssignmentViewSet, StudyTaskViewSet

router = DefaultRouter()
router.register("modules", ModuleViewSet, basename="modules")
router.register("exams", ExamViewSet, basename="exams")
router.register("assignments", AssignmentViewSet, basename="assignments")
router.register("tasks", StudyTaskViewSet, basename="tasks")

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/token/", obtain_auth_token, name="api_token_auth"),
    path("", include(router.urls)),
]