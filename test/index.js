/* eslint no-unused-expressions: "warn" */

const expect = require('chai').expect
const builder = require('botbuilder')
const philaBot = require('../bots/philaBot/philaBot')
const strategy = require('../bots/philaBot/strategies/mockStrategy')

const connector = new builder.ConsoleConnector().listen()
const bot = new builder.UniversalBot(connector)

philaBot.actionsForBot(bot, strategy)

describe('the conversation', () => {
  let session = (function initializeSession() {
    let sessionInstance

    bot.beginDialogAction('start_test', '/test', { matches: /^start_test/i })

    bot.dialog('/test', [
      (_session) => {
        sessionInstance = _session
      },
    ])

    connector.processMessage('start_test')
    return sessionInstance
  }());

  (function keepSessionObjectUpdated() {
    bot.on('routing', (_session) => {
      session = _session
    })
  }())

  function storeSentMessagesIn(array) {
    bot.on('send', (message) => {
      array.push(message)
    })
  }

  describe('dialog', () => {
    const dialogs = []

    describe('the welcome dialog', () => {
      before(() => {
        storeSentMessagesIn(dialogs)
        session.beginDialog('/')
      })

      it('should send a description of the bot', () => {
        expect(dialogs[0].text).to.include(
          'Philabot helps you to find the latest and greatest artistic, ' +
          'cultural, sporting, and entertainment events happening in Philly!')
      })

      it('should route the conversation to the /activity dialog', () => {
        expect(session.sessionState.callstack.map(call => call.id)).to.include('*:/activity')
      })

      it('should tell the user to make a selection', () => {
        expect(dialogs[1].text).to.include(
          'Let\'s go! What type of activities/events interest you?')
      })

      it('should send a list of activities', () => {
        expect(session.dialogData.listStyle).to.not.be.null
      })

      it('should send a list of activities that match those defined by bot ', () => {
        expect(session.dialogData.enumValues).to.eq(philaBot.activityArray)
      })
    })

    describe('answering the welcome message with an invalid response', () => {
      before(() => {
        connector.processMessage('200')
      })

      it('should send a reprompt message', () => {
        expect(dialogs.length).to.eq(3)
      })

      it('should tell the user to rechoose', () => {
        expect(dialogs[2].text).to.eq(
          'I didn\'t understand. Please choose an option from the list.')
      })
    })

    describe('answering the welcome message with a valid response', () => {
      before(() => {
        connector.processMessage('2')
      })

      it('should route the conversation to the /carousel dialog', () => {
        expect(session.sessionState.callstack.map(call => call.id)).to.include('*:/carousel')
      })

      it('should send a typing message', () => {
        expect(dialogs.map(dialog => dialog.type)).to.include('typing')
      })

      it('should send a carousel message as prompt', () => {
        expect(session.dialogData.prompt.attachmentLayout).to.eq('carousel')
      })

      it('the carousel prompt should contain 5 culinary-related choices', () => {
        expect(session.dialogData.enumValues).to.deep.eq(
           ['test_activity1 for Culinary',
            'test_activity2 for Culinary',
            'test_activity3 for Culinary',
            'test_activity4 for Culinary',
            'test_activity5 for Culinary'])
      })
    })
  })
})
