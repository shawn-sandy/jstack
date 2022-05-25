// @ts-check

// eslint-disable-next-line no-unused-vars
function imgError (event) {
  // console.log(`Image loading error ${event.currentTarget.src}`)
  event.currentTarget.src = 'https://via.placeholder.com/800'
}

const imgs = [...document.getElementsByTagName('img')]

imgs.forEach((img) => {
  img.addEventListener('error', imgError)
})
