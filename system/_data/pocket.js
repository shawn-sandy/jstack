
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
  const url = 'https://api.notion.com/v1/databases/d3ac8596aa1e4bc1871ad115808cb16b/query'

  const json = await Cache(url, {
    duration: '0d',
    type: 'json',
    directory: '_data/notion',
    fetchOptions: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2021-05-13',
        'Content-Type': 'application/json'
      }
    }
  })

  const cache = flatcache.load('notion.json', path.resolve('./_data'))
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
