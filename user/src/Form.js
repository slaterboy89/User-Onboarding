import React, {useState} from 'react'

export default function Form(props) {
    const [names, setNames] =useState({
      username:'',
      email:'',
      password: '',
      terms: false
    })
    // const { name, update, submit } = props

    const onChange = evt => {
        setNames ({ ...names, [evt.target.username]: evt.target.value})
      
    }

    const onSubmit = evt => {
        evt.preventDefault()
        const newUser ={
            ...names,
            userID: Date.now()
        }
        props.addnewUser(newUser);
    }
    console.log(props)
    return (
        <form className= 'form container' onSubmit = {onSubmit}>
            <div className= 'form-group submit'>
                <h2>Add Teammate</h2>
                { <button disabled = { !names.name || !names.email ||!names.password }>submit</button> }
            </div>
            <div className = 'form-group inputs'>
            <label htmlFor = 'NameInput'>Name:&nbsp;
                <input
                id = 'nameInput'
                name = 'name'
                type = 'text'
                placeholder = 'Enter Name'
                maxLength = '20'
                value = {names.username}
                onChange = {onChange}
                />
                </label>

            <label htmlFor = 'emailInput'>Email:&nbsp;
                <input
                    id = 'emailInput'
                    name = 'email'
                    type = 'email'
                    placeholder = 'Enter email'
                    maxLength = '25'
                    value = {names.email}
                    onChange = {onChange}
                    />
            </label>
                
            <label>Password:&nbsp;
            <input
             name = 'password' value = {names.password} onChange = {onChange}
             type = 'password'
             placeholder = 'Enter password'
             maxLength = '15'
             value = {names.password}
             onChange = {onChange}
            />
            </label>
            </div>
            </form>
    )
}