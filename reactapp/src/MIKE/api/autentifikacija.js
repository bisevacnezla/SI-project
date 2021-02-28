const axios = require('axios');

const dajUloguTrenutnog = () => {
    return axios.get(`http://si2019oscar.herokuapp.com/pretragaId/${dajIdTrenutnog()}/dajUlogu`);

    // res.data je uloga
}

// Moguce vrijednosti: STUDENT, PROFESOR, ASISTENT, ADMIN, STUDENTSKA_SLUZBA
const dajIdTrenutnog = () => {
    return window.localStorage.getItem("id");
}

export { 
    dajUloguTrenutnog,
    dajIdTrenutnog
};