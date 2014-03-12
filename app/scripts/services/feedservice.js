'use strict';

angular.module('ellenWebappApp')
  .factory('FeedService', function ($firebase, firebaseRef, UserService) {
    
    var ref = firebaseRef();
    var fb = $firebase(ref);
    var feeds = fb.$child('feeds');

    return {
      all: feeds,
      // add: function(post) {
      //   var user = UserService.getCurrent();

      //   post.dateCreated = Firebase.ServerValue.TIMESTAMP;
      //   post.author = {id: user.id, name: user.name, pic: user.pic};
      //   post.upvotes = 0;

      //   return feeds.$add(post).then(function(refPost){
      //     // add id
      //     feeds.$child(refPost.name()).$child('id').$set(refPost.name());
      //     // persist post to author
      //     user.$child(post.type).$child(refPost.name()).$set({id: refPost.name()});
      //     // persist type
      //     fb.$child('types').$child(post.type).$child(refPost.name()).$set({id: refPost.name()});
      //   })
      // },
      delete: function(feed) {
        var author = UserService.findById(feed.author.id);
        feeds.$remove(feed.id).then(function(){
          author.$child(feed.type).$remove(feed.id);
        });
      },
      findById: function(id){
        return feeds.$child(id);
      }
    }
  });
