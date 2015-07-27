'use strict';

module.exports = function(app) {
  var books = require('../../app/controllers/books/books.server.controller');
  var comments = require('../../app/controllers/comments/comments.server.controller');
  var users = require('../../app/controllers/users.server.controller');

  app.route('/book/add').post(users.hasAuthorization(['admin']), books.add);
  app.route('/book/browse').get(books.allFree);
  app.route('/book/buy').get(books.allPaid);
  // load book and all its comments
  app.route('/book/browse/:author/:slug')
      .get(books.one)
      .delete(users.hasAuthorization(['admin']), books.remove);
  app.route('/book/buy/:author/:slug')
  		.get(books.one)
  		.delete(users.hasAuthorization(['admin']), books.remove);
  app.route('/book/buy/:id').post(books.buy); 
  app.route('/public/modules/books/books-store/:bookTitle/:epub').get(books.download);   
  app.route('/book/rate/:id').post(books.rate);
  app.route('/book/:id/comment').post(comments.add);
  app.route('/book/favourite/:id?')
      .get(books.favourite)
      .post(books.addToFavourite);
  app.route('/book/wishlist/:id?')
      .get(books.wishlist)
      .post(books.addToWishlist);
  app.route('/book/mustread/:id?')
      .get(books.mustread)
      .post(books.addToMustread);    
  app.route('/book/best').get(books.best);
  app.route('/book/read/:author/:slug').get(books.read);
};