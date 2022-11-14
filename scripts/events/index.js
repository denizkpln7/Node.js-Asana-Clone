const eventEmitter = require("./eventEmitter")
const nodemailer = require("nodemailer");

let testAccount =  nodemailer.createTestAccount();

module.exports=()=>{
    eventEmitter.on("send_email",(data)=>{
        console.log("event alındı",data)
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: testAccount.user, // generated ethereal user
              pass: testAccount.pass, // generated ethereal password
            },
          });

          let info =  transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            ...data
          });
          
    })
}