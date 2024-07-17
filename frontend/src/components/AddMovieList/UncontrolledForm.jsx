const UncontrolledForm = ({ onSubmit, children }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    onSubmit(Object.fromEntries(formData.entries()))
  }

  return (
    <form onSubmit={handleSubmit}>
      {children}
      <button type="submit">Submit</button>
    </form>
  )
}

export default UncontrolledForm
