
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.elhrj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Error while connecting to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;