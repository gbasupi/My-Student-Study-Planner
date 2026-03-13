from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from core.models import Student



class AuthAPITesting(APITestCase):
    
    def setUp(self):
        self.user = Student.objects.create_user(
            email='teststudent@example.com',
            username='teststudent',
            password='strongpassword123'
        )
        self.register_url = reverse('register')
        self.login_url = reverse('api_token_auth')
        self.current_user_url = reverse('current-user')

    def test_register_user(self):
        data = {
            "email": "newuser@example.com",
            "username": "newuser",
            "password": "newpassword123",
            "password2": "newpassword123"
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Student.objects.filter(email="newuser@example.com").exists())
       
    def test_register_password_mismatch(self):
        data = {
        "email": "another@example.com",
        "username": "user2",
        "password": "password123",
        "password2": "differentpassword"
    }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, 400)
    

    def test_login_user(self):
        data = {
            "username": "teststudent@example.com",
            "password": "strongpassword123"
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_invalid_login_rejected(self):
        data = {
            "username": "teststudent@example.com",
            "password": "wrongpassword"
        }
        response = self.client.post(self.login_url, data)
        self.assertIn(response.status_code, [status.HTTP_400_BAD_REQUEST, status.HTTP_401_UNAUTHORIZED])

    def test_current_user_endpoint(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.current_user_url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('email'), self.user.email)
        
    def test_register_duplicate_email(self):
        data = {
        "email": "teststudent@example.com",
        "password": "password123",
        "password2": "password123"
    }

        response = self.client.post(self.register_url, data)

        self.assertEqual(response.status_code, 400)
    
    def test_register_email_is_normalized_to_lowercase(self):
        data = {
        "email": "NEWUSER@EXAMPLE.COM",
        "password": "newpassword123",
        "password2": "newpassword123"
    }

        response = self.client.post(self.register_url, data)

        self.assertEqual(response.status_code, 201)
        self.assertTrue(Student.objects.filter(email="newuser@example.com").exists())
