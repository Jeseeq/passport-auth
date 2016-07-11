module.exports = {
  db: 'mongodb://' + (process.env.DOKKU_MONGO_NEWMONGO_PORT_27017_TCP_ADDR || process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/passport' 
}
