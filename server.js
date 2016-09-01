const restify = require('restify')
const builder = require('botbuilder')
const philaBot = require('./bots/philaBot/philaBot')
const strategy = require('./bots/philaBot/strategies/philaBotStrategy')

const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD,
})

const bot = new builder.UniversalBot(connector)
const server = restify.createServer()

server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log('%s listening to %s', server.name, server.url)
})

server.post('/api/messages', connector.listen())

console.log(server)

philaBot.actionsForBot(bot, strategy)
