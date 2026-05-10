from rest_framework import viewsets
from .models import Student, Instructor, Vehicle, Course, Enrollment, Lesson
from .serializers import (
    StudentSerializer, InstructorSerializer, VehicleSerializer,
    CourseSerializer, EnrollmentSerializer, LessonSerializer
)

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    search_fields = ['first_name', 'last_name', 'email']
    ordering_fields = ['created_at', 'first_name', 'last_name']

class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer
    search_fields = ['first_name', 'last_name', 'email', 'specialty']
    ordering_fields = ['created_at', 'first_name', 'last_name']

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    filterset_fields = ['vehicle_type', 'is_available']
    search_fields = ['plate', 'brand', 'model']
    ordering_fields = ['created_at', 'brand', 'model']

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    search_fields = ['name', 'description']
    ordering_fields = ['created_at', 'price', 'duration_hours']
    filterset_fields = ['level', 'is_active']

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    filterset_fields = ['student', 'course', 'status']
    ordering_fields = ['enrolled_at']

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    filterset_fields = ['enrollment', 'instructor', 'vehicle', 'status', 'scheduled_at']
    ordering_fields = ['scheduled_at', 'created_at']
