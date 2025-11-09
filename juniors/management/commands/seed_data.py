from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from juniors.models import Student, Company, Placement, Message, Experience, PremiumOpportunity
from rest_framework.authtoken.models import Token
from datetime import date, timedelta


class Command(BaseCommand):
    help = "Seed database with dummy data for DU MCA Placement Portal"

    def handle(self, *args, **options):
        # Clear old data (optional)
        Company.objects.all().delete()
        Student.objects.all().delete()
        User.objects.filter(username__in=['rahulc.mca25', 'vikash', 'sneha', 'rahulsharma']).delete()
        Placement.objects.all().delete()
        Message.objects.all().delete()
        Experience.objects.all().delete()
        PremiumOpportunity.objects.all().delete()

        self.stdout.write(self.style.WARNING("Seeding dummy data..."))

        # -----------------------
        # 1️⃣ Create Companies
        # -----------------------
        companies_data = [
            {"name": "Amazon", "difficulty": "Hard", "avg_package": 15.5},
            {"name": "Microsoft", "difficulty": "Hard", "avg_package": 18.5},
            {"name": "Tech Mahindra", "difficulty": "Medium", "avg_package": 6.5},
            {"name": "Infosys", "difficulty": "Easy", "avg_package": 5.2},
            {"name": "TCS", "difficulty": "Easy", "avg_package": 4.8},
            {"name": "Wipro", "difficulty": "Easy", "avg_package": 5.8},
            {"name": "Accenture", "difficulty": "Medium", "avg_package": 7.2},
            {"name": "Google", "difficulty": "Hard", "avg_package": 22.0},
            {"name": "Adobe", "difficulty": "Hard", "avg_package": 16.8},
        ]
        companies = []
        for c in companies_data:
            comp = Company.objects.create(**c)
            companies.append(comp)

        # -----------------------
        # 2️⃣ Create Users & Students
        # -----------------------
        u1 = User.objects.create_user(username="rahulc.mca25", password="password",
                                      first_name="Rahul", last_name="Chadar", email="rahul@example.com")
        s1 = Student.objects.create(user=u1, year=1, role="Junior", roll_number="MCA001", college="DU MCA")
        Token.objects.get_or_create(user=u1)

        u2 = User.objects.create_user(username="vikash", password="password",
                                      first_name="Vikash", last_name="Kumar", email="vikash@example.com")
        s2 = Student.objects.create(user=u2, year=2, role="Senior", roll_number="MCA002", college="DU MCA")
        Token.objects.get_or_create(user=u2)

        u3 = User.objects.create_user(username="sneha", password="password",
                                      first_name="Sneha", last_name="Agarwal", email="sneha@example.com")
        s3 = Student.objects.create(user=u3, year=2, role="Senior", roll_number="MCA003", college="DU MCA")
        Token.objects.get_or_create(user=u3)

        u4 = User.objects.create_user(username="rahulsharma", password="password",
                                      first_name="Rahul", last_name="Sharma", email="rahulsharma@example.com")
        s4 = Student.objects.create(user=u4, year=2, role="Senior", roll_number="MCA004", college="DU MCA")
        Token.objects.get_or_create(user=u4)

        # -----------------------
        # 3️⃣ Create Placements
        # -----------------------
        Placement.objects.create(student=s4, company=companies[0], role="SDE I", package_lpa=15.5)
        Placement.objects.create(student=s3, company=companies[2], role="Full Stack Developer", package_lpa=6.5)
        Placement.objects.create(student=s2, company=companies[3], role="System Engineer", package_lpa=5.2)

        # -----------------------
        # 4️⃣ Create Experiences
        # -----------------------
        Experience.objects.create(
            student=s2, company=companies[0], title="SDE I", difficulty="Hard",
            package_lpa=15.5, rating=4.5,
            content="Challenging but rewarding experience. Focus on DSA and system design..."
        )
        Experience.objects.create(
            student=s3, company=companies[2], title="Full Stack Developer", difficulty="Medium",
            package_lpa=6.5, rating=4.2,
            content="Great company culture. Live coding session was the key round..."
        )
        Experience.objects.create(
            student=s4, company=companies[3], title="System Engineer", difficulty="Easy",
            package_lpa=5.2, rating=4.0,
            content="Well-organized process. Focus on Java and database concepts..."
        )

        # -----------------------
        # 5️⃣ Create Messages
        # -----------------------
        Message.objects.create(sender=u2, recipient=u1, subject="Welcome", body="Welcome to DU MCA Placement Portal!")
        Message.objects.create(sender=u3, recipient=u1, subject="Infosys Drive", body="Shared my Infosys interview tips.")
        Message.objects.create(sender=u4, recipient=u1, subject="Congrats!", body="Congrats on your progress!")

        # -----------------------
        # 6️⃣ Create Premium Opportunities
        # -----------------------
        today = date.today()
        PremiumOpportunity.objects.create(
            company=companies[1], title="Premium", package_lpa=18.5,
            date=today + timedelta(days=98), difficulty="Hard",
            required_skills="DSA,System Design,Azure"
        )
        PremiumOpportunity.objects.create(
            company=companies[7], title="Premium", package_lpa=22.0,
            date=today + timedelta(days=103), difficulty="Hard",
            required_skills="Algorithms,ML,System Design"
        )
        PremiumOpportunity.objects.create(
            company=companies[8], title="Premium", package_lpa=16.8,
            date=today + timedelta(days=108), difficulty="Hard",
            required_skills="Frontend,JavaScript,React"
        )

        self.stdout.write(self.style.SUCCESS("✅ Seeding completed successfully!"))
