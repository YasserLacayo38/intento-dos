
const { Router, query } = require('express');
const {check} = require('express-validator');
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
const { validarRol, emailExist, idExist, isNumero } = require('../helpers/db-validators');
const {validarCampos}= require('../middlewares/validar-campos');

const router = Router();


router.get('/', [
    check('limite').custom(isNumero),
    validarCampos
], usuariosGet );

router.put('/:id',[
    check('id','no es un ID valido').isMongoId().custom(idExist),
    check('rol').custom(validarRol ),
    validarCampos
], usuariosPut );

router.post('/',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password','la contrasena dede ser mas de 6 letras').isLength({min:6}),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('correo','el correo no es valido').isEmail().custom(emailExist),
    check('rol').custom(validarRol ),
    validarCampos
], usuariosPost );

router.delete('/:id', [
    check('id','no es un ID valido').isMongoId().custom(idExist),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;