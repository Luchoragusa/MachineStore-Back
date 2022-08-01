
let fruta = [
    {
        'id':0,
        'nombre':'Banana'
    },
    {
        'id':1,
        'nombre':'Manzana'
    },
    {
        'id':2,
        'nombre':'Pera'
    },
    {
        'id':3,
        'nombre':'Limon'
    },
    {
        'id':4,
        'nombre':'Sandia'
    },
    {
        'id':5,
        'nombre':'Manzana'
    },
    {
        'id':6,
        'nombre':'Mandarina'
    },
    {
        'id':7,
        'nombre':'Ciruela'
    },
    {
        'id':8,
        'nombre':'Uva'
    },
    {
        'id':9,
        'nombre':'Coco'
    },
]

const indexF = async (req,res) => {
    return res.render('../src/views/fruta/index', {fruta});
};

const createF = async (req,res) => {
    return res.render('../src/views/fruta/create');
};

const showF = async (req,res) => {
    const id = req.params.id
    const elemento = fruta[id]
    return res.render('../src/views/fruta/show', {elemento});
};

const editF = async (req,res) => {
    const id = req.params.id
    const elemento = fruta[id]
    return res.render('../src/views/fruta/edit', {elemento});
};

//API

const storeF = async (req,res) => {
    const {nombre,id} = req.body;
    if (nombre) {
        fruta.unshift({id,nombre})
        return res.status(200).json({'status':200, id, nombre, 'msg':'Creada correctamente'})
    } else {
        return res.status(404).json({'msg':'No se recibieron los datos'})
    }
};

const updateF = async (req,res) => {
    const {nombre} = req.body;
    const id = req.params.id;
    if (id) {
        const actualizado = fruta.splice(id,1,{'id':id,'nombre':nombre})
        return res.status(201).json({'status':201, actualizado, 'msg':'Editada correctamente'})
    } else {
        return res.status(404).json({'msg':'No se recibieron los datos'})
    }
};

const destroyF = async (req,res) => {
    const id = req.params.id;
    const eliminado = fruta.splice(id,1)
    return res.status(200).json({'status':200,eliminado, 'msg':'Eliminada correctamente'})
};

module.exports = {
    indexF,
    createF,
    showF,
    editF,
    storeF,
    updateF,
    destroyF
};