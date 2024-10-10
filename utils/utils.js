export default class Utils {
    static getBaseUrl(){
        //trocar entre as env
        switch(process.env.NODE_ENV){
            case 'development':
                return `http://host.docker.internal:3000/api`
            case 'production':
                return `http://localhost:3000/api`
        }
    }
}