const BASE_URL =
    'http://ec2-3-122-253-30.eu-central-1.compute.amazonaws.com:5500/api/v1'

export const fetchApi = async (path, options = {}) => {
    const requestOptions = {
        method: options.method || 'GET',

        headers: { UserId: 'Yryskeldi', 'Content-type': 'application/json' },
    }

    if (requestOptions.method !== 'GET') {
        requestOptions.body = JSON.stringify(options.body)
    }

    const response = await fetch(`${BASE_URL}/${path}`, requestOptions)

    if (!response.ok) {
        throw new Error('something went wrong')
    }
    const result = await response.json()

    return result
}
