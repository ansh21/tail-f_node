var http = require('http')
var io = require('socket.io')(http);
var fs = require('fs')
var path = require('path')
var filewatcher = require('filewatcher');
var readline = require('readline');
var stream = require('stream');

var watcher = filewatcher();
var log_file = './input/sample_log';
var port = 8080;

console.log('Server Running...');

// creation of server and processing client request
var server = http.createServer(function(request, response){
  var filePath = '.' + request.url;
  if (filePath == './log')
    filePath = './log/index.html';

  fs.readFile(filePath, function(error, content) {
    if (error) {
      response.writeHead(404);
      response.end('Wrong file path given as their is no such file. Please provide the correct file path.');
    }
    else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content, 'utf-8');
    }
  });

});


// server listening on mentioned port
server.listen(port);
io.listen(server);

// processing initial log data
var lines_count;
io.on('connection', function (socket) {
  var is = fs.createReadStream(log_file);
  var os = new stream;
  var rl = readline.createInterface(is, os);
  lines_count = 0;
  rl.on('line', function(line) {
    socket.emit('init-data', {'content':line});
    lines_count++;
  });
});

watcher.add(log_file);

// processing modified log data
watcher.on('change', function(file, stat) {
  var is = fs.createReadStream(log_file);
  var os = new stream;
  var curr_lno = 0
  var rln = readline.createInterface(is, os);
  rln.on('line', function(line) {
    curr_lno++;
    if(curr_lno > lines_count){
      io.sockets.emit('mod-data', {'content':line});
    }
  });
  rln.on('close', function() {
    lines_count = curr_lno;
  });
  if (!stat) console.log('deleted');
});
