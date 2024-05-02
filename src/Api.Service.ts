const base_url = `http://127.0.0.1:5000`;

export default {

    get(path: string, params?: any): Promise<any> {
        var requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }

        var url = new URL(`${base_url}/${path}`);
        if (params) {
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        }

        return fetch(url.href, requestOptions)
            .then(res => res.json())
            .then(data => {
                return data;
            })
    },

    post(path: string, data?: object, params?: any): Promise<any> {
        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        var url = new URL(`${base_url}/${path}`);
        if (params) {
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        }

        return fetch(url.href, requestOptions)
            .then(res => res.json())
            .then(data => {
                    return data;
            })
    }
}
