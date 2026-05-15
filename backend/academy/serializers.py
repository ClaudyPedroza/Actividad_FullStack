from rest_framework import serializers
from .models import Student, Instructor, Vehicle, Course, Enrollment, Lesson

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class StudentPictureSerializer(serializers.ModelSerializer):
    def validate_profile_picture(self, value):
        # TODO(actividad): Implementar validaciones de archivo (tamano y tipo MIME).
        # Ejemplo: permitir image/jpeg e image/png y limitar a 2MB.
        max_size_bytes = 2 * 1024 * 1024 
        if value.size > max_size_bytes:
                raise serializers.ValidationError('La imagen es demasiado grande. El tamaño máximo es de 2MB.')
            

        allowed_types = ['image/jpeg', 'image/png', 'image/jpg']
        if value.content_type not in allowed_types:
            raise serializers.ValidationError('Formato no válido. Solo se aceptan imágenes en formato JPEG o PNG.')
        
        return value

    class Meta:
        model = Student
        fields = ['profile_picture']

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
