import React from 'react';
import { useState } from "react";
import { Button, Card, Container, Form, Row, Col, Dropdown, Modal } from "react-bootstrap";
import "../App.css"

export function User() {

    //Definicion del tipo para la tarea
  interface ITask {
    title?: string;
    description?: string;
    date?: string;
    isDone?: boolean;
  }

  const [createTask, setCreateTask] = useState<ITask>({});
  const [Tasks, setTasks] = useState<ITask[]>([]);

  const [Index, setIndex] = useState<number>(1)
  const [Show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelectIndex = (i: number)=>{
        setIndex(i)
  }

  
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
    if(!createTask.title && !createTask.description){
        console.log("campo vacio")
    }else{
        const newTask = {...createTask}
        setTasks((prevTasks) => [...prevTasks, newTask]);
        
    }
    console.log(Tasks)
}
const handleUpdate =(i: number, e: React.ChangeEvent<HTMLInputElement>) =>{
    //actualizar tarea usando index
  const t= [...Tasks]
  const p = e.target.name as keyof ITask;

  t[i][p] = e.target.value as any;
  setTasks(t)
}

const deletetask = (i: number)=>{
    //borrar tarea filtrando index
    setTasks((prevTasks) => prevTasks.filter((_, index) => index !== i));   
}

const handleCheckBox= (i: number) =>{
    const t= [...Tasks]
    if(!t[i].isDone){
        t[i].isDone= true 
    }else{
        t[i].isDone= false
    }
    setTasks(t)
}


  return (
    <Container>
            <Row>
            <Col md="auto">  
            <Card className='createTask'>
                <Card.Title style={{ textAlign:"center"}}>Crear Nueva Tarea</Card.Title>
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
                    <Button style={{ margin:0 }} variant="light" onClick={handleAddTask}>Crear Tarea</Button>
                </Form>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card  className='showTask' >
                <Card.Title style={{ textAlign:"center"}}>Tareas Por Hacer</Card.Title>
                <Card.Body>
                <Form style={{ width: "fit-content", padding:"26px", textAlign:"center" }}>
                {
                Tasks.map((t, i)=>(
                    <Row style={{ marginBottom:"10px"}} key={i}>
                        <Col>
                            <Form.Check type="checkbox" style={!t.isDone? {color:"black"}: {color:"green"}} >
                                <Form.Check.Label>{t.title}</Form.Check.Label>
                                <Form.Check.Input style={{ fontSize:"30px"}} type="checkbox" isValid checked={t.isDone} onChange={()=>{handleCheckBox(i)}}/>
                                <Form.Control.Feedback type="valid" style={!t.isDone? {color:"black"}: {color:"green"}}>
                                    {t.date} - {t.description}
                                </Form.Control.Feedback>
                            </Form.Check>
                        </Col>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">                                
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" onClick={()=>{handleShow(); handleSelectIndex(i)}}>Editar</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" onClick={()=>{deletetask(i)}}>Eliminar</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>    
                ))
                }
                </Form>
                              
                </Card.Body>
            </Card>
            </Col>
            </Row>
                <Modal show={Show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Editar Tarea</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                        <Form.Label>Titulo</Form.Label>
                        <Form.Control
                            name="title"
                            autoFocus
                            value={Tasks[Index]?.title || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleUpdate(Index, e)}}
                        />
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                            name="date"
                            type="date"
                            autoFocus
                            value={Tasks[Index]?.date || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleUpdate(Index, e)}}
                        />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control as="textarea" rows={3}
                         name="description"
                         value={Tasks[Index]?.description || ""}
                         onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleUpdate(Index, e)}} />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Guardar cambios
                    </Button>
                    </Modal.Footer>
                </Modal>
        </Container>
  );
}


