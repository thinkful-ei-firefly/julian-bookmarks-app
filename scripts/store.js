'use strict';

const store = (function () {

  const setError = function(error) {
    this.error = error;
  };
  
  const addBookmark = function (bookmarkObj) {
    let expanded = { expanded: false};
    Object.assign(bookmarkObj, expanded);
    this.bookmarks.push(bookmarkObj);
    //console.warn(bookmarkObj);
  };

  const findById = function (id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  
  const filterBookmarks = function () {
    const minimum = this.ratingFilter;
    return this.bookmarks.filter(function (bookmark) {
      return bookmark.rating >= minimum;
        
    });
  };
  

  const findAndDelete = function (id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);

  };

  return {
    bookmarks:[],
    adding: false,
    error: null,
    ratingFilter: 1,
    addBookmark,
    findById,
    filterBookmarks,
    findAndDelete,
    setError,
  
  };

}());