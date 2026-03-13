from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.utils import timezone
from core.models import Student, Module, Exam, Assignment, StudyTask

class CoreAPITesting(APITestCase):

    def setUp(self):

        self.user = Student.objects.create_user(
            email='user1@example.com', username='user1', password='pwd'
        )
        self.client.force_authenticate(user=self.user)
        

        self.user2 = Student.objects.create_user(
            email='user2@example.com', username='user2', password='pwd'
        )
        

        self.module = Module.objects.create(
            student=self.user, module_code='CS101', title='Intro to CS', semester=1
        )
        

        self.module_user2 = Module.objects.create(
            student=self.user2, module_code='MATH101', title='Calculus', semester=1
        )

    def test_create_module(self):

        url = reverse('modules-list')
        data = {'module_code': 'CS102', 'title': 'Data Structures', 'semester': 2}
        response = self.client.post(url, data)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Module.objects.filter(student=self.user).count(), 2)

    def test_list_modules_own_only(self):

        url = reverse('modules-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['module_code'], 'CS101')
        
    
        
    def test_create_exam(self):

        url = reverse('exams-list')
        data = {
            'module': self.module.id,
            'name': 'Final Exam',
            'exam_date': timezone.now().isoformat(),
            'location': 'Hall B'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_list_exams(self):
        Exam.objects.create(
        module=self.module,
        name="Midterm",
        exam_date=timezone.now(),
        location="Room A"
    )

        url = reverse('exams-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_create_assignment(self):

        url = reverse('assignments-list')
        data = {
            'module': self.module.id,
            'title': 'Homework 1',
            'due_date': timezone.now().isoformat(),
            'weight': 10
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
    def test_list_assignments(self):
        Assignment.objects.create(
        module=self.module,
        title="Essay",
        due_date=timezone.now(),
        weight=20
    )

        url = reverse('assignments-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        
    def test_create_studytask(self):

        url = reverse('tasks-list')
        data = {
            'module': self.module.id,
            'title': 'Read Chapter 2',
            'target_date': timezone.now().date().isoformat(),
            'duration_minutes': 45
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_studytask(self):

        task = StudyTask.objects.create(
            module=self.module, title='Task to update', target_date=timezone.now().date(), duration_minutes=30
        )

        url = reverse('tasks-detail', args=[task.id])
        data = {'is_completed': True}
        response = self.client.patch(url, data)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        task.refresh_from_db()
        self.assertTrue(task.is_completed)

    def test_delete_studytask(self):

        task = StudyTask.objects.create(
            module=self.module, title='Task to delete', target_date=timezone.now().date(), duration_minutes=30
        )
        url = reverse('tasks-detail', args=[task.id])
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(StudyTask.objects.filter(id=task.id).exists())
