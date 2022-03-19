// API Docs: https://www.kairos.com/docs/api/
// app_id = Kairos' App ID
// app_key = Kairos' App Key
// img = Publicly accessible URL, file upload or Base64 encoded photo
// subject_id = Defined by you. Is used as an identifier for the face.
// gallery_name = Defined by you. Is used to identify the gallery
// optional_data = All optional parameters

class KairosEnrollRequest {
    constructor(app_id = "", app_key = "", use_https=true, store_images=false, callback = ()=>{}) {
        this.app_id  = app_id;
        this.app_key = app_key;
        this.https = use_https;
        this.store_images = store_images;
        this.url = "api.kairos.com/enroll"
        this.optional_data = {}
        this.callback = callback;
    }
    
    getRequestURL() {
        return (this.https ? "https://" : "http://") + this.url;
    }

    setCredentials(app_id, app_key) {
        this.app_id = app_id;
        this.app_key = app_key;
    }

    connectionCallback(callback) {
        this.callback = callback;
    }

    performRequest(img, subject_id, gallery_name) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.getRequestURL(), true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('app_id', this.app_id)
        xhr.setRequestHeader('app_key', this.app_key)
        // From Kairos' API docs:
        // Face metadata extracted from the detected faces are stored for face recognition.
        // Images used for api transactions are stored in the cloud are used strictly for R&D purpose only.
        // To avoid file storage, this must be sent as an HTTP header:
        // store_image: "false"
        xhr.setRequestHeader('store_image', 'false');
        
        // Setting the mandatory data for the request
        let request_data = {};
        request_data['image'] = img;
        request_data['subject_id'] = subject_id;
        request_data['gallery_name'] = gallery_name;
    
        // Setting the optional data for the request
        let optional_data_keys = Object.keys(this.optional_data);
        for (let i = 0; i < optional_data_keys.length; i++)
            request_data[optional_data_keys[i]] = this.optional_data[optional_data_keys[i]];
    
        // Before sending the data I'm setting the function to parse the response
        xhr.addEventListener('loadend', this.callback);

        let json = JSON.stringify(request_data);
        xhr.send(json);
    }
}