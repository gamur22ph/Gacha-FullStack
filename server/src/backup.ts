// bcrypt sample
import {hash, compare} from 'bcryptjs';

export const password : string = "EasyEasy";

export const hashedPassword : string = await hash(password, 10)

export const isMatch : boolean = await compare(password, hashedPassword)

