const carousel = require('../../../adapters/CarouselAdapter')
const builder = require('botbuilder')


function createActivityCarousel(session, args) {
  const carouselAdapter = new carousel.CarouselAdapter(null, session)
  var mockResponse = [
    { title: 'test_activity1 for ' + args, image: 'image1.jpg', url: 'http://test/test1' },
    { title: 'test_activity2 for ' + args, image: 'image2.jpg', url: 'http://test/test2' },
    { title: 'test_activity3 for ' + args, image: 'image3.jpg', url: 'http://test/test3' },
    { title: 'test_activity4 for ' + args, image: 'image4.jpg', url: 'http://test/test4' },
    { title: 'test_activity5 for ' + args, image: 'image5.jpg', url: 'http://test/test5' },
  ]

  const msg = new builder.Message(session)
                         .attachmentLayout(builder.AttachmentLayout.carousel)
                         .attachments(carouselAdapter.activitiesAttachment(mockResponse, session))

  builder.Prompts.choice(session, msg, mockResponse.map(activity => activity.title))
}

module.exports = {
  createActivityCarousel
}