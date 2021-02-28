const axios = require('axios');


const dajUloguTrenutnog = () => {
    return axios.get(`http://si2019oscar.herokuapp.com/pretragaId/${dajIdTrenutnog()}/dajUlogu`);
}
// Moguce vrijednosti: STUDENT, PROFESOR, ASISTENT, ADMIN, STUDENTSKA_SLUZBA
const dajIdTrenutnog = () => {
    let id = window.localStorage.getItem("id");
    if (id==null || id ==undefined){
        return 1; //Dami podatak ako se ne logujemo na sistem
    }
    return id;
}

export { 
    dajUloguTrenutnog,
    dajIdTrenutnog
};