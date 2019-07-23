'use strict';
/*global bookmarkList, store, api */
$(document).ready(function () {
  bookmarkList.bindEventListeners();
  bookmarkList.render();
  

  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      bookmarkList.render();
    })
    .catch(err => console.log(err.messag));
});
