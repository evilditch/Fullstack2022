const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification" role="status">
    {message}
    </div>
  )
}

export default Notification
