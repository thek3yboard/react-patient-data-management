import { useEffect, useState } from 'react'
import { PatientCards } from './components/PatientCards.jsx'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App () {
  const [patients, setPatients] = useState([])
  const newPatient = {
    name: '',
    description: '',
    id: ''
  }
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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
    }
  }

  const addNewPatient = () => {
    setPatients(patients => [...patients, newPatient])
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>+</Button>
      <PatientCards patients={patients} />

      {show &&
      <Modal show={show} fullscreen={true} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>
                <Form.Label>
                  <Form.Control type="text" placeholder="Name" name="name" onChange={(e) => onInputChange(e)} />
                </Form.Label>
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Control as="textarea" rows={15} type="text" placeholder="Description" name="description" onChange={(e) => onInputChange(e)} />
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
              Close
              </Button>
              <Button variant="primary" onClick={addNewPatient}>
              Save Changes
              </Button>
          </Modal.Footer>
      </Modal>}
    </>
  )
}

export default App
