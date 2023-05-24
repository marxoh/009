//definir la conexion y los datos de la bd
import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

//hay un concepto nuevo de que ya no es necesario hacer toda la conexion
//si se tiene la version superior a la 16
//top level await, aqui no se realizara porque no es muy robusto aun

export const connectDB = async () => {
  try {
    //hardcodeando: poner la url de conexion directamente aquí
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`Mongodb connected: ${conn.connection.name}`);
  } catch (err) {
    console.error(`> Error de conexión: ${err.message}`);
    //salir del proceso con: 1 = un error
    //ya que no es necesario continuar si ocurrio un error de conexion a la bd
    process.exit(1);
  }
};
