import "./CharItem.css"
const CharItem = ({ name, image }) => {
  return <>
    <div className="char-item">
      <img src={image} alt={name} />
      <p>{name}</p>
    </div>
  </>
}

export default CharItem