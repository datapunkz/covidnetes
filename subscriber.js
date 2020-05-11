var mqtt = require('mqtt')

var host = "tcp://mr2r9za6fwi0wf.messaging.solace.cloud:1883"
var config = {
    username: "covid-public-client",
    password: "covid19"
}

var topic = "demo/test/#"

var client  = mqtt.connect(host, config)

client.on('connect', () => {
    console.log("Connected to broker")
    client.subscribe(topic)
})

client.on('message', (topic, message) => {
    res = JSON.parse(message.toString())
    console.log("Received a message on topic: ", topic, "\nMessage:\n", res)
})
