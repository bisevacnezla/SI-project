import axios from 'axios';

export const user = {
    getUloga: (userId) => {
        return new Promise((resolve, reject) => {
            // let obj = {
            //     100: "STUDENT",
            //     110: "PROFESOR",
            //     120: "STUDENTSKA_SLUZBA"
            // }
            // resolve(obj[userId])
            axios.get(`http://si2019oscar.herokuapp.com/pretragaId/${userId}/dajUlogu`).then((res)=>{
                if(res.data == "")reject("Korisnik nema uloge.");
                resolve(res.data)
            }).catch((err)=>{
                reject(err)
            });
        })
    }
}