const service = require('../../../services/FunGuideService')
const carousel = require('../../../adapters/CarouselAdapter')

function createActivityCarousel(session, args) {
  const funGuideService = new service.FunGuideService(args)
  const carouselAdapter = new carousel.CarouselAdapter(funGuideService, session)
  return carouselAdapter.createActivityCarousel()
}

module.exports = {
  createActivityCarousel
}