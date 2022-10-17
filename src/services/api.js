import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tw-integracao.azurewebsites.net',
});

export default api;