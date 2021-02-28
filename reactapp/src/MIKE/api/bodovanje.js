const axios = require('axios')
 
// upis bodova za sve studente iz grupe pojedinacno
const upisBodovaPojedinacno = (studenti, idProjekta) => {
    //studenti je niz [{idStudent, idGrupaProjekta, ostvareniBodovi},{...}]
    return axios.post('https://si-mike-2019.herokuapp.com/api/bodovanjeprojekata/specified', {
        payload: studenti,
        projekat: idProjekta
      });
}

//upis istih bodova za sve studente u grupi
const upisBodovaGrupno = (idGrupaProjekta, bodovi) => {
    return axios.post('https://si-mike-2019.herokuapp.com/api/bodovanjeprojekata/unified', {
        idGrupaProjekta: idGrupaProjekta,
        bodovi: bodovi
      });
}

const skaliranje = (idProjekta, faktor) => {
    return axios.post('https://si-mike-2019.herokuapp.com/api/bodovanjeprojekata/scaling', {
        idProjekat: idProjekta,
        faktorSkaliranja: faktor
      });
}

export { 
    upisBodovaPojedinacno,
    upisBodovaGrupno,
    skaliranje
};