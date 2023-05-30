//useParams: trae los parametros automagicamente
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../graphql/Projects";
//me mataste con tu Tasks mayuscula poye
import { TaskList } from "../components/Tasks/TaskList";
import { TaskForm } from "../components/tasks/TaskForm";

import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../graphql/Projects";
import { useNavigate } from "react-router-dom";

export function ProjectDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      id: params.prId,
    },
    //skip: !params.prId: salta hasta que params sea <> de undefined
    //la 1vez que se ejecuta, data es undefined y da error al mostrarlo
    //aqui dentro, loading no esta definido para el skip
    // skip: !params.prId
  });

  const [deleteProject, { data1, error1, loading1 }] = useMutation(
    DELETE_PROJECT,
    {
      variables: {
        id: params.prId,
      },
      refetchQueries: ["getProjects"],
    }
  );

  //desvian el error mientras funcione loading, para esos casos
  if (loading) return <p>Loading. ..</p>;
  if (error) return <p>Error.</p>;

  console.log("> params: ", params);
  console.log("> data, loading, error: ", data, loading, error);

  return (
    <div>
      <Link to="/projects">
        <button className="bg-sky-900 text-white px-3 py-2">Espalda</button>
      </Link>
      <div className="bg-zinc-900 mb-2 p-10 flex justify-between">
        <div>
          <h1 className="text-2xl">{data.project.name}</h1>
          <p>{data.project.description}</p>
        </div>
      </div>
      <button
        onClick={(e) => {
          deleteProject({
            variables: {
              id: params.prId,
            },
          });
          //despues que redireccione a la pagina anterior
          navigate("/projects/");
        }}
        className="bg-red-500 px-3 py-2 "
      >
        X..
      </button>
      <TaskForm />
      <TaskList tasks={data.project.tasks} />
    </div>
  );
}
