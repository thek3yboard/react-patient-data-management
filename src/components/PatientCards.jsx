import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
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

  return (
    <Container fluid>
      <Row xs={1} md={3} className="g-5">
        {
          props.patients.map((patient) => (
            <div key={patient.id}>
              <Col>
                <Card className="card" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={patient.avatar} />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{patient.name}</Card.Title>
                    <Card.Text className="card-text">
                      {patient.description}
                    </Card.Text>
                    <Button variant="primary">Ver más</Button>
                    <Button variant="secondary" onClick={() => {
                      handleShow()
                      setModalData(patient)
                    }}>Editar</Button>
                  </Card.Body>
                </Card>
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
