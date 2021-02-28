import * as dummy from "./static/dummy.js";
import axios from 'axios';

import { nasBackendURL } from '../../helper.js';

export const dataPredmetPoGodini = {
  get: (predmetId, godinaId, filter = null, datum = null) => {
    if(datum != null){
      datum = datum.substring(0, 10);
    }
    //filter oznacava koju data-u treba pokupit sa servera
    //u switchu ispod vidjeti koji sve tip postoji i kojeg formata su podaci
    //datum je string oblika DD.MM.YYYY. i koristi se u ispitima
    switch (filter) {
      case "Prvi parcijalni":
       case "Drugi parcijalni":
       case "Usmeni":
      return new Promise((resolve, reject) => {
       fetch(
            nasBackendURL + "/izvjestaj/ispit/"+ filter+"/"+ predmetId + "/" +godinaId +"/" + datum
          )
            .then(res => res.json())
            .then(
              result => {
                if (result[0].message !== undefined) {
                  reject(result[0].message);
                } else {
                  resolve(result[0]);
                }
              },
              error => reject({ message: "Ne može se konektovati na bazu" })
            );
      });
      
      case "Prisustvo":
      case "Zadaca":
      case "Bodovi":
      case "Ocjena":
      case null:
       //vraca se niz bodova prisustva
        return fetch(
          nasBackendURL + "/Izvjestaji/dataPredmetPoGodini/" +
            predmetId +
            "/" +
            godinaId +
            "/" +
            filter +
            "/" +
            datum
        ).then(podaci => podaci.json());
      
    }
  },
  getDataZaProfesora: (profesorId, predmetId, godinaId) => {
    return new Promise((resolve, reject) => {
      fetch(nasBackendURL + "/izvjestajOSvemu/" + profesorId + "/" + predmetId + "/" + godinaId)
      .then(res => res.json())
      .then(
        result => {
          /* if (result[0].message !== undefined) {
            reject(result[0].message);
          } else {*/
          resolve(result);
          //}
        },
        error => reject({ message: "Ne može se konektovati na bazu" })
      );
// resolve({
//   nazivGodine: '2011/2012',
//   nazivPredmeta: 'IM1',
//   data: [
//     {
//       imeStudenta: "fatih",
//       prezimeStudenta: "zukorlic",
//       indeks: '17861',
//       stavkeOcjenjivanja: [
//         {
//           naziv: "Prvi parc. 03.04", //usmeni 2.3.2015., zadaca, parc 1.2.2015., prisustvo itd
//           brojBodova: 10
//         },
//         {
//           naziv: "drugi parc. 03.06", //usmeni 2.3.2015., zadaca, parc 1.2.2015., prisustvo itd
//           brojBodova: 10
//         }
//       ]
//     },
//     {
//       imeStudenta: "fatih2",
//       prezimeStudenta: "zukorlic",
//       indeks: '17862',
//       stavkeOcjenjivanja: [
//         {
//           naziv: "drugi parc. 03.06", //usmeni 2.3.2015., zadaca, parc 1.2.2015., prisustvo itd
//           brojBodova: 10
//         }
//       ]
//     }
//   ]
// })
});
}
};

//izvjestaj je u obliku kao objekti iz niza sacuvaniIzvjestajNiz
export const sacuvaniIzvjestaji = {
  //vraca se niz sacuvanih izvjestaja
  get: studentId => {
    //studentId = 100;
    return new Promise((resolve, reject) => {
      fetch(nasBackendURL + "/izvjestaji/precice?studentId=" + studentId)
        .then(res => res.json())
        .then(
          result => {
            /* if (result[0].message !== undefined) {
              reject(result[0].message);
            } else {*/
            resolve(result);
            //}
          },
          error => reject({ message: "Ne može se konektovati na bazu" })
        );

    });
  },
  delete: (studentId, izvjestaj) => {
    //izvjestaj.studentId = 100; //studentId
    izvjestaj.studentId = studentId;
    return new Promise((resolve, reject) => {
      fetch(nasBackendURL + "/izvjestaji/obrisiPrecicu", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(izvjestaj)
      })
        .then(res => res.json())
        .then(rezultat => resolve(rezultat));
    });
  },
  put: (studentId, izvjestaj) => {
    izvjestaj.studentId = studentId;
    izvjestaj.godinaId = 11;
    return new Promise((resolve, reject) => {
      axios.post(nasBackendURL + "/izvjestaji/dodajPrecicu", {
          izvjestaj: izvjestaj
      }).then( res => resolve({
          datumObrade: res.data
      })).catch( err => reject({
          message: "Greska pri obradi."
      }))
    })
  }
};

export const predmeti = {
  get: () => {
    return new Promise((resolve, reject) => {
      fetch(/*"http://si2019alpha.herokuapp.com/api/predmet/GetPredmeti"*/ nasBackendURL + "/predmeti" )
        .then(res => res.json())
        .then(rezultat => {
          var predmeti=[];
          for(var i=0; i<rezultat.length; i++){
            predmeti.push({id:rezultat[i].id, naziv:rezultat[i].naziv});
          }
          resolve(predmeti);
          });
    });
  },
  getPredmetiStudenta: studentId => {
    //vraca predmete koje student slusa na trenutnoj godini
    return new Promise((resolve, reject) => {
      //studentId = 100;
      fetch(nasBackendURL + "/predmeti_studenta?studentId=" + studentId)
        .then(res => res.json())
        .then(rezultat => {
          resolve(rezultat)
        });
    });
  },
  getPredmetiProfesoraPoGodinama: profesorId => {
    return new Promise((resolve, reject) => {
      fetch(nasBackendURL + "/getPredmetiProfesora?profesorId=" + profesorId)
        .then(res => res.json())
        .then(rezultat => {
          resolve(rezultat)
        });
    });
  }
};

export const godine = {
  get: () => {
    return new Promise((resolve, reject) => {
      fetch("http://si2019siera.herokuapp.com/akademskegodine/")
        .then(res => res.json())
        .then(
          result => {
            if (result.error === true) {
              reject({ message: "Greška!" });
            } else {
              var godine = [];
              var akg = result.data;
              for (var i = 0; i < akg.length; i++) {
                godine.push({ naziv: akg[i].naziv, id: akg[i].id });
              }
              resolve(godine);
            }
          },
          error => reject({ message: "Ne može se konektovati na bazu" })
        );
    });
  },
  getTrenutnaGodina: () => {
    return new Promise((resolve, reject) => {
      fetch("http://si2019siera.herokuapp.com/akademskegodine/trenutna")
        .then(res => res.json())
        .then(
          result => {
            if (result.error === true) {
              reject({ message: "Greška!" });
            } else {
              resolve({ naziv: result.data.naziv, id: result.data.id });
            }
          },
          error => reject({ message: "Ne može se konektovati na bazu" })
        );
      
    });
  }
};

export const student = {
  getProsjeci: studentId => {
    //studentId = 100;
    return new Promise((resolve, reject) => {
      fetch(nasBackendURL + "/izvjestaj/prosjekPoGodinama/" + studentId)
        .then(res => res.json())
        .then(
          result => {
            resolve(result);
            /*if (result[0].message !== undefined) {
              reject(result[0].message);
            } else {
              resolve(result);
            }*/
          },
          error => reject({ message: "Ne može se konektovati na bazu" })
        );
        
      /* setTimeout(() => {
        //vraca niz objekata oblika {naziv: "2016/2017", godinaId: "idgodine", prosjek: 6.6}
        resolve([
          { naziv: "2016/2017", godinaId: 12, prosjek: 7.6 },
          { naziv: "2017/2018", godinaId: 13, prosjek: 7.2 },
          { naziv: "2018/2019", godinaId: 14, prosjek: 7.8 }
        ]);
      }, 100);*/
        /*
        export const ispiti = {
    get:() => {
        return new Promise((resolve, reject) => {
            fetch("http://localhost:31912/ispiti")
            .then(res=>res.json())
            .then(rezultat => resolve(rezultat));
        })
    },
    getUsmeni: studentId =>{
        //Vraca usmeni ispit za nekog studenta
        return new Promise((resolve,reject)=>{
        studentId = 100;
        fetch("http://localhost:31912/usmeni_ispit?studentId="+studentId)
        .then(res=> res.json())
        .then(rezultat =>resolve(rezultat));
    });
}
};
        */
    });
  }
};
