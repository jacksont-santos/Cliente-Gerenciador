import "./carditem.css";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useState } from "react/cjs/react.development";
import ContainerItem from "./editItem";

const CardItem = (props) => {
  const [aberto, setAbrir] = useState(false);
  const abreModal = () => setAbrir(true);
  const fechaModal = () => setAbrir(false);
  const prod = props.valores.ProductPrice.price1;
  return (
    <li className="liValores">
      <div key={props.valores.id} className="valores">
        <h2 className="product">{props.valores.product}</h2>
        <hr />
        <p className="name">{props.valores.name}</p>
        <hr />
        <p className="griffe">{props.valores.grife}</p>
        <hr />
        <p className="categoria">{props.valores.category}</p>
        <hr />
        <p className="data">{new Intl.DateTimeFormat('pt-BR').format(new Date(props.valores.updatedAt))}</p>
        <hr />
      </div>
      <p className="detalhes" onClick={abreModal}>
          <strong>DETALHES</strong>
        </p>
      <Modal open={aberto} onClose={fechaModal} center showCloseIcon={false}>
        <ContainerItem fechar={fechaModal} item={props.valores} msgS={props.msgS} msgF={props.msgF}/>
      </Modal>
    </li>
  );
};
export default CardItem;
