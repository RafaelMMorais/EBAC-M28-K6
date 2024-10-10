import { group } from 'k6';
import Login from '../request/login.request';
import data from '../data/users.json';
import User from '../request/user.request';

//Teste de performance 
export const options = {
    stages: [
        {duration: '10s', target: 10},//10 VUs durante 10 segundos
        {duration: '5s', target: 50}, //50 VUs durante 5 segundos
        {duration: '10s', target: 10}, //10 VUs durante 10 segundos
        {duration: '5s', target: 0} //0 VUs durante 5 segundos
    ],
    thresholds: {
        http_req_duration: ['p(99) < 1000']
    }
}

export default function() {
    let login = new Login()
    let user = new User()
    
    group('login and get token', () => {
        login.access(data.usuarioOk.user, data.usuarioOk.pass)
    })
    
    group('list users', () => {
        user.list(login.getToken())
    })
}
