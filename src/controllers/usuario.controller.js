let usuario = [
    {
        'id':0,
        'nombre':'pepe'
    },
    {
        'id':1,
        'nombre':'juan'
    },
    {
        'id':2,
        'nombre':'jony'
    }
]

const indexU = async (req,res) => {
    return res.render('../src/views/usuario/index', {usuario});
};

const createU = async (req,res) => {
    return res.render('../src/views/usuario/create');
};

const showU = async (req,res) => {
    const id = req.params.id
    const elemento = usuario[id]
    return res.render('../src/views/usuario/show', {elemento});
};

const editU = async (req,res) => {
    const id = req.params.id
    const elemento = usuario[id]
    return res.render('../src/views/usuario/edit', {elemento});
};

//API

const storeU = async (req,res) => {
    const {nombre,id} = req.body;
    if (nombre) {
        usuario.unshift({id,nombre})
        return res.status(200).json({'status':200, id, nombre, 'msg':'Creado correctamente'})
    } else {
        return res.status(404).json({'msg':'No se recibieron los datos'})
    }
};

const updateU = async (req,res) => {
    const {nombre} = req.body;
    const id = req.params.id;
    if (id) {
        const actualizado = usuario.splice(id,1,{'id':id,'nombre':nombre})
        return res.status(201).json({'status':201, actualizado, 'msg':'Editado correctamente'})
    } else {
        return res.status(404).json({'msg':'No se recibieron los datos'})
    }
};

const destroyU = async (req,res) => {
    const id = req.params.id;
    const eliminado = usuario.splice(id,1)
    return res.status(200).json({'status':200,eliminado, 'msg':'Eliminado correctamente'})
};


module.exports = {
    indexU,
    createU,
    showU,
    editU,
    storeU,
    updateU,
    destroyU
};