import React from "react";
import "./admin.css";
import Navbar2 from "./../components/navbar/navbar2";
import { useState, useEffect } from "react/cjs/react.development";
import { useNavigate } from "react-router-dom";
import CardItem from "../components/cards/cardItem";
import axios from "axios";
import Menu from "../components/menu/menu";
const Admin = () => {
  const navigate = useNavigate();
  const [messageFail, setMessageF] = useState("");
  const [messageSuccess, setMessageS] = useState("");

  const [usuario, setUsuario] = useState({});
  useEffect(() => {
    if (localStorage.token) {
      const token = localStorage.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .get("/profile", config)
        .then((response) => {
          setUsuario(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          navigate("/");
        });
    }
  }, []);

  var [listaItem, setListItem] = useState([]);

  const [skip, setSkip] = useState(0);
  const [takeFilter, setTakeFilter] = useState(22);

  const getList = (skip, take) => {
    if (localStorage.token) {
      const token = localStorage.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(`/products?skip=${skip}&take=${take}`, config)
        .then(function (response) {
          setListItem((prevItens) => [...prevItens, ...response.data]);
          console.log("foi");
          console.log(response.data);
        })
        .catch((erro) => {
          console.log(erro);
          if(erro.response.data.message){
          setMessageF(erro.response.data.message);
          setTimeout(() => setMessageF(""), 5000);
          };
        });
      console.log("get inicial");
    } else {
      console.log("não deu");
      navigate("/");
    }
  };

  const [filter, setFilter] = useState(0);
  var [listFilter, setListFilter] = useState([]);

  const [skipFilter, setSkipFilter] = useState(0);

  const incrementSkip = () => {
    if(filter === 0){
      let soma = skip+takeFilter;
      setSkip(soma);
      console.log(skip);
      console.log("skip");
    } else if(filter === 1){
      let soma = skip+takeFilter;
      setSkipFilter(soma);
      console.log(skipFilter);
      console.log("skipFilter");
    };
    
  };

  if (usuario.admin === "0") {
    usuario.admin = "USUÁRIO";
  } else if (usuario.admin === "1") {
    usuario.admin = "ADMINISTRADOR";
  };

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [produto, setProduto] = useState({});

  const [log, setLog] = useState(0);
  var [listlog, setListLog] = useState([]);

  const changeTake = (e) => {
    const takeValue = e.target.value;
    const numbertake = parseFloat(takeValue);
    setTakeFilter(numbertake);
  };

  useEffect(() => {getList(skip, takeFilter); incrementSkip()}, []);

  return (
    <div className="paginaAdmin">
      <div className="userInf">
        <span>
          <strong> {usuario.name} </strong>
        </span>
        <span>
          <strong> {usuario.admin} </strong>
        </span>
        <span>
          <strong>CADASTRADO EM: </strong>{" "}
          {usuario.createdAt &&
            new Intl.DateTimeFormat("pt-BR").format(
              new Date(usuario.createdAt)
            )}
        </span>
        <span>
          <strong>ÚLTIMA ATUALIZAÇÃO: </strong>{" "}
          {usuario.updatedAt &&
            new Intl.DateTimeFormat("pt-BR").format(
              new Date(usuario.updatedAt)
            )}
        </span>
        <span className="Buttons">
          <button onClick={Logout}>
            <strong>Sair</strong>
          </button>
        </span>
      </div>
      <Navbar2
        user={usuario}
        list={listaItem}
        setListI={setListItem}
        salto={skip}
        setP={setProduto}
        msgSuccess={setMessageS}
        msgFail={setMessageF}
        filter={setFilter}
        setlog={setLog}
      />
      <section>
        <div className="divTake">Limite de registros por busca <input type="number" name="take" defaultValue={takeFilter} onChange={changeTake}/></div>
        <Menu
          filter={setFilter}
          setlog={setLog}
          setlist={setListFilter}
          setlistLog={setListLog}
          msgSuccess={setMessageS}
          msgFail={setMessageF}
          setskip={setSkip}
          skipFilter={skipFilter}
          setSkipFilter={setSkipFilter}
          take={takeFilter}
        />
        <div className="Content">
          {log === 0 ? (
            <>
              <br />
              <br />
              <ul className="ulList">
                <li className="liValores">
                  <div className="cabecalho">
                    <h2 className="product">CÓDIGO</h2>
                    <hr />
                    <h3 className="name">NOME</h3>
                    <hr />
                    <h3 className="griffe">GRIFFE</h3>
                    <hr />
                    <h3 className="categoria">CATEGORIA</h3>
                    <hr />
                    <h3 className="data">ÚLTIMA ATUALIZAÇÃO</h3>
                    <hr />
                  </div>
                </li>
              </ul>
              <br />
              <hr />
              <br />
              <ul className="ulList">
                {filter === 0 && (
                  <>
                  {listaItem.map((item) => (
                    <CardItem
                      valores={item}
                      key={item.id}
                      msgS={setMessageS}
                      msgF={setMessageF}
                    />
                  )) }
                  <span className="Buttons">
                  <button onClick={() => {getList(skip, takeFilter); incrementSkip() }}><strong>Mais</strong></button>
                </span>
                </>
                )
                  }
                {filter === 1 &&
                  listFilter.map((item) => (
                    <CardItem valores={item} key={item.id} />
                  ))}
                {filter === 2 && <CardItem valores={produto} />}
                
              </ul>
            </>
          ) : (
            <>
            <br/><br/>
            <ul className="ulList">
                <li className="liValores">
              <div className="cabecalholog">
                <h2 className="logId">LOG ID</h2>
                <hr />
                <h2 className="name">USUÁRIO</h2>
                <hr />
                <h3 className="categoria">PRODUTO</h3>
                <hr />
                <h3 className="data">CAMPO ALTERADO</h3>
                <hr />
                <h3 className="griffe">VALOR ORIGINAL</h3>
                <hr />
                <h3 className="griffe">NOVO VALOR</h3>
                <hr />
                <h3 className="data">ATUALIZADO EM</h3>
              </div>
              </li>
              </ul>
              <div>
                <ul className="ulList">
                  {listlog.map((Log) => {
                    var valorOriginal = "";
                    var valorNew = "";
                    if (
                      Log.logProductPriceField.id == "2" ||
                      Log.logProductPriceField.id == "4"
                    ) {
                      valorOriginal = Log.originalValue + " %";
                      valorNew = Log.newValue + " %";
                    } else {
                      valorOriginal = new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Log.originalValue);
                      valorNew = new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Log.newValue);
                    }
                    return (
                      <li className="liValores" key={Log.id}>
                        <div className="valoreslog">
                          <p className="logId">{Log.id}</p>
                          <hr />
                          <p className="name">{Log.user.name}</p>
                          <hr />
                          <p className="categoria">{Log.productId}</p>
                          <hr />
                          <p className="data">
                            {Log.logProductPriceField.field}
                          </p>
                          <hr />
                          <p className="griffe">{valorOriginal}</p>
                          <hr />
                          <p className="griffe">{valorNew}</p>
                          <hr />
                          <p className="data">
                            {new Intl.DateTimeFormat("pt-BR").format(
                              new Date(Log.updatedAt)
                            )}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </div>
      </section>
      
      {messageFail && <span className="error">{messageFail}</span>}
      {messageSuccess && <span className="success">{messageSuccess}</span>}
    </div>
  );
};
export default Admin;
