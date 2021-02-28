import React from "react";
import "./tabela.css"
import axios from "axios";
import jQuery from "jquery"

class Zadace extends React.Component {
    constructor() {
        super();
        this.state = {
            studentId: (window.localStorage.getItem("id") != null && window.localStorage.getItem("username") != null) ? window.localStorage.getItem("id") : 2,
            username: window.localStorage.getItem("username") != null ? window.localStorage.getItem("username") : "stest1",
            token: window.localStorage.getItem("token"),
            zadacePoGodinama: []
        }
    }
    componentDidMount() {

        if (window.localStorage.getItem("id") != null) {
            axios({
                url: 'https://si2019romeo.herokuapp.com/users/validate',
                type: 'get',
                dataType: 'json',
                data: jQuery.param({
                  username: window.localStorage.getItem("username")
                }),
                beforeSend: function (xhr) {
                  xhr.setRequestHeader("Authorization", window.localStorage.getItem("token"));
                },
                
            })
            
            .then(res => {
                if (res.status == 200) this.handleGet();
            })
            .catch(res=>{
                this.props.history.push("/Romeo");
              })
        }
        else this.handleGet();
    }
    handleGet = () => {
        axios
            .get("https://si2019siera.herokuapp.com/zadace/" + this.state.studentId)
            .then(res => {
                if(res.data.succes){
                    this.setState({
                        zadacePoGodinama: res.data.ZadacePoGodinamaIPredmetima
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {

        return (
            <div style={{ marginTop: "30px" }}>
                <h2 style={{ marginBottom: "30px" }}>Bodovi ostvareni na zadaće</h2>
                <div className="row" style={{ padding: "20px" }}>
                    {this.state.zadacePoGodinama.length == 0 ? <span style={{ float: "left", marginLeft: "30px" }}>Student dosada nije imao zadaća.</span> :
                        <div className="col-sm-12 col-xs-12 col-md-12 col-lg-4">
                            <table className="table table-bordered text-center bg-active border-solid" style={{ float: "left", marginLeft: "20px" }}>
                                <tbody>
                                    <tr className="bg-primary text-light">
                                        <th className="tabtip" scope="row">Akademska godina</th>
                                        <th className="tabtip" scope="row" >Predmet</th>
                                        <th className="tabtip">Ostvareni bodovi</th>
                                    </tr>
                                    {this.state.zadacePoGodinama.map(x =>
                                        <tr className="tabtip1">
                                            <>
                                                <td>{x.AkademskaGodina}</td>
                                                <td>{x.Zadace.Predmet}</td>
                                                <td>{x.Zadace.Bodovi}</td>
                                            </>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    }

                </div>
            </div>
        );
    }
}
export default Zadace;