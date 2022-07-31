
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

const indexF = async (req,res) => {
    return res.render('../src/views/fruta/index', {usuario});
};

const createF = async (req,res) => {
    return res.render('../src/views/fruta/create');
};

const showF = async (req,res) => {
    const id = req.params.id
    const elemento = usuario[id]
    return res.render('../src/views/fruta/show', {elemento});
};

const editF = async (req,res) => {
    const id = req.params.id
    const elemento = usuario[id]
    return res.render('../src/views/fruta/edit', {elemento});
};


module.exports = {
    indexF,
    createF,
    showF,
    editF
};