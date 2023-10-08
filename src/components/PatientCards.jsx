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
import './PatientCards.css'

export function PatientCards (props) {
  const [show, setShow] = useState(false)
  const [modalData, setModalData] = useState(null)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onInputChange = (e) => {
    if (e.target.name === 'name') {
      modalData.name = e.target.value
    } else if (e.target.name === 'description') {
      modalData.description = e.target.value
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
          <Modal.Header closeButton>
              <Modal.Title>
                <Form.Label>
                  <Form.Control type="text" defaultValue={modalData.name} name="name" onChange={(e) => onInputChange(e)} />
                </Form.Label>
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Control as="textarea" rows={15} type="text" defaultValue={modalData.description} name="description" onChange={(e) => onInputChange(e)} />
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
              Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
              Save Changes
              </Button>
          </Modal.Footer>
      </Modal>}
    </Container>
  )
}
