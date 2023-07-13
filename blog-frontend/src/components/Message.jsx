const Message = ({ message, error }) => {
  return (
    <h1 className={(error) ? 'error message' : 'validation message'}>
      {message}
    </h1>
  )
};

export default Message;