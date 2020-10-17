import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css';

function TeacherItem(){
    return(
        
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
        
    )

}

export default TeacherItem;

