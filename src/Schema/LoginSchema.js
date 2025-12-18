import * as zod from 'zod'

// valdiation with zod 
export const schema = zod.object({
    email: zod.string().nonempty('Email is Required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Invalid Email'),
    password: zod.string().nonempty('Password is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Password must contain 8 Characters , At least one uppercase, one lowercase, one digit and one special character')
})