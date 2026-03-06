from rest_framework import viewsets
from .models import Module, Exam, Assignment, StudyTask
from .serializers import ModuleSerializer, ExamSerializer, AssignmentSerializer, StudyTaskSerializer

# Create your views here.

# -----------------------------
# MODULE VIEWSET
# -----------------------------
class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer

# -----------------------------
# EXAM VIEWSET
# -----------------------------
class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer


# -----------------------------
# ASSIGNMENT VIEWSET
# -----------------------------
class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer


# -----------------------------
# STUDY TASK VIEWSET
# -----------------------------
class StudyTaskViewSet(viewsets.ModelViewSet):
    queryset = StudyTask.objects.all()
    serializer_class = StudyTaskSerializer
