import { Link } from 'react-router-dom';

function CharItem({ data }) {
  return (
    <Link to={`/character/${data.id}`}>
      <div className="char-item">
        <img className="char-item-img" src={data.image} alt={data.name} />
        <p className="char-item name">{data.name}</p>
      </div>
    </Link>
  );
}

export default CharItem;
