Mielina: A nervous system for your bot.
=======================================

## What is this?
Mielina can be described as either a framework or a foundation to build your
chatbot upon. It runs on NodeJs and features an opinionated set of patterns and
tools to build a multi-platform chatbot.

It implements abstractions to describe the system in a reasonably intuitive
way by representing its functions as simulations of the functions performed by
the human nervous system during a conversation coordinating the bot
actions by transmitting signals to the relevant part of the super-system.

### Right, so... what is a super-system ?
A super-system is just a large system _integrated_ by many smaller systems or
sub-systems. A modern chatbot is a super-system as it usually depends on one or
more i/o platforms (messaging platforms in this case), one or more NLP systems,
fulfillment sub-systems which in many cases are super-systems in their own merit.

Mielina is a solution to connect and coordinate all the components in a chatbot
super-system.

## How to use it ?
Check the `reference-implementation` package for a simple (evolving) example of
how to get an NLP powered console bot running.

I am currently documenting that code but for now the most confusing part is the
env variables as they are composed of api access credentials. More docs on this
coming soon . . .

## Why?
Writing a bot with my kids to help them get better at playing LoL I realized
that the abstractions available for the task were too complicated for non
developers to understand, so I challenged myself to write something that could
be abstracted into concepts more relatable to our everyday communications
experience. This is how bot-annah was born.

### Bot-annah
Mielina is an evolution of an [older experiment](https://github.com/bbaaxx/bot-annah) 
called Bot-annah. She is fully operational, under light maintenance and open source.

## License
MIT
