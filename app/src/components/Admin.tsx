import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export function Admiin () {

    interface Imetrics {
        numberUsers?: number;
        numberTasks?: number
    }

    interface IUser {
        name?: string;
        email?: string;
        lastName?: string;
        password?: string;
        rol?: string
    }

    const [metrics, setMetrics] = useState<Imetrics>({
        numberUsers: 0,
        numberTasks: 0
    })
    const [User, setUser] = useState<IUser>({})

    useEffect(() => {
        getUser()
        getMetrics()
    }, []);    

    const getUser = ()=>{
        const user = JSON.parse(localStorage.user);
        setUser(user)
    }
    const getMetrics = async () =>{
        try {
            const res = await axios.get("http://localhost:4000/tasks/getMetrics") 

            const data = {
                numberUsers: res.data.numberUsers,
                numberTasks: res.data.numberTasks
            }
            setMetrics(data)

        } catch (error) {
            console.log(error)
            alert("Hubo un error al obtener las metricas", )
        }
    }

    return (
        <Container>
           <Card style={{height: "350px"}}>
                <Card.Body>
                    <Card.Title>Bienvenido de nuevo {User.name} </Card.Title>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body style={{backgroundColor: "#e9d3ff"}}>
                                    <Card.Title>Numero de Usuarios Registrados: {metrics.numberUsers}</Card.Title>
                                        
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body style={{backgroundColor: "#e9d3ff"}}>
                                    <Card.Title>Numero de Tareas Creadas: {metrics.numberTasks}</Card.Title>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}