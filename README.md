--tail-f node--

Probelem Statement:

This problem requires you to implement a log watching solution (similar to the tail -f command in UNIX). However, in this case, the log file is hosted on a remote machine.

You have to implement the following:

1. A server side program to monitor the given log file and capable of streaming updates that happen in it. This will run on the same machine as the log file.

2. A web based client (accessible via URL like http://localhost:8080/log) that prints the updates in the file as when they happen and NOT upon page refresh. The page should be loaded once and it should keep getting updated in real-time. 

The server should not retransmit the entire file every time. It should only send the updates.

You may implement the server in any programming language. You may not, however, use off-the-shelf libraries that provide tail-like functionalities.

--Please execute following to run program--

Install node:
brew install node

Run Server:
$ node server.js

Input file:
sample_log

Run client:
http://localhost:8080/log