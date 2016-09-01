const builder = require('botbuilder')

const CarouselAdapter = function CarouselAdapter(service, session) {
  this.service = service
  this.session = session
}

CarouselAdapter.prototype.buildActivityCard = function buildActivityCard(activity) {
  return new builder.HeroCard(this.session)
                    .title(activity.title)
                    .images([
                      builder.CardImage.create(this.session, activity.image)
                             .tap(builder.CardAction.showImage(this.session, activity.image)),
                    ])
                    .buttons([
                      builder.CardAction.openUrl(this.session, activity.url, 'Description'),
                      builder.CardAction.imBack(this.session, activity.title, 'This looks cool!'),
                    ])
}

CarouselAdapter.prototype.activitiesAttachment = function activitiesAttachment(serviceResponse) {
  return serviceResponse.map(activity => this.buildActivityCard(activity))
}

CarouselAdapter.prototype.createActivityCarousel = function createActivityCarousel() {
  Promise.resolve(this.service.getData()).then((response) => {
    const msg = new builder.Message(this.session)
                         .attachmentLayout(builder.AttachmentLayout.carousel)
                         .attachments(this.activitiesAttachment(response, this.session))

    builder.Prompts.choice(this.session, msg, response.map(activity => activity.title))
  },
  (error) => {
    console.log(error)
    this.session.endDialog('Something went wrong, let\'s start over.')
  })
}

exports.CarouselAdapter = CarouselAdapter
