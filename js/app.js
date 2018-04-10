/*
 * Create a list that holds all of your cards


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
$(document).ready(function(){
  var click=1;
  var className1='';
  var className2='';
    $(".card").click(function(){

      if(click===1)
      {
        $(this).addClass("open show");
      className1=$(this).children().attr('class');
      click++;
      }
      else if(click===2){
        $(this).addClass("open show");
      className2=$(this).children().attr('class');
      if(className1===className2)
      {

      }
      else if(className1!==className2)
      {
       $("ul.deck>li").removeClass("open");
        $("ul.deck>li").removeClass("show");
      }
      click=1;
    /*  console.log(click); */
      }


  });
  function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }

      return array;
  }

});
  /*
   * set up the event listener for a card. If a card is clicked:
   *  - display the card's symbol (put this functionality in another function that you call from this one)
   *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
   *  - if the list already has another card, check to see if the two cards match
   *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
   *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
   *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
   *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
   */
