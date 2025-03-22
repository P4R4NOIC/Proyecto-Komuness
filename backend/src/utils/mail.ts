import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || 'proyecto.komuness@gmail.com',
        pass: process.env.GMAIL_APPKEY
    },
});
export const sendEmail = async (to: string, subject: string, text: string) => {
    const mailOptions = {
        from: 'Proyecto-Komuness',
        to,
        subject,
        text,
    };
    try {

        let response: SMTPTransport.SentMessageInfo = await transporter.sendMail(mailOptions);
        console.log('Correo electrónico enviado:', response.messageId);


    } catch (error) {
        console.log('Error al enviar el correo electrónico:', error);
    }
}