import { useState } from "react"
import { Button, Card , Container, Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Register () {

    interface IUser {
        name?: string;
        email?: string;
        lastName?: string;
        password?: string;
    }

    const [User, setUser] = useState<IUser>({})
    const navigate = useNavigate();

    const onChangeRegister = (e: React.ChangeEvent<HTMLInputElement>)=>{
        let data: IUser;
        data = User;
        const p = e.target.name as keyof IUser;
        data[p] = e.target.value as any;
        setUser({ ...data })
    }

    const onSubmit = () => {
        /* Enviar data al server */
        console.log(User)
        navigate("/")
    }

    return (
        <Container>
          <Card className="register">
                <Card.Body>
                    <Form className="formr">
                        <Form.Group className="formG">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control style={{backgroundColor: "#e9d3ff"}} onChange={onChangeRegister} name="name" placeholder="Ingresa tu nombre" />
                        </Form.Group>
                        <Form.Group className="formG">
                            <Form.Label>Apellidos:</Form.Label>
                            <Form.Control style={{backgroundColor: "#e9d3ff"}} onChange={onChangeRegister} name="last_name" placeholder="Ingresa tu apellido" />
                        </Form.Group>
                        <Form.Group className="formG">
                            <Form.Label>Correo:</Form.Label>
                            <Form.Control style={{backgroundColor: "#e9d3ff"}} onChange={onChangeRegister} name="email" type="email" placeholder="Ingresa tu correo" />
                        </Form.Group>
                        <Form.Group className="formG">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control style={{backgroundColor: "#e9d3ff"}} onChange={onChangeRegister} name="password" type="password" placeholder="Ingresa tu contraseña" />
                        </Form.Group>
                        <Button className="boton" onClick={() => onSubmit()}>Registrate!</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}