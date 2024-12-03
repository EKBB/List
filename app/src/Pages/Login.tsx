import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Login () {
    interface ILogin {
        email?: string;
        password?: string;
    }

    const [User, setUser] = useState<ILogin>({})
    const navigate = useNavigate();

    const onChangeRegister = (e: React.ChangeEvent<HTMLInputElement>)=>{
        let data: ILogin;
        data = User;
        const p = e.target.name as keyof ILogin;
        data[p] = e.target.value as any;
        setUser({ ...data })
    }

    const onSubmit = () => {
        /* Enviar data al server */
        console.log(User)
        navigate("/homepage")
    }


    return (
        <Container>
            <Card className="login">
                <Form className="formL">
                    <Form.Group className="formG">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control style={{backgroundColor: "#e9d3ff"}} onChange={onChangeRegister} name="email" placeholder="Ingresa tu correo electronico"/>
                    </Form.Group>
                    <Form.Group className="formG">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control style={{backgroundColor: "#e9d3ff"}} onChange={onChangeRegister} name="password" placeholder="Ingresa tu contraseña"/>
                    </Form.Group >
                    <Button className="boton" href="/homepage" onClick={()=> onSubmit()}>Ingresar</Button>
                    <Card.Link href="/register">Registrarse</Card.Link>
                </Form>
            </Card>
        </Container>
    )
}