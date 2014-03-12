'use strict';

angular.module('ellenWebappApp')
  .controller('MainCtrl', function ($scope, FeedService) {
    $scope.feeds = FeedService.all;

    $scope.selected = {};

    $scope.loadFeed = function(feed) {
      $scope.selected = feed;
    }

    $scope.deleteFeed = function(feed) {
      FeedService.delete(feed);
      $scope.selected = {};
    }
  });
