import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/Projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectList() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  // console.log(loading, error, data)

  if (loading) return <p>Cargando.. .</p>;
  if (error) return <p>Error al intentar cargar de la base de datos.</p>;

  return (
    //overflow-y-auto: para que la lista de proyectos no pase el cuadro de fondo
    //y auto para que tenga scrollbar
    <div className="overflow-y-auto h-96 w-full px-5">
      {data.projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
