const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')

const app = express()
const port = 5000


connectToMongo()
  .then(() => {
    // Available Routes
    app.use(express.json())
    app.use(cors())
    app.use('/api/auth', require('./routes/auth'))
    app.use('/api/notes', require('./routes/notes'))

    app.listen(port, () => {
      console.log(`iNotebook Backend listening on port http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

