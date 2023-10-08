import { useState, useContext, useRef } from 'react'
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
  const [modalDataAux, setModalDataAux] = useState(null)
  const [validated, setValidated] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [formFields, setFormFields] = useState([])

  const inputRef = useRef()
  const selectRef = useRef()

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    setValidated(false)
  }

  const onInputChange = (e) => {
    setModalDataAux({ ...modalDataAux, [e.target.name]: e.target.value })
  }

  const handleAddField = (e) => {
    e.preventDefault()
    const fields = [...formFields]
    fields.push({
      placeholder: inputRef.current.value || 'label',
      label: inputRef.current.value.toLowerCase() || 'label',
      type: selectRef.current.value || 'text',
      value: ''
    })
    setFormFields(fields)
    modalData[inputRef.current.value.toLowerCase()] = ''
    setToggle(false)
  }

  const addBtnClick = (e) => {
    e.preventDefault()
    setToggle(true)
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      toast.error('Patient record couldn`t be modified', { theme: 'colored', position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
    } else {
      for (const property in modalDataAux) { modalData[property] = modalDataAux[property] }
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
        <Button
          variant="primary"
          onClick={decoratedOnClick}
        >
          Read less
        </Button>
      )
    } else {
      return (
        <Button
          variant="primary"
          onClick={decoratedOnClick}
        >
          Read more
        </Button>
      )
    }
  }

  return (
    <Container fluid>
      <Row xs={1} md={2} lg={3} xl={4} className="g-5">
        {
          props.patients.map((patient) => (
            <div key={patient.id}>
              <Col>
                <Accordion>
                  <Card className="card-center" style={{ width: '18rem' }}>
                    <Card.Img style={{ width: '14em', height: '14em' }} variant="top" src={patient.avatar} />
                    <Card.Body>
                      <Card.Title>{patient.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Created: {dayjs(patient.createdAt).format('MM/DD/YYYY')}</Card.Subtitle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
                              {patient.description}
                            {
                              formFields.map((field, index) => (
                                <div key={index}>
                                  { `${field.label}` in patient
                                    ? <><Card.Subtitle className="mb-2 text-muted subtitle-padding">{field.placeholder}</Card.Subtitle>
                                    {patient[field.label]}</>
                                    : <></>
                                  }
                                </div>
                              ))
                            }
                          </Card.Body>
                        </Accordion.Collapse>
                        <ContextAwareToggle eventKey="0" />
                      <Button variant="secondary" className="edit-button" onClick={() => {
                        handleShow()
                        setModalData(patient)
                        setModalDataAux(patient)
                      }}>Edit</Button>
                    </Card.Body>
                  </Card>
                </Accordion>
              </Col>
            </div>
          ))
        }
      </Row>
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
                <Form.Control required type="text" defaultValue={modalData.avatar} name="avatar" onChange={(e) => onInputChange(e)} />
                <Form.Control.Feedback type="invalid">
                  Image URL cannot be empty.
                </Form.Control.Feedback>
              </Row>
              <Row className="mb-3 form-row">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" defaultValue={modalData.name} name="name" onChange={(e) => onInputChange(e)} />
                <Form.Control.Feedback type="invalid">
                  Name cannot be empty.
                </Form.Control.Feedback>
              </Row>
              <Row className="mb-3 form-row">
                <Form.Label>Description</Form.Label>
                <Form.Control required as="textarea" rows={15} type="text" defaultValue={modalData.description} name="description" onChange={(e) => onInputChange(e)} />
                <Form.Control.Feedback type="invalid">
                  Description cannot be empty.
                </Form.Control.Feedback>
              </Row>
              {
                formFields.map((field, index) => (
                  <div key={index}>
                    { `${field.label}` in modalData
                      ? <Row className="mb-3 form-row">
                      <Form.Label>{field.placeholder}</Form.Label>
                      <Form.Control required type={field.type} name={field.label} defaultValue={modalData[field.label]} onChange={(e) => onInputChange(e)} />
                      <Form.Control.Feedback type="invalid">
                        {field.placeholder} cannot be empty.
                      </Form.Control.Feedback>
                    </Row>
                      : <></>
                    }
                  </div>
                ))
              }
              {!toggle
                ? (
                    <div className="center">
                      <Button variant="dark" onClick={addBtnClick}>Add new field</Button>
                    </div>
                  )
                : (
                    <Row>
                      <Col xs={6}>
                        <Form.Control required type="text" placeholder="Label" ref={inputRef} />
                      </Col>
                      <Col xs={4}>
                        <Form.Select ref={selectRef}>
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                        </Form.Select>
                      </Col>
                      <Col xs={2}>
                        <Button variant="success" onClick={handleAddField}>Add</Button>
                      </Col>
                    </Row>
                  )
              }
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
        </Modal>
      }
    </Container>
  )
}
