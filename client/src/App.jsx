//rfce
//ApolloClient: se conecta a la bd
//ApolloProvider: trabaja con los contextos, como el hook useContext de react
//ApolloProvider: todo lo que este aca adentro podra utilizar graphql
//InMemoryCache: en un cambio de pagina, el no va a solicitar los datos
//InMemoryCache: porque los tiene en memoria
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
//react-router-dom: para crear multiples paginas
//BrowserRouter: provider, todas las paginas acceden a graphql
//Routes: las paginas
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Projects } from "./pages/Projects";
import { ProjectDetails } from "./pages/ProjectDetails";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  //se guarda en cache lo consultado
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/projects"/>}/>
          <Route path="/projects" element={<Projects />}/>
          <Route path="/projects/:id" element={<ProjectDetails />}/>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
} 

export default App;
