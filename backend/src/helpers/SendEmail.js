import sgMail from '@sendgrid/mail';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SendEmail = async (
    subject,
    send_to,
    reply_to,
    template,  
    name,
    link,
    send_from
) => {
    try {
       
        const templatePath = path.resolve(__dirname, '../views', `${template}.hbs`); 
        const templateSource = fs.readFileSync(templatePath, 'utf-8');
        const hbsTemplate = handlebars.compile(templateSource);

        
        const htmlContent = hbsTemplate({
            name: name,
            link: link,
        });

        
        const msg = {
            to: send_to,
            from: send_from,
            replyTo: reply_to,
            subject: subject,
            html: htmlContent,  
        };

        const info = await sgMail.send(msg);
        console.log('Email sent: ', info);
        return info;
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error;
    }
};

export default SendEmail; 
