import Navbar1 from "../components/navbar/navbar1";
import "./aboutUS.css";
import BlueMarch from "../img/BlueMarch.png";
import Danusa from "../img/Danusa.jpg";
import GCorrea from "../img/GCorrea.jpeg";
import Glauco from "../img/Glauco.jpg";
import Jackson from "../img/Jackson.jpg";
import Miller from "../img/Miller.png";
import Fernando from "../img/Fernando.jpg"

const Sobre = () => {

    return (
        <>
        <section id="sobre">
        <Navbar1/>
        {/* <h1>Sobre nós</h1> */}
        <div class="bluemarch">Sobre a<img src={BlueMarch} alt="Sobre a equipe"/></div>
        <div class="container">
  <div class="card">
    <img src={Glauco} alt="Person" class="card__image"/>
    <p class="card__name">Glauco Vinicius</p>
   
    <ul class="social-icons">
      <li><a href="https://www.linkedin.com/in/glauco-vini/" target="__blank"><i class="fa fa-linkedin"></i></a></li>
      <li><a href="https://github.com/glaucovin" target="__blank"><i class="fa fa-github"></i></a></li>
    </ul>
    <div class="description">
    <p> 
    "Meus planos e objetivos são do tamanho do planeta! Sou um Desenvolvedor Front-End Júnior, com experiência em gestão de equipes e conteúdo audiovisual. Estou sempre buscando desafios e oportunidades para conectar pessoas!"
    </p>
  </div>
  </div>
  <div class="card">
    <img src={Jackson} alt="Person" class="card__image"/>
    <p class="card__name">Jackson Tavares</p>
   
    <ul class="social-icons">
      <li><a href="https://www.linkedin.com/in/jackson-tavares-santos/" target="__blank"><i class="fa fa-linkedin"></i></a></li>
      <li><a href="https://github.com/jacksont-santos" target="__blank"><i class="fa fa-github"></i></a></li>
    </ul>
    <div class="description">
    <p> 
    "Olá, Meu nome é Jackson Tavares! Sou desenvolvedor Web  full-stack júnior."
    </p>
  </div>
  </div>
  <div class="card">
    <img src={GCorrea} alt="Person" class="card__image"/>
    <p class="card__name">Guilherme Corrêa</p>
   
    <ul class="social-icons">
      <li><a href="https://www.linkedin.com/in/guilherme-correa-s/" target="__blank"><i class="fa fa-linkedin"></i></a></li>
      <li><a href="https://github.com/guilherme-correa-s" target="__blank"><i class="fa fa-github"></i></a></li>
    </ul>
    <div class="description">
    <p> 
    "Me chamo Guilherme Corrêa, amo desafios e resolver problemas. Atualmente cursando Blue edtech,  Rocketseat e balta.io."
    </p>
  </div>
  </div>
  <div class="card">
    <img src={Danusa} alt="Person" class="card__image"/>
    <p class="card__name">Danusa Jesus</p>
   
    <ul class="social-icons">
      <li><a href="https://www.linkedin.com/in/danusajesus/" target="__blank"><i class="fa fa-linkedin"></i></a></li>
      <li><a href="https://github.com/DanSiljer" target="__blank"><i class="fa fa-github"></i></a></li>
    </ul>
    <div class="description">
    <p> 
    "Olá sou Danusa! Constante aprendiz, fascinada em contribuir para o desenvolvimento industrial e de pessoas.  Trabalho na Volkswagen pela  T-Systems como Suporte Técnico I  e estou cursando o bootcamp da Blue como Full Stack."
    </p>
  </div>
  </div>
  <div class="card">
    <img src={Miller} alt="Person" class="card__image"/>
    <p class="card__name">Miller Oliveira</p>
   
    <ul class="social-icons">
      <li><a href="https://www.linkedin.com/in/miller-oliveira-santos-15483347/" target="__blank"><i class="fa fa-linkedin"></i></a></li>
      <li><a href="https://github.com/Miller-Oliveira" target="__blank"><i class="fa fa-github"></i></a></li>
    </ul>
    <div class="description">
    <p> 
    "Atualmente trabalho como analista de suporte, cursando o bootcamp da Blue como BackEnd, cursando Analise e desenvolvimento de sistemas, meus interesses são business intelligence, Back end, SQL Server."
    </p>
  </div>
  </div>
  <div class="card">
    <img src={Fernando} alt="Person" class="card__image"/>
    <p class="card__name">Marcos Fernando</p>
   
    <ul class="social-icons">
      <li><a href="https://linkedin.com/in/marcos-fernando-470ab5216/" target="__blank"><i class="fa fa-linkedin"></i></a></li>
      <li><a href="https://github.com/Mpompeu41" target="__blank"><i class="fa fa-github"></i></a></li>
    </ul>
    <div class="description">
    <p> 
    "Marcos, 42 anos, tenho Graduação em Administração e Gastronomia, mais amante de tecnologia, no momento cursando a graduação de Analise e Desenvolvimento de Sistema e o curso Full Stack na BlueedTech."
    </p>
  </div>
  </div>

  
</div>
</section>
        </>
    )
}
export default Sobre;