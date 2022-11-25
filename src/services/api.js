import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tw-integracao.azurewebsites.net'
    // baseURL: 'https://aef2-209-14-227-92.sa.ngrok.io'
});

export default api;