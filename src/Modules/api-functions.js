import axios from "axios";
class API {
    constructor(url){
        this.url = url
    }
    getOptions(method, path){
        return {
            method: method,
            url: this.url+path,
        }
    }
    async postFilter(to, from){
        let options = this.getOptions('post', '/postfilter')
        options.data = {
            to: to.toISOString(),
            from: from.toISOString()
        }
        let orders = axios.request(options)
        return orders;
    }
}
export default API;