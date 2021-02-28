import React, { Component } from 'react';

class PozdravnaPoruka extends Component {
    state = {  }
    getWelcomeMessage = () => { 
        //dobavimo podatke o profesoru/asistentu koji se prijavio
        //uzmemo ime
        const ime = 'profesor';
        return <h4>Dobro došli</h4>;
    }
    getAcademicYear = () => {
        //dobavimo podatke o akademskoj godini i semestru
        const akGod = '2018/19';
        const semestar = 'Ljetni';
        return semestar + ' semestar, ' + akGod;
    }
    render() { 
        return ( <div>
                    <p>{this.getWelcomeMessage()}</p>
                    <p>{this.getAcademicYear()}</p>
                </div>  );
    }
}
 
export default PozdravnaPoruka;