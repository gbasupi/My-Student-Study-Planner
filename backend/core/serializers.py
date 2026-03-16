# -------------------------------------------------------------
# Core serializers for the Student Study Planner application.
# Converts complex data types like querysets and model instances into jsons and vice versa.
# -------------------------------------------------------------
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Module, Exam, Assignment, StudyTask

Student = get_user_model()  # Get the custom user model, student in this case.


# -------------------------
# CURRENT USER SERIALIZER
# -------------------------
class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["id", "username", "email", "first_name", "last_name"]


# -------------------------
# MODULE SERIALIZER
# -------------------------
class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ["id", "module_code", "title", "semester"]
        read_only_fields = ["id", "student"]


# -----------------------------
# EXAMS serializer
# -----------------------------
class ExamSerializer(serializers.ModelSerializer):
    module_code = serializers.CharField(source="module.module_code", read_only=True)

    class Meta:
        model = Exam
        fields = ["id", "module", "module_code", "name", "exam_date", "location", "notes"]
        read_only_fields = ["id", "module_code"]

# -----------------------------
# ASSIGNMENT SERIALIZER
# -----------------------------
class AssignmentSerializer(serializers.ModelSerializer):
    module_code = serializers.CharField(source="module.module_code", read_only=True)

    class Meta:
        model = Assignment
        fields = ["id", "module", "module_code", "title", "due_date", "status", "weight"]
        read_only_fields = ["id", "module_code"]


# -----------------------------
# STUDY TASK SERIALIZER
# -----------------------------
class StudyTaskSerializer(serializers.ModelSerializer):
    module_code = serializers.CharField(source="module.module_code", read_only=True)

    class Meta:
        model = StudyTask
        fields = ["id", "module", "module_code", "title", "target_date", "duration_minutes", "is_completed",]
        read_only_fields = ["id", "module_code"]


# -----------------------------
# REGISTRATION SERIALIZER
# -----------------------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = Student
        fields = ["first_name", "last_name", "email", "password", "password2"]

    # Validate email to ensure it's unique and properly formatted.
    def validate_email(self, value):
        email = value.strip().lower()
        if Student.objects.filter(email=email).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return email

    # Validate that the two password fields match.
    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password2": "Passwords do not match."})
        return attrs

    # Create a new user with the validated data.
    def create(self, validated_data):
        email = validated_data["email"].strip().lower()
        password = validated_data.pop("password")
        validated_data.pop("password2")

        user = Student.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
        )
        return user