$(document).ready( function(){

  $('.facebook, .twitter, .googleplus').on('click', function() {
    var w = 580, h = 300,
    left = (screen.width/2)-(w/2),
    top = (screen.height/2)-(h/2);

    window.open ( $(this).attr('href'), '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
    return false;
  });

});
