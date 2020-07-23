import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form'

import formSchema from '../validation/formSchema'
import axios from 'axios'
import * as yup from 'yup'

const initialValues = [
  {
    username: '',
    email: '',
    password: ''
  }
]

const initialErrors = {
  username: '',
  email: '',
  password: '',
  terms: false
}

const initialTeamList = []
const initialDisabled = true

const AxiosGet = () => {
  return Promise.resolve({ status: 200, success: true, data: initialTeamList })
}

const AxiosPost = ( url, { name, email, password, terms }) => {
  const newTeammate = { id: uuid(), name, email, password, terms }
  return Promise.resolve({ status: 200, success: true, data: newTeammate })
}

function App() {
  const [ team, setTeam ] = useState(initialTeamList)
  const [ formValues, setFormValues ] = useState(initialValues)
  const [ formErrors, setFormErrors ] = useState(initialErrors)
  const [ disabled, setDisabled ] = useState(initialDisabled)

  const getTeam = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        setTeam(res.data)
      })
      .catch(err => {
        console.log('error')
      })
  }

  const postNewTeammate = newTeammate => {
    axios.post('https://reqres.in/api/users', newTeammate)
      .then(res => {
        setTeam([res.data, ...friends])
        setFormValues(initialValues)
      })
      .catch(err => {
        console.log('error')
      })
  }

  const updateForm = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })

      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })

      setFormValues({
        ...formValues,
        [name]: value
      })
  }
  const checkbox = (name, isChecked) => {
    setFormValues({
      ...formValues,
      terms: {
        ...formValues.terms,
        [name]: isChecked
      }
    })
  }
  
  const submit = () => {
    const newTeammate = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: Object.keys(formValues.terms).filter(hb => formValues.terms[hb])
    }
    postNewTeammate(newTeammate)
  }

  useEffect(() => {
    getTeam()
  }, [])

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form
          values = {formValues}
          updateForm = {updateForm}
          checkbox = {checkbox}
          submit = {submit}
          disabled = {disabled}
          errors = {formErrors}
        />

        {
          team.map(fr => {
            return (
              <Teammate key = {fr.id} details = {fr} />
            )
          })
        }
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

