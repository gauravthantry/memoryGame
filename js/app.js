$(document).ready(function() {
    var click = 1,
        totalClicks = 0,
        /*Keeps track of the total cliks made to finish the game */
        className1 = '',
        className2 = '',
        /* className1 and className2 is used to check if the flipped cards match refer line 33 and  47*/
        firstClick = '',
        secondClick = '',
        /* firstCLick and secondClick: refer line 37,46 used to add or remove classes only for the recently two flipped cards */
        match = 0,
        /*Game finished when match ===8 */
        rating = '',
        minutesLabel = document.getElementById("minutes"),
        secondsLabel = document.getElementById("seconds"),
        totalSeconds = 0,
        intervalId = null,
        timeTaken = '';

    shuffle();
    $(".moves").html(totalClicks);
    $(".card").on('click', function() {

        if ((intervalId == null) || ($(".restart").data('clicked'))) {
            $(".restart").data('clicked', false);
            totalSeconds = 0;
            timer(); /*This displays the timer */
        }
        if ($(this).attr('disabled') == "disabled") {
            return false;
        } else {
            if (!$(this).hasClass("open")) { /* Loop checks if the card is not an already flipped and matched card */
                if (click === 1) {
                    $(this).addClass("open");
                    $(this).addClass("show");
                    className1 = $(this).children().attr('class'); /* className1 stores the class name of the card. className1 would contain a font awesome class */
                    firstClick = $(this);
                } else if (click === 2) {
                    totalClicks++;
                    realTimeRating();
                    $(".moves").fadeOut(600);
                    $(".moves").fadeIn(600).html(totalClicks);
                    $('ul.deck *').attr("disabled", "disabled"); /* adding attribute diabled would help in the other cards not being cliked unless the two flipped cards are flipped back. When a user clicks on another card, false is returned refer line 13 */
                    $(this).addClass("open show"); /*Flipd the card once clicked */
                    className2 = $(this).children().attr('class'); /* This is equated to className1 to check if they are equal */
                    secondClick = $(this);
                    if (className1 === className2) {
                        match++; /* match is incremented if the flipped cards match  */
                        firstClick.addClass("match");
                        secondClick.addClass("match");
                    }
                    unflipAndRemoveAttr(); /* call back function has been used. Other cards are enabled for clicking regardless of the current matching situation of the current cards */
                    if (match === 8) { /* Displays a congradulation message depending on the number of clicks */
                        clearInterval(intervalId);
                        timeTaken = $(".time").html();
                        intervalId = null;
                        $(document).scrollTop(0, 00);
                        $("#overlay").css("display", "block").hide().fadeIn(500);
                        if (totalClicks <= 12 && totalClicks >= 8) {
                            $(".text").hide().html('Fantabulous!!You are too quick!!!!').fadeIn(1000);
                            $(".stars").hide().html(rating).fadeIn(1000);
                        }
                        if (totalClicks <= 16 && totalClicks > 12) {
                            $(".text").hide().html('Excellent!!You\'ve got the license to make it rocket speed').fadeIn(1000);
                            $(".stars").hide().html(rating).fadeIn(1000);

                        }
                        if (totalClicks <= 20 && totalClicks > 16) {
                            $(".text").hide().html('You got it right!!!').fadeIn(1000);
                            $(".stars").hide().html(rating).fadeIn(1000);

                        }
                        if (totalClicks <= 24 && totalClicks > 20) {
                            $(".text").hide().html('Booyeah!!!').fadeIn(1000);
                            $(".stars").hide().html(rating).fadeIn(1000);
                        }
                        if (totalClicks <= 28 && totalClicks > 24) {
                            $(".text").hide().html('Finisher!!!').fadeIn(1000);
                            $(".stars").hide().html(rating).fadeIn(1000);
                        }
                        if (totalClicks > 28) {
                            $(".text").hide().html('Good Warm up! Try getting faster').fadeIn(1000);
                            $(".stars").hide().html(rating).fadeIn(1000);
                        }

                    }
                    $("section.elapsedTime").hide().html('time taken : ' + timeTaken).fadeIn(700);
                    $(".playagain").css("display", "block").fadeIn(1500);
                    $(".starRating").hide().html(rating).fadeIn(500);

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

    $(".restart").click(function() { /* Used to reshuffle the cards */
        $(this).children().addClass('refresh').delay(200).queue(function(next) {
            $(this).removeClass('refresh');
            next();
        });
        $("ul.deck>li").removeClass("open show match"); /* remove all open,show and match classes when the cards are shuffled. This unflips all the cards */
        clearInterval(intervalId);
        $(this).data('clicked', true);
        secondsLabel.innerHTML = pad(0);
        minutesLabel.innerHTML = pad(0);
        totalClicks = 0;
        $(".moves").html(totalClicks);
        $("ul.stars").html('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star">');
        var deck = document.querySelector(".deck");
        for (var i = deck.children.length; i >= 0; i--) {
            deck.appendChild(deck.children[Math.random() * i | 0]);
            $('ul.deck *').removeAttr('disabled');
            click = 1;
        }
    });

    $(".restart-overlay").click(function() { /* similar to the above even handler but this is used to reset after the game has been completed */
        className1 = '';
        className2 = '';
        match = 0;
        $("#overlay").css("display", "none");
        clearInterval(intervalId);
        $(this).data('clicked', true);
        secondsLabel.innerHTML = pad(0);
        minutesLabel.innerHTML = pad(0);
        totalClicks = 0;
        $(".moves").html(totalClicks);
        $("ul.stars").html('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star">');
        $("ul.deck>li").removeClass("open show match");
        var deck = document.querySelector(".deck");
        for (var i = deck.children.length; i >= 0; i--) {
            deck.appendChild(deck.children[Math.random() * i | 0]);
            $('ul.deck *').removeAttr('disabled'); /*Used to re-enable the cards for cliking after refreshing the deck */
            click = 1;
        }

    });

    function timer() {
        intervalId = setInterval(setTime, 1000); /*Interval. every second. */
    }

    function setTime() {   /*This function prints the second and minutes elapsed */
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }

    function unflip(callback) {
        setTimeout(function() {
            if (className1 !== className2) {
                removeClasses();
                if (typeof callback == 'function')
                    callback();
            } else {
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

    function realTimeRating() {
        /*$("#overlay").css("display", "block").hide().fadeIn(500); */
        if (totalClicks > 12) {
            if (totalClicks === 13)
                $(".stars").hide().html('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half-full"></i>').fadeIn(1000);
            rating = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half-full"></i>';
        }
        if (totalClicks > 16) {
            if (totalClicks === 17)
                $(".stars").hide().html('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i>').fadeIn(1000);
            rating = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i>';
        }
        if (totalClicks > 20) {
            if (totalClicks === 21)
                $(".stars").hide().html('<i class="fa fa-star"></i><i class="fa fa-star-half-full"></i><i class="fa fa-star-o"></i>').fadeIn(1000);
            rating = '<i class="fa fa-star"></i><i class="fa fa-star-half-full"></i><i class="fa fa-star-o"></i>';
        }
        if (totalClicks > 24) {
            $(".stars").hide().html('<i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>').fadeIn(1000);
            rating = '<i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>'
        }
        if (totalClicks > 28) {
            $(".stars").hide().html('<i class="fa fa-star-half-full"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>').fadeIn(1000);
            rating = '<i class="fa fa-star-half-full"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>';
        }
    }
});
