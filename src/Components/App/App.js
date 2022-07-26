import './App.css';
import { NColaborador } from '../Colaboradores/NColaborador';
import { Route, BrowserRouter, Routes} from "react-router-dom";
import  { ListarCfPorColab }  from "../Home/ListarCfPorColab";
import { CadastrarCfManha } from "../CfManha/CadastrarCfManha";

/*
  Poderia usar ContextApi crinado nele dois objetos para armazenar as movimentações e os correntistas
  Sempre que houver uma aletração nas movientações ou nos correntistas, eu chamaria a função de GET do obj que sofreu alteração, a qual retornaria
  aquele objeto já alterado
*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element = { <ListarCfPorColab/> }  exact />
          <Route path="/novo_colaborador" element = { <NColaborador/> }  />
          <Route path="/nova_refeicao" element = { <CadastrarCfManha/> }  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


