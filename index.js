const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000

let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer OXFKQOlc4tKKxW6PPX8dFZCJa5bzfeE8BhtVjNzsppgHbnfWyPP6y3FGPfsrxDb5BqXpTC6HriZPJa77foj5wICauaoTexnfvX3DNVSnj99kFgHgTbwBHKgWsuWET0ln0R27DnP3Hin+vZx9wwqr0QdB04t89/1O/w1cDnyilFU='
    }

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
    status = "false"
    let eventtype = req.body.events[0].type
    let sourcetype = req.body.events[0].source.type
    let replytoken = req.body.events[0].replyToken
    // if ((eventtype == "join" && (sourceType == "group" || sourceType == "room")) || (eventtype == "message" && sourceType == "user"){
    //     status = "true"
    // } 
     if (eventtype == "join" || eventtype == "message"){
        status = "truee"
    } 

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: eventtype+sourcetype + replytoken +status + msg
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}


function requestMessage(req) {
     // let body = JSON.stringify({req.body.events[0]})
    //  request.post({
    //     url: 'http://203.154.57.171/line/message',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: body
    // }, (err, res, body) => {
    //     console.log('status = ' + res.statusCode);
    // });
}

// 


