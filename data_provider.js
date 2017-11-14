$(document).ready(function() {
  var socket = io.connect();
  var cont = $('#container');
  var html = $('html, body');

  // appending initial data to container
  socket.on('init-data', function(data) {
    var data_val = $('<div>' + data.content + '</div>');
    cont.append(data_val);
  });

  // appending modified data to container
  socket.on('mod-data', function(data) {
    var data_val = $('<div>' + data.content + '</div>');
    cont.append(data_val);
    html.animate({
      scrollTop: cont[0].scrollHeight
    });
  });
});
