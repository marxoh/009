import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../../graphql/Tasks";
import { useParams } from "react-router-dom";

export function TaskForm() {
  const [createTask] = useMutation(CREATE_TASK, {
    //arreglo de consultas que se van a ejecutar despues de CREATE_TASK
    refetchQueries: ['getProject']
  });
  const params = useParams();

  console.log(">> params: ", params);

  const handleSubmit = async(e) => {
    e.preventDefault();
    //data con await: es otra forma de recibir los datos de la bd
    //ver de donde saca entonces el error y el loading
    // const data = await createTask({
    //   variables: {
    //     title: e.target.titulito.value,
    //     projectId: params.prId
    //   },
    // });

    createTask({
      variables: {
        title: e.target.titulito.value,
        projectId: params.prId
      },
    });
    // console.log("> data: ",data)
    // console.log(e.target.titulito.value);
    //e.target: es el formulario que se esta ejecutando
    e.target.reset()
    //para que el cursor aparezca ahi
    e.target.titulito.focus()
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="titulito" />
      <button>+</button>
    </form>
  );
}
