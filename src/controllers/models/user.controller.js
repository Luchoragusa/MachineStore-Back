const { User, Role, Usergame } = require('../../database/models/index');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const { EmailIsUniqueB } = require('../../validators/EmailIsUnique');
const { sendConfirmationEmail } = require('../../helpers/sendEmail');
const multer = require('multer');

const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: { id },
            attributes: { exclude: ['password', 'idRole'] },
            include: [{model: Role}]
        });
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        } else {
            // Econtro el usuario en la db

            // Devuelvo todos los datos y la url de la imagen
            let u = user.dataValues;
            return res.status(200).json(u);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const getAll = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password', 'idRole'] },
            include: [{model: Role}]
        });
        if (!users) {
            return res.status(404).json({ msg: 'Usuarios no encontrados' });
        } else {
            const usersArray = [];
            const promises = users.map(async (user) => {
                usersArray.push(user);
            });
            // Espero a que se resuelvan todas las promesas
            await Promise.all(promises);
            usersArray.sort((a, b) => a.id - b.id);
            return await res.status(200).json(usersArray);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const update = async (req,res) => {
    try{
        const params = req.body;
        const id = req.params.id;
        let u = await User.findByPk(id);
        if (u) {
            let email = u.email;
            // Valido para cambiar el correo
            if (u.email != params.email){ // El mail del body es distinto al del usuario
                const emailUnique = await EmailIsUniqueB(req, res); // Valido si ese mail lo tiene otro usuario

                if (emailUnique){
                    email = params.email; // Si el correo es distinto al de la db y no esta en uso, guardo el nuevo
                }else{
                    return res.status(404).json({msg:"El mail ya fue registrado"})
                }
            }
            // Hago el update
            u.update({
                name: params.name || u.name,
                surname: params.surname || u.surname,
                idRole: params.idRole || u.idRole,
                email: email
            }).then(u => {
            res.status(201).json({u, 'msg':'Editado correctamente'})
            })
        } else {
            return res.status(404).json({msg:"Usuario no encontrado"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const deleteOne = async (req, res, next) => {
    try{
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({msg:"Elemento no encontrado"})
        } else {
            // Encuentro el usuario y borro los juegos que tiene
            Usergame.destroy({where: {idUser: id}})

            // Borro el usuario
            user.destroy();
            return res.status(200).json({msg:"Borrado correctamente"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const validateToken =  async (req, res) => {
    try{
        const token = req.params.token;
        const email = jwt.decode(token, process.env.HASH_KEY);
        const u = await User.findOne({ where: { email: email } });
        if (u) {
            u.update({
                confirmed: true
            }).then(u => {
                return res.redirect('http://186.182.43.139:4200/auth/login');
            })
        } else {
            return res.status(404).json({'msg':'No se recibieron los datos'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const login = async (req, res) => {
    try{
        //Comprobar email en DB
        const u = await User.findOne({ where: { email: req.body.email } });
        if(u){
            // El mail esra en la db
            if(bcrypt.compareSync(req.body.password, u.password)){
                // Valido si verifico el mail
                if (u.confirmed){
                    // Creo el token
                    let token = createToken(u);
                    // Guardo el token en la cookie
                    res.cookie('jwt', token, { httpOnly: true, secure: true });
                    return res.status(200).json({token})
                }else{
                    return res.status(404).json({msg:"No verifico el mail"})
                }
            } else {
                return res.status(404).json({'msg':'Email y/o contraseña incorrectos'})
            }
        }else{
            // Email no se encontro en la DB
            return res.status(404).json({'msg':'Email y/o contraseña incorrectos'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}


const createToken = (u) => {
    const payload = {
        userId: u.id,
        email: u.email,
        role: u.idRole,
        createdAt: moment().unix(),
        expiredAt: moment().add(30, 'minutes').unix()
    }
    return jwt.encode(payload, process.env.HASH_KEY) 
}

// =========== Cargo la imagen ===========

// Filtro de archivos
const fileFilter=function(req,file,cb){
    const allowedTypes=["image/jpg","image/jpeg","image/png"];
    if(!allowedTypes.includes(file.mimetype)){

        const error=new Error("wrong file type");
        error.code="LIMIT_FILE_TYPES";
        return cb(error,false);
      }
      cb(null,true);
}

// Es donnde se guardan los archivos y el nmobre que van a tener
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/users')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
    
// Es la cte donde seteamos la configuracion de multer

const upload=multer({storage,fileFilter});

// Es la funcion que se va a ejecutar cuando se haga la peticion

const uploadImage = upload.single('image')

// =======================================

// =========== Creo el usuario ===========

const register =  async (req, res) => {
    try{
        req.body.password = bcrypt.hashSync(req.body.password, 10); // tomo la pw que me llega, la encripto y la guardo en el campo password
        req.body.image = req.file.originalname;

        const u = await User.create(req.body);
        sendConfirmationEmail(u);
        if (u) {
            return res.status(201).json({'msg':'Creado correctamente', u})
        } else {
            return res.status(404).json({'msg':'No se recibieron los datos'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

// =======================================


module.exports = {
    getOne,
    getAll,
    register,
    update,
    login,
    deleteOne,
    validateToken,
    uploadImage
};