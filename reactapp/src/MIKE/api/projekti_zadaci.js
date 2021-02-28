import { dajIdTrenutnog } from './autentifikacija';

const axios = require('axios')

// svi projekti u cijoj projektnoj grupi je trenutni user
const sviProjektiTrenutnogUsera = () => {
  let idStudenta = dajIdTrenutnog();

  return axios.get(`https://si-mike-2019.herokuapp.com/services/viewS/user-projects/${idStudenta}`);

  //placeholder
  return new Promise(function(resolve, reject)
  {
    let projekti = {
      projekti: [
        {
          id: "1",
          naziv_projekta: "Naziv projekta 1",
          naziv_predmeta: "Predmet 1",
          opis_projekta: "opis projekta 1",
          zadaci: [
            { idProjektnogZadatka: "1", opis: "opis projektnog zadatka 1", otkad: "11.4.2019", dokad: "23.4.2019", zavrsen: "NE", komentarAsistenta: "" },
            { idProjektnogZadatka: "2", opis: "opis projektnog zadatka 2", otkad: "12.4.2019", dokad: "17.4.2019", zavrsen: "DA", komentarAsistenta: "" }
          ]
        },
        {
          id: "2",
          naziv_projekta: "Naziv projekta 2",
          naziv_predmeta: "Predmet 2",
          opis_projekta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
          zadaci: []
        }
      ]
    };
  
    resolve({data: projekti});
  });
}

// svi predmeti na kojima je student, za koje postoji projekat za koji student nije ni u jednoj grupi
const predmetiZaNovuProjektnuGrupu = () => {
  let idStudenta = dajIdTrenutnog();

  return axios.get(`https://si-mike-2019.herokuapp.com/services/viewS/predmeti-za-generisanje-grupa/${idStudenta}`);

  //placeholder
  return new Promise(function(resolve, reject)
  {
    let predmeti = {
      predmeti: [
        {
          id: "1",
          naziv_predmeta: "Predmet 1",
          projekti: [
            { idProjekat: "1", nazivProjekta: "naziv projekta 1", progress: "0.000", opisProjekta: "opis projekta 1", moguciBodovi: "10", rokProjekta: "2019-01-01 20:20:20" },
            { idProjekat: "2", nazivProjekta: "naziv projekta 2", progress: "0.800", opisProjekta: "opis projekta 2", moguciBodovi: "30", rokProjekta: "2019-01-01 20:20:20" }
          ]
        },
        {
          id: "2",
          naziv_predmeta: "Predmet 2",
          projekti: [
            { idProjekat: "3", nazivProjekta: "naziv projekta 3", progress: "0.000", opisProjekta: "opis projekta 3", moguciBodovi: "10", rokProjekta: "2019-01-01 20:20:20" }
          ]
        }
      ]
    };
  
    resolve({data: predmeti});
  });
}

const sviPredmetiAsistenta = (idAsistenta) => {
  return axios.get(`https://si-mike-2019.herokuapp.com/services/viewA/predmetiprojektiasistent/${idAsistenta}`);

  //placeholder
  return new Promise(function(resolve, reject)
  {
    let predmeti = {
      predmeti: [
        {
          id: "1",
          naziv_predmeta: "Predmet 1",
          projekti: [
            { idProjekat: "1", nazivProjekta: "naziv projekta 1", progress: "0.000", opisProjekta: "opis projekta 1", moguciBodovi: "10", rokProjekta: "2019-01-01 20:20:20" },
            { idProjekat: "2", nazivProjekta: "naziv projekta 2", progress: "0.800", opisProjekta: "opis projekta 2", moguciBodovi: "30", rokProjekta: "2019-01-01 20:20:20" }
          ]
        },
        {
          id: "2",
          naziv_predmeta: "Predmet 2",
          projekti: [
            { idProjekat: "3", nazivProjekta: "naziv projekta 3", progress: "0.000", opisProjekta: "opis projekta 3", moguciBodovi: "10", rokProjekta: "2019-01-01 20:20:20" }
          ]
        },
        {
          id: "3",
          naziv_predmeta: "Predmet 3",
          projekti: [
            { idProjekat: "4", nazivProjekta: "naziv projekta 4", progress: "0.000", opisProjekta: "opis projekta 4", moguciBodovi: "10", rokProjekta: "2019-01-01 20:20:20" }
          ]
        },
        {
          id: "4",
          naziv_predmeta: "Predmet 4",
          projekti: [

          ]
        }
      ]
    };
  
    resolve({data: predmeti});
  });
}

const sveGrupeProjekta = (idProjekta) => {
  return axios.get(`https://si-mike-2019.herokuapp.com/services/projects/getProjectGroups/${idProjekta}`);
  
  //placeholder
  return new Promise(function(resolve, reject)
  {
    let grupe = {
      grupe: [
        {
          id: "1",
          nazivGrupe: `Grupa 1`,
          studenti: [
            { id: "1", idClanGrupe: "1", ime: "ime studenta 1", prezime: "prezime studenta 1", indeks: "10001", brojBodova: "1" },
            { id: "2", idClanGrupe: "2", ime: "ime studenta 2", prezime: "prezime studenta 2", indeks: "10002", brojBodova: "2" }
          ]
        },
        {
          id: "2",
          nazivGrupe: "Grupa 2",
          studenti: [
            { id: "3", idClanGrupe: "3", ime: "ime studenta 3", prezime: "prezime studenta 3", indeks: "10003", brojBodova: "3" }
          ]
        },
        {
          id: "3",
          nazivGrupe: "Grupa 3",
          studenti: [
            { id: "4", idClanGrupe: "4", ime: "ime studenta 4", prezime: "prezime studenta 4", indeks: "10004", brojBodova: "4" }
          ]
        },
        {
          id: "4",
          nazivGrupe: "Grupa 4",
          studenti: [

          ]
        }
      ]
    };
  
    resolve({data: grupe});
  });
}

const oznaciZavrsenZadatak = (idZadatka) => {
  return axios.post(`https://si-mike-2019.herokuapp.com/services/progress/endtask/${idZadatka}`);
}

export { 
  sviProjektiTrenutnogUsera, 
  predmetiZaNovuProjektnuGrupu,
  sviPredmetiAsistenta,
  sveGrupeProjekta,
  oznaciZavrsenZadatak
};