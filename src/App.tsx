import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { Button, Card, Container, Form, Row, Col,Dropdown } from "react-bootstrap";

function App() {

  interface ITask {
    title?: String;
    description?: String;
    date?: String;
    isDone?: Boolean;
  }

  const [createTask, setCreateTask] = useState<ITask>({});

  const [Tasks, setTasks] = useState<ITask[]>([]);

  
  const onChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    //crear objeto de tarea
    let data: ITask;
    data = createTask;
    const p = e.target.name as keyof ITask;
    data[p] = e.target.value as any;
    data["isDone"]= false;
    setCreateTask({ ...data })
    console.log(createTask)
}

const handleAddTask =()=>{
    //guardar objeto en arreglo
    if(!createTask.title || !createTask.description){
        console.log("campo vacio")
    }else{
        const newTask = {...createTask}
        setTasks((prevTasks) => [...prevTasks, newTask]);
        
    }
    console.log(Tasks)
}
const handleUpdate =(i: number, e: React.ChangeEvent<HTMLInputElement>)=>{
  const t= {...Tasks}
  const p = e.target.name as keyof ITask;

  t[i][p] = e.target.value as any;
  setTasks(t)
}

const deletetask = (i: number)=>{
    setTasks((prevTasks) => prevTasks.filter((_, index) => index !== i));
    
}

  return (
    <Container style={{backgroundColor:"black"}}>
            <Row>
            <Col md="auto">  
            <Card style={{marginLeft: 0, width: "fit-content", textAlign:"center"}}>
                <Card.Title>Crear Nueva Tarea</Card.Title>
                <Card.Body>
                <Form>
                        <Form.Group>
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control placeholder='Nombre de tu tarea' name="title" onChange={onChangeTask} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control placeholder='Descripcion de tu tarea' name="description" onChange={onChangeTask} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control placeholder='Fecha de tu tarea' type="date" name="date" onChange={onChangeTask} />
                        </Form.Group> 
                    <Button onClick={handleAddTask}>Crear Tarea</Button>
                </Form>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card style={{width:"70%", marginRight: "0"}}>
                <Card.Title style={{ textAlign:"center"}}>Tareas Por Hacer</Card.Title>
                <Card.Body>
                {
                Tasks.map((t, i)=>(
                    <Row key={i}>
                        <Col>
                            <Form.Check type="checkbox" >
                                <Form.Check.Label>{t.title}</Form.Check.Label>
                                <Form.Check.Input type="checkbox" isValid />
                                <Form.Control.Feedback type="valid">
                                    {t.date} - {t.description}
                                </Form.Control.Feedback>
                            </Form.Check>
                        </Col>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">                                
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" >Editar</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" onClick={() =>
                                                            setTasks((prevTasks) =>
                                                                prevTasks.filter((_, index) => index !== i)
                                                            )
                                                        }>Eliminar</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>    
                ))
                }
                              
                </Card.Body>
            </Card>
            </Col>
            </Row>
        </Container>
  );
}

export default App;

/* import { useState } from "react";
import { Button, Card, Container, Form, Row, Col,Dropdown } from "react-bootstrap";

export  const Task = ()=>{

    const [createTask, setCreateTask] = useState({});

    const [Task, setTask] = useState([]);

    const onChangeTask = (e) => {
        //crear objeto de tarea
        const data = createTask;
        data[e.target.name] = e.target.value;
        data["isDone"]= false;
        setCreateTask({ ...data })
        console.log(createTask)
    }

    const handleAddTask =()=>{
        //guardar objeto en arreglo
        if(!createTask.title || !createTask.description){
            console.log("campo vacio")
        }else{
            const newTask = {...createTask}
            setTask((prevTasks) => [...prevTasks, newTask]);
            
        }
        console.log(Task)
    }

    const deletetask = (i)=>{
        setTask((prevTasks) => prevTasks.filter((_, index) => index !== i));
    }

    return (
        <Container style={{backgroundColor:"black"}}>
            <Row>
            <Col md="auto">  
            <Card style={{marginLeft: 0, width: "fit-content", textAlign:"center"}}>
                <Card.Title>Crear Nueva Tarea</Card.Title>
                <Card.Body>
                <Form>
                        <Form.Group>
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control placeholder='Nombre de tu tarea' name="title" onChange={onChangeTask} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control placeholder='Descripcion de tu tarea' name="description" onChange={onChangeTask} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control placeholder='Fecha de tu tarea' type="date" name="date" onChange={onChangeTask} />
                        </Form.Group> 
                    <Button onClick={handleAddTask}>Crear Tarea</Button>
                </Form>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card style={{width:"70%", marginRight: "0"}}>
                <Card.Title style={{ textAlign:"center"}}>Tareas Por Hacer</Card.Title>
                <Card.Body>
                {
                Task.map((t, i)=>(
                    <Row key={i}>
                        <Col>
                            <Form.Check type="checkbox" >
                                <Form.Check.Label>{t.title}</Form.Check.Label>
                                <Form.Check.Input type="checkbox" isValid />
                                <Form.Control.Feedback type="valid">
                                    {t.date} - {t.description}
                                </Form.Control.Feedback>
                            </Form.Check>
                        </Col>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">                                
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" >Editar</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" onClick={() =>
                                                            setTask((prevTasks) =>
                                                                prevTasks.filter((_, index) => index !== i)
                                                            )
                                                        }>Eliminar</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>    
                ))
                }
                              
                </Card.Body>
            </Card>
            </Col>
            </Row>
        </Container>
    );
};

 */