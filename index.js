const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    reply(reply_token, msg,req)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token, msg,req) {
    let status = "false"
    let eventtype = req.body.events[0].type
    let sourcetype = req.body.events[0].source.type
    let replytoken = req.body.events[0].replyToken
    if (eventtype == "join" || eventtype == "message") {
        requestMessage(req)
    } 
}

function requestMessage(req) {
    let body = JSON.stringify(req.body.events[0])
    request.post({
        url: 'http://203.154.57.171/line/message',
        headers: {'Content-Type': 'application/json'},
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}
