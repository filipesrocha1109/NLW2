import React from 'react' ;

import PageHeader from '../../components/PageHeader/insdex';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css';


function TeacherList(){
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
          <form id="search-teachers">

            <div className="input-block">
              <label htmlFor="subject">Matéria</label>
              <input type="text" id="subject"/>
            </div>

            <div className="input-block">
              <label htmlFor="week_day">Dia da semana</label>
              <input type="text" id="week_day"/>
            </div>

            <div className="input-block">
              <label htmlFor="time">Hora</label>
              <input type="text" id="time"/>
            </div>
          </form>
      </PageHeader>

      <main>
        <article className="teacher-item">
          <header>
            <img src="https://avatars2.githubusercontent.com/u/38359945?s=460&u=aaf705f5da7e9f70f6ff16ae429efe34c5f19fa4&v=4" alt=""/>
            <div>
              <strong>Filipe Rocha</strong>
              <span>Desenv. Web</span>
            </div>
          </header>

          <p>
            Entusiasta das melhores tecnologias web avançadas.
            <br/>
             <br/>
            Apaixonado por criar coisas e mudar vidas através de cursos onlines. Mais de 2000.000 já passaram por uma das minhas aulas. 
          </p>

          <footer>
            <p>
              Preço/hora 
              <strong> R$ 80,00</strong>
            </p>
            <button type="button">
              <img src={whatsappIcon} alt="Whatsapp"/>
              Entrar em contato.
            </button>
          </footer>
        </article>
      </main>
    </div>
  )
}

export default TeacherList;