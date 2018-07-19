const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})
app.listen(port)

function reply(reply_token, msg) {
   let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer OXFKQOlc4tKKxW6PPX8dFZCJa5bzfeE8BhtVjNzsppgHbnfWyPP6y3FGPfsrxDb5BqXpTC6HriZPJa77foj5wICauaoTexnfvX3DNVSnj99kFgHgTbwBHKgWsuWET0ln0R27DnP3Hin+vZx9wwqr0QdB04t89/1O/w1cDnyilFU='
    }
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

// sent what ever text response hello how are you
// function reply(reply_token) {
//     let headers = {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer OXFKQOlc4tKKxW6PPX8dFZCJa5bzfeE8BhtVjNzsppgHbnfWyPP6y3FGPfsrxDb5BqXpTC6HriZPJa77foj5wICauaoTexnfvX3DNVSnj99kFgHgTbwBHKgWsuWET0ln0R27DnP3Hin+vZx9wwqr0QdB04t89/1O/w1cDnyilFU='
//     }
//     let body = JSON.stringify({
//         replyToken: reply_token,
//         messages: [{
//             type: 'text',
//             text: 'Hello'
//         },
//         {
//             type: 'text',
//             text: 'How are you?'
//         }]
//     })
//     request.post({
//         url: 'https://api.line.me/v2/bot/message/reply',
//         headers: headers,
//         body: body
//     }, (err, res, body) => {
//         console.log('status = ' + res.statusCode);
//     });
// }
