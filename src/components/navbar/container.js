import { IoCloseSharp } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import "./container.css";
import { useState } from "react/cjs/react.development";
import NovoUsuario from "../cadastro/newUser";
import CardUser from "../cards/user/cardUser";

const Container = (props) => {

  var [create, setCreate] = useState(0);
  const creating = () => {
    if (create === 0) {
      setCreate(1);
    } else if (create === 1) {
      setCreate(0);
    }
  };

  return (
    <div className="Users">
      {create === 1 ? (
        <>
          <NovoUsuario list={props.Listar} close={creating} />
        </>
      ) :
      <div className="containerUsers" name="containerUsers">
        {props.listaDeUsuarios.length < 1 ? (
          <>
            <div id="spinner"></div>
          </>
        ) : (
          <>
          <div className="newUser">
          <div className="addU" onClick={creating}>
            <strong> <IoAddSharp/> Adicionar usuário</strong>
          </div>
          <span className="fecha" onClick={props.fechar}><IoCloseSharp/></span>
        </div>
          {props.listaDeUsuarios.map((user) => (
            <CardUser
              user={user}
              key={user.id}
              list={props.Listar}
              msgSuccess={props.msgSuccess}
              msgFail={props.msgFail}
            />
          ))
          }
          </>
        )}
      </div>
      }
    </div>
  );
};
export default Container;
