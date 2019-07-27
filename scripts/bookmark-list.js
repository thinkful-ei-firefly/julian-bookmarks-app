'use strict';
/* global store, $, api */
// eslint-disable-next-line no-unused-vars
const bookmarkList = function () {

  function generateError(message) {
    return `
      <section class="error-content">
        
        <h2>${message}</h2>
      </section>
    `;
  }
  
  function generateBookmarkElement(bookmark) {
   

    if(bookmark.expanded === true){
      return `
    <li class='js-bookmark-element' data-bookmark-id='${bookmark.id}'>
      <h3>${bookmark.title}</h3>
      <p>Description: ${bookmark.desc}</p>
        
        
     <a href="${bookmark.url}">${bookmark.url}</a><br>
        
      <p>rating: ${bookmark.rating}</p>
      <button class="js-bookmark-delete">delete</button>
      <button class="js-bookmark-expanded">less</button>
    </li>
    `;
    } else {
      return `
      <li class='js-bookmark-element' data-bookmark-id='${bookmark.id}'>
        <h3>${bookmark.title}</h3>
        <p>rating: ${bookmark.rating}</p>
        <button class="js-bookmark-delete">delete</button>
        <button class="js-bookmark-expanded">more</button>
      </li>
      `;
    }
    
    
  
  }

  function generateBookmarkListString(bookmarkList){
    const bookmarks = bookmarkList.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  }

  function render() {
    renderError();
    let bookmarks = store.filterBookmarks();
    console.log('`render` ran');
    const bookmarkListString = generateBookmarkListString(bookmarks);

    $('.js-bookmark-list').html(bookmarkListString);
    
  }

  function renderError() {
    if (store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
  }

  
  function handleNewBookmarkSubmit() {
    $('#js-bookmark-list-form').submit(function (event) {
      event.preventDefault();
      const title = $('.js-bookmark-title').val();
      const url = $('.js-bookmark-url').val();
      const desc = $('.js-bookmark-description').val();
      const rating = $('.js-bookmark-rating :selected').val();
      const bookmark = {title, url, desc, rating};
      
      $('.js-bookmark-title').val('');
      $('.js-bookmark-url').val('');
      $('.js-bookmark-description').val('');
     // $('.js-bookmark-rating :selected').val('');
    
      api.createBookmark(bookmark).then(function (data){
        console.log(data);
        store.addBookmark(data);
        render();
      }).catch(err => {
        console.log(err);
        store.setError(err.message);
        renderError();

      });
    }); 
  }

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
      }).catch((err) => {
        console.log(err);
        store.setError(err.message);
        renderError();

      });
    });
  }

  function handleToggleExpandBookmark() {
    $('.js-bookmark-list').on('click', '.js-bookmark-expanded' , event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      const showBookmark = store.findById(id);
      //console.log(id);
      showBookmark.expanded = !showBookmark.expanded;
      render();
    });
  }


  function handleBookmarkRatingFilter() {
    $('#filter-ratings').on('change', event => {
      const bookmarkRating = $(event.currentTarget).val();
      store.ratingFilter = bookmarkRating;
      render();
    });
  }
  
  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleDeleteBookmark();
    handleToggleExpandBookmark();
    handleBookmarkRatingFilter();
    //all event listeners in here
  }
  
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}();



