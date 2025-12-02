📌 placeNET

A full-stack placement management system with separate modules for juniors, seniors, placement coordinators, HR, and companies.

📖 Overview

placeNET is a full-stack web application designed to streamline placement-related workflows in academic institutions. The system includes modules for different user roles, features for managing placement updates, student information, company postings, experiences, announcements, and more.

The project consists of:

Backend (Django + Django REST Framework)

Frontend (React)

Both parts work together to provide a modern, responsive, role-based placement portal.

🚀 Features (Classified by Functionality)
👤 User & Authentication (accounts app)

Login & role-based authentication (students, coordinators, HR, companies).

Signup for juniors, seniors, and placement coordinators.

Permissions handled at API level.

Password handling & validation.

🎓 Student Modules
    Juniors (juniors app)
    
    Junior student profile management.
    
    View placement updates.
    
    Access experiences posted by seniors.
    
    Personalized dashboard.

Seniors (seniors app)

    Add & manage placement experiences.
    
    Share interview tips and guidance.
    
    View and update personal details.

🏢 Company / HR Management (companies + hr apps)

    Company details & job postings.
    
    HR login and management panel.
    
    Upload job opportunities for students.
    
    View student applications.

🎯 Placement Coordinator Panel (pc app)

    Manage announcements.
    
    Approve or reject job postings.
    
    Monitor student progress.
    
    Admin-like dashboards.

🔧 Core Utilities (core + utils apps)

    Common reusable logic for the entire project.
    
    Settings, middleware, helpers, token utilities.

🎨 Frontend UI Components (React)

    Component library includes:
    
    Navbar, Footer, Menu
    
    LoginPopup, SignupPopup
    
    JuniorStudent, SeniorStudent, PlaceCoordinator
    
    Features, Body, About, Contact
    
    LivePlacements, Experiences
    
    LeftSide dashboard layout component
    
    Responsive UI with JSX + CSS modules.
    
    API consumption via fetch calls (environment variable based).


🛠️ Tech Stack
Backend:-

    Python 3.x
    
    Django
    
    Django REST Framework
    
    SQLite (dev)
    
    Token-based authentication

Frontend:-

    React (JSX)
    
    Vite (most likely)
    
    CSS modules

Environment-based API routing

🔧 Installation & Setup
1️⃣ Clone the Repository

    git clone https://github.com/sumitrai61/placeNET.git
    cd placeNET

⚙️ Backend Setup (Django)
Create Virtual Environment

    cd Backend
    python -m venv venv

Activate venv:
windows: 

    venv\Scripts\activate

mac/linux

    source venv/bin/activate

Install Dependencies

    pip install -r requirements.txt

Run Migrations

    python manage.py migrate

Create Superuser (optional)

    python manage.py createsuperuser

Start Server

    python manage.py runserver

Backend runs at:

    http://127.0.0.1:8000/


🎨 Frontend Setup (React)

    cd Frontend
    npm install

Add environment variable

    Create .env:

    VITE_API_URL=http://127.0.0.1:8000
    
Start Development Server

    npm run dev

Frontend runs at:
    
    http://localhost:5173/  (Vite default)


🌐 API Endpoints (High-Level Summary)
Authentication

    /api/accounts/login/
    /api/accounts/signup/
    /api/accounts/logout/

Juniors

    /api/juniors/profile/
    /api/juniors/placements/
    /api/juniors/experiences/

Seniors

    /api/seniors/experiences/
    /api/seniors/profile/

Companies

    /api/companies/jobs/
    /api/companies/register/
    /api/companies/applicants/

Placement Coordinator

    /api/pc/announcements/
    /api/pc/manage-jobs/
    /api/pc/dashboard/


🚀 Deployment Notes

Frontend (Vercel)

    1. Set build command: npm run build
    
    2. Set output directory: dist
    
    3. Add environment variable:
    VITE_API_URL=https://your-backend-url.com


Backend (Railway / Render / PythonAnywhere)

    1. Install requirements
    
    2. Collect static files
    
    3. Run using gunicorn or built-in WSGI server

🤝 Contributing

    1. Fork the repository
    
    2. Create a feature branch
    
    3. Commit changes
    
    4. Push and open a Pull Request

📄 License

Add your license here (MIT recommended).

🧑‍💻 Author    

    Sumit Rai
    GitHub: https://github.com/sumitrai61
