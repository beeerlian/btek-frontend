import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import ErrorComponent from '../components/Error';
import characterRepository from '../repositories/character.repository';

function CharacterDetailCard({ data }) {
  const navigate = useNavigate();

  return (
    <div className="char-detail-card">
      <img src={data.image} alt={data.name} />
      <div className="char-detail-card name">{data.name}</div>
      <div className="char-detail-card species">{data.species}</div>
      <button type="button" onClick={() => { navigate(-1); }}> Back</button>
    </div>
  );
}

function CharacterDetail() {
  const { id } = useParams();
  const [data, setData] = useState({ status: 'LOADING' });

  const getCharacterDetail = async () => {
    setData({
      ...data,
      status: 'LOADING',
    });
    try {
      const res = await characterRepository.getCharacterDetail(id);
      setData({
        ...res.data,
        status: 'SUCCESS',
      });
    } catch (error) {
      setData({
        ...data,
        status: 'ERROR',
      });
    }
  };

  useEffect(() => {
    setTimeout(getCharacterDetail, '700');
  }, []);

  return (
    <div>
      <ConditionalRendering data={data} onRefresh={getCharacterDetail} />
    </div>
  );
}

function ConditionalRendering({ data, onRefresh }) {
  if (data.status === 'LOADING') { return <Loading />; } if (data.status === 'SUCCESS') {
    return (<CharacterDetailCard data={data} />);
  } return <ErrorComponent onRefresh={onRefresh} />;
}

export default CharacterDetail;
