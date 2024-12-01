import { User } from '../components/User';
import { Admiin } from '../components/Admin';
import { Container } from 'react-bootstrap';
import '../App.css';


export function HomePage() {
    const user = JSON.parse(localStorage.user);

  return(
    <Container>
    {
        user?.rol === "administrator" && (
            <Admiin></Admiin>
        )
    }
    {
        user?.rol === "client" && (
            <User></User>
        )
    }
   
    </Container>
  )
}


