import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AutoSchool Dashboard</h1>
        <p className="text-gray-500 mt-2">
          ¡Bienvenido al sistema de administración académica!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gestión de Estudiantes
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Visualiza y registra a los estudiantes de la escuela de conducción.
            </CardDescription>
            <Link href="/dashboard/students">
              <Button className="w-full">Ir a estudiantes</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gestión de Cursos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Visualiza y registra los cursos de la escuela de conducción.
            </CardDescription>
            <Link href="/dashboard/courses">
              <Button className="w-full">Ir a cursos</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
