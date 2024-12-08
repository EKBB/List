import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export function Login () {
    interface ILogin {
        email?: string;
        password?: string;
    }

    const [User, setUser] = useState<ILogin>({})
    const navigate = useNavigate();

    const onChangeRegister = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const data = User as any;
        const p = e.target.name;
        data[p] = e.target.value;
        setUser({ ...data })
    }

    const onSubmit = async () => {
        /* Enviar data al server */
        try {
            const res = await axios.post("http://localhost:4000/users/login", User) 
            const user = res.data.user;
            user.logined= true; 
                localStorage.user = JSON.stringify(user)
                navigate("/homepage")
             alert("Inicio de sesion Correcto")
          } catch (error) {
             alert("Usuario o Contraseña incorrecta")
             return
          }
          console.log(User)
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
                    <Button className="boton" onClick={()=> onSubmit()}>Ingresar</Button>
                    <Card.Link href="/register">Registrarse</Card.Link>
                </Form>
            </Card>
        </Container>
    )
}