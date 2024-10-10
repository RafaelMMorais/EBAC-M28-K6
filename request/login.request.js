import { check } from "k6"
import http from "k6/http"
import Utils from "../utils/utils"

export default class Login {
    #token

    access(user, pass) {
        let response = http.post(`${Utils.getBaseUrl()}/login`, JSON.stringify(
            {
                //Pegar user e pass do cod user.json
                "username": user,
                "password": pass
            }
        ), {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        //Pegar token de acesso após o login
        this.#token = response.json('accessToken')
        //Checar resposta da API
        check(response, {
            "status deve ser 201": (r) => r.status === 201
        });
    }

    //Salvar o token de login
    getToken(){
        return this.#token
    }
}