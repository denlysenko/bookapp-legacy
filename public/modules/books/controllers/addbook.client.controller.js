'use strict';

angular.module('books')
  .controller('AddbookController', ['$scope','Upload', function($scope, Upload) {
    $scope.title = 'Add Book';
    // init value for paid model
    $scope.book = {};
    $scope.book.paid = false;
    $scope.add = function() {
      $scope.success = $scope.error = null;
      // Object File to upload created by the browser is an Array. To extract exactly file using indexes 
      var files = [$scope.cover[0], $scope.epub[0]],
          filesName = ['cover', 'epub'];
      Upload.upload({
        url: '/book/add',
        method: 'POST',
        file: files,
        fields: $scope.book,
        headers: { 'Content-Type': 'multipart/form-data' },
        fileFormDataName: filesName
      }).success(function() {
        // clear form's fields
        $scope.book = null;
        $scope.success = true;
      })
      .error(function(response) {
        $scope.error = response.message;
      });
    };
  }]);
