import axios from 'axios';
import Cookies from 'js-cookie';

const Exported = {
  get: async (url) => {
    return fetch(url, {headers: buildApiHeaders()})
  },

  // Post a multipart form
  postForm: async (url, method, data, progressCallback) => {
    // We can send a percentage uploaded status to upstream function
    const onProgress = function(progressEvent) {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      progressCallback && progressCallback(percentCompleted)
    }

    const axiosConfig = {
      headers: buildApiHeaders(),
      onUploadProgress: onProgress,
      maxBodyLength: 1000,
      timeout: 5 * 60 * 1000, // 5 minute timeout
    }

    var form_data = new FormData();
    for ( var key in data ) {
        if (method === "PUT" && data[key] === '') continue
        form_data.append(key, data[key]);
    }
  
    if (method === "PUT") {
      return axios.put(url, form_data, axiosConfig)
    }
  
    if (method === "POST") {
      return axios.post(url, form_data, axiosConfig)
    }
  },

  // Post a JSON payload
  postJson: async (url, method, data) => {
    return fetch(url, {
      method: method,
      headers: buildApiHeaders(),
      body: JSON.stringify(data)
    })
  }
}

function buildApiHeaders() {
  return {
    "Content-Type": "application/json",
    "Set-Cookie": Cookies.get('session'),
  }
}

export default Exported