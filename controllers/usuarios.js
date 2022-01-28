const { response, request } = require('express');
const bcrjypts= require('bcryptjs');
const Usuario= require('../models/usuario');
const { validationResult } = require('express-validator');

const usuariosGet = async(req = request, res = response) => {

   // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
   const {limite=5, desde=0}= req.query;
   
 const [total, usuarios]= await Promise.all([Usuario.countDocuments({estado:true}), 
 Usuario.find({estado:true})
 .skip(desde)
 .limit(limite)])
    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {

    
    
    const {nombre, correo, password, rol} = req.body;
    const usuario= new Usuario({nombre, correo, password, rol});
    //verificar si el correo existe
    
    //Encriptar la contrasena
    const salt= bcrjypts.genSaltSync();
    usuario.password= bcrjypts.hashSync(password,salt);
    //guardar en bd
    await usuario.save();
    res.json({
        usuario
    });
}

const usuariosPut =async(req, res = response) => {

    const { id } = req.params;
    const {_id, password, google, correo, ...resto}= req.body;
    //todo validar contra base de datos
    if(password){
        const salt= bcrjypts.genSaltSync();
         resto.password= bcrjypts.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto,{new: true});
    res.json({
        usuario
    });
}


const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;
    //borrar fisicamente
    //const usuario= await Usuario.findByIdAndDelete(id);
    const usuario= await Usuario.findByIdAndUpdate(id,{estado:false},{new:true});
    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}