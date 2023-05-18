import { fileURLToPath } from "url";
import {dirname } from "path";
import bcrypt from "bcrypt"


export function createHash(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

 export function isValidPassword(user,password){
    return  bcrypt.compareSync(password,user.password)
 }
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;