import { useState } from "react"
import { Button, Card , Container, Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export function Register () {

    interface IUser {
        name?: string;
        email?: string;
        lastName?: string;
        password?: string;
        rol?: string
    }

    const [User, setUser] = useState<IUser>({})
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
            if (!User.name || !User.lastName || !User.email || !User.password) {
                alert("Todos los campos son requeridos");
                return;
            }
           User.rol="client"
           const res= await axios.post("http://localhost:4000/users/create", User) 
           console.log("Pasa",User, res)
           navigate("/")
        } catch (error) {
           alert("Ocurrio un error")
        }
        console.log(User)
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
                            <Form.Control style={{backgroundColor: "#e9d3ff"}} onChange={onChangeRegister} name="lastName" placeholder="Ingresa tu apellido" />
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