"use server"

import { User, Associate } from "@prisma/client";
import prisma from "../prisma";
import * as bcrypt from "bcrypt";
import { compileActivationTemplate, compileResetPassTemplate, sendMail } from "../mail";
import { signJwt, signJwtResetPass, verifyJwt } from "../jwt";
import { setTimeout } from 'timers';

export async function registerUser(
    user: Omit<User, "id" | "emailVerified" | "image" | "stripe_customer_id">,
) {

    const result = await prisma.user.create({
        data: {
            ...user,
            password: await bcrypt.hash(user.password, 10)
        }
    })

    const jwtUserId = signJwt({ id: result.id });
    const entity = "client";
    const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${entity}/${jwtUserId}`;
    const body = compileActivationTemplate(user.firstName, activationUrl);
    
    await sendMail({
        to: user.email,
        subject: "Activate your account",
        body
    });
    
    //delete user after 10 minutes if not activated
    setTimeout(async () => {
        const userCheck = await prisma.user.findUnique({
        where: {
                id: result.id
            }
        });
        if (!userCheck?.emailVerified) {
            await prisma.user.delete({
                where: {
                    id: result.id
                }
            });
        }
    }, 10 * 60 * 1000);


    return result;
}

export async function registerAssociate(
    associate: Omit<Associate, "id" | "emailVerified" | "image" | "stripe_customer_id">
) {

    const result = await prisma.associate.create({
        data: {
            ...associate,
            password: await bcrypt.hash(associate.password, 10)
        }
    })

    const jwtUserId = signJwt({ id: result.id });
    const entity = "associate";
    const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${entity}/${jwtUserId}`;
    const body = compileActivationTemplate(associate.firstName, activationUrl);
    
    await sendMail({
        to: associate.email,
        subject: "Activate your account",
        body
    });
    
    //delete user after 10 minutes if not activated
    setTimeout(async () => {
        const associateCheck = await prisma.associate.findUnique({
        where: {
                id: result.id
            }
        });
        if (!associateCheck?.emailVerified) {
            await prisma.associate.delete({
                where: {
                    id: result.id
                }
            });
        }
    }, 10 * 60 * 1000);


    return result;
}


type ActivateUserFunc = (jwtUserId: string, entity: string) => Promise<"userNotExist" | "alreadyActivated" | "success" | "linkExpired" >;

export const activateUser: ActivateUserFunc = async (jwtUserId, entity) => {
    const payload = verifyJwt(jwtUserId);

    //expired activation link
    if(!payload) return "linkExpired";

    if(entity === "client"){
        
        const userId = payload?.id;
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    
        if(!user) return "userNotExist";
        if(user.emailVerified) return "alreadyActivated";
    
        const result = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                emailVerified: new Date()
            }
        })
        return "success";
    } else {
        const associateId = payload?.id;
        const associate = await prisma.associate.findUnique({
            where: {
                id: associateId
            }
        })
    
        if(!associate) return "userNotExist";
        if(associate.emailVerified) return "alreadyActivated";
    
        const result = await prisma.associate.update({
            where: {
                id: associateId
            },
            data: {
                emailVerified: new Date()
            }
        })
        return "success";
    }

}

export async function forgotPassword(email: string){
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    if(!user) throw new Error("The user does not exist!");

    //Send email with passowrd reset link
    const jwtUserId = signJwtResetPass({ 
        id: user.id 
    });

    const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/resetPass/${jwtUserId}`;
    const body = compileResetPassTemplate(user.firstName, resetPassUrl);

    const sendResult = await sendMail({
        to: user.email,
        subject: "Reset your password",
        body
    });
    return sendResult;
}

type ResetPasswordFunc = (
    jwtUserId: string, 
    password: string) 
    => Promise<"userNotExist" | "success">;

export const resetPassword: ResetPasswordFunc = async(jwtUserId, password) => {
        const payload = verifyJwt(jwtUserId);
        if(!payload) return "userNotExist";
        
        const userId = payload?.id;
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user) return "userNotExist";

        const result = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: await bcrypt.hash(password, 10)
            }
        })

        if(result) return "success";
        else throw new Error("Something went wrong!");
    }


