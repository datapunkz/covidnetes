// 1. Setup skeleton to connect and receive message on demo topic
// 1. Connect to Covid stream
// 1. Best practice for creds mgmt
// 1. Publish skeleton on demo topic
// 1. Manipulate JSON with required data

// Notes: 
// 1. Mention this is pub/sub
// 1. Start with comments skeleton
// 1. Skip building another subscriber (redun). Just show https://www.marcd.dev/COVIDStreamViewer/mqtt/mqttListener.html
// 1. Example tests: 
//      connections, sample messages
//      sample messages


require('dotenv').config()
var mqtt = require('mqtt')

// Configuration Setup for connection
var host = "tcp://mr2r9za6fwi0wf.messaging.solace.cloud:1883"
var config = {
    // username: process.env.VarName,
    username: "covid-public-client",
    password: "covid19"
}

// Define Topics
var topic_sub = "com/covidtracking/states/current/update/#"
var topic_pub = "com/covidtracking/states/current/percent/update"
var topic_demo = "demo/test"

// Connect to the broker 
var client  = mqtt.connect(host, config)


// Setup callback functions
client.on('connect',  () => {
    console.log("Connected to Covid! ")
    client.subscribe(topic_sub)
})
 
client.on('message', (topic, message) => {
    var res = JSON.parse(message.toString())
    console.log("Received message on Topic: ", topic,"\nMessage:\n", res)

    // Consume and process the stream of data
    var newObj = {
        state: res.state, 
        totalTestResults: res.totalTestResults,
        death: res.death,
        negative: res.negative,
        positive: res.positive,
        percentPositive: (res.positive)/res.totalTestResults,
        percentNegative: (res.negative)/res.totalTestResults
    }

    // Publish back a modified stream
    // Note: Show error with just sending JSON response. i.e. it should be either string or binary
    // client.publish(topic_demo, res)
    // client.publish(topic_demo, Buffer.from(JSON.stringify(newObj)))
    client.publish(topic_demo.concat("/",res.state), Buffer.from(JSON.stringify(newObj)))
})

client.on('disconnect',  () => {
    console.log("Disconnected from broker! ")
    // Logic handling disconnection
})

client.on('error',  (err) => {
    console.log("Error! ", err)
    // Logic handling errors
})