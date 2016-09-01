##Overview

A bot configured to work with [Microsoft's Bot Framework](https://dev.botframework.com/) using the [Node BotBuilder SDK](https://github.com/Microsoft/BotBuilder). Uses the PhillyFunGuide API to find recommendations of things to do in the Philly area.

To run on a server,  MICROSOFT_APP_ID and MICROSOFT_APP_PASSWORD must be provided as environmental variables. They can be obtained through the process described at: https://dev.botframework.com/bots/new.

To utilize the PhillyFunGuide API, an API Key must be obtained and provided as the environmental variable FUN_GUIDE_API_KEY.

To run locally on the console: run `npm run console`. 

##Code linting

The code is linted with [eslint](http://eslint.org/) using AirBnB style guidelines.

##Testing

Tests are located at test/index. Run with `npm test`.