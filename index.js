const axios = require('axios')

const without = (object, ...keys) => {
  const result = Object.assign(object)
  for (const key of keys) {
    delete result[key]
  }
  return result
}

module.exports = target => {
  const request = axios.create({ baseURL: target })
  return async context => {
    const response = await request({
      url: context.url,
      method: context.method,
      headers: without(context.headers, 'host'),
      data: context.req,
      responseType: 'stream',
      validateStatus: status => true,
      maxRedirects: 0
    })
    context.body = response.data
    context.status = response.status
    context.message = response.statusText
    context.set(response.headers)
  }
}
