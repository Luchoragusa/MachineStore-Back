
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


module.exports = {
    indexU,
    createU,
    showU,
    editU
};