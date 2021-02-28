export const stavkaTipovi = ["Prvi parcijalni", "Drugi parcijalni", "Prisustvo", "Zadaca", "Usmeni", "Bodovi", "Ocjena"];
export const izvjestajTipovi = ["Licni izvjestaj", "Izvjestaj predmeta"];
export const defaultIzvjestaji = {
    "Licni izvjestaj": {
        naziv: "Licni izvjesta",
    },
    "Izvjestaj predmeta": {
        naziv: "Izvjestaj predmeta",
        predmetId: 0,
        godinaId: 0
    }
}

export const generateRandomColor = () => {
    return {
        r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 255),
        b: Math.floor(Math.random() * 255)
    }
}

  