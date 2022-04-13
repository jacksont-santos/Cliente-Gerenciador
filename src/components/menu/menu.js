import "./menu.css";
import axios from "axios";
import { useState } from "react/cjs/react.development";

const Menu = (props) => {
  var config = {};
  if (localStorage.token) {
    const token = localStorage.token;
    config = {
      headers: { Authorization: `Bearer ${token}` },
    }};
    
  const getAll = () => {
    props.filter(0);
    props.setlog(0);
  };

  const [typeFilter, setTypeFilter] = useState("");
  var available = "";

  const availableYes = (skip, take, filter) => {
    if(filter !== "available" || available !== "1"){
      props.setSkipFilter(0);
      available = "1";
      setTypeFilter("available")};
    props.filter(1);
    axios.get(`/products?skip=${skip}&take=${take}&available=1`, config)
      .then((res) => {
        console.log(res);
        props.setlist(res.data);
        props.setlog(0);
      })
      .catch((erro) => {
        console.log(erro)
      });
      console.log(available);
  };
  const availableNo = (skip, take, filter) => {
    if(filter !== "available" || available !== "0"){
      props.setSkipFilter(0);
      available = "0";
      setTypeFilter("available")};
    props.filter(1);
    axios.get(`/products?skip=${skip}&take=${take}&available=0`, config)
      .then((res) => {
        console.log(res);
        props.setlist(res.data);
        props.setlog(0);
      })
      .catch((erro) => {
        console.log(erro)
      });
      console.log(available);
  };

  var [Coll, setColl] = useState("")
  const pesquisaColl = (e) => {
    const valor = e.target.value
    setColl(valor)
  };
  const SearchColl = (skip, take, filter) => {
    console.log(Coll);
    console.log(typeof Coll);
    if(filter !== "collection"){
      props.setSkipFilter(0);
      setTypeFilter("collection")};
    props.filter(1);
      axios.get(`/products?skip=${skip}&take=${take}&collection=${Coll}`, config)
      .then((res) => {
        console.log(res);
        props.setlist(res.data);
        props.setlog(0);
      })
      .catch((erro) => {
        console.log(erro)
      })
  };

  const getCategory = (category, skip, take, filter) => {
    if(filter !== "category"){
      props.setSkipFilter(0);
      setTypeFilter("category")};
    props.filter(1);
    axios
      .get(`/products?skip=${skip}&take=${take}&category=${category}`, config)
      .then((res) => {
        console.log(skip);
        props.setlist(res.data);
        props.setlog(0);
      })
      .catch((erro) => {
        console.log(erro);
        if(erro.response.data.message){
          console.log(erro.response.data.message);
        };
        props.msgFail("Não foi possível completar a requisição");
        setTimeout(() => props.msgFail(""), 5000);
      });
  };
    
  const logHandleSubmit = (e) => {
    e.preventDefault();
    const gteS = e.target.gte.value;
    const lteS = e.target.lte.value;
    const gte = new Date(gteS).toISOString();
    const lte = new Date(lteS).toISOString();
    const date = {gte,lte};

    const alterFieldIdS = e.target.alterField.value;
    const productId = e.target.productId.value;
    const userIdS = e.target.user.value;
    const alterFieldId = parseFloat(alterFieldIdS);
    const userId = parseFloat(userIdS);

    console.log(typeof date.gte);
    console.log(date.gte);
    console.log(typeof date.lte);
    console.log(date.lte);
    console.log(typeof alterFieldId);
    console.log(alterFieldId);
    console.log(typeof productId);
    console.log(productId);
    console.log(typeof userId);
    console.log(userId);
    console.log(date);

    const params = new URLSearchParams([]);
    if (alterFieldId) params.append('alterFieldId', alterFieldId);
    if (productId) params.append('productId', productId);
    if (userId) params.append('userId', userId);

    axios.post("/logs/products", date, { params, headers: config.headers })
      .then((res) => {
        console.log(res);
        props.setlistLog(res.data);
      })
      .catch((erro) => console.log(erro))

    props.setlog(1);
  };

  return (
    <>
    <div className="Menu">
      <br />
      <br />
      <p className="categorias" onClick={getAll}>
        Todos
      </p>
      <br />
      <br /><hr/>
      <br />
      <h2 className="secao"><strong>CATEGORIAS</strong></h2>
      <br />
      <br/>
      <p className="categorias" onClick={() => getCategory("blusa", props.skipFilter, props.take, typeFilter)}>
        Blusas
      </p>
      <p className="categorias" onClick={() => getCategory("camiseta", props.skipFilter, props.take, typeFilter)}>
        Camisetas
      </p>
      <p className="categorias" onClick={() => getCategory("calça", props.skipFilter, props.take, typeFilter)}>
        Calças
      </p>
      <p className="categorias" onClick={() => getCategory("bermuda", props.skipFilter, props.take, typeFilter)}>
        Bermudas
      </p>
      <p className="categorias" onClick={() => getCategory("acessorio", props.skipFilter, props.take, typeFilter)}>
        Acessórios
      </p>
      <p className="categorias" onClick={() => getCategory("sapato", props.skipFilter, props.take, typeFilter)}>
        Sapatos
      </p>
      <br />
      <br />
      <hr />
      <br />
      <h2 className="secao"><strong>DISPONÍVEL</strong></h2>
      <br />
      <br/>
      <div>
      <p className="categorias" onClick={() => availableYes(props.skipFilter, props.take, typeFilter)}>
        Sim
      </p>
      <p className="categorias" onClick={() => availableNo(props.skipFilter, props.take, typeFilter)}>
        Não
      </p>
      </div>
      <br />
      <br />
      <hr />
      <br />
      <h2 className="secao"><strong>COLEÇÃO</strong></h2>
      <br />
      <br/>
      <input name="pesquisaColl" onChange={pesquisaColl}/>
      <button onClick={() => SearchColl(props.skipFilter, props.take, typeFilter)}>Pesquisar</button>
      <br />
      <br />
      <hr />
      <br />
      <h2 className="secao"><strong>LOGS</strong></h2>
      <br />
      <br/>
      <form onSubmit={logHandleSubmit}>
      <p className="categorias">
        *Data de inicio
      </p>
      <input type="date" name="gte" required/>
      <p className="categorias">
        *Até
      </p>
      <input type="date" name="lte" required/>
      <p className="categorias">
        Campo Alterado
      </p>
      <select type="number" name="alterField">
        <option defaultValue={""}></option>
        <option value="1">Preço1</option>
        <option value="2">Desconto Promoção</option>
        <option value="3">Preço Liquido</option>
        <option value="4">Desconto Limite</option>
      </select>
      <p className="categorias">
        Código do Produto
      </p>
      <input name="productId"/>
      <p className="categorias">
        ID do Usuário
      </p>
      <input type="number" name="user"/>
      <br />
      <span className="Buttons">
        <button type="submit"><strong>Buscar</strong></button>
      </span>
      
      <br />
      <br />
      </form>
    </div>
    </>
  );
};
export default Menu;
