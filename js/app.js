$(document).ready(function() {
    var click = 1,
        totalClicks = 0,
        className1 = '',
        className2 = '',
        firstClick = '',
        secondClick = '',
        match = 0;
    shuffle();
    $(".moves").html(totalClicks);
    $(".card").on('click', function() {
        if ($(this).attr('disabled') == "disabled") {
            return false;
        } else {
            if (!$(this).hasClass("open")) {
                totalClicks++;
                $(".moves").html(totalClicks);
                if (click === 1) {
                    $(this).addClass("open");
                    $(this).addClass("show");
                    className1 = $(this).children().attr('class');
                    firstClick = $(this);
                } else if (click === 2) {
                    $('ul.deck *').attr("disabled", "disabled");
                    $(this).addClass("open show");
                    className2 = $(this).children().attr('class');
                    secondClick = $(this);
                    if (className1 === className2) {
                        match++;
                        firstClick.addClass("match");
                        secondClick.addClass("match");
                    }
                    unflipAndRemoveAttr();
                    if (match === 8) {
                      $(document).scrollTop();
                        $("#overlay").css("display", "block").hide().fadeIn(500);
                        if (totalClicks <= 20 && totalClicks >= 0) {
                            $(".text").hide().html('Fantabulous!!You are too quick!!!!').fadeIn(1000);
                            $(".stars").hide().html('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>').fadeIn(1000);
                        }
                        if (totalClicks <= 25 && totalClicks > 20) {
                            $(".text").hide().html('Excellent!!You\'ve got the license to make it rocket speed').fadeIn(1000);
                            $(".stars").hide().html('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half-full"></i>').fadeIn(1000);
                        }
                        if (totalClicks <=30 && totalClicks > 25) {
                            $(".text").hide().html('You got it right!!!').fadeIn(1000);
                            $(".stars").hide().html('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i>').fadeIn(1000);
                        }
                        if (totalClicks <=35 && totalClicks > 30) {
                            $(".text").hide().html('Booyeah!!!').fadeIn(1000);
                            $(".stars").hide().html('<i class="fa fa-star"></i><i class="fa fa-star-half-full"></i><i class="fa fa-star-o"></i>').fadeIn(1000);
                        }
                        if (totalClicks <=40 && totalClicks > 35) {
                            $(".text").hide().html('Finisher!!!').fadeIn(1000);
                            $(".stars").hide().html('<i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>').fadeIn(1000);
                        }
                        if ( totalClicks > 40) {
                            $(".text").hide().html('Good Warm up! Try getting faster').fadeIn(1000);
                            $(".stars").hide().html('<p>Rating:</p><i class="fa fa-star-half-full"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>').fadeIn(1000);
                        }

                    }
                    $(".playagain").css("display", "block").fadeIn(1500);

                }
                if (click === 1) {
                    click++;
                } else {
                    click = 1;
                }
            } else {
                click = 1;
                $(this).removeClass("open");
                $(this).removeClass("show");
            }

        }
    });

    $(".restart").click(function() {
        $(this).children().addClass('refresh').delay(200).queue(function(next) {
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

    $(".restart-overlay").click(function() {
        className1 = '';
        className2 = '';
        match = 0;
        $("#overlay").css("display", "none");
        totalClicks = 0;
        $(".moves").html(totalClicks);
        $("ul.deck>li").removeClass("open show match");
        $(".stars").empty();
        var deck = document.querySelector(".deck");
        for (var i = deck.children.length; i >= 0; i--) {
            deck.appendChild(deck.children[Math.random() * i | 0]);
            $('ul.deck *').removeAttr('disabled'); /*Used to re-enable the cards for cliking after refreshing the deck */
        }

    });

    function unflip(callback) {
        setTimeout(function() {
            if (className1 !== className2) {
                removeClasses();
                if (typeof callback == 'function')
                    callback();
            }
            else {
              if (typeof callback == 'function')
                callback();
            }
        }, 1000);
    }


    function removeAttribute() {
        $("li:not(.match)").removeAttr('disabled');
    }


    function unflipAndRemoveAttr() {
        unflip(removeAttribute);
    }


    function removeClasses() {
        firstClick.removeClass("open");
        firstClick.removeClass("show");
        secondClick.removeClass("open");
        secondClick.removeClass("show");
  }


    function shuffle() {
        var deck = document.querySelector(".deck");
        for (var i = deck.children.length; i >= 0; i--) {
            deck.appendChild(deck.children[Math.random() * i | 0]);
        }
    }
});
