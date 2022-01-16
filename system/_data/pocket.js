
const Cache = require('@11ty/eleventy-cache-assets')
require('dotenv').config()
const flatcache = require('flat-cache')
const path = require('path')
const fetch = require('node-fetch')
module.exports = async function () {
  // const json = await Cache('https://getpocket.com/v3/get?consumer_key=100474-e14d0e097a2869ccce09ddc&access_token=e43cb712-269d-36fe-d253-c3bbee&tag=11ty&count=10', {
  //   duration: '1d',
  //   type: 'json',
  //   directory: '_data/eleventy',
  //   fetchOptions: {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  // })

  const cache = flatcache.load('pocket', path.resolve('./_datacache'))
  const key = getDateKey()
  const cachedData = cache.getKey(key)
  if (!cachedData) {
    console.log('Fetching new npm download count…')
    const newData = await fetch('https://getpocket.com/v3/get?consumer_key=100474-e14d0e097a2869ccce09ddc&access_token=e43cb712-269d-36fe-d253-c3bbee&tag=11ty&count=10')
      .then(res => res.json())
      .then(json => {
        return {
          json
        }
      })

    cache.setKey(key, newData)
    cache.save()
    return newData
  }

  return cachedData
}
