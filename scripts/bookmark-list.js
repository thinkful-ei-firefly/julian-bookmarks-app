'use strict';

const bookmarkList = function () {

  function generateBookmarkElement(obj) {
    const {id,}

    return `
    <li>
    <p>Tech News<p>
        Description:
        <p>Tech news from around the world</p>
        
        <a href="">www.technews.com</a><br>
        
        <button>delete</button>
        rating: 4
      </li>
    `
  
  };

  function addBookmarkElement(){

  };
  
  function handleNewItemSubmit() {
    $('#bookmark-info').submit(function (event) {
      event.preventDefault();
      console.log(Object.fromEntries(new FormData(event.target))));


    } 

  };
  
  function bindEventListeners(){
    handleNewItemSubmit();
    //all event listeners in here
  }
  
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
  

}());



