import { useState } from "react"
import { Button, Card , Form} from "react-bootstrap";
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
        <>
          <Card>
                <Card.Body>
                    <Card.Title>Formulario para registro de usuarios</Card.Title>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control onChange={onChangeRegister} name="name" placeholder="Ingresa tu nombre" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Apellidos:</Form.Label>
                            <Form.Control onChange={onChangeRegister} name="last_name" placeholder="Ingresa tu apellido" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo:</Form.Label>
                            <Form.Control onChange={onChangeRegister} name="email" type="email" placeholder="Ingresa tu correo" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control onChange={onChangeRegister} name="password" type="password" placeholder="Ingresa tu contraseña" />
                        </Form.Group>
                        <Button onClick={() => onSubmit()}>Registrate!</Button>
                    </Form>
                </Card.Body>
            </Card></>
    )
}