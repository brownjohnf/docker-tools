'use strict';

const
  Promise = require('bluebird'),
  { execAsync } = Promise.promisifyAll(require('child_process'))

const
  startingImage = process.argv[2]

console.log(startingImage)

const getParent = (imageId) => {
  return execAsync(`docker inspect ${imageId}`)
  .then(json => {
    const image = JSON.parse(json)[0]
    console.log(`Id: ${image.Id} => Parent: ${image.Parent}`)

    if (image.Parent === '') {
      return image
    }

    return getParent(image.Parent)
  })
  .catch(err => {
    console.log(err.message)
  })
}

getParent(startingImage)
.then(image => {
  console.log(image.Id, image.RepoTags)
})

