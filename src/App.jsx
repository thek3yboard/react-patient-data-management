import { useEffect, useState } from 'react'
import { PatientCards } from './components/PatientCards.jsx'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
toast.configure()

function App () {
  const [patients, setPatients] = useState([])
  const [validated, setValidated] = useState(false)

  const newPatient = {
    name: '',
    description: '',
    avatar: ''
  }
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    setValidated(false)
  }

  useEffect(() => {
    fetch('https://63bedcf7f5cfc0949b634fc8.mockapi.io/users')
      .then(async res => await res.json())
      .then(res => {
        setPatients(res)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const onInputChange = (e) => {
    newPatient[e.target.name] = e.target.value
  }

  const addNewPatient = () => {
    setPatients(patients => [...patients, newPatient])
    handleClose()
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      toast.error('Patient record couldn`t be created', { theme: 'colored', position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
    } else {
      addNewPatient()
      toast.success('A new patient record has been created successfully', { theme: 'colored', position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>+</Button>
      <PatientCards patients={patients} />

      {show &&
      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
              <Modal.Title>
                Create patient record
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3 form-row">
              <Form.Label>Image URL</Form.Label>
              <Form.Control required type="text" name="avatar" onChange={(e) => onInputChange(e)} />
              <Form.Control.Feedback type="invalid">
                Image URL cannot be empty.
              </Form.Control.Feedback>
            </Row>
            <Row className="mb-3 form-row">
              <Form.Label>Name</Form.Label>
              <Form.Control required type="text" name="name" onChange={(e) => onInputChange(e)} />
              <Form.Control.Feedback type="invalid">
                Name cannot be empty.
              </Form.Control.Feedback>
            </Row>
            <Row className="mb-3 form-row">
            <Form.Label>Description</Form.Label>
              <Form.Control required as="textarea" rows={15} type="text" name="description" onChange={(e) => onInputChange(e)} />
              <Form.Control.Feedback type="invalid">
                Description cannot be empty.
              </Form.Control.Feedback>
            </Row>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit">
                Create
              </Button>
          </Modal.Footer>
        </Form>
      </Modal>}
    </>
  )
}

export default App
