//para eliminar una tarea se necesita de useMutation
import {useMutation} from '@apollo/client'
import {DELETE_TASK} from '../../graphql/Tasks'

export function TaskCard({task}) {

  const [deleteTask, {data,error,load}] = useMutation(DELETE_TASK, {
    //arreglo de consultas que se van a ejecutar despues de CREATE_TASK
    //es para actualizar las tareas
    refetchQueries: ['getProject'],
  })

  return <div>
    <h1>{task.title}</h1>
    <button
    onClick={(e)=>{
      deleteTask({
        variables: {
          id: task._id,
        }
      })
      // e.target.reset()
    }}
    >
      X
    </button>
  </div>;
}

export default TaskCard;
