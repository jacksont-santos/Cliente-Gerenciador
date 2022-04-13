import { IoPersonSharp } from "react-icons/io5";
import axios from "axios";
import "./new.css";

const UpdateUser = (props) => {
  var user1 = props.Usuario;
  console.log(user1);
  var config = {};
  if (localStorage.token) {
    const token = localStorage.token;
    config = {
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  const Deletar = () => {
    axios
      .delete(`/users/${user1.id}`, config)
      .then(() => {
        props.msgSuccess("Usuário excluído");
        setTimeout(() => props.msgSuccess(""), 10000);
        props.list();
        props.close();
      })
      .catch(() => {
        props.msgFail("Falha");
        setTimeout(() => props.msgFail(""), 10000);
      });
  };

  const handleChange = (evento) => {
    user1[evento.target.name] = evento.target.value;
  };

  const atualizar = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    var senha = e.target.password.value;
    var password = "";
    if (senha === "") {
      password = user1.password;
    } else {
      password = senha;
    }
    const admin = e.target.role.value;

    const updateUser = {
      name,
      email,
      password,
      admin,
    };
    if (password === undefined) {
      delete updateUser.password;
    }

    axios
      .patch(`/users/${user1.id}`, updateUser, config)
      .then(function (response) {
        console.log(response);
        console.log(updateUser);
        props.msgSuccess(" Usuário atualizado");
        setTimeout(() => props.msgSuccess(""), 10000);
        props.list();
        props.close();
      })
      .catch(function (error) {
        console.log(error);
        console.log(updateUser);
        props.msgFail(error.response.data.message);
        setTimeout(() => props.msgFail(""), 10000);
      });
  };

  const showPass = () => {
    const pass = document.getElementById("password");
    if (pass.type == "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  };
  var adMin = "";
  if (user1.admin === "0") {
    adMin = "USUÁRIO";
  }
  if (user1.admin === "1") {
    adMin = "ADMINISTRADOR";
  }

  return (
    <>
      <form className="userFormUpdate" onSubmit={atualizar}>
        <div className="card-loginUp">
          <h2 className="Iodiv">ATUALIZAÇÃO DO USUÁRIO</h2>
          <div className="cardSide">
            <div className="label-float">
              <label><strong>NOME:</strong></label>
              <input
                className="iUser"
                name="name"
                defaultValue={user1.name}
                onChange={handleChange}
              />
            </div>
            <div className="label-float">
              <label><strong>EMAIL:</strong></label>{" "}
              <input
                className="iUser"
                name="email"
                defaultValue={user1.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="cardSide">
            <div className="label-float-Pass">
              <div>
                <label><strong>NOVA SENHA:</strong></label>
                <input
                  className="iUser"
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <div className="showPass">
                <p>Mostrar senha</p>
                <div>
                  <input type="checkbox" onClick={showPass} />
                </div>
              </div>
            </div>
            <div className="label-float">
              <label><strong>FUNÇÃO:</strong></label>
              <select name="role" onChange={handleChange}>
                <option value={user1.admin}>{adMin}</option>
                <option value={"1"}>Administrador</option>
                <option value={"0"}>Usuário</option>
              </select>
            </div>
          </div>
          <div className="dataUp">
            <label>
              <p>
                Criado em: {" "}
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(user1.createdAt)
                )}
              </p>
            </label>
            <label>
              <p>
                Atualizado em: {" "}
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(user1.updatedAt)
                )}
              </p>
            </label>
          </div>
          <div className="setupdate">
          <p onClick={props.close}>Cancelar</p>
          <div>
            <p onClick={Deletar}>Deletar</p>
          </div>
          <div>
            <span className="Buttons">
            <button type="submit">
                Confirmar
              </button>
            </span>
          </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default UpdateUser;
