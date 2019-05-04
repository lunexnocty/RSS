const path = require('path')
module.exports = {

  resolver: {
    extraNodeModules: {}
  },
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, '../web/shared')
  ]
}