import React, { Component } from "react";
import "./bootstrap.min.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./tabela.css"
import jQuery from "jquery"

class IspitiTabela extends Component {
  state = {
    listaIspita: [],
    trenutnoLogovaniStudentID: (window.localStorage.getItem("id") != null && window.localStorage.getItem("username") != null) ? window.localStorage.getItem("id") : 2,
    username: window.localStorage.getItem("username") != null ? window.localStorage.getItem("username") : "stest1",
    token: window.localStorage.getItem("token"),
  };

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
      .get(
        `https://si2019siera.herokuapp.com/ispiti/` + this.state.trenutnoLogovaniStudentID
      )
      .then(res => {
        if (res.data.akademskeGodine != undefined) {
          const lista = res.data.akademskeGodine;
          this.setState({ listaIspita: lista });
        }
        else {
          this.setState({ listaIspita: [] });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  srediDatum(datum) {
    var n = datum.indexOf("T");
    if (n != -1) {
      datum = datum.substring(0, n != -1 ? n : datum.length);
    }
    return datum;
  }

  render() {
    return (
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ marginBottom: "30px" }}>Ispiti</h2>
        <div className="row justify-content-center" style={{ padding: "20px" }}>
          {this.state.listaIspita.length == 0 ? <span style={{ float: "left", marginLeft: "30px" }}>Student do sada nije polagao nijedan ispit.</span> :
            this.state.listaIspita.map((item, i) => (
              <div className="col-sm-12 col-xs-12 col-md-12 col-lg-10 ">
                <table className="table table-bordered text-center bg-active border-solid" key={i}>
                  <tbody>
                    <tr className="bg-primary text-light" key={item[0].idGodine}>
                      <th className="tabtip" scope="row" colSpan="7" style={{ textAlign: "center" }}>
                        Akademska godina: {item[0].nazivGodine}
                      </th>
                    </tr>
                    {item[0].predmeti.map(itemPredmet => [
                      <tr className="bg-primary text-light"
                        key={
                          itemPredmet.idPredmet + item[0].nazivGodine + "naziviIspita"
                        }
                      >
                        {itemPredmet.ispiti.length == 0 ? null : <th className="tabtip1" />}
                        {itemPredmet.ispiti.map(itemIspiti => (
                          <th className="tabtip1"
                            colSpan="2"
                            style={{ textAlign: "center" }}
                            key={itemIspiti.idIspita}
                          >
                            {itemIspiti.nazivIspita}
                          </th>
                        ))}
                      </tr>,
                      <tr className="bg-primary text-light"
                        key={
                          itemPredmet.idPredmet +
                          item[0].nazivGodine +
                          "predmethatumBodovi"
                        }
                      >
                        {itemPredmet.ispiti.length == 0 ? null : (
                          <th className="tabtip" scope="row">Predmet</th>
                        )}
                        {itemPredmet.ispiti.map(itemIspiti => [
                          <th className="tabtip"
                            style={{ textAlign: "center" }}
                            key={itemIspiti.idIspita + "datum"}
                          >
                            Datum
                      </th>,
                          <th className="tabtip"
                            style={{ textAlign: "center" }}
                            key={itemIspiti.idIspita + "bodovi"}
                          >
                            Ostvareni bodovi
                      </th>
                        ])}
                      </tr>,
                      <tr

                        key={
                          itemPredmet.idPredmet + item[0].nazivGodine + "datumBodovi"
                        }
                      >
                        {itemPredmet.ispiti.length == 0 ? null : (
                          <th className="tabtip1"
                            style={{ textAlign: "center" }}>
                            {itemPredmet.nazivPredmeta}
                          </th>
                        )}
                        {itemPredmet.ispiti.map(itemIspiti => [
                          <th className="tabtip1"
                            style={{ textAlign: "center" }}
                            key={itemIspiti.idIspita + itemIspiti.datum}
                          >
                            {this.srediDatum(itemIspiti.datum)}
                          </th>,
                          <th className="tabtip1"
                            style={{ textAlign: "center" }}
                            key={
                              itemIspiti.idIspita +
                              itemIspiti.datum +
                              itemIspiti.bodovi
                            }
                          >
                            {itemIspiti.bodovi}
                          </th>
                        ])}
                      </tr>
                    ])}
                  </tbody>
                </table>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default withRouter(IspitiTabela);
