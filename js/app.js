$(document).ready(function(){
$(".deck-content").flip({
  trigger: 'manual'
 });
 var i=0;
 var clickCount=0;

 $(".flip").click(function(){
   if(clickCount<2)
   {
	 $(this).closest(".deck-content").flip(true);
   i++;
   clickCount++;
   }
 });

 $(".unflip").click(function(){
	 $(this).closest(".deck-content").flip(false);
 });
});
