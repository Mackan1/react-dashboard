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
    async postFilter(to, from, storeCountryFilter){
        let options = this.getOptions('post', '/postfilter')
        options.data = [{
            to: to.toISOString(),
            from: from.toISOString()
        }]
        if(storeCountryFilter === undefined || storeCountryFilter.storeFilter === undefined){
            options.data.push({
                "store": {
                        "$nin": []
                    },
                })
        } else {
            options.data.push(storeCountryFilter.storeFilter)
        };
        if( storeCountryFilter === undefined || storeCountryFilter.countryFilter === undefined){
           
            options.data.push({
                "shipping_address.country_code": {
                        "$nin": []
                    },
                })
                
        } else{
            options.data.push(storeCountryFilter.countryFilter)
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
    async getFulfillmentStatus(){
        let options = this.getOptions('get', '/fulfillmentStatus')
        let orders = axios.request(options)
        return orders;
    }
}

const api = new API('https://ng-wh-dashboard-bs2ur3fy2q-uc.a.run.app')

export const getDataFiltered = async (from, to, storeCountryFilter) => {
    let data = await api.postFilter(new Date(from), new Date(to), storeCountryFilter)
    return data
}

export const getTagsFiltered = async (store) => {
    let data;
    if(store){
       data = await api.postTagsFilter(store)
    } else {
       data = await api.postTagsFilter(null)
    }
    return data
}

export const getAllCountries = async () => {
    let data = await api.getCountries()
    return data
}

export const getAllTags = async () => {
    let data = await api.getTags()
    return data
}

export const getAllStatus = async () => {
    let data = await api.getStatus()
    return data
}

export const getAllCenter = async () => {
    let data = await api.getCenter()
    return data
}

export const getAllStores = async () => {
    let data = await api.getStore()
    return data
}

export const getAllFulfillmentStatus = async () => {
    let data = await api.getFulfillmentStatus()
    return data
}
