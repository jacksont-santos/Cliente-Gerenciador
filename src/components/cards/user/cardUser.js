import { IoSettingsSharp, IoPersonSharp } from "react-icons/io5";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import UpdateUser from "../../cadastro/updateUser";
import { useState } from "react/cjs/react.development";

const CardUser = (props) => {
  var [aberto, setAbrir] = useState(false);
  const abreModal = () => setAbrir(true);
  const fechaModal = () => setAbrir(false);

  var [messageFail, setMessageF] = useState("");
  var [messageSuccess, setMessageS] = useState("");

  return (
    <>
      <div className="cardUser">
        <div className="Iodiv">
          <IoPersonSharp className="IoPersonSharp" />
          {props.user.admin === "1" ? <p>ADMINISTRADOR</p> : <p>USUÁRIO</p>}
        </div>
        <div className="fichaUser">
          <h5>NOME:</h5>
          <input className="iUser" value={props.user.name} readOnly />
        </div>
        <div className="fichaUser">
          <h5>EMAIL:</h5>
          <input className="iUser" value={props.user.email} readOnly />
        </div>
        <div className="fichaUser">
          <h4>
            <p>CRIADO EM:</p>
            <p>{new Intl.DateTimeFormat("pt-BR").format(
              new Date(props.user.createdAt)
            )}</p>
          </h4>
        </div>
        <div className="fichaUser">
          <h4>
            <p>ATUALIZADO EM:</p> <p>{new Intl.DateTimeFormat("pt-BR").format(
              new Date(props.user.updatedAt)
            )}</p>
          </h4>
        </div>
        <IoSettingsSharp className="upSet" onClick={abreModal} />
      </div>
      <Modal open={aberto} onClose={fechaModal} center showCloseIcon={false}>
        <UpdateUser
          Usuario={props.user}
          close={fechaModal}
          list={props.list}
          msgSuccess={props.msgSuccess}
          msgFail={props.msgFail}
        />
      </Modal>
      {messageFail && <span className="error">{messageFail}</span>}
      {messageSuccess && <span className="success">{messageSuccess}</span>}
    </>
  );
};
export default CardUser;
