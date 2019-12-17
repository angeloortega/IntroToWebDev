Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});


$(document).ready(function(){
    $('.pass-show').append('<span class="ptxt">Show</span>');  
    $('#inputDate').val(new Date().toDateInputValue());
});
      

$(document).on('click','.ptxt', function(){ 
    $(this).text($(this).text() == "Show" ? "Hide" : "Show"); 
    $(this).prev().find(".form-control").attr('type', function(index, attr){return attr == 'password' ? 'text' : 'password'; }); 
    });  