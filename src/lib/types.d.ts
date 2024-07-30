import { User } from "@prisma/client"


//next-auth uses its own "user" type despite our prisma schema being specified
//must change "user" type for next-auth as below  

declare module "next-auth" {
    interface Session {
        user: User
    }    
}

//similarly we need to change the type of the "token" 

declare module "next-auth/jwt" {
    interface JWT {
        user: User;
    }
}