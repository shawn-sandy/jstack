
const Cache = require('@11ty/eleventy-cache-assets')
require('dotenv').config()

module.exports = async () => {
  // add a try catch to handle errors
  try {
    const url = 'https://getpocket.com/v3/get?consumer_key=100474-e14d0e097a2869ccce09ddc&access_token=e43cb712-269d-36fe-d253-c3bbee&tag=11ty&count=10'

    const response = await Cache(url, {
      duration: '0d',
      type: 'json',
      directory: '_data/response/pocket'
    })

    // console.log(response.list)
    return {
      list: response.status
    }
  } catch (error) {
    console.log(error)
  }
}
