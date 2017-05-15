'use strict';

const
  _ = require('lodash'),
  Promise = require('bluebird'),
  { execAsync } = Promise.promisifyAll(require('child_process'))

const
  inputImageId = process.argv[2],
  regex = new RegExp(inputImageId, 'i')

console.log('Troubleshooting image: targetParent')

Promise.join(
  execAsync(`node findParent.js ${inputImageId}`),
  execAsync(`node findChildren.js ${inputImageId}`),
  (parentRes, childrenRes) => {
    console.log('==> Parents of image, up to FROM image')
    console.log(parentRes)
    console.log('==> Leaf-node images referencing the target image in their inheritance chain')
    console.log(childrenRes)
  }
)


