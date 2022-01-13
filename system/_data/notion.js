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
    duration: '10s',
    type: 'json',
    directory: 'system/_data/notion',
    fetchOptions: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2021-05-13',
        'Content-Type': 'application/json'
      }
    }
  })

  const cache = flatcache.load('notion.json', path.resolve('./system/_data'))
  const key = getCacheKey()
  cache.setKey(key, json)
  cache.save()

  return {
    json
  }
}
