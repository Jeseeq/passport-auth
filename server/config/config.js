module.exports = {
  db: process.env.MONGO_URL || 'mongodb://' + (process.env.DB_ADDR || 'localhost') + '/passport',
}
