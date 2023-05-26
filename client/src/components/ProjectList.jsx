import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/Projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectList() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  // console.log(loading, error, data)

  if (loading) return <p>Cargando.. .</p>;
  if (error) return <p>Error.</p>;

  return (
    <div>
      {data.projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
