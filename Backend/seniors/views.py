from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.permissions import AllowAny

from .models import Experience
from .serializers import ExperienceSerializer




class SeniorDashboard(APIView):
    """
    DU MCA Portal - Senior Student Dashboard
    Pure dummy data based on Figma/UI you shared.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        data = {
            "user": {
                "username": "rahulc.mca25",      # for now dummy
                "role": "Senior Student"
            },
            "stats": {
                "active_companies": 3,
                "students_placed": 89,
                "upcoming_drives": 3
            },
            "active_companies": [
                {
                    "name": "Tech Mahindra",
                    "status": "Active",
                    "package_lpa": 6.5,
                    "rounds": 4,
                    "difficulty": "Medium",
                    "hired_students": 12,
                    "skills": ["Full Stack", "React", "Node.js"],
                    "application_deadline": "2025-01-30"
                },
                {
                    "name": "Infosys",
                    "status": "Active",
                    "package_lpa": 5.2,
                    "rounds": 3,
                    "difficulty": "Easy",
                    "hired_students": 18,
                    "skills": ["Java", "Spring Boot", "MySQL"],
                    "application_deadline": "2025-02-05"
                },
                {
                    "name": "TCS",
                    "status": "Active",
                    "package_lpa": 4.8,
                    "rounds": 2,
                    "difficulty": "Easy",
                    "hired_students": 25,
                    "skills": ["Python", "Data Analysis", "SQL"],
                    "application_deadline": "2025-02-10"
                },
                {
                    "name": "Amazon",
                    "status": "Completed",
                    "package_lpa": 15.5,
                    "rounds": 5,
                    "difficulty": "Hard",
                    "hired_students": 3,
                    "skills": ["DSA", "System Design", "AWS"],
                    "application_deadline": None
                }
            ],
            "upcoming_high_value": [
                {
                    "company": "Microsoft",
                    "date": "2025-02-15",
                    "package_lpa": 18.5
                },
                {
                    "company": "Google",
                    "date": "2025-02-20",
                    "package_lpa": 22.0
                },
                {
                    "company": "Adobe",
                    "date": "2025-02-25",
                    "package_lpa": 16.8
                }
            ],
            "placement_experiences": [
                {
                    "initials": "VK",
                    "name": "Vikash Kumar",
                    "date": "2024-12-20",
                    "company": "Amazon",
                    "role": "SDE I",
                    "package_lpa": 15.5,
                    "difficulty": "Hard",
                    "rounds": 5,
                    "summary": "The interview process was rigorous but fair. Started with an online assessment focusing on DSA. Technical rounds covered system design and coding problems. HR round was straightforward. Practice LeetCode medium/hard problems.",
                    "key_tips": [
                        "Focus on DSA fundamentals",
                        "Practice system design",
                        "Be confident in HR round"
                    ],
                    "likes": 23,
                    "comments": 8
                },
                {
                    "initials": "SA",
                    "name": "Sneha Agarwal",
                    "date": "2024-12-18",
                    "company": "Tech Mahindra",
                    "role": "Full Stack Developer",
                    "package_lpa": 6.5,
                    "difficulty": "Medium",
                    "rounds": 4,
                    "summary": "Great experience overall. They focus more on practical knowledge than theoretical concepts. Live coding session was the key round.",
                    "key_tips": [
                        "Build a strong portfolio",
                        "Practice live coding",
                        "Know your projects inside out"
                    ],
                    "likes": 15,
                    "comments": 5
                },
                {
                    "initials": "RS",
                    "name": "Rahul Sharma",
                    "date": "2024-12-15",
                    "company": "Infosys",
                    "role": "System Engineer",
                    "package_lpa": 5.2,
                    "difficulty": "Easy",
                    "rounds": 3,
                    "summary": "The process was smooth and well-organized. Online test covered aptitude, logical reasoning, and basic programming.",
                    "key_tips": [
                        "Strong basics in programming",
                        "Practice aptitude questions",
                        "Revise DBMS concepts"
                    ],
                    "likes": 12,
                    "comments": 3
                }
            ]
        }
        return Response(data)


class ExperienceCRUD(APIView):
    # Experience CRUD is now publicly accessible (no auth enforced)
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, id=None):
        if id:
            try:
                exp = Experience.objects.get(id=id)
                return Response(ExperienceSerializer(exp).data)
            except Experience.DoesNotExist:
                return Response({"detail": "Not found"}, status=404)
        experiences = Experience.objects.all().order_by("-id")
        return Response(ExperienceSerializer(experiences, many=True).data)

    def post(self, request):
        serializer = ExperienceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(student=request.user.student_profile)  # no company_id manually!
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request, id=None):
        try:
            exp = Experience.objects.get(id=id, student=request.user.student_profile)
        except Experience.DoesNotExist:
            return Response({"detail": "Not allowed!"}, status=403)
        serializer = ExperienceSerializer(exp, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, id=None):
        try:
            exp = Experience.objects.get(id=id, student=request.user.student_profile)
            exp.delete()
            return Response({"detail": "Deleted successfully"})
        except Experience.DoesNotExist:
            return Response({"detail": "Not allowed!"}, status=403)

class StaticExperienceList(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        data = [
            {
                "id": 1,
                "student_name": "Vikash Kumar",
                "student_username": "vikash.s",
                "year": 2,
                "company_name": "Amazon",
                "role_title": "SDE I",
                "rating": 4.9,
                "package_lpa": 16.0,
                "difficulty": "Hard",
                "category": "Product",
                "summary": "Amazon interview with strong focus on DSA + LP.",
                "details": "OA → 2 coding rounds → 1 LP → HR.",
                "tips": "Practice LC medium-hard; Prepare LP answers.",
                "rounds": 4,
                "likes": 45,
                "comments_count": 12,
                "created_at": "2024-12-20"
            },
            {
                "id": 2,
                "student_name": "Sneha Agarwal",
                "student_username": "sneha.s",
                "year": 2,
                "company_name": "Tech Mahindra",
                "role_title": "Full Stack Developer",
                "rating": 4.3,
                "package_lpa": 6.5,
                "difficulty": "Medium",
                "category": "IT",
                "summary": "Focus on frontend fundamentals and JS logic.",
                "details": "Live coding on arrays + simple React questions.",
                "tips": "Know your projects; Revise JS basics.",
                "rounds": 3,
                "likes": 32,
                "comments_count": 5,
                "created_at": "2024-12-18"
            },
            {
                "id": 3,
                "student_name": "Rahul Sharma",
                "student_username": "rahul.s",
                "year": 2,
                "company_name": "Infosys",
                "role_title": "System Engineer",
                "rating": 4.0,
                "package_lpa": 5.2,
                "difficulty": "Easy",
                "category": "Service",
                "summary": "Basic aptitude + simple SQL + HR.",
                "details": "No coding round; Basic reasoning test.",
                "tips": "Practice aptitude daily; revise SQL joins.",
                "rounds": 2,
                "likes": 19,
                "comments_count": 3,
                "created_at": "2024-12-15"
            },
            {
                "id": 4,
                "student_name": "Aditya Verma",
                "student_username": "aditya.s",
                "year": 2,
                "company_name": "Google",
                "role_title": "Software Engineer Intern",
                "rating": 4.7,
                "package_lpa": 20.0,
                "difficulty": "Hard",
                "category": "Product",
                "summary": "Intense DSA-focused rounds with tricky problems.",
                "details": "Two DSA rounds + System Thinking + Googliness.",
                "tips": "Practice recursion + graphs + DP.",
                "rounds": 5,
                "likes": 52,
                "comments_count": 16,
                "created_at": "2025-01-05"
            },
            {
                "id": 5,
                "student_name": "Khushi Jain",
                "student_username": "khushi.s",
                "year": 2,
                "company_name": "Microsoft",
                "role_title": "Software Engineer",
                "rating": 4.5,
                "package_lpa": 18.5,
                "difficulty": "Medium",
                "category": "Product",
                "summary": "Good balance of coding + system design basics.",
                "details": "One OA → 2 Coding → Design → HR.",
                "tips": "Be clear & structured; Practice arrays & trees.",
                "rounds": 4,
                "likes": 38,
                "comments_count": 7,
                "created_at": "2025-01-10"
            },
            {
                "id": 6,
                "student_name": "Ravi Singh",
                "student_username": "ravi.s",
                "year": 2,
                "company_name": "TCS",
                "role_title": "Digital Engineer",
                "rating": 3.8,
                "package_lpa": 7.0,
                "difficulty": "Easy",
                "category": "Service",
                "summary": "Focused more on communication & basics.",
                "details": "Aptitude-heavy; few basic coding questions.",
                "tips": "Strong basics in OOPs; communicate clearly.",
                "rounds": 2,
                "likes": 14,
                "comments_count": 2,
                "created_at": "2024-11-28"
            },
            {
                "id": 7,
                "student_name": "Priya Mehta",
                "student_username": "priya.s",
                "year": 2,
                "company_name": "Wipro",
                "role_title": "Software Engineer",
                "rating": 4.1,
                "package_lpa": 6.0,
                "difficulty": "Easy",
                "category": "IT",
                "summary": "Simple aptitude & coding test.",
                "details": "Mostly HR-focused; calm interview.",
                "tips": "Be polite; explain your projects confidently.",
                "rounds": 2,
                "likes": 20,
                "comments_count": 4,
                "created_at": "2024-11-25"
            },
            {
                "id": 8,
                "student_name": "Saurabh Yadav",
                "student_username": "saurabh.s",
                "year": 2,
                "company_name": "Adobe",
                "role_title": "Frontend Developer",
                "rating": 4.6,
                "package_lpa": 16.8,
                "difficulty": "Hard",
                "category": "Product",
                "summary": "Heavy focus on JavaScript and UI optimization.",
                "details": "Deep JS + React + performance questions.",
                "tips": "Master JS fundamentals deeply.",
                "rounds": 3,
                "likes": 49,
                "comments_count": 10,
                "created_at": "2025-01-01"
            },
            {
                "id": 9,
                "student_name": "Aman Gupta",
                "student_username": "aman.s",
                "year": 2,
                "company_name": "IBM",
                "role_title": "Cloud Engineer",
                "rating": 4.2,
                "package_lpa": 12.0,
                "difficulty": "Medium",
                "category": "IT",
                "summary": "Cloud + networking + Python basics.",
                "details": "Scenario-based cloud questions.",
                "tips": "Revise OSI model + basics of cloud.",
                "rounds": 3,
                "likes": 28,
                "comments_count": 6,
                "created_at": "2024-12-30"
            },
            {
                "id": 10,
                "student_name": "Divya Sharma",
                "student_username": "divya.s",
                "year": 2,
                "company_name": "Oracle",
                "role_title": "Database Engineer",
                "rating": 4.4,
                "package_lpa": 14.0,
                "difficulty": "Medium",
                "category": "IT",
                "summary": "SQL + PL/SQL heavy interview.",
                "details": "Advanced SQL queries + optimization.",
                "tips": "Master JOINs, transactions, indexing.",
                "rounds": 3,
                "likes": 35,
                "comments_count": 7,
                "created_at": "2024-12-22"
            }
        ]

        return Response(data)


class CompanyUpdates(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        data = [
            {
                "company": "Tech Mahindra",
                "status": "Active",
                "package_lpa": 6.5,
                "rounds": 4,
                "difficulty": "Medium",
                "hired_students": 12,
                "skills": ["Full Stack", "React", "Node.js"],
                "application_deadline": "2025-01-30"
            },
            {
                "company": "Infosys",
                "status": "Active",
                "package_lpa": 5.2,
                "rounds": 3,
                "difficulty": "Easy",
                "hired_students": 18,
                "skills": ["Java", "Spring Boot", "MySQL"],
                "application_deadline": "2025-02-05"
            },
            {
                "company": "TCS",
                "status": "Active",
                "package_lpa": 4.8,
                "rounds": 2,
                "difficulty": "Easy",
                "hired_students": 25,
                "skills": ["Python", "Data Analysis", "SQL"],
                "application_deadline": "2025-02-10"
            },
            {
                "company": "Amazon",
                "status": "Completed",
                "package_lpa": 15.5,
                "rounds": 5,
                "difficulty": "Hard",
                "hired_students": 3,
                "skills": ["DSA", "System Design", "AWS"],
                "application_deadline": None
            }
        ]

        return Response(data)