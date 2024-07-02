module.exports = {
  // basePath: '/lakshya-next',
  // assetPrefix: '/lakshya-next',
  async rewrites() {
    return [
      {
        source: '/blogs',
        destination: '/blog'
      },
      {
        source: '/courses',
        destination: '/course'
      }
    ]
  },
}
