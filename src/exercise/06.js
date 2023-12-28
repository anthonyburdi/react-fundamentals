// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { useRef } from 'react';

function UsernameForm({onSubmitUsername}) {
  // 🐨 add a submit event handler here (`handleSubmit`).
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  //
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0].value
  // 🐨 Call `onSubmitUsername` with the value of the input


  const [error, setError] = React.useState(null)
  const [username, setUsername] = React.useState("")
  const [wasInvalid, setWasInvalid] = React.useState(false)

  const usernameInputRef = useRef()

  function handleSubmit(event) {
    event.preventDefault()
    // const usernameInput = event.target.elements.username.value
    // Extra Credit 1: use refs
    onSubmitUsername(usernameInputRef.current.value)
  }

  // 🐨 add the onSubmit handler to the <form> below

  // 🐨 make sure to associate the label to the input.
  // to do so, set the value of 'htmlFor' prop of the label to the id of input

  // Extra Credit 2: Validate Lowercase
  function handleChange(event) {
    const {value} = event.target
    // Below from Extra Credit 2:
    // const isValid = value === value.toLowerCase()
    // setError(isValid ? null: "Username must be lower case")
    // Extra Credit 3: Convert to lower case for the user
    // ExtraExtra Credit (I just made this up): sticky error msg if we ever have submitted an uppercase char:
    const isValid = value === value.toLowerCase()
    if (!isValid) {
      setWasInvalid(true)
    }
    // For some reason wasInvalid doesn't change right away on first uppercase, so also checking isValid:
    setError(wasInvalid || !isValid ? "Username must be lower case, uppercase characters converted to lowercase." : null)
    const lowerCaseValue = value.toLowerCase()
    setUsername(lowerCaseValue)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input value={username} ref={usernameInputRef} id="username" type="text" onChange={handleChange}/>
      </div>
      <div style={{color: "red"}} role="alert">{error}</div>
      <button disabled={Boolean(error)} type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
