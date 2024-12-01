import { Card, Col, Row } from "react-bootstrap";

export function Admiin () {
    const user = JSON.parse(localStorage.user);

    return (
        <>
           <Card>
                <Card.Body>
                    <Card.Title>Bienvenido de nuevo {user.name} </Card.Title>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Numero de Usuarios Registrados:12 </Card.Title>
                                  {/*   <PeopleFill /> 85 */}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Numero de Tareas Creadas: 123</Card.Title>
                                    {/* <FileEarmarkBarGraphFill /> 252 */}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}