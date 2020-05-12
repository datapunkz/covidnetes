# covidnetes
COVID-19 data stream processor using Solace PubSub+ Event Broker and CircleCI. This application consumes a stream of data on the topic `com/covidtracking/states/current/update/#` (as per the [SolaceLabs/covid19-stream-processors](https://github.com/SolaceLabs/covid19-stream-processors#2-choose-your-topics) github repo) and republishes processed data back to the same broker on `com/covidtracking/states/current/percent/update/{state}`

## Protocol
- MQTT

## Steps
1. `npm i`
1. `node start`

### View Results
To view the processed stream, either
- Navigate to the [MQTT COVID Stream Viewer](https://www.marcd.dev/COVIDStreamViewer/mqtt/mqttListener.html) and subscribe to `com/covidtracking/states/current/percent/update/#`
- OR in a separate terminal run `npm run subscribe`

## Test
1. `npm test`


