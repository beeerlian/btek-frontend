function Button({
  children,
  onClick, type, isLoading,
}) {
  return (
    <button
      className="btn"
      // eslint-disable-next-line react/button-has-type
      type={`${type || 'button'}`}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? <i className="fa fa-circle-o-notch fa-spin" /> : (children ?? 'Click') }

    </button>
  );
}

export default Button;
