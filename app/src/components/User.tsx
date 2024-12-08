import React, { useEffect } from 'react';
import { useState } from "react";
import { Button, Card, Container, Form, Row, Col, Dropdown, Modal } from "react-bootstrap";
import axios from "axios"

export function User() {
    //Definicion del tipo para la tarea
  interface ITask {
    _id?: string;
    title?: string;
    description?: string;
    date?: string;
    isChecked?: boolean;
    userId?: string;
  }

  const [createTask, setCreateTask] = useState<ITask>({});
  const [Tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    getTasks()

  }, []);    

  const [Index, setIndex] = useState<number>(1)
  const [Show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelectIndex = (i: number)=>{
        setIndex(i)
  }

  const getTasks = async ()=>{
    //obtener tareas desde la base de datos
    try {
        const userId = JSON.parse(localStorage.user)._id; // Obtener el userId desde localStorage
        const { data } = await axios.get(`http://localhost:4000/tasks/getTasks/${userId}`); // Pasar userId en la URL
        console.log(data)
        setTasks(data.task); // Establecer las tareas en el estado
    } catch (error) {
        console.log("Error al obtener las tareas", error)
    }
  }

  const onChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    //crear objeto de tarea
    const data = createTask as any;
    const p = e.target.name;
    data[p] = e.target.value;
    data["isChecked"]= false;
    setCreateTask({ ...data })
    console.log(createTask)
}

const sendData = async () => {
    //enviar tarea a la base de datos
    try {
        if (!createTask.title || !createTask.description) {
            alert("Titulo o descripcion no pueden estar vacios");
            return;
        }
        createTask.userId = JSON.parse(localStorage.user)._id;
        console.log("si pasa", createTask)
        await axios.post("http://localhost:4000/tasks/create", createTask);
        console.log("si pasa 2")
        getTasks();
    } catch (error) {
        console.error("Error al crear la tarea:", error);
        alert("Hubo un error al crear la tarea. Inténtalo de nuevo.");
    }
}

const onChangeUpdateTask = async (i: number, e: React.ChangeEvent<HTMLInputElement>) =>{
    //actualizar tarea usando index
  const t= [...Tasks] as any
  const p = e.target.name;

  t[i][p] = e.target.value;
  setTasks(t)
}

const UpdateTask = async () =>{
    //actualizar tarea en la base de datos
    try {
        const updatedTask = Tasks[Index]
         if(!updatedTask.title && !updatedTask.description){
           return alert("Titulo o descripcion no pueden estar vacios")
        }
        await axios.put("http://localhost:4000/tasks/update", updatedTask)
        getTasks()
        
    } catch (error) {
         console.log(error)
        alert("Hubo un error al actualizar la tarea")
    }
}

const deletetask = async (i: number)=>{
    //borrar tarea filtrando index
    try {
        const taskId = Tasks[i]._id 
        console.log(taskId)
        await axios.delete(`http://localhost:4000/tasks/delete/${taskId}`)
        console.log("Se elimino correctamente")
        getTasks()
    } catch (error) {
        console.log(error)
        alert("Hubo un error al borrar la tarea")
    }
}

const handleCheckBox= async (i: number) =>{
    //actualizar estado de la tarea
    try {
        const t= [...Tasks]
        if(!t[i].isChecked){
            t[i].isChecked= true 
        }else{
            t[i].isChecked= false
        }
        setTasks(t)
        await axios.put("http://localhost:4000/tasks/update", t)
        getTasks()
        
    } catch (error) {
        alert("Hubo un error al marcar como completada la tarea")
    }
    }
    
    
  return (
    <Container className='container'>
            <Row>
            <Col>  
            <Card className='createTask'>
                <Card.Title style={{textAlign: "center", padding: "15px"}}>Nueva Tarea</Card.Title>
                <Card.Body>
                <Form>
                        <Form.Group className='form-createTask'>
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control style={{backgroundColor:"#e9d3ff"}} placeholder='Nombre de tu tarea' name="title" onChange={onChangeTask} />
                        </Form.Group>
                        <Form.Group className='form-createTask'>
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control style={{backgroundColor:"#e9d3ff"}} placeholder='Descripcion de tu tarea' name="description" onChange={onChangeTask} />
                        </Form.Group>
                        <Form.Group className='form-createTask'>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control style={{backgroundColor:"#e9d3ff"}} placeholder='Fecha de tu tarea' type="date" name="date" onChange={onChangeTask} />
                        </Form.Group> 
                    <Button style={{marginTop: "10px", alignItems: "center", backgroundColor: "purple"}} onClick={sendData}>Crear Tarea</Button>
                </Form>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card  className='showTask' >
                <Card.Title style={{textAlign: "center", padding: "15px"}} >Tareas Por Hacer</Card.Title>
                <Card.Body>
                <Form >
                {

                    !Tasks   && (
                        <Card.Title style={{textAlign: "center", fontSize:"20px", opacity: 0.5}} >No hay tareas por hacer</Card.Title>
                    )
                }
                {
                Tasks.map((t, i)=>(
                    <Row className='form-showTask' key={i}>
                        <Col>
                            <Form.Check type="checkbox" style={!t.isChecked? {color:"black"}: {color:"green"}} >
                                <Form.Check.Label>{t.title}</Form.Check.Label>
                                <Form.Check.Input style={{ width:"20px", height: "20px", position: 'absolute', right: "90%"}} type="checkbox" isValid checked={t.isChecked} onChange={()=>{handleCheckBox(i)}}/>
                                <Form.Control.Feedback type="valid" style={!t.isChecked? {color:"black"}: {color:"green"}}>
                                    {t.date} - {t.description}
                                </Form.Control.Feedback>
                            </Form.Check>
                        </Col>
                        <Col style={{ width:"20px", position: 'absolute', left: "85%"}}>
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
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                        <Form.Label>Titulo</Form.Label>
                        <Form.Control style={{backgroundColor:"#e9d3ff"}}
                            name="title"
                            autoFocus
                            value={Tasks[Index]?.title || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{onChangeUpdateTask(Index, e)}}
                        />
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control style={{backgroundColor:"#e9d3ff"}}
                            name="date"
                            type="date"
                            autoFocus
                            value={Tasks[Index]?.date || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{onChangeUpdateTask(Index, e)}}
                        />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control style={{backgroundColor:"#e9d3ff"}} as="textarea" rows={3}
                         name="description"
                         value={Tasks[Index]?.description || ""}
                         onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{onChangeUpdateTask(Index, e)}} />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button style={{backgroundColor:"purple"}} onClick={()=>{handleClose()}}>
                        Guardar cambios
                    </Button>
                    </Modal.Footer>
                </Modal>
        </Container>
  );
}


