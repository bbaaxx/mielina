Mielina: A nervous system for your bot.
=======================================

## What is this?
Mielina can be described as either a framework or a foundation to build your
chatbot upon. It runs on NodeJs and features an opinionated set of patterns and
tools to build a multi-platform chatbot.

It implements abstractions to describe the system in a reasonably intuitive
way by representing its functions as simulations of those functions performed by
the human nervous system during a conversation which is to coordinate the bot
actions by transmitting signals to the relevant part of the super-system.

### Right, so... what is a super-system ?
A super-system is just a large system _integrated_ by many smaller systems or
sub-systems. A modern chatbot is a super-system as it usually depends on one or
more i/o platforms (messaging platforms in this case), one or more NLP systems,
fulfillment sub-systems which in many cases are super-systems in their own merit.

Mielina is a solution to connect and coordinate all the components in a chatbot
super-system.

## How to use it ?
For now do the basic `npm i && npm start`, and open a code editor while I figure
out a better way to handle multi package repos. More instructions coming soon...

## Why?
Writing a bot with my kids to help them get better at playing LoL I realized
that the abstractions available for the task were too complicated for non
developers to understand, so I challenged myself to write something that could
be abstracted into concepts more relatable to our everyday communications
experience. This is how bot-annah was born.

### Bot-annah
Mielina is a fork of an older experiment called Bot-annah. As of right
now bot-annah is fully operational, under maintenance and it is open source.

## License
MIT
