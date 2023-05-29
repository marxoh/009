//useParams: trae los parametros automagicamente
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../graphql/Projects";
import { TaskList } from "../components/Tasks/TaskList";//me mataste con tu Tasks mayuscula poye
import { TaskForm } from "../components/tasks/TaskForm";

export function ProjectDetails() {
  const params = useParams();
  const {data, loading, error} = useQuery(GET_PROJECT, {
    variables: {
      id: params.prId
    },
    //skip: !params.prId: salta hasta que params sea <> de undefined
    //la 1vez que se ejecuta, data es undefined y da error al mostrarlo
    //aqui dentro, loading no esta definido para el skip
    // skip: !params.prId 
  })

  //desvian el error mientras funcione loading, para esos casos
  if (loading) return <p>Loading. ..</p>
  if (error) return <p>Error.</p>

  console.log('> params: ',params);
  console.log('> data, loading, error: ',data, loading, error);

  return <div>
    <h1>{data.project.name}</h1>
    <p>{data.project.description}</p>
    <button>
      X
    </button>
    <TaskForm />
    <TaskList tasks={data.project.tasks}/>
  </div>;
}
