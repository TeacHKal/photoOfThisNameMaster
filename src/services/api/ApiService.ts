import axios, {AxiosRequestConfig} from 'axios';

export default class ApiService {

    constructor() {};

    static request(config: AxiosRequestConfig) {
        return axios.request(config).then()
    }
}
