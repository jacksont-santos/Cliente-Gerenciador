import "./cardDetail.css";


const Detail = (props) => {
    console.log(props.item);
    console.log(props.final);

    return (
        <>
            <h1 className="h1detail">{props.item.name}</h1><br/>
            <p className="pdetail">{props.item.product}</p>
            <br/><br/>
            <h1> PREÇO INICIAL {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(props.item.ProductPrice.price1)}</h1>
            <h2>DESCONTO PROMOÇÃO {props.item.ProductPrice.discountPromotion}%</h2><br/>
            <h2 className="precoFinal">PREÇO FINAL {props.final}</h2><br/><hr/><br/>
            <h2>COLEÇÃO {props.item.collection}</h2>
            <h2>DISPONÍVEL {props.dis}</h2><br/>
            <h2>CATEGORIA {props.item.category}</h2><br/>
            <h2>TABELA {props.item.ProductPrice.tabPrice?.tabPrice}</h2>
            <h2>CÓDIGO DA TABELA DE PREÇO {props.item.ProductPrice.codTabPriceId}</h2>
            <h2>DESCONTO LIMITE {props.item.ProductPrice.discountLimit} %</h2><br/>
            <h2>DESCRIÇÃO:</h2><br/>
            <p className="descricao">{props.item.description}</p><br/>
        </>
        
    )
};
export default Detail;