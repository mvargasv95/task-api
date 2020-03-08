import mongoose from 'mongoose'

export default (db: string) => {
  const connect = () => {
    mongoose
      .connect(db, { useNewUrlParser: true })
      .then(() => {
        return console.info(`Successfully connected to MongoDB on ${db}`)
      })
      .catch(e => {
        console.error('Error connecting to database: ', e)
        return process.exit(1)
      })
  }
  connect()

  mongoose.connection.on('disconnected', connect)
}
