import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import ErrorComponent from '../components/Error';
import CharacterList from '../components/CharacterList';
import characterRepository from '../repositories/character.repository';

function ConditionalRendering({ data, movePage, onRefresh }) {
  if (data.status === 'LOADING') { return <Loading />; } if (data.status === 'SUCCESS') {
    return (
      <CharacterList
        data={data.results}
        onNext={(data.info.next)
          ? () => { movePage(data.info.next); } : null}
        onPrev={(data.info.prev)
          ? () => { movePage(data.info.prev); } : null}
      />
    );
  } return <ErrorComponent onRefresh={onRefresh} />;
}

function CharacterPage() {
  const [data, setData] = useState({
    status: 'LOADING',
  });

  const getDataCaharacters = async () => {
    setData({
      ...data,
      status: 'LOADING',
    });
    try {
      const res = await characterRepository.getAllCharacter();
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

  const movePage = async (url) => {
    setData({
      ...data,
      status: 'LOADING',
    });
    try {
      const res = await characterRepository.getAllCharacterMovePage(url);
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
    setTimeout(getDataCaharacters, '700');
  }, []);

  return (
    <div>
      <ConditionalRendering
        data={data}
        movePage={(url) => { movePage(url); }}
      />
    </div>
  );
}

export default CharacterPage;
