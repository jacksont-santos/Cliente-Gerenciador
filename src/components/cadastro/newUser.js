import axios from "axios";
import { useState } from "react/cjs/react.development";
import "./new.css";

const NovoUsuario = (props) => {
  var [messageFail, setMessageF] = useState("");
  var [messageSuccess, setMessageS] = useState("");

  const criar = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const newUser = {
      name,
      email,
      password,
    };
    console.log(newUser);
    var config = {};
    if (localStorage.token) {
      const token = localStorage.token;
      config = {
        headers: { Authorization: `Bearer ${token}` },
      };
    }

    axios
      .post("/users/register", newUser, config)
      .then(function (response) {
        console.log(response);
        setMessageS(" Novo item registrado");
        setTimeout(() => setMessageS(""), 7000);
        props.list();
        props.close();
      })
      .catch(function (error) {
        console.log(error);
        setMessageF(error.response.data.message);
        setTimeout(() => setMessageF(""), 7000);
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

  return (
    <>
      <form className="formNewUser" onSubmit={criar}>
        <div>
          <div className="label-floatF">
            <input type="text" name="name" required/>
            <label htmlFor="name">Nome:</label>
          </div>
          <div className="label-floatF">
            <input type="text" name="email" required/>
            <label htmlFor="email">Email:</label>
          </div>
          <div className="label-floatF">
            <input
              type="password"
              name="password"
              id="password"
              required
            />
            <label htmlFor="password">Senha:</label>
            <div className="showPass">
              <p>Mostrar senha</p>
              <div>
                <input type="checkbox" onClick={showPass} />
              </div>
            </div>
          </div>
          <span className="Buttons">
            <button type="submit">Registrar</button>
          </span>
          <br/>
          <span className="Buttons">
        <button onClick={props.close}>Cancelar</button>
      </span>
        </div>
      </form>
      
      
      {messageFail && <span className="error">{messageFail}</span>}
      {messageSuccess && <span className="success">{messageSuccess}</span>}
    </>
  );
};
export default NovoUsuario;
