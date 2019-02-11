# Configuration object example

    /* A bare-bones configuration object:
    {
      servers: { // these can be acquired from the @mielina/base-servers package
        web: <express application instance>,
        database: <mongodb db instance>,
        sockets: <socket.io instance (Attached to webserver)>
      },
      adapters: [ { inputs$: Observable, commands$: Subject, reactions$: Subject } ],
      nlpProvider: () => Promise<{
        type: String,
        lang: String,
        action: String,
        parameters: [{ [paramName]: String }],
        nlpFulfilled: Boolean,
        query: String
      }>,
      skills: {
        impulses: [A (Context) => Context],
        reactions: [A (Context) => Promise<Context>]
      }
    }
    */
