//para eliminar una tarea se necesita de useMutation
import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../graphql/Tasks";
import { AiOutlineDelete } from "react-icons/ai";

export function TaskCard({ task }) {
  const [deleteTask, { data, error, load }] = useMutation(DELETE_TASK, {
    //arreglo de consultas que se van a ejecutar despues de CREATE_TASK
    //es para actualizar las tareas
    refetchQueries: ["getProject"],
  });

  return (
    <div className="bg-zinc-900 px-5 py-3 mb-2 flex justify-between">
      <h1 className="text-sm">{task.title}</h1>
      <button
        onClick={(e) => {
          deleteTask({
            variables: {
              id: task._id,
            },
          });
          // e.target.reset()
        }}
      >
       <AiOutlineDelete/>
      </button>
    </div>
  );
}

export default TaskCard;
