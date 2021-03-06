/*{
    nombre:'',
    correo:'',
    password:'',
    img:'',
    rol:'', 
    estado: false,
    google: true

} */

const { Schema, model}= require('mongoose');

const UsuarioSchema =  Schema({
    nombre:{
        type: String,
        required:[true,'el nombre es obligatorio']
    },
    correo:{
        type: String,
        required:[true,'el correo es obligatorio'],
        unique:true
    },
    password:{
        type: String,
        required:[true,'la contrasena es obligatorio']
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type: Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },
});


UsuarioSchema.methods.toJSON= function(){
    const{__v, password,...usuario}= this.toObject();
    return usuario
}

module.exports=model('Usuario',UsuarioSchema);