// require('dotenv').config()
var mqtt = require("mqtt")
var Processor = require('./processor')

// Configuration setup for the connection 
// var host: "process.env.BROKER_HOST",
var host = "tcp://mr2r9za6fwi0wf.messaging.solace.cloud:1883"
var config = {
    // username: "process.env.BROKER_USR",
    // password: "process.env.BROKER_PWD"
    username: "covid-public-client",
    password: "covid19"
}

// Define Topics
var topic_sub = "com/covidtracking/states/current/update/#"
var topic_pub = "com/covidtracking/states/current/percent/update/"
var topic_demo = "demo/test"

// Connect to the broker
var client  = mqtt.connect(host, config)

// Setup callback functions
client.on('connect', () => {
    console.log("CONNECTED! 💥")
    client.subscribe(topic_sub)
})

// Consume and process a stream of data
client.on('message', (topic, message) => {
    var res = JSON.parse(message.toString())
    console.log("Message received 👀\nTopic: ", topic, "\nMessage\n", res)

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

    // Publish back a modified stream
    console.log("Publishing to topic 🚀")
    // Note: Show error with just sending JSON response. i.e. it should be either string or binary
    // client.publish(topic_demo, res)
    // client.publish(topic_demo, Buffer.from(JSON.stringify(newObj)))
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