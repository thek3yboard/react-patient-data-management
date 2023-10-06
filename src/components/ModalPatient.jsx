import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export function ModalPatient (props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    handleShow()
    console.log('dsdsads')
  }, [])

  return (
    <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.patient.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body><p>{props.patient.description}</p></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
