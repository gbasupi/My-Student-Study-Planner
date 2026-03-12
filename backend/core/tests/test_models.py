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
            module_code='CS101',
            title='Introduction to Computer Science',
            semester=1
        )

    def test_create_module_model(self):
        self.assertEqual(Module.objects.count(), 1)
        self.assertEqual(self.module.module_code, 'CS101')
        self.assertEqual(self.module.title, 'Introduction to Computer Science')
        self.assertEqual(self.module.semester, 1)

    def test_module_linked_to_student(self):
        self.assertEqual(self.module.student, self.student)
        self.assertEqual(self.module.student.email, 'teststudent@example.com')

    def test_create_exam_model(self):
        exam = Exam.objects.create(
            module=self.module,
            name='Midterm Exam',
            exam_date=timezone.now(),
            location='Hall A',
            notes='Bring a calculator'
        )

        self.assertEqual(Exam.objects.count(), 1)
        self.assertEqual(exam.name, 'Midterm Exam')
        self.assertEqual(exam.module, self.module) 
    def test_create_assignment_model(self):
        assignment = Assignment.objects.create(
            module=self.module,
            title='Python Project 1',
            due_date=timezone.now() + timezone.timedelta(days=7),
            status=Assignment.STATUS_PENDING,
            weight=20
        )
        self.assertEqual(Assignment.objects.count(), 1)
        self.assertEqual(assignment.title, 'Python Project 1')
        self.assertEqual(assignment.weight, 20)
        self.assertEqual(assignment.module, self.module)

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
            duration_minutes=30,
            is_completed=False
        )
        self.assertFalse(task.is_completed) 
        

        task.is_completed = True
        task.save()
        

        updated_task = StudyTask.objects.get(id=task.id)
        self.assertTrue(updated_task.is_completed)
