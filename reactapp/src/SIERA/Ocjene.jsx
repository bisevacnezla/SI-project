import React from "react";
import axios from "axios";
import "./tabela.css";
import { withRouter } from "react-router-dom";
import jQuery from "jquery"
class Ocjene extends React.Component {

    constructor() {
        super();
        this.state = {
            dummyOcjene: [],
            idStudenta: (window.localStorage.getItem("id") != null && window.localStorage.getItem("username") != null) ? window.localStorage.getItem("id") : 2,
            username: window.localStorage.getItem("username") != null ? window.localStorage.getItem("username") : "stest1",
            token: window.localStorage.getItem("token")
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
                 this.handleGet();
            })
            .catch(res=>{
                this.props.history.push("/Romeo");
              })
        }
        else this.handleGet();
    }

    handleGet = () => {
        axios
            .get("https://si2019siera.herokuapp.com/ocjene/" + this.state.idStudenta)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        dummyOcjene: res.data.ocjene
                    })
                }
            })
            .catch(res => {
                console.log(res.error);
            });
    }

    render() {
        return (
            <div style={{ marginTop: "30px" }}>
                <h2 style={{ marginBottom: "30px" }}>Ocjene po godinama</h2>
                <div className="row" style={{ padding: "20px" }}>
                    {this.state.dummyOcjene.length == 0 ? <span style={{ float: "left", marginLeft: "30px" }}>Student trenutno nema ocjena.</span> :
                        this.state.dummyOcjene.map(x =>
                            <div className="col-sm-12 col-xs-12 col-md-12 col-lg-4">

                                <table className="table table-bordered text-center bg-active border-solid" style={{ float: "left", marginLeft: "20px" }}>
                                    <tbody>
                                        <tr className="bg primary text-light">
                                            <th className="tabtip" colSpan="2">Akademska godina {x[0].AkademskaGodina}</th>
                                        </tr>
                                        <tr className="bg-primary text-light">
                                            <th className="tabtip">Predmet</th>
                                            <th className="tabtip">Ocjena</th>
                                        </tr>
                                        {x[0].Ocjene.map(y =>
                                            <tr className="tabtip1">
                                                <td>{y.Predmet}</td>
                                                <td>{y.Ocjena}</td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>
                        )
                    }

                </div>
            </div>
        );
    }
}

export default withRouter(Ocjene);