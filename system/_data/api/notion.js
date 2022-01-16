
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

  if (!process.env.NOTION_TOKEN) {
    return null
  }

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
  return {
    json
  }
}
