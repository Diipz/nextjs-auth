import Handlebars from 'handlebars';
import nodemailer from "nodemailer";
import { activationTemplate } from "./emailTemplates/activation";
import { resetPasswordTemplate } from "./emailTemplates/resetPassword";

export async function sendMail({to, subject, body}: {
    to:string, 
    subject:string, 
    body:string}): Promise<boolean> {
    
        const { SMTP_EMAIL, SMTP_USER, SMTP_PASS } = process.env;
        //**TODO change to development mode on Mailtrap.io
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
            }
        });

        //**TODO clean console.logs
        try {
            const testResult = await transport.verify();
            console.log("Test Result Of Transport", testResult);
        } catch (error) {
            console.log(error);
            return false;
        }   
        try {
            const sendResult = await transport.sendMail({
                from: SMTP_EMAIL,
                to,
                subject,
                html: body,
            })
            console.log(sendResult);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } 
    }

export function compileActivationTemplate(name:string, url:string) {
    const template = Handlebars.compile(activationTemplate);
    const htmlBody = template({
        name,
        url,
    })
    return htmlBody;
}

export function compileResetPassTemplate(name:string, url:string) {
    const template = Handlebars.compile(resetPasswordTemplate);
    const htmlBody = template({
        name,
        url,
    })
    return htmlBody;
}