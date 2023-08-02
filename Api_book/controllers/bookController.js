const {Book, Author} = require("../model/model")


const bookController = {
    //Add a book 
      addABook: async (req, res)=>{
          try {
              const newBook = new Book(req.body);
              const savedBook = await newBook.save();
              // if ojbId author add with book then book will be added in authorSchema/ books[]  
              if(req.body.author){ 
                  const author = Author.findById(req.body.author)// find author with obj id and update this 
                  await author.updateOne({$push: {books: savedBook.id}})  // push because books is array
              }
              res.status(200).json(savedBook);
          } catch (err) {
              res.status(500).json(err.msg);
          }
      },
      //get All book
      
      getAllBooks: async (req, res) => {
          try {
            const allBooks = await Book.find().populate("author");
            res.status(200).json(allBooks);
          } catch (err) {
            res.status(500).json(err.msg);
          }
        },
      
      //get A Book
      getABook: async (req, res) => {
        try {
          const book = await Book.findById(req.params.id).populate("author");
          res.status(200).json(book);
        } catch (err) {
          res.status(500).json(err.msg);
        }
      },
      //UPDATE BOOK
      updateBook: async (req, res) => {
        try {
          const book = await Book.findById(req.params.id);
          await book.updateOne({ $set: req.body });
          res.status(200).json("Updated successfully!");
        } catch (err) {
          res.status(500).json(err);
        }
      },

      //DELETE BOOK
      deleteBook: async (req, res) => {
        try {
          await Author.updateMany(
            { books: req.params.id },
            { $pull: { books: req.params.id } }
          );
          await Book.findByIdAndDelete(req.params.id);
          res.status(200).json("Deleted successfully");
        } catch (err) {
          res.status(500).json(err);
        }
      }
};

module.exports = bookController;