const nodemailer = require('nodemailer');

(async ()=>{
  try{
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.zoho.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_TO || 'info@301atech.com',
      subject: 'SMTP test — 301A TECH',
      text: 'This is a test email sent from the website SMTP test script.'
    });

    console.log('Message sent:', info.messageId);
    process.exit(0);
  }catch(err){
    console.error('Send failed:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
