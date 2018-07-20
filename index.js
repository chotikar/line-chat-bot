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
    reply(reply_token, msg)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token, msg,req) {
    let status = 'false'
    let eventtype = req.body.events[0].type
    let sourceType = req.body.events[0].source.type
    let reply_token = req.body.events[0].replyToken
    if ((eventtype === 'join' && (sourceType === 'group' || sourceType === 'room')) || (eventtype === 'message' && sourceType === 'user'){
        status = 'true'
    } 

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: status + msg
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


// function requestMessage(req) {
//   var options = {
//     url: 'http://203.154.57.171/line/message',
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     json: { req.body.events[0]}
//   }

//   request(options, function (error, response, body) {
//     if (response.statusCode == 200) {
//       console.log(body)
//     }
//   })
// }

// 


