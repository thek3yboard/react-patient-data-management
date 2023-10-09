import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

export function CreateRecordModal (props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Form noValidate validated={props.validated} onSubmit={props.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            Create patient record
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3 form-row">
            <Form.Label>Image URL</Form.Label>
            <Form.Control required type="text" name="avatar" onChange={(e) => props.onInputChange(e)} />
            <Form.Control.Feedback type="invalid">
              Image URL cannot be empty.
            </Form.Control.Feedback>
          </Row>
          <Row className="mb-3 form-row">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" name="name" onChange={(e) => props.onInputChange(e)} />
            <Form.Control.Feedback type="invalid">
              Name cannot be empty.
            </Form.Control.Feedback>
          </Row>
          <Row className="mb-3 form-row">
          <Form.Label>Description</Form.Label>
            <Form.Control required as="textarea" rows={15} type="text" name="description" onChange={(e) => props.onInputChange(e)} />
            <Form.Control.Feedback type="invalid">
              Description cannot be empty.
            </Form.Control.Feedback>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button type="submit">
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
