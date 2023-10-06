import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import './PatientsCards.css'

export function PatientsCards (props) {
  const [show, setShow] = useState(false)
  const [dataModal, setDataModal] = useState(null)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Container fluid>
      <Row xs={1} md={3} className="g-5">
        {
          props.patients.map((patient) => (
            <div key={patient.id}>
              <Col>
                <Card className="card" style={{ width: '18rem' }}>
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{patient.name}</Card.Title>
                    <Card.Text className="card-text">
                      <img src={patient.avatar} alt="Logo" />
                      <p>{patient.description}</p>
                    </Card.Text>
                    <Button variant="primary">Ver más</Button>
                    <Button variant="secondary" onClick={() => {
                      handleShow()
                      setDataModal(patient)
                    }}>Editar</Button>
                  </Card.Body>
                </Card>
              </Col>

              {show && <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>{dataModal.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body><p>dsadsad</p></Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                      Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                      Save Changes
                      </Button>
                  </Modal.Footer>
              </Modal>}
            </div>
          ))
        }
      </Row>
    </Container>
  )
}
