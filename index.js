// Configuration setup for connection 
require('dotenv').config()
var mqtt = require("mqtt")
var Processor = require('./processor')

var host = "tcp://mr2r9za6fwi0wf.messaging.solace.cloud:1883"
var config = {
    // username: "covid-public-client",
    username: process.env.BROKER_USR,
    password: process.env.BROKER_PWD
    // password: "covid19"
}

var topic_sub = "com/covidtracking/states/current/update/#"
var topic_pub = "com/covidtracking/states/current/percent/update/"
var topic_demo = "demo/test"

// Connect to the broker
var client = mqtt.connect(host, config)

// Setup callback functions

// on connect
client.on("connect", () => {
    console.log("Connected! 💥")
    client.subscribe(topic_sub)
})

// on message
client.on("message", (topic, message) => {
    var res = JSON.parse(message.toString())
    // console.log("Received Message 👀 on topic: ", topic, "\nMessage: ", res)
    console.log("Recieved")

    // Modify the stream
    // var newObj = {
    //     state: res.state,
    //     totalTestResults: res.totalTestResults,
    //     death: res.death,
    //     negative: res.negative,
    //     positive: res.positive,
    //     percentPositive: res.positive/res.totalTestResults,
    //     percentNegative: res.negative/res.totalTestResults,
    // }

    var newObj = Processor.process(res)

    console.log(" Publishing to topic! 🚀")
    client.publish(topic_pub.concat(res.state), Buffer.from(JSON.stringify(newObj)))
})

client.on('disconnect', () => {
    console.log("DISCONNECTED! 🤔")
    // Logic handling disconnection
})

client.on('error', (err) => {
    console.log("Error! 😱\n", err)
    // Logic handling errors
})

// Consume and process the stream of data

// Publish back to modifed stream