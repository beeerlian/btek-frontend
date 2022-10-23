import CharItem from './CharItem';

function CharacterList({ data, onNext, onPrev }) {
  return (
    <>
      <div className="char-list">
        {data.map((val, index) => <CharItem data={{ ...val }} key={`char-list-${index + 1}`} />)}
      </div>
      <div className="pagination">
        {(onPrev) ? <button type="submit" onClick={onPrev}>Prev</button> : null}
        {(onNext) ? <button type="submit" onClick={onNext}>Next</button> : null}
      </div>
    </>
  );
}

export default CharacterList;
