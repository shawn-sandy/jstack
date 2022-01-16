
const Cache = require('@11ty/eleventy-cache-assets')
require('dotenv').config()
const flatcache = require('flat-cache')
const path = require('path')

function getCacheKey () {
  const date = new Date()
  return `${date.getUTCFullYear()}-${
    date.getUTCMonth() + 1
  }-${date.getUTCDate()}`
}
module.exports = async function () {

  const json = await Cache('https://getpocket.com/v3/get?consumer_key=100474-e14d0e097a2869ccce09ddc&access_token=e43cb712-269d-36fe-d253-c3bbee&tag=11ty&count=10', {
    duration: '1d',
    type: 'json',
    directory: '_data/eleventy',
    fetchOptions: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  })

  const cache = flatcache.load('eleventy.json', path.resolve('./_data'))
  const key = getCacheKey()
  // const cachedData = cache.getKey(key)

  cache.setKey(key, json)
  cache.save()

  return {
    json
  }
}
// https://getpocket.com/v3/oauth/request
// consumer_key=1234-abcd1234abcd1234abcd1234&
// redirect_uri=pocketapp1234:authorizationFinished
