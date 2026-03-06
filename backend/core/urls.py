# urls class for the core app - defines the URL patterns for the core app
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ModuleViewSet, ExamViewSet, AssignmentViewSet, StudyTaskViewSet

router = DefaultRouter()
router.register("modules", ModuleViewSet, basename="modules")
router.register("exams", ExamViewSet, basename="exams")
router.register("assignments", AssignmentViewSet, basename="assignments")
router.register("tasks", StudyTaskViewSet, basename="tasks")

urlpatterns = [
    path('', include(router.urls)),
]
