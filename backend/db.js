const mongoose = require('mongoose')
const mongoURI = "mongodb://0.0.0.0:27017/inotebook?directConnection=true&tls=false&readPreference=primary"

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI)
    console.log("Connected to Mongo Successfully");
  } catch (error) {
    console.error(error)

  }
}

module.exports = connectToMongo;





