from django.contrib import admin
from .models import Student, Instructor, Vehicle, Course, Enrollment, Lesson

# list_display: una tupla que define que columnas aparecerán cuando se vea la vista del admin
# list_filter: buscador con cuadritos, para filtrar
# search_fields: buscador

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'phone', 'created_at')
    search_fields = ('first_name', 'last_name', 'email')

@admin.register(Instructor)
class InstructorAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'specialty', 'created_at')
    search_fields = ('first_name', 'last_name', 'email')

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('plate', 'brand', 'model', 'vehicle_type', 'is_available')
    list_filter = ('vehicle_type', 'is_available')
    search_fields = ('plate', 'brand', 'model')

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'duration_hours', 'price', 'created_at')
    search_fields = ('name',)

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'status', 'enrolled_at')
    list_filter = ('status', 'course')
    search_fields = ('student__first_name', 'student__last_name', 'course__name')

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('enrollment', 'instructor', 'vehicle', 'scheduled_at', 'status')
    list_filter = ('status', 'scheduled_at')
    search_fields = ('enrollment__student__first_name', 'instructor__first_name', 'vehicle__plate')
