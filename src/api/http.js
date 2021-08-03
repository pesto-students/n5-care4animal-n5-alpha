import axios from 'axios'

export default function executeApi(method, requestUrl, payload) {
    // get Headers if any and add it to axios request
  
    return axios({ method, url: requestUrl, payload}).then( response => response, error => error)
}