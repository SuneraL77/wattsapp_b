import mongoose from 'mongoose';
import validator from 'validator';
import bycrpt  from 'bcrypt'
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please Provide your name"]
    },
    email:{
        type:String,
        required:[true,"Please provide your email address"],
        uinque:[true,"This email address already exit"],
        lowercase:true,
        validator:[validator.isEmail,'Please provide a valid email adress']
    },
    picture:{
        type:String,
        default:"https://www.clipartmax.com/png/small/214-2143742_individuals-whatsapp-profile-picture-icon.png"
    },
    password:{
    type:String,
    required:[true,"Please provide your password"],
    minLength:[
        6,
        "Please make your password is at least 6 characters long"
    ],
    maxLength:[
        128,
        "please make sure your password is less than 128 characters long"
    ]

    },
    status:{
     type:String,
    }
}, 
{
    colection:"users",
    tymeStamps:true,
}
);
userSchema.pre('save',async function(next){
    try{
if(this.isNew){
    const salt = await bycrpt.genSalt(12);
    const hashedPassword= await bycrpt.hash(this.password,salt);
    this.password = hashedPassword
}
next();
    }catch(error){
        next(error)
    }
})
const UserModel = mongoose.models.UserModel || mongoose.model("UserModel",userSchema)

export default UserModel;