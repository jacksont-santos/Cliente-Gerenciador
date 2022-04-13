import axios from "axios";
import { useState } from "react/cjs/react.development";

const ImportItems = (props) => {
  const [file, setFile] = useState("");
  var [messageSuccess, setMessageS] = useState("");
  var [messageFail, setMessageF] = useState("");

  const uploadFile = async (evento) => {
    evento.preventDefault();
    let formF = new FormData();
    formF.append("file", file);

    var token;
    if (localStorage.token) {
    token = localStorage.token};

    axios
      .post("/products/import", formF, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      })
      .then(function (response) {
        setMessageS("arquivo enviado");
        setTimeout(() => setMessageS(""), 7000);
        console.log(response);
        console.log(token);
      })
      .catch((response) => {
        setMessageF("Não foi possível completar o envio");
        setTimeout(() => setMessageF(""), 7000);
        console.log(response);
        console.log(token);
      });
  };

  return (
    <>
      <form className="updateCard" onSubmit={uploadFile}>
        <input
          type="file"
          name="fileExcel"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <span>
        <button type="submit">
          Enviar
        </button>
        </span>
        
      </form>
      {messageSuccess && <span>{messageSuccess}</span>}
      {messageFail && <span>{messageFail}</span>}
    </>
  );
};
export default ImportItems;
