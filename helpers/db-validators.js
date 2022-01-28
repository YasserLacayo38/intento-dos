

const Role= require('../models/role');
const Usuario= require('../models/usuario');

const validarRol =async(rol='')=>{
    const existeRol= await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`el rol: ${rol} no esta registrado`);
    }
}

const emailExist= async(correo='')=>{
    const existeEmail= await Usuario.findOne({correo});
    if(existeEmail){
        
        throw new Error(`el correo: ${correo} ya esta registrado`);
    } 
}
const idExist= async(id='')=>{
    const existeid= await Usuario.findById(id);
    if(!existeid){
        
        throw new Error(`el usuario con id: ${id} no esta registrado`);
    } 
}

const isNumero= async(limite)=>{
    if(isNaN(limite)){
        throw new Error(`el limite ${limite} no es un valor valido`);
    }
}

module.exports={
    validarRol,
    emailExist,
    idExist,
    isNumero
}