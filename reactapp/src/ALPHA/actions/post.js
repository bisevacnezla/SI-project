import fetch from 'isomorphic-fetch';



export function postRequest(data) {
    return fetch('http://localhost:53026/api/korisnik/AddNewStudent', {  
        method: 'post',
        mode:'cors',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        console.log("Nesto", res);
        return res;
    }).catch(err => console.log(err));
}