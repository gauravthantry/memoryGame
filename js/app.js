$(document).ready(function() {
    var anchor = '<i class="fa fa-anchor fa-prop" value="anchor"></i>';
    var assist = '<i class="fa fa-assistive-listening-systems fa-prop" value="assist"></i>';
    var bicycle = '<i class="fa fa-bicycle fa-prop" value="bicycle"></i>';
    var signLang = '<i class="fa fa-american-sign-language-interpreting fa-prop" value="sign"></i>';
    var bitcoin = '<i class="fa fa-bitcoin fa-prop" value="bitcoin"></i>';
    var angellist = '<i class="fa fa-angellist fa-prop" value="angellist"></i>';
    var bug = '<i class="fa fa-bug fa-prop" value="bug"></i>';
    var cubes = '<i class="fa fa-cubes fa-prop" value="cubes"></i>';
     var app = {
       cards: [anchor,assist,bicycle,signLang,bitcoin,angellist,bug,cubes],
       init: function() {
         app.shuffle();
       },
       shuffle: function() {
         var random = 0;
         var temp = 0;
         for (i = 1; i < app.cards.length; i++) {
           random = app.cards[Math.round(Math.random() * i)];
           temp = app.cards[i];
           app.cards[i] = app.cards[random];
           app.cards[random] = temp;
         }
         app.assignCards();
         console.log('Shuffled Card Array: ' + app.cards);
       },
       assignCards: function() {
         $('.card').each(function(index) {
           $(this).append(app.cards[index]);
         });
         app.clickHandlers();
       },
       clickHandlers: function() {
         $('.card').on('click', function() {
           $(this).html('<p>' + $(this).data('cardValue') + '</p>').addClass('selected');
           app.checkMatch();
         });
       },
       checkMatch: function() {
         if ($('.selected').length === 2) {
           if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
             $('.selected').each(function() {
               $(this).animate({
                 opacity: 0
               }).removeClass('unmatched');
             });
             $('.selected').each(function() {
               $(this).removeClass('selected');
             });
             app.checkWin();
           } else {
             setTimeout(function() {
               $('.selected').each(function() {
                 $(this).html('').removeClass('selected');
               });
             }, 1000);
           }
         }
       },
       checkWin: function() {
         if ($('.unmatched').length === 0) {
           $('.container').html('<h1>You Won!</h1>');
         }
       }
     };
     app.init();
   });
