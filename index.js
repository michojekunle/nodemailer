const http = require('http')
const url = require('url')
const nodemailer = require('nodemailer')

const port =  8081;


const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    const q = url.parse(req.url, true).query

    const { name, email, about } = q;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'michojekunle1@gmail.com',
            pass: 'oqhhgcmrnygjnguv'
        }
    });

    const mailOptions = {
        from: 'AMD <michojekunle1@gmail.com>',
        to: email,
        subject: 'Nodemailer: About you 😇😇',
        html: `<h2>Hello ${name}👋👋, </h2> <p>Here's a little About you: <br/> <br/> ${about}</p> <p>Thanks for trying me out. Made with ❤ by <a href='https://github.com/michojekunle'>AMD</a></p> <h6>An email sent with <a href='https://nodemailer.com/about/'>nodejs nodemailer</a></h6>`
    };


    transporter.sendMail(mailOptions, function(error, info) { 
        if(error) {
            console.log(error);
            res.write('<h2 style="text-align: center; color: red; margin-top: 50px">An Error Occured: Error Sending mail</h2>')
            res.end();
        } else {
            console.log('Email sent: ' + info.response);
            res.write('<h2 style="text-align: center; color: green; margin-top: 50px">Email Sent: Check your Mail for my Message</h2>')
            res.end();
        }
    });
})

server.listen(port, () => {
    console.log('Listening on port', port)
})
