const { Game, Category, Developer, User, Usergame } = require('../../database/models/index');
const multer = require('multer');

const getOne = async (req,res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const game = await Game.findOne({
            where: { id },
            attributes: { exclude: ['idCategory', 'idDeveloper'] },
            include: [{model: Category}, {model: Developer}], 
        });
        if (!game) {
            return res.status(404).json({ msg: 'Juego no encontrado' });
        } else {
            // Econtro el juego en la db
            return res.status(200).json(game);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const getAll = async (req, res) => {
    try {
        const games = await Game.findAll({
            attributes: { exclude: ['idCategory', 'idDeveloper'] },
            include: [{model: Category}, {model: Developer}], 
        });
        if (!games) {
            return res.status(404).json({ msg: 'Juegos no encontrados' });
        } else {
            // Devuelvo todos los datos
            games.sort((a, b) => a.id - b.id);
            return await res.status(200).json(games);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const deleteOne = async (req, res, next) => {
    try{
        const id = req.params.id;
        const game = await Game.findByPk(id);
        if (!game) {
            return res.status(404).json({msg:"Elemento no encontrado"})
        } else {
            // Encuentro el juego y borro las relaciones con los usuarios que lo tienen
            Usergame.destroy({where: {idGame: id}})

            // Borro el juego
            game.destroy();
            return res.status(200).json({msg:"Borrado correctamente"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const findGamesByCategory = async (req,res) => {
    try{
        const id = req.params.id
        if(await Category.findByPk(id)) {
            // La categoria existe en la DB
            const games = await Game.findAll({ 
                where: { idCategory: id },
                attributes: { exclude: ['idCategory', 'idDeveloper'] },
                include: [{model: Category}, {model: Developer}],
            });
            // Si obtengo un array vacio, es porque no hay juegos de esa categoria
            if (games.length > 0) { 
                return res.status(200).json({games, 'msg':'Encontrados correctamente'})
            } else {
                // Si no hay juegos de esa categoria, devuelvo un 404
                return res.status(404).json({'msg':'No hay juegos para esa categoria'})
            }
        }else{
            // La categoria no existe en la DB
            return res.status(404).json({'msg':'La categoria no existe en la DB'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const findGamesByDeveloper = async (req,res) => {
    try{
        const id = req.params.id
        if(await Developer.findByPk(id)) {
            // El developer existe en la DB
            const games = await Game.findAll({ 
                where: { idDeveloper: id },
                attributes: { exclude: ['idCategory', 'idDeveloper'] },
                include: [{model: Category}, {model: Developer}],
            });
            // Si obtengo un array vacio, es porque no hay juegos de ese developer
            if (games.length > 0) { 
                return res.status(200).json({games, 'msg':'Encontrados correctamente'})
            } else {
                // Si no hay juegos de esa developer, devuelvo un 404
                return res.status(404).json({'msg':'No hay juegos para ese developer'})
            }
        }else{
            // El developer no existe en la DB
            return res.status(404).json({'msg':'El developer no existe en la DB'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const findGamesByUser = async (req,res) => {
    try{
        const id = req.params.id
        if(await User.findByPk(id)) {
            // El usuario existe en la DB
            const usergames = await Usergame.findAll({ 
                where: { idUser: id }
            });
            // Si obtengo un array vacio, es porque no hay juegos comprados por ese usuario
            if (usergames.length > 0) { 
                // Tengo un array de objetos con los juegos comprados por el usuario
                const games = [];
                const promises = usergames.map(async (usergame) => {
                    const game = await Game.findOne({
                        where: { id: usergame.idGame },
                        attributes: { exclude: ['idCategory', 'idDeveloper'] },
                        include: [{model: Category}, {model: Developer}], 
                    });
                    games.push(game);
                });
                // Espero a que se resuelvan todas las promesas
                await Promise.all(promises);

                return res.status(200).json({games, 'msg':'Encontrados correctamente'})
            } else {
                // Si no hay juegos de ese usuario, devuelvo un 404
                return res.status(404).json({'msg':'No hay juegos para ese usuario'})
            }
        }else{
            // El usuario no existe en la DB
            return res.status(404).json({'msg':'El usuario no existe en la DB'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

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
        cb(null, './images/games')
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

const addGame =  async (req, res) => {
    try{
        const game = await Game.create(req.body);
        if (game) {
            return res.status(201).json({'msg':'Creado correctamente', game})
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
    findGamesByCategory,
    findGamesByDeveloper,
    findGamesByUser,
    getOne,
    getAll,
    deleteOne,
    addGame,
    uploadImage
};