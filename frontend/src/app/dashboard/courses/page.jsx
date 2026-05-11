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

const courseSchema = z.object({
    name: z.string().min(1, "El nombre del curso es requerido"),
    description: z.string().min(1, "La descripcion es requerida"),
    duration: z.string().min(1, "La duracion del curso es requerida"),
    price: z.string().min(1, "El precio del curso es requerido"),
    level: z.string().min(1, "El nivel del curso es requerido"),
    state: z.string().min(1, "El estado del curso es requerido"),
});

export default function CoursePage() {
    const [course, setCourse] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState(" ");


    const loadCourse = async () => {
        try {
            setisLoading(true);
            const data = await courseService.getCourse();
            setCourse(data);
        } catch (err) {
            setError("No se obtuvieron correctamente los cursos desde la api");
        } finally {
            setisLoading(false);
        }
    }

    useEffect(() => {
        loadCourse();
    },[]);

    return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cursos</h1>
        <p className="text-gray-500 mt-2">Gestiona el registro de cursos.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Listado de Cursos</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center text-gray-500 py-4">Cargando cursos...</p>
              ) : course.length === 0 ? (
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
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            {student.first_name} {student.last_name}
                          </TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.phone}</TableCell>
                          <TableCell>
                            {new Date(student.created_at).toLocaleDateString()}
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