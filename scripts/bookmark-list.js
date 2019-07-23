'use strict';
/* global store, $, api */
// eslint-disable-next-line no-unused-vars
const bookmarkList = function () {

  function generateBookmarkElement(bookmark) {
  console.log(bookmark);  

    if(bookmark.expanded === false){
      return `
    <li class='js-bookmark-element' data-bookmark-id='${bookmark.id}'>
       ${bookmark.title}
        <p>Description: ${bookmark.desc}</p>
        
        
        <a href="${bookmark.url}">${bookmark.url}</a><br>
        
        <button class="js-bookmark-delete">delete</button>
        <button class="js-bookmark-expanded">expand</button>
        rating: ${bookmark.rating};
      </li>
    `;
    } else {
      return `
      <li class='js-bookmark-element' data-bookmark-id='${bookmark.id}'>
      ${bookmark.title}
      <button class="js-bookmark-delete">delete</button>
      <button class="js-bookmark-expanded">expand</button>
      `;
    }
    
    
  
  }

  function generateBookmarkListString(bookmarkList){
    const bookmarks = bookmarkList.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  }

  function render() {
    let bookmarks = [...store.bookmarks];
    console.log('`render` ran');
    const bookmarkListString = generateBookmarkListString(bookmarks);

    $('.js-bookmark-list').html(bookmarkListString);

  }

  
  function handleNewBookmarkSubmit() {
    $('#js-bookmark-list-form').submit(function (event) {
      event.preventDefault();
      const title = $('.js-bookmark-title').val();
      const url = $('.js-bookmark-url').val();
      const desc = $('.js-bookmark-description').val();
      const rating = $('.js-bookmark-rating :selected').val();
      const bookmark = {title, url, desc, rating};
    
      api.createBookmark(bookmark).then(function (data){
        console.log(data);
        store.addBookmark(data);
        render();
      }).catch(function (err){
        console.error(err);
      });
    }); 
  };

  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('bookmark-id');
  }

  function handleDeleteBookmark() {
    $('.js-bookmark-list').on('click', '.js-bookmark-delete' , event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      api.deleteBookmark(id).then(function (){
        store.findAndDelete(id);
        render();
      }).catch(function (err){
        console.error(err);
      });
    });
  }

  // function handleToggleExpandBookmark() {
  //   $('.js-bookmark-list').on('click', '.js-bookmark-expanded' , event => {
  //     const id = getBookmarkIdFromElement(event.currentTarget);

  //   });
  // }
  
  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleDeleteBookmark();
    handleToggleExpandBookmark();
    //all event listeners in here
  }
  
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}();



