
const Cache = require('@11ty/eleventy-cache-assets')
require('dotenv').config()

module.exports = async () => {
  // add a try catch to handle errors
  if (!process.env.NOTION_TOKEN) {
    return null
  }
  const token = process.env.POCKET_TOKEN
  const accessToken = process.env.POCKET_ACCESS_TOKEN
  try {
    const url = `https://getpocket.com/v3/get?consumer_key=${token}&access_token=${accessToken}&tag=react&count=10`

    const response = await Cache(url, {
      duration: '0d',
      type: 'json',
      directory: '_data/pocket'
    })
    // console.log(response.list)
    return {
      response
    }
  } catch (error) {
    console.log(error)
  }
}
