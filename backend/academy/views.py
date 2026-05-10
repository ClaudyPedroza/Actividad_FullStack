from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Student, Instructor, Vehicle, Course, Enrollment, Lesson
from .serializers import (
    StudentSerializer, StudentPictureSerializer, InstructorSerializer, VehicleSerializer,
    CourseSerializer, EnrollmentSerializer, LessonSerializer
)

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    search_fields = ['first_name', 'last_name', 'email']
    ordering_fields = ['created_at', 'first_name', 'last_name']

    @action(detail=True, methods=['post'], url_path='upload-picture',
            parser_classes=[MultiPartParser, FormParser])
    def upload_picture(self, request, pk=None):
        student = self.get_object()

        incoming_file = request.FILES.get('profile_picture')
        if not incoming_file:
            return Response(
                {'detail': 'Debes enviar el archivo profile_picture.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
               
        serializer = StudentPictureSerializer(student, data={'profile_picture': incoming_file})

        if serializer.is_valid():
            serializer.save()        
   
            return Response(
                StudentSerializer(student, context={'request': request}).data,
                status=status.HTTP_200_OK
            )
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

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
