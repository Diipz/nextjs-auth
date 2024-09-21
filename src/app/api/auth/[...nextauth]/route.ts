import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth/next";



export const authOptions : AuthOptions = {

    pages: {
        signIn: "/auth/signin/client"
    },

    // Session expires in x hours
    session: {
        strategy: "jwt",
        maxAge: 5 * 60
    },

    providers :[   
        CredentialsProvider({
            id: "client",
            name: "Client Credentials",

            credentials: {
                username: {
                    label: "User Name",
                    type: "text",
                    placeholder: "User Name"    
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            //Once user clicks sign in, the username and password are passed as credentials
            async authorize(credentials) {
                //return user object if user credentials correct otherwise return null & throw error
                
                // Try to find the user in the `User` table first
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.username,
                    }
                });

                if(!user) throw new Error("User name or password is not correct");

                if(!credentials?.password) throw new Error("Please Provide Your Password");
                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                if(!isPasswordCorrect) throw new Error("User name or password is not correct");

                if(!user.emailVerified) throw new Error("Please verify your email");
                
                //successful login
                const { password, ...userWithoutPass } = user;
                //userWithoutPass sent to NextAuth session
                return userWithoutPass;
            }
        }),

        CredentialsProvider({
            id: "associate",
            name: "Associate Credentials",

            credentials: {
                username: {
                    label: "User Name",
                    type: "text",
                    placeholder: "User Name"    
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            //Once user clicks sign in, the username and password are passed as credentials
            async authorize(credentials) {
                //return user object if user credentials correct otherwise return null & throw error
                
                // Try to find the user in the `User` table first
                const user = await prisma.associate.findUnique({
                    where: {
                        email: credentials?.username,
                    }
                });

                if(!user) throw new Error("User name or password is not correct");

                if(!credentials?.password) throw new Error("Please Provide Your Password");
                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                if(!isPasswordCorrect) throw new Error("User name or password is not correct");

                if(!user.emailVerified) throw new Error("Please verify your email");
                
                //successful login
                const { password, ...userWithoutPass } = user;
                //userWithoutPass sent to NextAuth session
                return userWithoutPass;
            }
        }),
    ],

    callbacks: {
        // Add "User" from prisma schema to JWT token in order to access user credentials in session
        async jwt({ token, user }) {
            if(user) token.user = user as any
            return token;
        },
        
        async session({ token, session }) {
            session.user = token.user as any
            return session;
        }
    }
}

//export authOptions in order to retrieve session
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };