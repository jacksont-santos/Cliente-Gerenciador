import "./form.css";
import Logo2 from "./SUA_MARCA-WHITE1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react/cjs/react.development";

const Login = (props) => {

    const navigate = useNavigate();
    var [message, setMessageF] = useState("");
    setTimeout(() => setMessageF(""), 5000);

    var [spin, setSpin] = useState(0)

    const Logando = async (event) => {
        event.preventDefault();
        setSpin(1);
        const email = event.target.email.value;
        const password = event.target.password.value;
        const loginInf = {
          email,
          password
        };

        await axios.post('/auth/login', loginInf)
        .then( function (response) {
            const tokenValue = response.data.token;
            localStorage.setItem('token', tokenValue);
            setSpin(0);
            navigate(`/Admin`);
        })
        .catch(function (error) {
            setMessageF("Não autorizado");
            console.log(error);
            setSpin(0);
        });

      };
      
      const showPass = () => {
          const pass = document.getElementById("senha");
          if(pass.type=="password"){
              pass.type = "text";
          } else { pass.type = "password"}
      };

    return (
        <form onSubmit={Logando} className="modalForm">
            <div className="card-login">
                <div className="logo">
                <img src={Logo2} alt="logo"/>
                </div>

                <div className="label-floatF">
                    <input type="text" name="email" id="usuario" placeholder="" required/>
                    <label htmlFor="usuario"><strong>Email</strong></label>
                </div>
                <div className="label-floatF">
                    <input type="password" name="password" id="senha" placeholder="" required/>
                    <label htmlFor="senha"><strong>Senha</strong></label>

                        <div className="showPass">
                            <p><strong>Mostrar senha</strong></p>
                            <div><input type="checkbox" onClick={showPass}/></div>
                        </div>
                </div>

                <br></br>
                <div className="Buttons">
                    {spin === 1 ?
                        <>
                            <div id="spinner"></div> <p><strong>Entrando</strong></p>
                        </>
                        :
                        <button type="submit">
                            <strong>Entrar</strong>
                        </button>
                    }
                    
                </div>
                {message && <span className="unauthorized"><strong>{message}</strong></span>}
            </div>
        </form>
    )
};
export default Login;