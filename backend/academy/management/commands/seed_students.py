import random
from django.core.management.base import BaseCommand
from academy.models import Student

#Script para poblar la base de datos

class Command(BaseCommand):
    help = 'Seed the database with mock students'

    def handle(self, *args, **kwargs):
        mock_students = [
            {"first_name": "Juan", "last_name": "Pérez", "email": "juan.perez@example.com", "phone": "555-0101"},
            {"first_name": "María", "last_name": "Gómez", "email": "maria.gomez@example.com", "phone": "555-0102"},
            {"first_name": "Carlos", "last_name": "López", "email": "carlos.lopez@example.com", "phone": "555-0103"},
            {"first_name": "Ana", "last_name": "Martínez", "email": "ana.martinez@example.com", "phone": "555-0104"},
            {"first_name": "Luis", "last_name": "Rodríguez", "email": "luis.rodriguez@example.com", "phone": "555-0105"},
            {"first_name": "Laura", "last_name": "Fernández", "email": "laura.fernandez@example.com", "phone": "555-0106"},
            {"first_name": "Jorge", "last_name": "García", "email": "jorge.garcia@example.com", "phone": "555-0107"},
            {"first_name": "Sofía", "last_name": "Díaz", "email": "sofia.diaz@example.com", "phone": "555-0108"},
            {"first_name": "Diego", "last_name": "Hernández", "email": "diego.hernandez@example.com", "phone": "555-0109"},
            {"first_name": "Elena", "last_name": "Ruiz", "email": "elena.ruiz@example.com", "phone": "555-0110"},
        ]

        created_count = 0

        for data in mock_students:
            student, created = Student.objects.get_or_create(
                email=data['email'],
                defaults={
                    'first_name': data['first_name'],
                    'last_name': data['last_name'],
                    'phone': data['phone'],
                }
            )
            if created:
                created_count += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully created {created_count} new mock students!'))
