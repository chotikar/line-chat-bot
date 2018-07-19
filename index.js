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
    seperateMessageType(reply_token, req)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token, msg) {
    
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
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


function seperateMessageType(reply_token,req) {
    let messageType = req.body.events[0].message.type
    switch(messageType){
        case "text":
        reply(reply_token, "1." + messageType)
        break;
        case "image":
        reply(reply_token, "2." + messageType)
        break;
        case "sticker":
        reply(reply_token, "3." + messageType)
        break;
        case "location"
        reply(reply_token, "4." + messageType)
        break;
        default://audio
        reply(reply_token, "5." + messageType)
        break;
    }
} 


