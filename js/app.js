$(document).ready(function() {
    var click = 1,totalClicks = 0, className1 = '',className2 = '',firstClick='',secondClick='',match=0;
    shuffle();
    $(".moves").html(totalClicks);
    $(".card").on('click',function() {
      if($(this).attr('disabled')=="disabled"){
        return false;
      }
  else{
        if (!$(this).hasClass("open")) {
            totalClicks++;
            $(".moves").html(totalClicks);
            if (click === 1) {
                $(this).addClass("open");
                $(this).addClass("show");
              /*  $(this).attr('id', 'card1'); */
                className1 = $(this).children().attr('class');
                firstClick=$(this);
            } else if (click === 2) {
                $(this).addClass("open show");
                className2 = $(this).children().attr('class');
                secondClick=$(this);
                if(className1===className2)
                {
                  match++;
                  secondClick.attr("disabled","disabled");   /* Used to remove click feature from matched cards */
                  firstClick.attr("disabled","disabled");
                  firstClick.addClass("match");
                  secondClick.addClass("match");
                }
                if(match===8)
                {
                $("#overlay").css("display","block");
                if(totalClicks<=20&&totalClicks>=16)
                {
                $(".text").hide().html('Fantabulous!!You are too quick!!!!').fadeIn('slow');
                }
                if(totalClicks<=25&&totalClicks>20)
                {
                  $(".text").hide().html('Excellent!!You\'ve got the license to make it rocket speed').fadeIn('slow');
                }
                if(totalClicks>25)
                {
                  $(".text").hide().html('Good Warm up! Try getting faster').fadeIn('slow');
                }

                }
                unflip();
            }
            if (click === 1) {
                click++;
            } else {
                click = 1;
            }
        }
        else{
          click=1;
          $(this).removeClass("open");
          $(this).removeClass("show");
        }

}
    });

    $(".restart").click(function() {
      $(this).children().addClass('refresh').delay(200).queue(function(next){
        $(this).removeClass('refresh');
        next();
      });
        totalClicks = 0;
        $(".moves").html(totalClicks);
        $("ul.deck>li").removeClass("open");
        $("ul.deck>li").removeClass("show");
        $("ul.deck>li").removeClass("match");
        var deck = document.querySelector(".deck");
        for (var i = deck.children.length; i >= 0; i--) {
            deck.appendChild(deck.children[Math.random() * i | 0]);
        }
    });

    $(".restart-overlay").click(function(){
      className1='';
      className2='';
      match=0;
      $("#overlay").css("display","none");
      totalClicks = 0;
      $(".moves").html(totalClicks);
    $("ul.deck>li").removeClass("open show match");
    var deck = document.querySelector(".deck");
    for (var i = deck.children.length; i >= 0; i--) {
        deck.appendChild(deck.children[Math.random() * i | 0]);
    $('ul.deck *').removeAttr('disabled'); /*Used to re-enable the cards for cliking after refreshing the deck */
  }

    });
    function unflip() {
        if (className1 !== className2) {
            setTimeout(removeClasses, 1000);
        }
    }
    function removeClasses() {
        firstClick.removeClass("open");
        firstClick.removeClass("show");
        secondClick.removeClass("open");
        secondClick.removeClass("show");
    }

    function shuffle(){
    var deck = document.querySelector(".deck");
    for (var i = deck.children.length; i >= 0; i--) {
        deck.appendChild(deck.children[Math.random() * i | 0]);
    }
  }
});
