import { useEffect, useState } from 'react'
import { PatientsCards } from './components/PatientsCards.jsx'
import { ModalPatient } from './components/ModalPatient.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App () {
  const [patients, setPatients] = useState([])

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

  function abrirModal (patient) {
    return (
      <>
        <ModalPatient patient={patient} />
      </>
    )
  }

  return (
    <>
      <PatientsCards patients={patients} abrirModal={abrirModal} />
    </>
  )
}

export default App
