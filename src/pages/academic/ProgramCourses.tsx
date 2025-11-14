import Layout from '@/components/Layout';
import { useFetchProgramCourses } from '../../hooks/academic/useFetchProgramCourses';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuth';
import Loader from '@/components/Loader';

export default function ProgramCourses() {
  const { studentUser } = useAuth();
  const { programCourses, loading, error } = useFetchProgramCourses(1, studentUser?.profileInformation.studentId || 0);
  const [openTerm, setOpenTerm] = useState<number | null>(null);

  if (loading)
    return (
      <Layout>
        <div className="p-4 grid place-items-center h-[80vh]">
            <Loader message="Cargando pensum..." />
        </div>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <div className="p-4 text-destructive">{error}</div>
      </Layout>
    );

  if (!programCourses)
    return (
      <Layout>
        <div className="p-4">No hay datos disponibles.</div>
      </Layout>
    );

  const groupedCourses = programCourses.courses.reduce((acc, course) => {
    if (!acc[course.academicTermTitle]) acc[course.academicTermTitle] = [];
    acc[course.academicTermTitle].push(course);
    return acc;
  }, {} as Record<string, typeof programCourses.courses>);

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-primary text-center mb-2">
          {programCourses.careerName}
        </h1>
        <p className="text-center font-semibold text-foreground">{programCourses.studentName}</p>
        <p className="text-center text-muted-foreground mb-6">
          Créditos Aprobados: <span className="font-medium">{programCourses.creditsEarned}</span>
        </p>

        {Object.entries(groupedCourses).map(([termTitle, courses]) => (
          <div key={termTitle} className="mb-4 border rounded-xl shadow-sm bg-card overflow-hidden">
            <button
              onClick={() =>
                setOpenTerm(openTerm === courses[0].termId ? null : courses[0].termId)
              }
              className="flex justify-between w-full px-4 py-3 text-left bg-secondary hover:bg-secondary/80"
            >
              <span className="font-semibold text-secondary-foreground">{termTitle}</span>
              {openTerm === courses[0].termId ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {openTerm === courses[0].termId && (
              <ul className="divide-y divide-border">
                {courses.map((course) => (
                  <li key={course.courseId} className="flex justify-between items-center px-4 py-3">
                    <div>
                      <p className="font-medium text-foreground">{course.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {course.prerequisiteType === 'CREDITS'
                          ? `Requiere ${course.requiredCredits} créditos`
                          : course.prerequisiteCourseId
                          ? `Requiere curso #${course.prerequisiteCourseId}`
                          : 'Sin requisitos'}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        course.status === 'APPROVED'
                          ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300'
                          : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300'
                      }`}
                    >
                      {course.status === 'APPROVED' ? 'Aprobado' : 'Pendiente'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}