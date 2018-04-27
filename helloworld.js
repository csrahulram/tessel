var tessel = require('tessel');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var os = require('os');
var ifaces = os.networkInterfaces();
var pin = tessel.port.A.pin[2];

function getIP() {
  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
      }
      ++alias;
    });
  });
}

app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
});

app.post('/toggle', (req, res)=>{
  var state = req.body.data;
  pin.write(state);
});

getIP();
app.listen(8080);

console.log("Helloworld is now showing up on above IP:8080");