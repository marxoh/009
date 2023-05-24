//carpeta models: es para conectarse con la bd con mongodb
//y recibir los datos para poder guardarlos
//este archivo es pedido por mongoose
import mongoose from "mongoose";

//para definir que datos van a ir guardados dentro de mongodb
//la app va a guardar proyectos y cada proyecto tiene que guardar multiples tareas
//definir que datos se van a guardar de cada proyecto, relacion de uno a muchos (1:N)
//timestamp: solo con esto se define cuando se creó y se actualizó
const ProjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//mongoose pide especificar un modelo
//el modelo llamado "Proyect" va a recibir un schema llamado "ProjectSchema"
export default mongoose.model('Project', ProjectSchema);