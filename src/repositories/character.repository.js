import client from '../apis/client.api';

const getAllCharacter = () => client.get('https://rickandmortyapi.com/api/character');

const getAllCharacterMovePage = (url) => client.get(url);

const getCharacterDetail = (id) => client.get(`https://rickandmortyapi.com/api/character/${id}`);

export default { getAllCharacter, getAllCharacterMovePage, getCharacterDetail };
