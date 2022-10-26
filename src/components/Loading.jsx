import reactLogo from '../assets/react.svg';

function Loading({ height, width }) {
  return (
    <div className="Loading" style={{ height, width }}>
      <img src={reactLogo} className="logo react" alt="React logo" />
    </div>
  );
}

export default Loading;
