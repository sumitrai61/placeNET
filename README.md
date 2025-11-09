# 🎓 DU MCA Placement Portal (Backend)

A Django REST Framework backend for managing MCA placement data.

## 🚀 Features
- Role-based login (Junior, Senior, HR, Placement Coordinator)
- Dummy seed data (students, companies, placements)
- Secure token-based authentication
- Dashboard & live updates APIs
- CORS enabled for frontend integration

## ⚙️ Setup Instructions
```bash
git clone https://github.com/yourusername/du_mca_project.git
cd du_mca_project
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver
