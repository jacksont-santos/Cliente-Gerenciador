import "./newItem.css";
import axios from "axios";
import { useState } from "react/cjs/react.development";
import { IoCloseSharp } from "react-icons/io5";

const RegisterItem = (props) => {
  var [messageSuccess, setMessageS] = useState("");
  var [messageFail, setMessageF] = useState("");

  const esvaziar = () => {
    let name = document.getElementById("name");
    let codigo = document.getElementById("codigo");
    let descricao = document.getElementById("descricao");
    let categoria = document.getElementById("categoria");
    let colecao = document.getElementById("colecao");
    let griffe = document.getElementById("griffe");
    let preco = document.getElementById("preco");
    let desconto = document.getElementById("desconto");
    name.value = "";
    codigo.value = "";
    descricao.value = "";
    categoria.value = "";
    colecao.value = "";
    griffe.value = "";
    preco.value = "";
    desconto.value = "";
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    const product = evento.target.codigo.value;
    const name = evento.target.name.value;
    const category = evento.target.categoria.value;
    const collection = evento.target.colecao.value;
    const grife = evento.target.griffe.value;
    const description = evento.target.descricao.value;
    const price = evento.target.preco.value;
    const available = evento.target.disponivel.value;
    const codTabPriceId = evento.target.codTabPreco.value;
    const discountLimit1 = evento.target.descontoLimite.value;
    const discountPromotion1 = evento.target.descontoPromocao.value;
    const priceLiquid1 = evento.target.precoFinal.value;
    const price1 = parseFloat(price);
    const discountLimit = parseFloat(discountLimit1);
    const discountPromotion = parseFloat(discountPromotion1);
    const priceLiquid = parseFloat(priceLiquid1);

    const novoItem = {
      product,
      name,
      category,
      collection,
      grife,
      description,
      available,
      productPrice: {
        codTabPriceId,
        price1,
        discountLimit,
        discountPromotion,
        priceLiquid,
      },
    };
    console.log(typeof novoItem.productPrice.price1);
    console.log(novoItem.productPrice.price1);
    console.log(typeof novoItem.productPrice.discountLimit);
    console.log(novoItem.productPrice.discountLimit);

    var config = {};
    if (localStorage.token) {
      const token = localStorage.token;
      config = {
        headers: { Authorization: `Bearer ${token}` },
      };
    }

    await axios
      .post("/products", novoItem, config)
      .then(function (response) {
        setMessageS(" Novo item registrado");
        setTimeout(() => setMessageS(""), 9000);
      })
      .catch(function (error) {
        console.log(error);

        setMessageF(error.response.data.message);
        setTimeout(() => setMessageF(""), 9000);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="formRegister">
        <div className="tittle">
          <h4>NOVO PRODUTO</h4>
          <IoCloseSharp className="fecha" onClick={props.fechar} />
        </div>
        <div className="cardRegister">
          <div className="divTabs">
            <h2>CÓDIGO</h2>
            <input type="text" name="codigo" id="codigo" required />
            <h2>NOME</h2>
            <input type="text" name="name" id="name" required />
            <h2>CATEGORIA</h2>
            <select name="categoria" id="categoria" required>
              <option defaultValue={""}></option>
              <option value="blusa">Blusa</option>
              <option value="camiseta">Camiseta</option>
              <option value="calça">Calça</option>
              <option value="bermuda">Bermuda</option>
              <option value="acessorio">Acessório</option>
              <option value="sapato">Sapato</option>
            </select>
            <h2>COLEÇÃO</h2>
            <input type="text" name="colecao" id="colecao" required />
            <h2>GRIFFE</h2>
            <select name="griffe" id="griffe" required>
              <option defaultValue={""}></option>
              <option value="JohnJohn">WonWon</option>
              <option value="Individual">Person</option>
              <option value="Dudalina">Dadoseis</option>
              <option value="Le Lis Blanc">Le Lis Mont</option>
              <option value="Bo.Bô">NoNô</option>
              <option value="Rosa Chá">Café Negro</option>
            </select>
            <h2>DISPONÍVEL</h2>
            <select name="disponivel" id="disponivel" required>
              <option defaultValue={""}></option>
              <option value="1">Sim</option>
              <option value="0">Nao</option>
            </select>
            <h2>DESCRIÇÃO</h2>
            <textarea
              rows="4"
              name="descricao"
              id="descricao"
              className="desc"
              required
            />
          </div>
          <br />
          <br />
          <br />
          <div className="divTabs">
            <h2>CÓDIGO DA TABELA</h2>
            <input type="text" name="codTabPreco" id="codTabPreco" required />

            <h2>PREÇO</h2>
            <input
              type="number"
              name="preco"
              id="preco"
              step={0.01}
              min="0"
              required
            />

            <h2>DESCONTO LIMITE %</h2>
            <input
              type="number"
              name="descontoLimite"
              id="descontoLimite"
              placeholder="Percentual de desconto"
              step={1}
              min="0"
              max="100"
              required
            />

            <h2>DESCONTO PROMOÇÃO %</h2>
            <input
              type="number"
              name="descontoPromocao"
              id="descontoPromocao"
              placeholder="Percentual de desconto"
              step={1}
              min="0"
              max="100"
              required
            />

            <h2>PREÇO FINAL</h2>
            <input
              type="number"
              name="precoFinal"
              id="precoFinal"
              step={0.01}
              min="0"
              required
            />

            <div className="justifyB">
              <button
                type="button"
                className="buttonNew"
                onClick={props.fechar}
              >
                <strong>Cancelar</strong>
              </button>
              <button type="button" className="buttonNew" onClick={esvaziar}>
                <strong>Apagar tudo</strong>
              </button>
              <div>
                <button type="submit" className="buttonNew">
                  <strong>Registrar</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {messageSuccess && <span className="success">{messageSuccess}</span>}
      {messageFail && <span className="error">{messageFail}</span>}
    </>
  );
};
export default RegisterItem;
