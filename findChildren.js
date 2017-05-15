'use strict';

const
  _ = require('lodash'),
  Promise = require('bluebird'),
  { execAsync } = Promise.promisifyAll(require('child_process'))

const
  targetParent = process.argv[2],
  regex = new RegExp(targetParent, 'i')

console.log(targetParent)


const findParent = (targetParent, imageId) => {
  if (imageId === '') return false

  return execAsync(`docker inspect ${imageId}`)
  .then(json => {
    const image = JSON.parse(json)[0]

    if (regex.test(image.Parent)) {
      console.log('found child')
      return true
    }

    return findParent(targetParent, image.Parent)
  })
  .catch(err => {
    console.log(err.message)
  })
}

execAsync(`docker images -q`)
.then(stdout => {
  return _.split(stdout, '\n')
})
.filter(imageId => {
  // crawl history of each image, looking for target
  return findParent(targetParent, imageId)
})
.map(imageId => {
  return execAsync(`docker inspect ${imageId}`)
  .then(json => {
    return JSON.parse(json)[0]
  })
})
.then(images => {
  for (const image of images) {
    console.log(image.Id, image.RepoTags)
  }
})

