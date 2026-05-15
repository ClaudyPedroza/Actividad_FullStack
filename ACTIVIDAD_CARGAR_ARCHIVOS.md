# Actividad: Carga de archivos y captura de foto de perfil

## Importante
- El video de entrega debe realizarse en inglés.
- Debes trabajar desde la rama: `feature/actividad-cargar-archivos`.
- Duración máxima del video: 5 minutos.

## Apoyo con IA (opcional)
Pueden usar IA para apoyarse durante la implementación, siempre que entiendan y puedan explicar su código.

Herramientas sugeridas:
- Antigravity (tiene nivel gratuito).
- Cursor.
- Claude Code.
- Extensión GitHub Copilot en VS Code o en cualquier IDE compatible para programar con ayuda de IA.

Recomendación académica:
- No copien sin entender.
- Verifiquen que la solución funcione realmente en su proyecto.
- Deben poder explicar las decisiones técnicas en su propio video.

## Contexto de la funcionalidad
En esta actividad trabajarán sobre una funcionalidad real de una aplicación de autoescuela.
La feature permite asociar una foto de perfil a un estudiante desde dos fuentes:
- Imagen seleccionada desde el computador.
- Captura tomada con webcam.

La solución completa ya existía, pero fue convertida a una versión guiada con partes pendientes para que ustedes la finalicen.

## Objetivos de aprendizaje
- Entender el flujo completo de carga de archivos entre frontend y backend.
- Implementar envío de archivos con `FormData` y `multipart/form-data`.
- Consumir un action endpoint de Django REST Framework desde React.
- Integrar una captura de webcam en la UI.
- Manejar estados de modal, errores y actualización visual de datos.
- Aplicar validaciones básicas de archivos en cliente y servidor.

## Descripción general de la feature
1. En el listado de estudiantes existe una acción para abrir una modal de foto.
2. En la modal se puede:
- Seleccionar una imagen local.
- Abrir la cámara y capturar una foto.
3. El archivo (seleccionado o capturado) se envía al backend.
4. El backend recibe el archivo y lo asocia al estudiante.
5. El frontend actualiza la interfaz para mostrar la nueva foto.

## Tecnologías utilizadas
- Backend: Django, Django REST Framework.
- Frontend: Next.js (React), Axios.
- Manejo de archivos: `FormData`, `multipart/form-data`.
- Captura de webcam: `navigator.mediaDevices.getUserMedia`, `canvas.toBlob`.

## Qué partes ya están hechas
- Modelo de estudiante con campo `profile_picture`.
- Ruta/action endpoint para `upload-picture` (expuesta en DRF).
- Estructura base de servicio en frontend para subir imagen.
- Modal con estructura visual y botones para seleccionar archivo y usar cámara.
- Flujo general de navegación en dashboard de estudiantes.

## Qué deben completar en backend
1. Completar la lógica del endpoint `upload_picture` en el ViewSet de estudiantes.
2. Validar presencia del archivo `profile_picture`.
3. Agregar validaciones básicas (tipo y tamaño) antes de guardar.
4. Usar correctamente `StudentPictureSerializer` para persistir el archivo.
5. Retornar la respuesta esperada con el estudiante actualizado.
6. Manejar errores simples con códigos HTTP adecuados.

## Qué deben completar en frontend
1. Construir correctamente `FormData` para enviar `profile_picture`.
2. Completar el llamado al action endpoint de DRF desde el servicio.
3. Finalizar la captura desde webcam (crear `File` desde `Blob`).
4. Mejorar manejo de estados en modal:
- inicio/cierre de cámara,
- carga,
- error,
- archivo seleccionado.
5. Agregar validaciones básicas del archivo en cliente (tipo y tamaño).
6. Actualizar visualmente la imagen del estudiante luego del guardado exitoso.
7. Integrar correctamente el resultado del modal con el listado de estudiantes.

## Archivos clave de la actividad
- `backend/academy/views.py`
- `backend/academy/serializers.py`
- `frontend/src/services/students.service.js`
- `frontend/src/components/students/UploadPictureModal.jsx`
- `frontend/src/app/dashboard/students/page.jsx`

## Cómo correr backend y frontend
### Backend
1. Ir a carpeta `backend/`.
2. Activar el entorno virtual.
3. Instalar dependencias: `pip install -r requirements.txt`.
4. Ejecutar migraciones: `python manage.py migrate`.
5. Levantar servidor: `python manage.py runserver`.

### Frontend
1. Ir a carpeta `frontend/`.
2. Instalar dependencias: `npm install`.
3. Configurar `.env` con `NEXT_PUBLIC_API_URL=http://localhost:8000/api`.
4. Levantar frontend: `npm run dev`.

## Cómo probar la funcionalidad
1. Abrir `http://localhost:3000/dashboard/students`.
2. Crear o seleccionar un estudiante existente.
3. Abrir la modal de foto.
4. Probar selección de archivo local.
5. Probar apertura de webcam y captura.
6. Guardar y verificar que el backend reciba el archivo.
7. Confirmar que la imagen se refleje en la interfaz.

## Requisitos mínimos
- La app debe compilar y levantarse (backend y frontend).
- Debe ser posible subir imagen desde archivo local.
- Debe ser posible capturar imagen desde webcam.
- Debe enviarse correctamente `multipart/form-data`.
- Debe actualizarse la foto del estudiante en la UI.
- Debe existir manejo básico de errores y validaciones.

## Qué deben entregar
1. Enlace a su repositorio con la solución completa.
2. Enlace a su video en YouTube.

El video puede estar en modo:
- No listado.
- Público.

También pueden compartirlo de forma accesible solo por enlace.

## Criterios de evaluación
- Correctitud técnica del flujo frontend-backend.
- Implementación de captura webcam y carga de archivo.
- Calidad del manejo de estado en React.
- Uso correcto de `FormData` y endpoint DRF.
- Validaciones básicas y manejo de errores.
- Claridad del código y de los TODO completados.
- Calidad de la explicación técnica en el video (en inglés).

## Instrucciones del video en inglés
- Deben grabar un video explicando técnicamente la solución en inglés.
- Deben mostrar código y demostración funcional.
- Deben subir el video a YouTube y compartir el enlace.
- Duración máxima: 5 minutos.

Formato del video:
- Opción A (recomendada): mostrar la feature funcionando y su rostro en un recuadro durante la explicación.
- Opción B (alternativa): mostrar brevemente la feature funcionando y luego grabarse mostrando su rostro para la explicación final.

Guía rápida para hacerlo fácil en Windows:
1. Usar OBS Studio (gratis) para grabar pantalla + webcam en recuadro:
- Agregar una fuente de captura de pantalla.
- Agregar una fuente de dispositivo de captura de video (webcam).
- Redimensionar la webcam y moverla a una esquina.
- Grabar y exportar.
2. Alternativa sencilla con Clipchamp (Windows):
- Grabar pantalla.
- Agregar clip de cámara.
- Colocar la cámara como overlay (picture-in-picture).
3. Si prefieren Opción B:
- Grabar primero la demo funcional.
- Grabar después un clip corto con su rostro explicando resultados, retos y decisiones.

## Contenido obligatorio del video
En el video (en inglés) deben explicar como mínimo:
1. Qué hace la feature.
2. Cómo funciona la modal.
3. Cómo React maneja el estado.
4. Cómo se selecciona una imagen desde el computador.
5. Cómo se activa la webcam.
6. Cómo se toma la captura.
7. Cómo se construye el `FormData`.
8. Cómo React consume el endpoint de Django REST Framework.
9. Cómo Django recibe el archivo.
10. Cómo se guarda la imagen.
11. Cómo se actualiza la interfaz.
12. Demostración funcional completa.
13. Qué fue lo más difícil o interesante de implementar.
14. Debe verse su rostro en recuadro durante la demo o en un segmento posterior del mismo video.

## Flujo de trabajo obligatorio
1. Trabajar desde la rama `feature/actividad-cargar-archivos`.
2. Completar la funcionalidad pendiente.
3. Subir cambios a su propio repositorio.
4. Grabar video técnico en inglés.
5. Subir video a YouTube.
6. Entregar enlace de repositorio + enlace de video.
