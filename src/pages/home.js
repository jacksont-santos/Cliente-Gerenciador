import Login from "./../components/login/form";
import Navbar1 from "../components/navbar/navbar1";
import "./home.css";

const Home = () => {
  if (localStorage.token) {
    localStorage.removeItem("token");
  };

  return (
    <>
      <section id="home">
        <Navbar1 />
        <div id="carousel">
          <div className="carouselCard">
            <div className="carouselContent">
              <h2>SISTEMA DE E-COMMERCE PARA REDE DE LOJAS DE MODA</h2>
              <br/><br/>
              <h2><div></div>Criar, modificar e deletar registros dos produtos.</h2>
              <h2><div></div>Atualização em massa de registros.</h2>
              <h2><div></div>Permissões de usuário.</h2>
              <h2><div></div>Sistema de log.</h2>
            </div>
          </div>
          <div className="login">
            <Login/>
            <p id="exemplo"><strong>( EMAIL: admin123@admin.com / SENHA: Admin123456 )</strong></p>
          </div>
          
        </div>
      </section>
      
    </>
  );
};
export default Home;
