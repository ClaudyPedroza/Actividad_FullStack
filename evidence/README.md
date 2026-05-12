# AutoSchool FullStack

​En esta etapa del proyecto, se completó el ciclo de vida completo de los recursos (CRUD) para la entidad de Cursos, integrando el frontend en React con el backend en Django REST Framework.

## Funcionalidades Implementadas - Gestión de Cursos

- GET
- POST
- PATCH
- DELETE

### ​1. Gestión de Datos (Backend & Services)


​Actualización Parcial *(PATCH)*: Implementación del método updateCourse en el servicio para permitir modificaciones específicas sin necesidad de reescribir todo el objeto.

​Eliminación de Recursos *(DELETE)*: Configuración del servicio deleteCourse para la remoción física de registros en la base de datos mediante peticiones asíncronas.

### 2. Interfaz de Usuario (Frontend)

​Formulario Híbrido: Reutilización de un único formulario dinámico para las funciones de creación *(POST)* y edición *(PATCH)*, optimizando la lógica mediante estados de control `(isEditing) (isSubmitting)`.

​Sincronización de Estado: Implementación de lógica de refresco automático tras cada operación para garantizar que la tabla muestre la "fuente de verdad" del servidor.

​Control de Flujo: Adición de botones de acción (Editar/Eliminar) por cada registro y funciones de limpieza de formulario  `reset()`  para mejorar la experiencia de usuario.


