import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT, GET_PROJECTS } from "../graphql/Projects";

export function ProjectForm() {
  const [project, setProject] = useState({
    name: "",
    description: "",
  });

  //GET_PROJECTS: volver a refrescar para ver el proyecto agregado
  //para que esto se guarde en memoria cache y no se tenga que revalidar por si solo
  //cuando se guarde en la cache se va a guardar con este nombre "GetProjects"
  //Unknown query named "GetProjects" requested in refetchQueries options.include array. ???
  const [createProject, { loading, error, data }] = useMutation(
    CREATE_PROJECT,
    {
      refetchQueries: [
        {
          query: GET_PROJECTS,
        },
        "GetProjects",
      ],
    }
  );

  // const handleChange = (e) => setProject({...project,[e.target.name]: e.target.value});
  const handleChange = ({ target: { name, value } }) =>
    setProject({
      ...project,
      [name]: value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProject({
      variables: {
        name: project.name,
        description: project.description,
      },
    });
    //limpiar campos despues del submit
    setProject({
      name: "",
      description: "",
    });
    // console.log(project.name, " - ", project.description);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div>
          {error.message}
          {console.log(
            "> Error al intentar guardar el nuevo proyecto en la base de datos: ",
            error.message
          )}
        </div>
      )}
      <input
        id="in_name"
        type="text"
        name="name"
        placeholder="titulo del proyecto"
        onChange={handleChange}
        value={project.name}
      />
      <textarea
        name="description"
        rows="3"
        placeholder="description"
        onChange={handleChange}
        value={project.description}
      ></textarea>
      <button disabled={!project.name || !project.description || loading}>
        {/* <button disabled={!project.name || !project.description}> */}
        Save
      </button>
    </form>
  );
}
