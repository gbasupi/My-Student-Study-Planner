# --------------------------------------------------------------
# core app model tests for the Student Study Planner application.
# -------------------------------------------------------------
from django.test import TestCase
from django.utils import timezone
from core.models import Student, Module, Exam, Assignment, StudyTask

class ModelTesting(TestCase):
    
    def setUp(self):
        self.student = Student.objects.create_user(
            email='teststudent@example.com',
            username='teststudent',
            password='testpassword123'
        )

        self.module = Module.objects.create(
            student=self.student,
            module_code='COMPSCI5089',
            title='Introduction to Data Science and Systems',
            semester=1
        )
        
    def test_student_string_representation(self):
        student = Student.objects.create_user(
        email="student@example.com",
        username="student",
        password="password123"
    )

        self.assertEqual(str(student), "student@example.com")

    def test_create_module_model(self):
        self.assertEqual(Module.objects.count(), 1)
        self.assertEqual(self.module.module_code, 'COMPSCI5089')
        self.assertEqual(self.module.title, 'Introduction to Data Science and Systems')
        self.assertEqual(self.module.semester, 1)

    def test_module_linked_to_student(self):
        self.assertEqual(self.module.student, self.student)
        self.assertEqual(self.module.student.email, 'teststudent@example.com')

    def test_module_string_representation(self):
        self.assertEqual(
        str(self.module),
        "COMPSCI5089 : Introduction to Data Science and Systems"
    )
    
    def test_create_exam_model(self):
        exam = Exam.objects.create(
            module=self.module,
            name='Final Exam Intro to Data Science',
            exam_date=timezone.now(),
            location='James Watt Building',
            notes='Focus on chapters 1-5'
        )

        self.assertEqual(Exam.objects.count(), 1)
        self.assertEqual(exam.name, 'Final Exam Intro to Data Science')
        self.assertEqual(exam.module, self.module) 
        
    def test_exam_string_representation(self):
        exam = Exam.objects.create(
        module=self.module,
        name="Final Exam Intro to Data Science",
        exam_date=timezone.now(),
        location="James Watt Building"
    )

        self.assertEqual(str(exam), "Final Exam Intro to Data Science - COMPSCI5089")
            
    def test_create_assignment_model(self):
        assignment = Assignment.objects.create(
            module=self.module,
            title='Assessment 1: Python Project',
            due_date=timezone.now() + timezone.timedelta(days=7),
            status=Assignment.STATUS_PENDING,
            weight=20
        )
        self.assertEqual(Assignment.objects.count(), 1)
        self.assertEqual(assignment.title, 'Assessment 1: Python Project')
        self.assertEqual(assignment.weight, 20)
        self.assertEqual(assignment.module, self.module)
        
    def test_assignment_string_representation(self):
        assignment = Assignment.objects.create(
        module=self.module,
        title="Coursework 1",
        due_date=timezone.now() + timezone.timedelta(days=7),
        weight=20
    )

        self.assertEqual(str(assignment), "Coursework 1 (COMPSCI5089)")

            
    def test_create_studytask_model(self):
        task = StudyTask.objects.create(
            module=self.module,
            title='Read Chapter 1',
            target_date=timezone.now().date(),
            duration_minutes=60,
            is_completed=False
        )
        self.assertEqual(StudyTask.objects.count(), 1)
        self.assertEqual(task.title, 'Read Chapter 1')
        self.assertEqual(task.duration_minutes, 60)
        self.assertEqual(task.module, self.module) 

    def test_studytask_completion_update(self):
        task = StudyTask.objects.create(
            module=self.module,
            title='Practice Exercises',
            target_date=timezone.now().date(),
            duration_minutes=25,
            is_completed=False
        )
        self.assertFalse(task.is_completed) 
        

        task.is_completed = True
        task.save()
        

        updated_task = StudyTask.objects.get(id=task.id)
        self.assertTrue(updated_task.is_completed)
        
    def test_studytask_string_representation(self):
        task = StudyTask.objects.create(
        module=self.module,
        title="Read Chapter 3",
        target_date=timezone.now().date(),
        duration_minutes=45
    )

        self.assertEqual(str(task), "Read Chapter 3 - COMPSCI5089")

        
