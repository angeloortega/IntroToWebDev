$(document).ready(function(){
    $('.pass-show').append('<span class="ptxt">Show</span>');  
});
      

$(document).on('click','.ptxt', function(){ 
    $(this).text($(this).text() == "Show" ? "Hide" : "Show"); 
    $(this).prev().find(".form-control").attr('type', function(index, attr){return attr == 'password' ? 'text' : 'password'; }); 
    });  