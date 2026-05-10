from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    StudentViewSet, InstructorViewSet, VehicleViewSet,
    CourseViewSet, EnrollmentViewSet, LessonViewSet
)

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')
router.register(r'instructors', InstructorViewSet, basename='instructor')
router.register(r'vehicles', VehicleViewSet, basename='vehicle')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')
router.register(r'lessons', LessonViewSet, basename='lesson')

urlpatterns = [
    path('', include(router.urls)),
]
