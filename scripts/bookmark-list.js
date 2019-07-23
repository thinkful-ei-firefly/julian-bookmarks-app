'use strict';

const bookmarkList = function () {

  function generateBookmarkElement(bookmark) {
    

    return `
    <li>
    <p>${<p>
        Description:
        <p>Tech news from around the world</p>
        
        <a href="">www.technews.com</a><br>
        
        <button>delete</button>
        rating: 4
      </li>
    `
  
  };

  function generateBookmarkListString(bookmarkList){
    const bookmarks = bookmarkList.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  }

  function render() {

  }

  function handleAddBookmarkElement(){
    $('adding-bookmark').on('click', )

  };
  
  function handleNewBookmarkSubmit() {
    $('#bookmark-info').submit(function (event) {
      event.preventDefault();
      //
      console.log(Object.fromEntries(new FormData(event.target))));
      //addBookmark

    } 

  };
  
  function bindEventListeners(){
    handleNewItemSubmit();
    handleAddBookmarkElement();
    handleAddBookmarkElement();
    //all event listeners in here
  }
  
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
  

}());



