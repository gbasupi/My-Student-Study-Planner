from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# Student Entity (User)
class Student(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


    def __str__(self):
        return self.email
    
#Module Entity
class Module(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='modules')
    module_code = models.CharField(max_length=20)
    title = models.CharField(max_length=200)
    semester = models.IntegerField()
    
    def __str__(self):
        return f"{self.module_code} : {self.title}"

    class Meta:
        unique_together = ('student', 'module_code')
        ordering = ['module_code']

# Exam Entity
class Exam(models.Model):
    module = models.ForeignKey(
        Module,
        on_delete=models.CASCADE,
        related_name="exams"
    )
    name = models.CharField(max_length=100, default="Final Exam")
    exam_date = models.DateTimeField()
    location = models.CharField(max_length=255, blank=True)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ["exam_date"]

    def __str__(self):
        return f"{self.name} - {self.module.module_code}"
    
# Assignment Entity
class Assignment(models.Model):
    STATUS_PENDING = "P"
    STATUS_SUBMITTED = "S"
    STATUS_GRADED = "G"

    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_SUBMITTED, "Submitted"),
        (STATUS_GRADED, "Graded"),
    ]

    module = models.ForeignKey(
        Module,
        on_delete=models.CASCADE,
        related_name="assignments"
    )
    title = models.CharField(max_length=200)
    due_date = models.DateTimeField()
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default=STATUS_PENDING)
    weight = models.PositiveIntegerField(help_text="Weight of assignment in %")

    class Meta:
        ordering = ["due_date"]

    def __str__(self):
        return f"{self.title} ({self.module.module_code})"


#Study Task Entity
class StudyTask(models.Model):
    module = models.ForeignKey(
        Module,
        on_delete=models.CASCADE,
        related_name="tasks"
    )
    title = models.CharField(max_length=200)
    target_date = models.DateField()
    duration_minutes = models.PositiveIntegerField()
    is_completed = models.BooleanField(default=False)

    class Meta:
        ordering = ["target_date"]

    def __str__(self):
        return f"{self.title} - {self.module.module_code}"

