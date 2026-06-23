import { useState, useRef } from "react"

export function useModalForm () {
  const [formInfo, setFormInfo] = useState({})
  const [formValues, setFormValues] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const modal = useRef()

  const showModalForm = (text, submit, mode, profile = null) => {
    setFormInfo({title: text, submit: submit, mode: mode})
    setFormValues(profile)
    setModalOpen(true)
    modal.current.showModal()
  }

  const closeModalForm = () => {
    setFormInfo({})
    setFormValues(null)
    modal.current.close()
    setModalOpen(false)
  }

  return {formInfo, formValues, modalOpen, modal, showModalForm, closeModalForm}
}