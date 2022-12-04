const nodemailer = require('nodemailer');
const jwt = require('jwt-simple');
const hbs = require('nodemailer-express-handlebars');
const path = require('path')

const logo = 'https://cdn.discordapp.com/attachments/852889034723426324/998718998516617466/icono-MS-black.png';
const urlTienda = 'https://www.mercadolibre.com.ar/'

const handlebarOptions = {
  viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve('.src/helpers/views'),
      defaultLayout: false,
    },
  viewPath: path.resolve('src/helpers/views'),
  extname: ".handlebars",
}

const sendConfirmationEmail = async (user) => {
  var token = jwt.encode(user.email, process.env.HASH_KEY);
  const url = `${process.env.URL}/users/confirm/${token}`;

  var mailOptions = {
    from: {
      name: 'Machine Store',
      address: process.env.EMAIL
    },
      to: user.email,
      subject: 'Confirmación de cuenta', 
      template: 'confirmationEmail',
      context: {
          logo: logo,
          urlTienda: urlTienda,
          url: url,
          user: user.name
      }
  };

  sendEmail(mailOptions);
}

const sendPurchasenEmail = async (user) => {
  var mailOptions = {
    from: {
      name: 'Machine Store',
      address: process.env.EMAIL
    },
      to: user.email,
      subject: 'Felicitaciones por adquirir un juego!',
      template: 'purchaseEmail',
      context: {
          logo: logo,
          urlTienda: urlTienda,
          url: url,
          user: user.name
      }
  };

  sendEmail(mailOptions);
}

  const sendEmail = async (mailOptions) => {
    try{

      var transporter = await nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
      });

      await transporter.use('compile', hbs(handlebarOptions));

      await transporter.sendMail(mailOptions,  (err, info) => {
        if(err){
            console.log(err);
        }else{
            console.log("Email sent: " + info);
        }
    });

    }catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendConfirmationEmail,
    sendPurchasenEmail
};