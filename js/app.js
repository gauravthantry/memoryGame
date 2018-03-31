$(document).ready(function(){
$(".deck-content").flip({
  trigger: 'manual'
 });
 
 $(".flip").click(function(){
	 $(this).closest(".deck-content").flip(true);
 });
 
 $(".unflip).click(function(){
	 $(this).closest(".deck-content").flip(false);
 });
});
