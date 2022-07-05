const Notification = ({ message }) => {
  if (message === null) {
    return
  }

  return (
    <div className='notification-message' role='status'>
      <p>{message}</p>
    </div>
  )
}

export default Notification