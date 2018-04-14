$(document).ready(function() {
    var click = 1,totalClicks = 0, className1 = '',className2 = '',firstClick='',secondClick='';
    $(".moves").html(totalClicks);
    var deck = document.querySelector(".deck");
    for (var i = deck.children.length; i >= 0; i--) {
        deck.appendChild(deck.children[Math.random() * i | 0]);
    }
    $(".card").click(function() {
        if (!$(this).hasClass("open")) {
            totalClicks++;
            $(".moves").html(totalClicks);
            if (click === 1) {
                $(this).addClass("open show");
                $(this).attr('id', 'card1');
                className1 = $(this).children().attr('class');
                firstClick=$(this);
            } else if (click === 2) {
                $(this).addClass("open show");
                className2 = $(this).children().attr('class');
                if(className1===className2)
                {
                  $(this).unbind("click");
                  firstClick.unbind("click");
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
          $(this).removeClass("open");
          $(this).removeClass("show");
        }

    });

    $(".restart").click(function() {
        totalClicks = 0;
        $(".moves").html(totalClicks);
        $("ul.deck>li").removeClass("open");
        $("ul.deck>li").removeClass("show");
        var deck = document.querySelector(".deck");
        for (var i = deck.children.length; i >= 0; i--) {
            deck.appendChild(deck.children[Math.random() * i | 0]);
        }
    });
    function unflip() {
        if (className1 !== className2) {

            setTimeout(removeClasses, 1000);

            function removeClasses() {
                $("ul.deck>li").removeClass("open");
                $("ul.deck>li").removeClass("show");
            }
        }
    }
});
