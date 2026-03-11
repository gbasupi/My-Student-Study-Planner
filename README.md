
# My-Student-Study-Planner

> COMPSCI5012 Internet Technology (M) 2025-26


My Student Study Planner is a web application developed for COMPSCI5012 Internet Technology by Group BN. The application is developed to assist students, especially international postgraduate students studying in the UK to manage their academic workload. The web app allows students to organise their modules, track assignment deadlines and exam dates and plan study tasks. By storing and managing all their academic planning into a single web application, hence helping them manage deadlines and avoid last-minute cramming for exams.

## Project Requirements

- [Python 3.12](https://www.python.org/downloads/release/python-3120/)
- [Node v23.7.0](https://nodejs.org/en/blog/release/v23.7.0)

## Project Setup

1. Clone the Project

```
git clone https://github.com/gbasupi/My-Student-Study-Planner
cd My-Student-Study-Planner

```

2. Create & Activate Python Virtual Environment

```
cd backend
python3.12 -m venv venv
source venv/bin/activate  # For MacOS/Linux
venv\Scripts\activate  # For Windows
```

3. Install Requirements and dependencies

```
# Backend
cd backend
pip install -r requirements.txt
```

and

```
# Frontend
cd frontend
npm install
```

4. Create Superuser for Admin

```
python manage.py createsuperuser
```

5. Start Code

```
# Backend
cd backend
python manage.py makemigrations 
python manage.py migrate
python manage.py runserver
```
and

```
# Frontend
cd frontend
npm run dev   
```

6. Tests and Coverage Reports
   Run Test

```
coverage run manage.py test
```

Generate Report

```
coverage report -m
```

OR for a detailed HTML report:

```
coverage html
```

7. Techology Stack

Frontend
- React
- Vite
- JavaScript
- CSS

Backend
- Django
- Django REST Framework
- SQLite



8. Project Structure

```
My-Student-Study-Planner
│
├── backend/                     # Django REST API
│   ├── config/                  # Django project 
│   │   ├── settings.py
│   │   └── urls.py
│   │
│   ├── core/                    # Main backend 
│   │   ├── models.py            # Database models
│   │   ├── serializers.py       # API serializers
│   │   ├── views.py             # API views
│   │   └── urls.py              # App routes
│   │
│   ├── manage.py                # Django management script
│   └── requirements.txt         # Python dependencies
│
├── frontend/                    # React frontend (Vite)
│   ├── src/
│   │   ├── api/                 # API client
│   │   ├── components/          # Reusable UI components
│   │   ├── forms/               # Forms for (assignments, exams, modules, study tasks)
│   │   ├── pages/               # Application pages
│   │   ├── views/               # Views for (assignments, exams, modules, study tasks)
│   │   └── styles/              # CSS styles
│   │
│   └── package.json             # Node dependencies
│
└── README.md                    # Project documentation
```


## Team Members

1. Gontse Basupi 3134768B@student.gla.ac.uk
2. Chang Liu 3113841L@student.gla.ac.uk
3. Love Kalra 3107255K@student.gla.ac.uk

