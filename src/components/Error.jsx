function ErrorComponent({ onRefresh }) {
  return (
    <div>
      <button type="button" onClick={onRefresh}>Refresh</button>
    </div>
  );
}

export default ErrorComponent;
