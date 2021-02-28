import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const UnosPrisustvaSedmice = (props) => {
    const sedmice = [
        "Sedmica 1",
        "Sedmica 2",
        "Sedmica 3",
        "Sedmica 4",
        "Sedmica 5",
        "Sedmica 6",
        "Sedmica 7",
        "Sedmica 8",
        "Sedmica 9",
        "Sedmica 10",
        "Sedmica 11",
        "Sedmica 12",
        "Sedmica 13",
        "Sedmica 14",
    ];

    return (
        <div>
            <Container fluid style={{padding:"0", margin: "0"}}>
                <Row noGutters style={{margin: "0"}}>
                    <Col style={{textAlign: "left"}}>
                        <div style={{padding: "15px", paddingBottom: "0px"}}>
                            <h4>Odabir sedmice</h4>
                        </div>
                    </Col> 
                </Row>
                <Row noGutters style={{margin: "0"}}>
                    <Col>
                        <div style={{padding: "15px", paddingBottom: "0px", paddingRight: "0px"}}>
                            <div class="list-group" style={{margin: "0"}}>
                                {
                                    sedmice.slice(0, 7).map((s, index) => {
                                        return (
                                            <a href="#" class="list-group-item list-group-item-action" onClick={() => props.handleClickSedmica(index + 1)}>
                                                {s}
                                            </a>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div style={{padding: "15px"}}>
                            <div class="list-group" style={{margin: "0"}}>
                                {
                                    sedmice.slice(7, 14).map((s, index) => {
                                        return (
                                            <a href="#" class="list-group-item list-group-item-action" onClick={() => props.handleClickSedmica(index + 8)}>
                                                {s}
                                            </a>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default UnosPrisustvaSedmice;