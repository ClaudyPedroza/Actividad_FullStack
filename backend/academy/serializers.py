from rest_framework import serializers
from .models import Student, Instructor, Vehicle, Course, Enrollment, Lesson

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
    #hooks de validacion
    def validate_name(self, value):
        #.strip: si despues de quitar los espacios no queda nada, es porque está vacio
        if not value or value.strip() == "":
            #raise: pausa que indica que algo salió mal
            raise serializers.ValidationError("El nombre del curso no puede estar vacio")
        return value
    
    def validation_duration_hours(self, value):
        if value <= 0:
            raise serializers.ValidationError("La duracion del curso debe ser mayor a 0")
        return value
    
    def validation_price(self, value):
        if value < 0:
            raise serializers.ValidationError("El precio del curso no puede ser negativo")
        return value

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'
