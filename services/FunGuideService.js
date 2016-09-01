const rp = require('request-promise')
const _ = require('lodash')

const FunGuideService = function FunGuideService(tag, skip) {
  this.options = {
    uri: 'https://phillyfunguide.com/api/events',
    qs: {
      apikey: process.env.FUN_GUIDE_API_KEY,
      tag,
      limit: 5,
      skip: skip * 5 || '',
    },
    json: true,
  }
}

FunGuideService.prototype.getData = function getData() {
  console.log(this.options)
  const self = this

  return new Promise((resolve, reject) => {
    rp(self.options)
      .then((result) => {
        console.log(result)
        const mappedResults = self.getEventsForCard(result.items)
        resolve(mappedResults)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

FunGuideService.prototype.getEventsForCard = function getEventsForCard(result) {
  const mostRecent = _.take(result, 5)

  return _.map(mostRecent, (entry) => ({
    title: entry.title,
    url: entry.url,
    image: entry.thumbnail.original,
  }))
}

exports.FunGuideService = FunGuideService
