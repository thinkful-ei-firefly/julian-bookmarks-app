'use strict';

const store = (function () {

  const addBookmark = function (bookmark) {
    this.bookmarks.push(bookmark);
  };

  const findById = function (id) {

  };

  const toggleRatingFilter = function () {

  };

  const findAndDelete = function () {

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