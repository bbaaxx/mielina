# Configuration object example

## Configuration object

    {
      adapters: [ [[PlatformAdapter]] ],
      providers: { nlp: [[Configured NLP Provider]] },
      servers: {
        web: [[ExpressJs *Running* Server Instance]],
        sockets: [[SocketIo *Running* server instance (attached to web server)]],
        database: [[Mongoose instance *already connected*]],
        ...
      },
      impulses: [ [[Impulse]] ], // Sync
      skills: [ [[Skill]] ], // Async
    }
