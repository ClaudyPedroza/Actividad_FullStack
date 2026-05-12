"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { coursesService } from "@/services/courses.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const coursesSchema = z.object({
    name: z.string().min(1, "El nombre del curso es requerido"),
    description: z.string().min(1, "La descripcion es requerida"),
    duration_hours: z.coerce.number().int("Debe ser un número entero").positive("La duración debe ser mayor a 0"),
    price: z.coerce.number().min(0, "El precio no puede ser negativo"),
    level: z.enum(["basic", "intermediate", "advanced"], {
    errorMap: () => ({ message: "Selecciona un nivel válido" }),
  }),
    is_active: z.coerce.boolean().default(true),
});

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState(" ");
    const [success, setSuccess] = useState(" ");
    const [selectedId, setSelectedId] = useState (null); 
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: zodResolver(coursesSchema),
      });

    const loadCourses = async () => {
        try {
            setisLoading(true);
            const data = await coursesService.getCourse();
            setCourses(data);
        } catch (err) {
            setError("No se obtuvieron correctamente los cursos desde la api");
        } finally {
            setisLoading(false);
        }
    }

    useEffect(() => {
        loadCourses();
    },[]);

    const onSubmit = async (data) => {
        try {
              setError("");
              setSuccess("");

              if(isEditing){
                await coursesService.updateCourse(selectedId, data);
                setSuccess("Curso editado exitosamente");
              } 
              else {
              await coursesService.createCourse(data);
              setSuccess("Curso creado exitosamente");
              }

              reset();
              setIsEditing(false);
              loadCourses();
            } catch (err) {
              const action = isEditing ? "actualizar" : "crear";
              setError(err.response?.data?.detail || `Error al ${action} el curso.`);
            }
    };
    
    const handleEditClick = async (course) => {
        setIsEditing (true);
        setSelectedId (course.id);

        reset({
            name: course.name,
            description: course.description,
            duration_hours: course.duration_hours,
            price: course.price,
            level: course.level,
            is_active: course.is_active
  });
    }

const onDelete = async (selectedId) => {
        if (confirm("¿Estás seguro?")) {
    try {
      await coursesService.deleteCourse(selectedId);
      await loadCourses();
      setSuccess("Curso eliminado");
    } catch (err) {
      setError("No se pudo eliminar");
    }
  }
}

    return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cursos</h1>
        <p className="text-gray-500 mt-2">Gestiona el registro de cursos.</p>
      </div>
    <div className="grid gap-6 md:grid-cols-3">

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Registrar nuevo curso</CardTitle>
              <CardDescription>Añade un nuevo curso al sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Input id="description" {...register("description")} />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration_hours">Duración</Label>
                  <Input id="duration_hours" type="number" {...register("duration_hours")} />
                  {errors.duration_hours && (
                    <p className="text-sm text-red-500">{errors.duration_hours.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Precio</Label>
                  <Input id="price" type="number" step="0.01" {...register("price")} />
                  {errors.price && (
                    <p className="text-sm text-red-500">{errors.price.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Nivel</Label>
                    <select id="level" {...register("level")} className="...">
                    <option value="basic">Básico</option>
                    <option value="intermediate">Intermedio</option>
                    <option value="advanced">Avanzado</option>
                    </select>
                  {errors.level && (
                    <p className="text-sm text-red-500">{errors.level.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="is_active">Estado</Label>
                  <Input id="is_active" type="checkbox" {...register("is_active")} 
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"/>
                  <span className="ml-2 text-sm text-gray-600">Activo</span>
                  {errors.is_active && (
                    <p className="text-sm text-red-500">{errors.is_active.message}</p>
                  )}
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isEditing? "Guardar cambios" : "Guardar Curso"}
                </Button>

                {isEditing && (
                  <Button type="button" className="w-full" onClick={() => { setIsEditing(false); reset(); }}>
                  Cancelar
                  </Button>)}
              </form>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mt-4 border-green-500 text-green-700">
                  <CheckCircle2 className="h-4 w-4" color="green" />
                  <AlertTitle>Éxito</AlertTitle>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Listado de Cursos</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center text-gray-500 py-4">Cargando cursos...</p>
              ) : courses.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No hay cursos registrados.</p>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead>Duración</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Nivel</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">
                            {course.name}
                          </TableCell>
                          <TableCell>{course.description}</TableCell>
                          <TableCell>{course.duration_hours}</TableCell>
                          <TableCell>{course.price}</TableCell>
                          <TableCell>{course.level}</TableCell>
                          <TableCell>{course.is_active ? "Activo" : "Inactivo"}</TableCell>
                          <TableCell>
                            <button onClick={() => handleEditClick(course)}className="text-blue-600 hover:text-blue-800 font-medium">
                                Editar
                            </button>
                          </TableCell>
                          <TableCell>
                            <button onClick={() => onDelete(course.id)}className="text-red-600 hover:text-red-800 font-medium">
                                Eliminar
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}