const builder = require('botbuilder')
const welcomeMessage = 'Philabot helps you to find the latest and greatest artistic, cultural, ' +
  'sporting, and entertainment events happening in Philly!'

const activityArray = [
  'Classes & Workshops',
  'Culinary',
  'Dance',
  'Film',
  'Free',
  'Gay & Lesbian',
  'Kids',
  'Lectures & Literature',
  'Museums',
  'Music',
  'Outdoors',
  'Sports',
  'Theatre',
  'Tours',
]

function actionsForBot(bot, strategy) {
  bot.endConversationAction('goodbye', 'Goodbye :)', { matches: /^goodbye/i })

  bot.dialog('/', [
    (session) => {
      console.log(session)
      session.send(welcomeMessage)
      session.beginDialog('/activity')
    },
  ])

  bot.dialog('/activity', [
    (session) => {
      console.log(session)
      builder.Prompts.choice(session,
        "Let's go! What type of activities/events interest you?", activityArray)
    },
    (session, results, next) => {
      console.log(session)
      if (results.response) {
        session.beginDialog('/carousel', results.response.entity)
      } else {
        session.send('ok')
        next()
      }
    },
    (session) => {
      console.log(session)
      builder.Prompts.confirm(session, 'Do you want to search again?')
    },
    (session, results) => {
      if (results.response) {
        session.beginDialog('/activity')
      } else {
        session.endConversation('I hope I helped find you something to do!')
      }
    },
  ])

  bot.dialog('/carousel', [
    (session, args) => {
      session.sendTyping()
      strategy.createActivityCarousel(session, args)
    },
    (session, results) => {
      console.log(results)
      session.endDialog('You choose %s, it does look cool.', results.response.entity)
    },
  ])
}

module.exports = {
  actionsForBot,
  activityArray,
}
