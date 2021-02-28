import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './UnosPrisustvaForma.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Poruka from '../Poruka/Poruka';

function UnosPrisustvaForma(props) {
    const daStyle = {
        color: "white",
        background: "#28a745 "
    };
    const neStyle = {
        color: "white",
        background: "#dc3545"
    };

    return (
        <div id="unosPrisustvaFormaID" paddingBottom="50px">

            <Container fluid style={{padding:"0", margin: "0"}}>
                <Row noGutters style={{margin: "0"}}>
                    <Col style={{textAlign: "left"}}>
                        <div style={{padding: "15px", paddingBottom: "0px"}}>
                            <h4>Unos prisustva za sedmicu {props.data.sedmica}</h4>
                        </div>
                    </Col>
                </Row >

                <Row noGutters style={{margin: "0"}}>
                    <Col style={{textAlign: "left"}}>
                        <div style={{padding: "15px", paddingBottom: "0px"}}>
                            <div class="card" style={{margin: "0"}}>
                                <div class="card-body">
                                    <h4 class="card-title text-center" >Unos prisustva za sve studente</h4>
                                    <h6 class="card-subtitle mb-2 text-muted text-center">Unos prisustva za sve studente omogućava brz unos prisustva za sve.</h6>
                                    <br/>
                                    <div>
                                        <Form  onSubmit={props.handleSubmitSvi}>
                                            
                                            <Form.Row >
                                                <Col></Col>
                                                <Form.Group as={Col} lg="3" md="3" sm="3" style={{textAlign: "left"}}>
                                                    <div class="form-group">
                                                        <label for="predavanjeSelect">Predavanje</label>
                                                        <select
                                                            id="predavanjeSelect"
                                                            class="custom-select"
                                                            style={props.data.predavanjeSvi === "da" ? daStyle : props.data.predavanjeSvi === "ne" ? neStyle : null}
                                                            name="predavanjeSvi"
                                                            value={props.data.predavanjeSvi}
                                                            onChange={props.handleChangeSvi}>
                                                            <option value="izaberiOpciju">Izaberi opciju</option>
                                                            <option value="da">Da</option>
                                                            <option value="ne">Ne</option>
                                                            <option value="-">-</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                                <Form.Group as={Col} lg="3" md="3" sm="3" style={{textAlign: "left"}}>
                                                    <div class="form-group">
                                                        <label for="vjezbaSelect">Vježba</label>
                                                        <select
                                                            id="vjezbaSelect"
                                                            class="custom-select"
                                                            style={props.data.vjezbaSvi === "da" ? daStyle : props.data.vjezbaSvi === "ne" ? neStyle : null}
                                                            name="vjezbaSvi"
                                                            value={props.data.vjezbaSvi}
                                                            onChange={props.handleChangeSvi}>
                                                            <option value="izaberiOpciju">Izaberi opciju</option>
                                                            <option value="da">Da</option>
                                                            <option value="ne">Ne</option>
                                                            <option value="-">-</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                                <Form.Group as={Col} lg="3" md="3" sm="3" style={{textAlign: "left"}}> 
                                                    <div class="form-group">
                                                        <label for="tutorijalSelect">Tutorijal</label>
                                                        <select
                                                            id="tutorijalSelect"
                                                            class="custom-select"
                                                            style={props.data.tutorijalSvi === "da" ? daStyle : props.data.tutorijalSvi === "ne" ? neStyle : null}
                                                            name="tutorijalSvi"
                                                            value={props.data.tutorijalSvi}
                                                            onChange={props.handleChangeSvi}>
                                                            <option value="izaberiOpciju">Izaberi opciju</option>
                                                            <option value="da">Da</option>
                                                            <option value="ne">Ne</option>
                                                            <option value="-">-</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                                <Col></Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col></Col>
                                                <Col md="auto" style={{textAlign: "center"}}>
                                                    <Button     
                                                        variant="primary"
                                                        type="submit"
                                                        disabled={
                                                            props.data.predavanjeSvi === "izaberiOpciju" &&
                                                            props.data.vjezbaSvi === "izaberiOpciju" &&
                                                            props.data.tutorijalSvi === "izaberiOpciju" ? true : false}>
                                                        Ažuriraj tabelu
                                                    </Button>
                                                </Col>
                                                <Col></Col>
                                            </Form.Row>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col> 
                </Row >

                <Row notGutters style={{margin: "0"}} noGutters>
                    <Col style={{textAlign: "left"}}>
                        <div style={{padding: "15px"}}>
                            <div class="card" style={{margin: "0"}}>
                                <div class="card-body">
                                    <Poruka
                                    greska={props.data.greskaBaza}
                                    naslovUspjeh="Prisustvo sačuvano!"
                                    naslovGreska="Prisustvo nije sačuvano!"
                                    opisUspjeh="Prisustvo je dodano u bazu podataka."
                                    opisGreska="Baza podataka nije dostupna."
                                    />
                                    <h4 class="card-title text-center">Unos prisustva pojedinačno</h4>
                                    <h6 class="card-subtitle mb-2 text-muted text-center">Unos prisustva pojedinačno omogućava unos prisustva za svakog studenta posebno.</h6>
                                    <br/>
                                    <div>
                                        <Form onSubmit={props.handleSubmit}>

                                            <Form.Row>
                                                <Col sm={{span: 12}}>
                                                    <Table striped bordered size="sm" responsive>
                                                        <thead>
                                                            <tr className="table-primary" hover="false">
                                                                <th>#</th>
                                                                <th>Index</th>
                                                                <th>Ime i Prezime</th>
                                                                <th>Predavanje</th>
                                                                <th>Vježba</th>
                                                                <th>Tutorijal</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                props.data.studenti.map((student, counter) =>
                                                                    <tr key={student.indeks}>
                                                                        <td>{counter + 1}</td>
                                                                        <td>{student.indeks}</td>
                                                                        <td>{student.ime}</td>
                                                                        <td>
                                                                            <div key={student.indeks} class="form-group" style={{margin: "0"}}>
                                                                                <select
                                                                                    class="custom-select"
                                                                                    style={student.predavanje === "da" ? daStyle : student.predavanje === "ne" ? neStyle : null}
                                                                                    name="predavanje"
                                                                                    value={student.predavanje}
                                                                                    onChange={(event) => {props.handleChange(event, student.indeks)}}>
                                                                                    <option value="da">Da</option>
                                                                                    <option value="ne">Ne</option>
                                                                                    <option value="-">-</option>
                                                                                </select>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div key={student.indeks} class="form-group" style={{margin: "0"}}>
                                                                                <select
                                                                                    class="custom-select"
                                                                                    style={student.vjezbe === "da" ? daStyle : student.vjezbe === "ne" ? neStyle : null}
                                                                                    name="vjezbe"
                                                                                    value={student.vjezbe}
                                                                                    onChange={(event) => {props.handleChange(event, student.indeks)}}>
                                                                                    <option value="da">Da</option>
                                                                                    <option value="ne">Ne</option>
                                                                                    <option value="-">-</option>
                                                                                </select>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div key={student.indeks} class="form-group" style={{margin: "0"}}>
                                                                                <select
                                                                                    class="custom-select"
                                                                                    style={student.tutorijal === "da" ? daStyle : student.tutorijal === "ne" ? neStyle : null}
                                                                                    name="tutorijal"
                                                                                    value={student.tutorijal}
                                                                                    onChange={(event) => {props.handleChange(event, student.indeks)}}>
                                                                                    <option value="da">Da</option>
                                                                                    <option value="ne">Ne</option>
                                                                                    <option value="-">-</option>
                                                                                </select>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Form.Row>

                                            <Form.Row>
                                                <Col></Col>
                                                <Col md="auto" style={{textAlign: "center"}}>
                                                <Button variant="primary" type="submit">
                                                    Sačuvaj
                                                </Button>
                                                </Col>
                                                <Col></Col>
                                            </Form.Row>

                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col> 
                </Row >

                <Row notGutters style={{margin: "0"}} noGutters>
                    <Col style={{textAlign: "center"}}>
                        <Button variant="primary" onClick={props.handleNazad} style={{marginBottom: "15px"}}>Nazad na sedmice</Button>
                    </Col>
                </Row>

            </Container>

        </div>
    );
}

export default UnosPrisustvaForma;