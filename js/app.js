   $(document).ready(function() {
    $(".deck-content").flip({
        trigger: 'manual'
    });
    var i = 1;
    var clickCount = 1;
    var cardVal1 = '';
    var cardVal2 = '';

    $(".flip").click(function() {
        if (i <=2) { //i should be max 2 because the match is to be done to two elements
            if (i === 1) {      //check if its the first flip
                $(this).closest(".deck-content").flip(true);
                cardVal1 = $(this).val();
                i++;
                clickCount++;
            } else if ((i === 2) ) {  //checks if its the second flip and the second flip is not the first element again.
                $(this).closest(".deck-content").flip(true);
                cardVal2 = $(this).val();
                clickCount++;
                i++;
            }

            if (cardVal1 === cardVal2) {  //checks if both the flips match
                $(this).parent().prev().children().remove(); //Trying to remove the flip feature if both the elements match. <--- This is one of the issue. Unable to remove the flip feature.
            }
        }
    });

    $(".unflip").click(function() {  //used to unflip
        $(this).closest(".deck-content").flip(false);
        i--;
    });
});