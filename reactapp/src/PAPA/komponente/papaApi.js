import axios from 'axios';
import {dajUloguTrenutnog, dajIdTrenutnog} from './autentifikacija.js'
let id=dajIdTrenutnog();

class papaApi{
   
    static trenutniPredmeti(){
        return axios.get('https://si2019papa.herokuapp.com/papa/trenutniPredmeti', {params : {idStudent:id}});
    }
    static odslusaniPredmeti(){
        return axios.get('https://si2019papa.herokuapp.com/papa/odslusaniPredmeti', {params : {idStudent:id}});
    }  
    static trenutniSaDrugihOdsjeka(){
        return axios.get('https://si2019papa.herokuapp.com/papa/trenutniSaDrugihOdsjeka', {params : {idStudent:id}});
    }
    static trenutniSaDrugihSemestara(){
        return axios.get('https://si2019papa.herokuapp.com/papa/trenutniSaDrugihSemestara', {params : {idStudent:id}});
    }
    static polozeniPredmeti(){
        return axios.get('https://si2019papa.herokuapp.com/papa/polozeniPredmeti', {params : {idStudent:id}});
    }
    static nePolozeniPredmeti(){
        return axios.get('https://si2019papa.herokuapp.com/papa/nePolozeniPredmeti', {params : {idStudent:id}});
    }
    static trenutniAsistenti(){
        return axios.get('https://si2019papa.herokuapp.com/papa/trenutniAsistenti', {params : {idStudent:id}});
    }
    static upisaneOcijene(){
        return axios.get('https://si2019papa.herokuapp.com/papa/upisaneOcijene', {params : {idStudent:id}});
    }
    static ispitiPrijava(){
        return axios.get('https://si2019papa.herokuapp.com/papa/ispitiPrijava', {params : {idStudent:id}});
    }
    static obavjestenjaAdmin(){
        return axios.get('https://si2019papa.herokuapp.com/papa/obavjestenjaAdmin', {params : {idStudent:id}});
    }
    static obavjestenjaStudentskaSluzba(){
        return axios.get('https://si2019papa.herokuapp.com/papa/obavjestenjaStudentskaSluzba', {params : {idStudent:id}});
    }
    static obavjestenjaProfesor(){
        return axios.get('https://si2019papa.herokuapp.com/papa/obavjestenjaProfesor', {params : {idStudent:id}});
    }
    static obavjestenjaAsistent(){
        return axios.get('https://si2019papa.herokuapp.com/papa/obavjestenjaAsistent', {params : {idStudent:id}});
    }
    static rezultatiIspita(){
        return axios.get('https://si2019papa.herokuapp.com/papa/rezultatiIspita', {params : {idStudent:id}});
    }
    static trenutniProfesori(){
        return axios.get('https://si2019papa.herokuapp.com/papa/trenutniProfesori', {params : {idStudent:id}});
    }
    static sviIspita(){
        return axios.get('https://si2019papa.herokuapp.com/papa/sviIspiti');
    }
    static neradniDani(){
        return axios.get('https://si2019papa.herokuapp.com/papa/neradniDani');
    }
    static sveGodine(){
        return axios.get('https://si2019papa.herokuapp.com/papa/godine');
    }
    static sviPredmeti(){
        return axios.get('https://si2019papa.herokuapp.com/papa/sviPredmeti');
    }

}
export default papaApi;
