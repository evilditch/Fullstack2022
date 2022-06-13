const Filter = (props) => {
  return (
    <>
      <label htmlFor='filter'>Filter by name</label>
      <input type='search'
        id='filter'
        value={props.filterText}
        onChange={props.handleChange} />
    </>
  )
}

export default Filter
