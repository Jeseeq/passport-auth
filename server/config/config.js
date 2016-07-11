module.exports = {
  db: process.env.MONGO_URL || 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/passport',
};
