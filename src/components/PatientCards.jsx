import { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import AccordionContext from 'react-bootstrap/AccordionContext'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import './PatientCards.css'

export function PatientCards (props) {
  const [show, setShow] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [validated, setValidated] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    setValidated(false)
  }

  const onInputChange = (e) => {
    if (e.target.name === 'name') {
      modalData.name = e.target.value
    } else if (e.target.name === 'description') {
      modalData.description = e.target.value
    } else if (e.target.name === 'image') {
      modalData.avatar = e.target.value
    }
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      toast.error('Patient record couldn`t be modified', { theme: 'colored', position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
    } else {
      handleClose()
      toast.success('Patient record has been updated successfully', { theme: 'colored', position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
    }
  }

  function ContextAwareToggle ({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext)

    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    )

    const isCurrentEventKey = activeEventKey === eventKey

    if (isCurrentEventKey) {
      return (
        <button
          type="button"
          style={{ backgroundColor: 'blue' }}
          onClick={decoratedOnClick}
        >
          Read less
        </button>
      )
    } else {
      return (
        <button
          type="button"
          style={{ backgroundColor: 'blue' }}
          onClick={decoratedOnClick}
        >
          Read more
        </button>
      )
    }
  }

  return (
    <Container fluid>
      <Row xs={1} md={3} className="g-5">
        {
          props.patients.map((patient) => (
            <div key={patient.id}>
              <Col>
                <Accordion>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={patient.avatar} />
                    <Card.Body>
                      <Card.Title>{patient.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Created: {dayjs(patient.createdAt).format('MM/DD/YYYY')}</Card.Subtitle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>{patient.description}</Card.Body>
                        </Accordion.Collapse>
                        <ContextAwareToggle eventKey="0" />
                      <Button variant="secondary" onClick={() => {
                        handleShow()
                        setModalData(patient)
                      }}>Editar</Button>
                    </Card.Body>
                  </Card>
                </Accordion>
              </Col>
            </div>
          ))
        }
      </Row>
      {show && <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              Create patient record
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3 form-row">
              <Form.Control required type="text" placeholder="Image URL" defaultValue={modalData.avatar} name="image" onChange={(e) => onInputChange(e)} />
              <Form.Control.Feedback type="invalid">
                Image URL cannot be empty.
              </Form.Control.Feedback>
            </Row>
            <Row className="mb-3 form-row">
              <Form.Control required type="text" placeholder="Name" defaultValue={modalData.name} name="name" onChange={(e) => onInputChange(e)} />
              <Form.Control.Feedback type="invalid">
                Name cannot be empty.
              </Form.Control.Feedback>
            </Row>
            <Row className="mb-3 form-row">
              <Form.Control required as="textarea" rows={15} type="text" placeholder="Description" defaultValue={modalData.description} name="description" onChange={(e) => onInputChange(e)} />
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
                Save Changes
              </Button>
          </Modal.Footer>
        </Form>
      </Modal>}
    </Container>
  )
}
