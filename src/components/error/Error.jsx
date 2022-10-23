

const ErrorComponent = ({ onRefresh }) => {
  return <>
    <div>
      <button onClick={onRefresh}>Refresh</button>
    </div>
  </>
}

export default ErrorComponent