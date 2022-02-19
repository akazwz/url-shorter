/** @type {import('next').NextConfig} */
module.exports = {
  async redirects () {
    return [
      {
        source: '/:shortid',
        destination: '/api/:shortid',
        permanent: true,
      },
    ]
  },
}
