import { useState, useRef } from "react"

export function useModalForm () {
  const [formText, setFormText] = useState({})
  const [formValues, setFormValues] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const modal = useRef()

  const showModalForm = (text, submit, profile = null) => {
    setFormText({title: text, submit: submit})
    setFormValues(profile)
    setModalOpen(true)
    modal.current.showModal()
  }

  const closeModalForm = () => {
    modal.current.close()
    setModalOpen(false)
  }

  return {formText, formValues, modalOpen, modal, showModalForm, closeModalForm}
}