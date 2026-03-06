from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Student, Module, Exam, Assignment, StudyTask

# Register your models here.
@admin.register(Student)
class StudentAdmin(UserAdmin):
    model = Student
    list_display = ("email", "username", "is_staff", "is_active")
    ordering = ("email",)
    fieldsets = UserAdmin.fieldsets
    add_fieldsets = UserAdmin.add_fieldsets

admin.site.register(Module)
admin.site.register(Exam)
admin.site.register(Assignment)
admin.site.register(StudyTask)