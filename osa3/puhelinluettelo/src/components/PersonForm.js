const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <label htmlFor='name'>Name:</label>
      <input id='name'
        type='text'
        value={props.nameValue}
        onChange={props.handleChangeName} />
      <label htmlFor='phone'>Phone:</label>
      <input id='phone'
        type='text'
        value={props.phoneValue}
        onChange={props.handleChangePhone} />
      <button type="submit">Add</button>
    </form>
  )
}

export default PersonForm
