'use strict';

const store = (function () {

  const addBookmark = function (bookmarkObj) {
    let expanded = { expanded: false};
    Object.assign(bookmarkObj, expanded);
    this.bookmarks.push(bookmarkObj);
    //console.warn(bookmarkObj);
  };

  const findById = function (id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const toggleRatingFilter = function () {

  };

  const findAndDelete = function (id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);

  };

  return {
    bookmarks:[],
    adding: false,
    showError: false,
    ratingFilter: 1,
    addBookmark,
    findById,
    toggleRatingFilter,
    findAndDelete,
  
  };

}());