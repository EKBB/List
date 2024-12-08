import { Nav, Navbar } from 'react-bootstrap'

export const Header = () => {
    const logout = () => {
        localStorage.clear()
        window.location.href = "/"
    }
    
    return (
        <Navbar bg="dark" data-bs-theme="dark" className='justify-content-center mb-3 bg-body-tertiary'>
            <Nav>
                <Nav.Item>
                    <Nav.Link onClick={() => logout()}>Cerrar sesión</Nav.Link>
                </Nav.Item>

            </Nav>
        </Navbar>
    )
}