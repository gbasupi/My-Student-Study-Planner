from rest_framework import viewsets
from .models import Module, Exam, Assignment, StudyTask
from .serializers import ModuleSerializer, ExamSerializer, AssignmentSerializer, StudyTaskSerializer

# Create your views here.

# -----------------------------
# MODULE VIEWSET
# -----------------------------
class ModuleViewSet(viewsets.ModelViewSet):
    serializer_class = ModuleSerializer

    def get_queryset(self):
        return Module.objects.filter(student=self.request.user)

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

# -----------------------------
# EXAM VIEWSET
# -----------------------------
class ExamViewSet(viewsets.ModelViewSet):
    serializer_class = ExamSerializer

    def get_queryset(self):
        return Exam.objects.filter(module__student=self.request.user)



# -----------------------------
# ASSIGNMENT VIEWSET
# -----------------------------
class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer

    def get_queryset(self):
        return Assignment.objects.filter(module__student=self.request.user)



# -----------------------------
# STUDY TASK VIEWSET
# -----------------------------
class StudyTaskViewSet(viewsets.ModelViewSet):
    serializer_class = StudyTaskSerializer

    def get_queryset(self):
        return StudyTask.objects.filter(module__student=self.request.user)


