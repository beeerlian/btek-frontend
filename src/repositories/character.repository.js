import client from '../apis/client.api'

const getAllCharacter = () => {
  return client.get('https://rickandmortyapi.com/api/character');
}

export default { getAllCharacter }