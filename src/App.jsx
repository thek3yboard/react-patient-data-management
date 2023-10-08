import { useEffect, useState } from 'react'
import { PatientCards } from './components/PatientCards.jsx'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App () {
  const [patients, setPatients] = useState([])
  const [validated, setValidated] = useState(false)

  const newPatient = {
    name: '',
    description: '',
    id: ''
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
    if (e.target.name === 'name') {
      newPatient.name = e.target.value
    } else if (e.target.name === 'description') {
      newPatient.description = e.target.value
    } else if (e.target.name === 'image') {
      newPatient.avatar = e.target.value
    }
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
    } else {
      addNewPatient()
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
              <Form.Control required type="text" placeholder="Image URL" name="image" onChange={(e) => onInputChange(e)} />
              <Form.Control.Feedback type="invalid">
                Image URL cannot be empty.
              </Form.Control.Feedback>
            </Row>
            <Row className="mb-3 form-row">
              <Form.Control required type="text" placeholder="Name" name="name" onChange={(e) => onInputChange(e)} />
              <Form.Control.Feedback type="invalid">
                Name cannot be empty.
              </Form.Control.Feedback>
            </Row>
            <Row className="mb-3 form-row">
              <Form.Control required as="textarea" rows={15} type="text" placeholder="Description" name="description" onChange={(e) => onInputChange(e)} />
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
