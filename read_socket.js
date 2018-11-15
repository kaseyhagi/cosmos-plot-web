function add_agent(agent){
  /* This function is called when a new agent is discovered */
  var tbl = document.getElementById("active_agent_list");
  var name = agent.agent_proc;
  var node = agent.agent_node;
  var row = tbl.insertRow(-1);
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  cell0.innerHTML=name;
  cell1.innerHTML=node;

}
// set up socket
const PORT = 10020;
// const MULTICAST_ADDR = "233.255.255.255";
const MULTICAST_ADDR ="225.1.1.1"

const dgram = require("dgram");
const process = require("process");

const socket = dgram.createSocket({ type: "udp4", reuseAddr: true });



socket.bind(PORT);

socket.on("listening", function() {
  socket.addMembership(MULTICAST_ADDR);
  // setInterval(sendMessage, 2500);
  const address = socket.address();
  console.log(
    `UDP socket listening on ${address.address}:${address.port} pid: ${
      process.pid
    }`
  );
});
// end set up socket
var Agents = [];
socket.on("message", function(message, rinfo) {
  /* this function is called everytime the socket receives a message */
  var str =  message.toString('utf8');
  var begin, end;
  begin = str.indexOf("{");
  end = str.lastIndexOf("}");
  var json = str.slice(begin, end+1).replace(/}{/g,"}\n{");
  var array = json.split('\n');
  var agent={}; // the entire thing gets turned into a "true" json object
  for(var i = 0; i <array.length; i++){
    var jsonobj = JSON.parse(array[i]);
    var keys = Object.keys(jsonobj);
    for(var j = 0; j < keys.length; j++){
      agent[keys[j]] = jsonobj[keys[j]];
    }
  }
  var found = false;
  // iterate through all agents in the Agents array to check if it already exists
  for(var i = 0; i < Agents.length; i++) {
      if (Agents[i].agent_proc == agent.agent_proc) {
          found = true;
          break;
      }
  }
  if(!found){
    Agents[Agents.length] = agent;
    add_agent(agent);
    console.log(Agents)
  }

});
