import { useEffect, useState } from 'react'
import { CreateRecordModal } from './components/CreateRecordModal.jsx'
import { PatientCards } from './components/PatientCards.jsx'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
toast.configure()

function App () {
  const [patients, setPatients] = useState(null)
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
      {patients
        ? <><h1>Patient Records</h1>
      <Button variant="primary" className="new-patient-button" onClick={handleShow}>Create new patient record</Button>
      <PatientCards patients={patients} />
      </>
        : <></>}

      {show &&
      <CreateRecordModal handleShow={handleShow} handleClose={handleClose} handleSubmit={handleSubmit} onInputChange={onInputChange} show={show} validated={validated} />
      }
    </>
  )
}

export default App
