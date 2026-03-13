from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Module, Exam, Assignment, StudyTask
from .serializers import (
    RegisterSerializer,
    CurrentUserSerializer,
    ModuleSerializer,
    ExamSerializer,
    AssignmentSerializer,
    StudyTaskSerializer,
)

User = get_user_model()


    
# -----------------------------
# MODULE VIEWSET
# -----------------------------
class ModuleViewSet(viewsets.ModelViewSet):
    serializer_class = ModuleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Module.objects.filter(student=self.request.user)

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)


# -----------------------------
# EXAM VIEWSET
# -----------------------------
class ExamViewSet(viewsets.ModelViewSet):
    serializer_class = ExamSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Exam.objects.filter(module__student=self.request.user)


# -----------------------------
# ASSIGNMENT VIEWSET
# -----------------------------
class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Assignment.objects.filter(module__student=self.request.user)


# -----------------------------
# STUDY TASK VIEWSET
# -----------------------------
class StudyTaskViewSet(viewsets.ModelViewSet):
    serializer_class = StudyTaskSerializer
    permission_classes = [IsAuthenticated]

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
                        "username": getattr(user, "username", ""),
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -----------------------------
# CURRENT USER VIEW
# -----------------------------
class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response(
            {
                "id": user.pk,
                "username": getattr(user, "username", ""),
                "email": getattr(user, "email", ""),
                "first_name": getattr(user, "first_name", ""),
                "last_name": getattr(user, "last_name", ""),
            },
            status=status.HTTP_200_OK,
        )
