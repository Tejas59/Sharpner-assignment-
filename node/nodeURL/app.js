const http = require('http');

const server = http.createServer((req,res)=>{
    let response;
    if(req.url==='/home'){
        response = "welcome home";
    }
    else if(req.url==='/about'){
        response = "Weleocme to about page";
    }
    else if(req.url==='/node'){
        response = "Welcome to node page";

    }
    else{
        response= "Page not found";
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(response);
});

server.listen(5000,()=>{
    console.log("listening on 4000");

})