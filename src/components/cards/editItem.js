import { useState } from "react/cjs/react.development";
import Detail from "./cardDetail";
import axios from "axios";

const ContainerItem = (props) => {
  var [Item, setItem] = useState(props.item);
  console.log(Item);

  var priceInit = Item.ProductPrice.price1;
  const discount = Item.ProductPrice.discountPromotion;
  const c = 1 - discount / 100;
  var CalPrice1 = c * priceInit;
  var CalPrice = CalPrice1.toFixed(2);
  
  priceInit = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(priceInit);



  var finalPrice = CalPrice;

  if (Item.ProductPrice.priceLiquid != 0) {
    let plformated = Item.ProductPrice.priceLiquid;
    plformated = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(plformated);
    finalPrice = plformated;
  };
  if (discount == 0) {
    finalPrice = priceInit;
  };
  if (discount != 0 && Item.ProductPrice.priceLiquid == 0){
    finalPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(finalPrice);
  };

  var priceForced = "";
  if(Item.ProductPrice.priceLiquid != 0){
    priceForced = Item.ProductPrice.priceLiquid;
  };

  var disp = "";
  if (Item.available === "1") {
    disp = "SIM";
  } else {
    disp = "NÃO";
  }

  var [edit, setEdit] = useState(false);
  var [detail, setDetail] = useState(true);

  const Alter = () => {
    if (detail) {
      setDetail(false);
    } else {
      setDetail(true);
    }
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  var config = {};
  if (localStorage.token) {
    const token = localStorage.token;
    config = {
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  const excluir = () => {
    axios
      .delete(`/${props.item.id}`, config)
      .then((response) => {
        console.log(response);
        console.log(props.item.id);
        console.log(typeof props.item.id);
        props.fechar();
      })
      .catch((erro) => {
        console.log(erro);
        console.log(props.item.id);
        console.log(typeof props.item.id);
      });
  };

  const handleChange = (evento) => {
    const itemEdit = { ...Item };
    console.log(itemEdit);
    itemEdit[evento.target.name] = evento.target.value;
    setItem(itemEdit);
    console.log(itemEdit);
  };

  const handleChangeTab = (evento) => {
    const itemEdit = { ...Item };
    console.log(itemEdit);
    itemEdit.ProductPrice[evento.target.name] = evento.target.value;
    setItem(itemEdit);
    console.log(itemEdit);
  };
  const handleChangeTabTab = (evento) => {
    const itemEdit = { ...Item };
    itemEdit.ProductPrice.tabPrice[evento.target.name] = evento.target.value;
    setItem(itemEdit);
  };
  const enviar = () => {
    if (edit === true) {
      Item.ProductPrice.discountLimit = parseFloat(
        Item.ProductPrice.discountLimit
      );
      Item.ProductPrice.discountPromotion = parseFloat(
        Item.ProductPrice.discountPromotion
      );
      Item.ProductPrice.price1 = parseFloat(Item.ProductPrice.price1);
      Item.ProductPrice.priceLiquid = parseFloat(Item.ProductPrice.priceLiquid);

      var itemCopia = {...Item };
      delete itemCopia.id;
      delete itemCopia.createdAt;
      delete itemCopia.updatedAt;
      delete itemCopia.ProductPrice.createdAt;
      delete itemCopia.ProductPrice.updatedAt;
      delete itemCopia.ProductPrice.id;
      delete itemCopia.ProductPrice.productProduct;
      delete itemCopia.ProductPrice.tabPrice;

      
      const productPrice = Item.ProductPrice;
      console.log(productPrice);
      
      
      /*delete itemCopia.ProductPrice;*/
      Object.assign(itemCopia, {productPrice});
      
    }

    axios
      .put(`/products/${Item.product}`, itemCopia, config)
      .then((res) => {
        console.log(res);
        console.log(Item);
        console.log(itemCopia);
        props.msgS("Editado com successo");
        setTimeout(() => props.msgS(""), 7000);
        props.fechar();
      })
      .catch((erro) => {
        console.log(erro);
        console.log(Item);
        props.msgF("Falha");
        setTimeout(() => props.msgF(""), 7000);
        props.fechar();
      });
  };

  const cancelar = () => {
    setItem(props.item);
    props.fechar();
  };

  return (
    <div className="containerDetail">
      {detail && <Detail item={Item} final={finalPrice} dis={disp}/>}
      {edit && (
        <>
          <div className="edicao">
            <h1>NOME</h1>
            <input
              className="h1detail"
              value={Item.name}
              name="name"
              onChange={handleChange}
            ></input>
          </div>
          <br />
          <div className="edicao">
            <h1>CÓDIGO</h1>
            <input
              className="pdetail"
              value={Item.product}
              name="product"
              onChange={handleChange}
            ></input>
          </div>
          <br />
          <br />
          <h1>
            PREÇO INICIAL R$ 
            <input
              type={"number"}
              value={Item.ProductPrice.price1}
              name="price1"
              step={0.01}
              onChange={handleChangeTab}
            ></input>
          </h1>
          <h2>
            DESCONTO PROMOÇÃO
            <input
              type={"number"}
              value={Item.ProductPrice.discountPromotion}
              step={1}
              max={Item.ProductPrice.discountLimit}
              name="discountPromotion"
              onChange={handleChangeTab}
            ></input>
            %
          </h2>
          <br />
          <h2 className="precoFinal">
            PREÇO CALCULADO R$ 
            <input
              type={"number"}
              value={CalPrice}
              step={0.01}
              name="priceLiquid"
              readOnly
            ></input>
          </h2>
          <h1>
            FORÇAR PREÇO R$ 
            <input
              type={"number"}
              value={priceForced}
              name="priceLiquid"
              step={0.01}
              onChange={handleChangeTab}
            ></input>
          </h1>
          <br />
          <hr />
          <br />
          <h2>
            COLEÇÃO
            <input
              value={Item.collection}
              name="collection"
              onChange={handleChange}
            ></input>
          </h2>
          <h2>
            DISPONÍVEL
            <select name="available" onChange={handleChange} required>
              <option>{disp}</option>
              <option value="1">Sim</option>
              <option value="0">Nao</option>
            </select>
          </h2>
          <br />
          <h2>
            CATEGORIA
            <select name="category" onChange={handleChange} required>
            <option defaultValue={Item.category}>{Item.category}</option>
            <option value="BLUSA">Blusa</option>
            <option value="CAMISETA">Camiseta</option>
            <option value="CALÇA">Calça</option>
            <option value="BERMUDA">Bermuda</option>
            <option value="ACESSÓRIO">Acessório</option>
            <option value="SAPATO">Sapato</option>
          </select>
          </h2>
          <br />
          <h2>
            TABELA
            <input
              value={Item.ProductPrice.tabPrice?.tabPrice}
              name="tabPrice"
              onChange={handleChangeTabTab}
            ></input>
          </h2>
          <h2>
            CÓDIGO DA TABELA DE PREÇO
            <input
              value={Item.ProductPrice.codTabPriceId}
              name="codTabPriceId"
              onChange={handleChangeTab}
            ></input>
          </h2>
          <h2>
            DESCONTO LIMITE
            <input
              type={"number"}
              value={Item.ProductPrice.discountLimit}
              step={1}
              min="0"
              max="100"
              name="discountLimit"
              onChange={handleChangeTab}
            ></input>
            %
          </h2>
          <br />
          <h2>DESCRIÇÃO:</h2>
          <br />
          <p className="descricao">
            <textarea
              className="inputDescricao"
              rows="3"
              value={Item.description}
              name="description"
              onChange={handleChange}
            ></textarea>
          </p>
          <br />
        </>
      )}
      <div className="Control">
        <span className="Buttons">
          {edit ? (
            <>
              <button onClick={enviar}>
                <strong>Confirmar</strong>{" "}
              </button>
              <button onClick={Alter}>
                <strong>Voltar</strong>
              </button>
            </>
          ) : (
            <>
              <button onClick={Alter}>
                <strong>Editar</strong>
              </button>
            </>
          )}
        </span>
        <span className="Buttons">
          <button onClick={cancelar}>
            <strong>Cancelar</strong>
          </button>
        </span>
      </div>
    </div>
  );
};
export default ContainerItem;
