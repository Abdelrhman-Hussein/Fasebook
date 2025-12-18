import * as zod from 'zod'

// valdiation with zod 
export const schema = zod.object({
    name: zod.string().nonempty('Name is Required').min(3, 'Name must be at least 3 Characters').max(20,'Name must be at most 20 Characters'),
    email: zod.string().nonempty('Email is Required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Invalid Email'),
    password: zod.string().nonempty('Password is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Password must contain 8 Characters , At least one uppercase, one lowercase, one digit and one special character'),
    rePassword:zod.string().nonempty('Repassword is Required'),
    dateOfBirth:zod.coerce.date('Date is Required').refine((value)=>{
        const userAge = value.getFullYear();
        const now = new Date().getFullYear();
        const diff = now - userAge
        return diff >= 18
    },'Age is less than 18'),
    gender: zod.string().nonempty('Gender is Required')

}).refine((data)=>data.password === data.rePassword, {path:['rePassword'],message:'Password and Repassword are not the same'})