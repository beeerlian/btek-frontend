import { useState, useEffect } from 'react'
import Loading from '../loading/Loading';
import ErrorComponent from '../error/Error';
import CharList from '../char-list/CharList';
import characterRepository from '../../repositories/character.repository';


const Characters = () => {

  const [data, setData] = useState(null);
  const [status, setStatus] = useState('LOADING')

  useEffect(() => {
    setTimeout(getDataCaharacters, "3000")
  }, [])

  const getDataCaharacters = async () => {
    setStatus('LOADING');
    try {
      const res = await characterRepository.getAllCharacter();
      setStatus('SUCCESS')
      setData([...res.data.results])
    } catch (error) {
      setStatus('ERROR')
    }
  }

  const ConditioningComponent = () => {

    switch (status) {
      case 'LOADING':
        return <Loading />
      case 'SUCCESS':
        return <CharList data={data} />
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