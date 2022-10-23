import CharItem from "../char-item/CharItem"
import './CharList.css'

const CharList = ({ data }) => {
  return <>
    <div className="char-list">
      {data.map((val, index) => {
        return <CharItem name={val.name} image={val.image} key={String(index)} />
      })}
    </div>
  </>
}

export default CharList