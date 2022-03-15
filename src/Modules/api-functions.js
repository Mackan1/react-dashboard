import axios from "axios";
export class API {
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

    async postTagsFilter(store){
        let options = this.getOptions('post', '/postTagsfilter')
        if(store === null || store === undefined ){
            options.data = {
                "store": {
                    "$nin": []
                }
            };
        } else if (store.length > 0){
            options.data = {
                "store": {
                    "$in": store
                }
            };
        }
        let tags = axios.request(options)
        return tags;
    }

    async getCountries(){
        let options = this.getOptions('get', '/countries')
        let orders = axios.request(options)
        return orders;
    }
    async getTags(){
        let options = this.getOptions('get', '/tags')
        let orders = axios.request(options)
        return orders;
    }
    async getStatus(){
        let options = this.getOptions('get', '/status')
        let orders = axios.request(options)
        return orders;
    }
    async getCenter(){
        let options = this.getOptions('get', '/center')
        let orders = axios.request(options)
        return orders;
    }
    async getStore(){
        let options = this.getOptions('get', '/shops')
        let orders = axios.request(options)
        return orders;
    }
}

export const getDataFiltered = async (from, to) => {
    const api = new API('http://localhost:4000')
    let data = await api.postFilter(new Date(from), new Date(to))
    return data
}

export const getTagsFiltered = async (store) => {
    const api = new API('http://localhost:4000')
    let data;
    if(store){
       data = await api.postTagsFilter(store)
    } else {
       data = await api.postTagsFilter(null)
    }
    return data
}

export const getAllCountries = async () => {
    const api = new API('http://localhost:4000')
    let data = await api.getCountries()
    return data
}

export const getAllTags = async () => {
    const api = new API('http://localhost:4000')
    let data = await api.getTags()
    return data
}

export const getAllStatus = async () => {
    const api = new API('http://localhost:4000')
    let data = await api.getStatus()
    return data
}

export const getAllCenter = async () => {
    const api = new API('http://localhost:4000')
    let data = await api.getCenter()
    return data
}

export const getAllStores = async () => {
    const api = new API('http://localhost:4000')
    let data = await api.getStore()
    return data
}
