const restify = require('restify')
const builder = require('botbuilder')
const philaBot = require('./bots/philaBot/philaBot')
const strategy = require('./bots/philaBot/strategies/mockStrategy')

const connector = new builder.ConsoleConnector().listen()
const bot = new builder.UniversalBot(connector)

philaBot.actionsForBot(bot, strategy)
