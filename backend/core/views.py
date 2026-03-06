from rest_framework import viewsets, status
from .models import Module, Exam, Assignment, StudyTask
from .serializers import RegisterSerializer, ModuleSerializer, ExamSerializer, AssignmentSerializer, StudyTaskSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

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

# -----------------------------
# REGISTRATION VIEW
# -----------------------------

class RegisterView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "message": "Account created successfully",
                    "user": {
                        "id": user.pk,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)