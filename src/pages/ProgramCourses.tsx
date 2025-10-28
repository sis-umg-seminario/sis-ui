import Layout from '@/components/Layout';
import { useFetchProgramCourses } from '../hooks/academic/useFetchProgramCourses';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ProgramCourses() {
  const { programCourses, loading, error } = useFetchProgramCourses(1, 1);
  const [openTerm, setOpenTerm] = useState<number | null>(null);

  if (loading)
    return (
      <Layout>
        <div className="p-4">Cargando...</div>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <div className="p-4 text-red-500">{error}</div>
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
        <h1 className="text-2xl font-bold text-orange-600 text-center mb-2">
          {programCourses.careerName}
        </h1>
        <p className="text-center font-semibold text-gray-700">{programCourses.studentName}</p>
        <p className="text-center text-gray-500 mb-6">
          Créditos Aprobados: <span className="font-medium">{programCourses.creditsEarned}</span>
        </p>

        {Object.entries(groupedCourses).map(([termTitle, courses]) => (
          <div key={termTitle} className="mb-4 border rounded-xl shadow-sm">
            <button
              onClick={() =>
                setOpenTerm(openTerm === courses[0].termId ? null : courses[0].termId)
              }
              className="flex justify-between w-full px-4 py-3 text-left bg-gray-100 hover:bg-gray-200 rounded-t-xl"
            >
              <span className="font-semibold text-gray-800">{termTitle}</span>
              {openTerm === courses[0].termId ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {openTerm === courses[0].termId && (
              <ul className="divide-y">
                {courses.map((course) => (
                  <li key={course.courseId} className="flex justify-between items-center px-4 py-2">
                    <div>
                      <p className="font-medium text-gray-800">{course.name}</p>
                      <p className="text-sm text-gray-500">
                        {course.prerequisiteType === 'CREDITS'
                          ? `Requiere ${course.requiredCredits} créditos`
                          : course.prerequisiteCourseId
                          ? `Requiere curso #${course.prerequisiteCourseId}`
                          : 'Sin requisitos'}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        course.status === 'APPROVED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
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
