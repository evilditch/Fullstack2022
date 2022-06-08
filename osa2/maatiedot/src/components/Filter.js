const Filter = (props) => {
  return (
    <>
      <input type="search" value={props.value} onChange={props.handleChange} />
      <p>Tuloksia {props.countries.length}</p>
    </>
  )
}

export default Filter