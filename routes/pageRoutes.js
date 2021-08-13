const express = require('express');
const router = express.Router();
const nodeoutlook = require('nodejs-nodemailer-outlook');
const dotenv = require('dotenv');

dotenv.config();

let msg = '';

router.get('/', function(req, res){
    res.render('main/home', {msg});
})

router.get('/services', function(req, res){
    res.render('main/services')
})

router.get('/about', function(req, res){
    res.render('main/about')
})

router.get('/contact', function(req, res){
    res.render('main/contact', {msg})
})

router.post('/sent', (req, res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    let emailMessage = `${name} <${email}>\nPhone: ${phone}
    \nhas made a request regarding:
    \n${message}`;

    nodeoutlook.sendEmail({
        auth: {
            user: 'itutesting@outlook.com',
            pass: process.env.EMAIL_PASS
        },
        from: 'itutesting@outlook.com', //must be the same email in the case of outlook
        to: 'itutesting@outlook.com',
        subject: 'Nodemailer test',
        text: emailMessage,
        onError: (e) => {
            console.log(e, e.rejected);
            let msg = 'Something went wrong :(';
            res.render('main/contact', {msg});
        },
        onSuccess: (i) => {
            console.log(i.accepted, i.messageId);
            let msg = 'Email sent successfully'
            res.render('main/contact', {msg});
        }
    })

})

module.exports = router;