//funciones
//las consultas Querys para definir que es lo que se va a retornar
//todas las consultas pasar por aqui para retornar la informacion en mutation
import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const resolvers = {
  Query: {
    hello: () => "Hello World",
    projects: async () => await Project.find(),
    project: async (_,{_id}) => await Project.findById(_id),
    tasks: async () => await Task.find(),
    task: async (_,{_id}) => await Task.findById(_id),
  },
  Mutation: {
    // createProject: (_,) recibe los valores que envia el cte
    //el primer parametro no se usa tipicamente
    //como (args) es un objeto se puede destructurar {name, description}
    //(_, args): para cuando pueden pasar un solo parametro o ambos
    createProject: async (_, { name, description }) => {
      // console.log(name, description);
      const project = new Project({ name, description });
      const savedProject = await project.save();
      return savedProject;
    },
    createTask: async (_, { title, projectId }) => {
      //el error va a ser inmediatamente retornado al cte
      const pfound = await Project.findById(projectId);
      if (!pfound) throw new Error("Proyecto no existe");
      return await new Task({ title, projectId }).save();
    },
    deleteProject: async (_, { _id }) => {
      const deletedProject = await Project.findByIdAndDelete(_id);
      if (!deletedProject) throw new Error("Proyecto no existe")
      await Task.deleteMany({projectID:deletedProject._id})
      return deletedProject
    },
    deleteTask: async (_, { _id }) => {
      const deletedTask = await Task.findByIdAndDelete(_id);
      if (!deletedTask) throw new Error("Proyecto no existe")
      return deletedTask
    },
    updateProject: async (_, args) => {
      //, {new: true}: si me va a devolver un objeto nuevo, no solo un booleano
      const updatedProject = await Project.findByIdAndUpdate(args._id, args, {new: true});
      if (!updatedProject) throw new Error("Project no existe")
      return updatedProject
    },
    updateTask: async (_, args) => {
      const updatedTask = await Task.findByIdAndUpdate(args._id, args, {new: true});
      if (!updatedTask) throw new Error("Task no existe")
      return updatedTask
    }
  },
  Project: {
    tasks: async(parent) => await Task.find({projectId: parent._id})
  },
  Task: {
    project: async(parent) => await Project.findById(parent.projectId)
  }
};
