'use strict';

/**
* Module dependencies
**/

var mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    Comment = mongoose.model('Comment'),
    User = mongoose.model('User'),
    async = require('async'),
    fs = require('fs'),
    path = require('path'),
    rimraf = require('rimraf'),
    Epub = require('epub');

exports.allFree = function(req, res) {
  Book
    .find({paid: false})
    .sort('-added')
    .exec(function(err, books) {
      if(err) {
        return res.status(err.status).json({
          message: err.message
        });
      }
      res.json(books);
    });
};

exports.allPaid = function(req, res) {
  Book
    .find({paid: true})
    .sort('-added')
    .exec(function(err, books) {
      if(err) {
        return res.status(err.status).json({
          message: err.message
        });
      }
      res.json(books);
    });
};

// book and its comments
exports.one = function(req, res, next) {
  async.waterfall([
    function(done) {
      // finding document and create plain object to add new property
      Book.findOneAndUpdate({slug: req.params.slug}, {$inc: {views:1}})
          .lean()
          .exec(function(err, book) {
            if(err) {
              return done(err);
            }
            done(null, book);
          });
        },
    function(book, done) {
      Comment.find({book: book._id})
        .sort('-created')
        .exec(function(err, comments) {
          if(err) return done(err);
          done(null, book, comments);
        });
    }
  ], function(err, book, comments) {
    if(err) {
      return res.status(400).json({
        message: err.message
      });
    }
    book.comments = comments;
    res.json(book);
  });
};

exports.best = function(req, res) {
  Book.find({rating: 5})
      .sort('-added')
      .limit(10)
      .exec(function(err, books) {
        if(err) {
          return res.status(400).json({
            message: err.message
          });
        }
        res.json(books);
      });
};

exports.add = function(req, res) {
  // checking if there is a title in req.body to prevent crash when creating dir
  if(!req.body.title) {
    return res.status(400).json({
      message: 'Title is required'
    });
  }  

  var book = new Book(req.body);
  // dir for storing new book
  var title = book.title.replace(/\s+/g, '-');
  var dir = path.normalize(__dirname + '../../../../public/modules/books/books-store/' + title);
  // moving cover and epub form tmp directory to the dir named after title
  async.series([
    function(callback) {
      // creating dir for storing new book
      fs.mkdir(dir, function(err) {
        if(err) {
          return res.status(400).json({
            message: 'Book already exists'
          });
        }
        callback();
      });
    },
    function(callback) {
      // moving cover to the new directorty from tmp
      var index = req.files.cover.path.indexOf('tmp');
      var pathTmp = req.files.cover.path.slice(index + 3);
      var coverPath = dir + pathTmp;
      fs.rename(req.files.cover.path, coverPath, function(err) {
        if(err) return callback(err);
        callback(null, coverPath);
      });
    },
    function(callback) {
      // moving epub to the new directory from tmp
      var index = req.files.epub.path.indexOf('tmp');
      var pathTmp = req.files.epub.path.slice(index + 3);
      var epubPath = dir + pathTmp;
      fs.rename(req.files.epub.path, epubPath, function(err) {
        if(err) return callback(err);
        callback(null, epubPath);
      });
    }
  ], function(err, results) {
    if(err) {
      return res.status(400).json({
        message: err.message
      });
    }
    // adding properties of cover and epub
    book.cover = results[1].slice(results[1].indexOf('/public') + 7);
    book.epub = results[2].slice(results[2].indexOf('/public') + 7);
    book.save(function(err) {
      if(err) {
        return res.status(400).json({
          message: err.message
        });
      }
      res.end();
    });
  });
};

exports.remove = function(req, res) {
  async.waterfall([
    function(done) {
      Book.findOneAndRemove(req.params.slug, function(err, book) {
        if(err) return done(err);
        done(null, book);
      });
    },
    function(book, done) {
      var str = book.cover;
      var index = str.lastIndexOf('/');
      var dir = str.substring(0, index);
      rimraf(path.normalize(__dirname + '../../../../public/' + dir), function(err) {
        if(err) return done(err);
        done(null, book);
      });
    },
    function(book, done) {
      Comment.remove({book: book._id}, done);
    }
  ], function(err) {
    if(err) {
      return res.status(400).json({
        message: err.message
      });
    }
    res.end();
  });
};

exports.rate = function(req, res) {
  async.waterfall([
    function(done) {
      Book.findById(req.params.id, function(err, book) {
        if(err) return done(err);
        done(null, book);
      });
    },
    function(book, done) {
      var total_rates = book.total_rates + 1;
      var total_rating = book.total_rating + req.body.rate;
      var rating = Math.ceil(total_rating / total_rates);
      book.update({$set: {
        total_rates: total_rates,
        total_rating: total_rating,
        rating: rating
      }}, done);
    }
  ], function(err) {
    if(err) {
      return res.status(400).json({
        message: err.message
      });
    }
    res.end();
  });
};

// check credit card and send link for downloading
exports.buy = function(req, res, next) {
  // checking credit card number req.body.card
  // if(req.body.card) isValid, start downloading
  Book.findById(req.params.id, function(err, book) {
    if(err) {
      return res.status(400).json({
        message: err.message
      });
    }
    res.send(book.epub);
  });
};

// downloads file
exports.download = function(req, res) {
  var file = '/public/modules/books/books-store/' + req.params.bookTitle + '/' + req.params.epub;
  res.download(file);
};

exports.addToFavourite = function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if(err) {
      return res.status(400).json({
        message: err.message
      });
    }
    if(user.favourite.indexOf(req.params.id) !== -1) {
      return res.status(400).json({
        message: 'You have already added this book'
      });
    }
    user.favourite.push(req.params.id);

    // find title and author 
    Book.findById(req.params.id, function(err, book) {
      user.history.push({
        date: Date.now(),
        action: 'You added ' + book.title + ' by ' + book.author + ' to Your Favourite Books'
      });

      user.update({$set: user.toObject()}, function(err) {
        if(err) {
          return res.status(400).json({
            message: err.message
          });
        }
        res.end();
      });
    });
  });
};

exports.favourite = function(req, res) {
  User.findById(req.user._id)
      .populate('favourite')
      .exec(function(err, user) {
        if(err) {
          return res.status(400).json({
            message: err.message
          });
        }
        res.json(user.favourite);
      });
};

exports.addToWishlist = function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if(err) {
      return res.status(400).json({
        message: err.message
      });
    }
    if(user.wishlist.indexOf(req.params.id) !== -1) {
      return res.status(400).json({
        message: 'You have already added this book'
      });
    }
    user.wishlist.push(req.params.id);

    // find title and author 
    Book.findById(req.params.id, function(err, book) {
      user.history.push({
        date: Date.now(),
        action: 'You added ' + book.title + ' by ' + book.author + ' to Your Wishlist'
      });
      
      user.update({$set: user.toObject()}, function(err) {
        if(err) {
          return res.status(400).json({
            message: err.message
          });
        }
        res.end();
      });
    });
  });
};

exports.wishlist = function(req, res) {
  User.findById(req.user._id)
      .populate('wishlist')
      .exec(function(err, user) {
        if(err) {
          return res.status(400).json({
            message: err.message
          });
        }
        res.json(user.wishlist);
      });
};

exports.addToMustread = function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if(err) {
      return res.status(400).json({
        message: err.message
      });
    }
    if(user.mustread.indexOf(req.params.id) !== -1) {
      return res.status(400).json({
        message: 'You have already added this book'
      });
    }
    user.mustread.push(req.params.id);

    // find title and author 
    Book.findById(req.params.id, function(err, book) {
     user.history.push({
        date: Date.now(),
        action: 'You added ' + book.title + ' by ' + book.author + ' to Your Must Read Titles'
      });
      
      user.update({$set: user.toObject()}, function(err) {
        if(err) {
          return res.status(400).json({
            message: err.message
          });
        }
        res.end();
      });
    });
  });
};

exports.mustread = function(req, res) {
  User.findById(req.user._id)
      .populate('mustread')
      .exec(function(err, user) {
        if(err) {
          return res.status(400).json({
            message: err.message
          });
        }
        res.json(user.mustread);
      });
};

exports.read = function(req, res) {
  Book.findOne({slug: req.params.slug}, function(err, book) {
    if(err) return res.status(400).json({message: err.message});
    res.send(book.epub);
  });
};


