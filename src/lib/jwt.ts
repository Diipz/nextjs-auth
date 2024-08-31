import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
    expiresIn: string | number;
}

//set login link expiry
const DEFAULT_SIGN_OPTION: SignOption = {
    expiresIn: "120m"
}

//set reset password link expiry
const DEFAULT_RESET_PASS_OPTION: SignOption = {
    expiresIn: "10m"
}


export function signJwt(payload: JwtPayload, option: SignOption = DEFAULT_SIGN_OPTION) {
    const secretKey = process.env.JWT_USER_ID_SECRET!;
    const token = jwt.sign(payload, secretKey, option);
    return token;
}

export function signJwtResetPass(payload: JwtPayload, option: SignOption = DEFAULT_RESET_PASS_OPTION) {
    const secretKey = process.env.JWT_USER_ID_SECRET!;
    const token = jwt.sign(payload, secretKey, option);
    return token;
}

export function verifyJwt(token: string) {

    try {
        const secretKey = process.env.JWT_USER_ID_SECRET!;
        const decoded = jwt.verify(token, secretKey);
        return decoded as JwtPayload;        
    } catch (error) {
        console.log(error);
        return null;
    }
}
