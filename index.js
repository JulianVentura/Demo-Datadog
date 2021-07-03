const express = require('express')

app = express()

const PORT = process.env.PORT
const ENV = process.env.NODE_ENV

const data = [
    {
    "id": 0,
    "nombre": "Pedro",
    "apellido": "Lopez",
    "edad": 38,
    "nacionalidad": "argentina"
    }
]

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Running in ${ENV} mode`);
});

app.get('/hello', (req, res, next) => {
    res.status(200).send("Hello World");
})

app.get('/personas', (req, res, next) => {
    res.status(200).send(
        {
            'status': 'success',
            'data': data
        }
    );
})

app.get('/persona/:id', (req, res, next) => {
    const id = req.params.id
    if (data.length <= id){
        res.status(404).send({
            'status': 'error',
            'error': "user-not-found"
        })
    }
    res.status(200).send({
        'status': 'success',
        'data': data[id]
    });
})

app.post('persona'), (req, res, next) => {
    const { nombre, apellido, edad, nacionalidad } = req.body;
    if (!nombre || !apellido || !edad || !nacionalidad){
        res.status(400).send({
            'status': 'error',
            'error': "body-missing-attributes-error"
        })
    }
    
    data.push({
        id: data.length,
        nombre,
        apellido,
        edad,
        nacionalidad
    })

    res.status(200).send({
        'status': 'success',
        'data': data[data.length - 1]
    });
}