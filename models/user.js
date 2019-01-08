const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


//Create a schema
const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    }
        ,
    password: {
        type:String,
        required:true
    }
}); 

userSchema.pre('save',async function(next){
    try{
        //Generate salt
        const salt = await bcrypt.genSalt(10);

        //generate password hash (salt+hash)
        const passwordHash = await bcrypt.hash(this.password,salt);
        
        //Assign hashed password to original
        this.password = passwordHash;
        next();

    }catch(error){
        next(error);
    }
});


userSchema.methods.isValidPassword = async function(newPassword){
    try{
        return await bcrypt.compare(newPassword,this.password);
    }catch(error){
    throw new Error(error); 
    }
}


//create a model
const User = mongoose.model("user",userSchema);

//Export the model 
module.exports = User;