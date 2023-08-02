const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price:{
      type: Number,
      require: true,
    },
    publishedDate: {
        type: String,
        required: true
    },
    //the loai
    genres: {
         type: [String],
         required: true
    },
    imgLink: {
        type: String,
        required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author"
    } 
  });
  
  //
  const authorSchema = new mongoose.Schema({
    name: {
      type: String,
      required:true
    },
    year: {
      type: Number,
      required:true
  },
  imgLink: {
    type: String,
    required: true
  },
  //1 tac gia - n tac pham >
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  });

  let Book = mongoose.model("Book", bookSchema);
  let Author = mongoose.model("Author", authorSchema);
  
  module.exports = { Book, Author };