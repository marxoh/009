import mongoose from "mongoose";

//type: mongoose.Schema.Types.ObjectId
  //un tipo de ID de mongoDB
//ref: 'Project',
  //se enlaza el type con Project
const TaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
  },
  {
    timestamps: true,
  }
);

//mongoose pide especificar un modelo
//el modelo llamado "Proyect" va a recibir un schema llamado "ProjectSchema"
export default mongoose.model('Task', TaskSchema);