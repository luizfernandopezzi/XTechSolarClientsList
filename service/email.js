import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 465,
  security: false,
  auth: {
    user: 'xtechsolarluiz@yahoo.com',
    pass: 'pigr wavc wste ohjs'
  },
  tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }, 
})

export const enviaEmail = () => {
transporter.sendMail({
    from: "Luiz XTechSolar <xtechsolarluiz@yahoo.com>",
    to: "luizfpezzi@gmail.com",
    subject: "Cadastro de cliente confirmado",
    text: "Cadastro de cliente confirmado"
}
).then(message => {
    console.log(message);
}).catch(err => {
    console.log(err);
})
}

enviaEmail()