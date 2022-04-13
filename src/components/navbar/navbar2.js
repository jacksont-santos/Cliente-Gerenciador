import { FaSearch } from "react-icons/fa";
import {
  IoPeopleSharp,
  IoClipboard,
  IoAddCircle,
} from "react-icons/io5";
import { useState } from "react/cjs/react.development";
import "./navbar2.css";
import Container from "./container";
import RegisterItem from "../cadastro/newItem";
import ImportItems from "../cadastro/importItems";
import Logo3 from "./icones/SUA-MARCA1.png";
import NovoUsuario from "../cadastro/newUser";
import axios from "axios";

const Navbar2 = (props) => {

  const [container, setContainer] = useState(0);
  const [novoUsuario, setNewUser] = useState(0);
  const [lista, setLista] = useState([]);

  const listar = () => {

    console.log("listar executado");

    if(lista.length === 0 && localStorage.token){

      console.log("if executado");
        
      const token = localStorage.token;
        const config = {
        headers: { Authorization: `Bearer ${token}` },
        };

      axios
        .get("/users", config)
        .then((response) => {
          var listU = [];
          var del = response.data;
          del.map((u) => {
            if (u.deleted === false) {
              listU.push(u);
            }
          });
          setLista(listU);
          console.log(listU);
        })
        .catch((erro) => console.log(erro));

    };
  };

  const noContainer = () => {

    setItemNew(0);
    console.log(lista.length);

    if (props.user.admin === "ADMINISTRADOR") {
      
      if (container === 0) {
        setContainer(1);
      } else if (container === 1) {
        setContainer(0);
      };

    }
  };

  var [itemNew, setItemNew] = useState(0);
  const NewItem = () => {

    setContainer(0);

    if (itemNew === 0) {
      setItemNew(1);
    } else if (itemNew === 1) {
      setItemNew(0);
    }
  };

  var [updateItem, setupdateItem] = useState(0);
  const UpdateItem = () => {
    if (updateItem === 0) {
      setupdateItem(1);
    } else if (updateItem === 1) {
      setupdateItem(0);
    }
  };

  var [pesquisa, setPesquisa] = useState("");
  const pesquisando = (e) => {
    const valor = e.target.value;
    console.log(valor)
    setPesquisa(valor);
  };
  const Search = () => {
    if (localStorage.token) {
      const token = localStorage.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(`/products/${pesquisa}`, config)
        .then((res) => {
          props.setP(res.data);
          props.filter(2);
          props.setlog(0);
        })
        .catch((erro) => {
          console.log(erro);
          props.msgFail(erro.response.data.message);
          setTimeout(() => props.msgFail(""), 5000);
        });
    }
  };

  return (
    <div className="corpo">
      <nav className="nav2">
        <div className="menuDiv">
          <img src={Logo3} alt="Logo1" className="imgLogo" />
        </div>
        <ul className="navUl">
          <li className="navSearch">
            <input
              className="pesquisa"
              name="pesquisa"
              placeholder="buscar por código"
              onChange={pesquisando}
            />
            <FaSearch className="searchIcon" onClick={Search} />
          </li>
          <li className="liMenu">
            <IoAddCircle  className="icon" onClick={NewItem} />
            <span id="mostrar">Novo</span>
          </li>
          <li className="liMenu">
            <IoClipboard  className="icon" onClick={UpdateItem} />
            <span id="mostrar">Importar arquivo</span>
          </li>
          <li className="liMenu">
              <IoPeopleSharp  className="icon" onClick={() => {
                noContainer();
                listar();
                }}/>
              <span id="mostrar">Usuários</span>
          </li>
        </ul>
      </nav>
      <div className="divInt">
        {novoUsuario === 1 && <div className="noUser"> <NovoUsuario fechar={noContainer} /> </div>}
        {container === 1 && (
          <Container
            fechar={noContainer}
            msgSuccess={props.msgSuccess}
            msgFail={props.msgFail}
            listaDeUsuarios={lista}
            Listar={listar}
          />
        )}
        {itemNew === 1 && <RegisterItem fechar={NewItem} />}
        {updateItem === 1 && <ImportItems fechar={UpdateItem} />}
      </div>
    </div>
  );
};
export default Navbar2;
