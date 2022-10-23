import { useState, useEffect } from 'react'
import Loading from '../loading/Loading';
import ErrorComponent from '../error/Error';
import CharList from '../char-list/CharList';
import characterRepository from '../../repositories/character.repository';


const Characters = () => {
  const [data, setData] = useState({
    characters: null,
    status: "LOADING"
  });

  useEffect(() => {
    setTimeout(getDataCaharacters, "3000")
  }, [])

  const getDataCaharacters = async () => {
    setData({
      ...data,
      status: "LOADING"
    });
    try {
      const res = await characterRepository.getAllCharacter();
      setData({
        characters: [...res.data.results],
        status: "SUCCESS"
      });
    } catch (error) {
      setData({
        ...data,
        status: "ERROR"
      });
    }
  }

  const ConditioningComponent = () => {

    switch (data.status) {
      case 'LOADING':
        return <Loading />
      case 'SUCCESS':
        return <CharList data={data.characters} />
      case 'ERROR':
        return <ErrorComponent onRefresh={getDataCaharacters} />
      default:
        return <ErrorComponent onRefresh={getDataCaharacters} />
    }
  }

  return <>
    <div className='character'>
      {ConditioningComponent()}
    </div>
  </>
}

export default Characters