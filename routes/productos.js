const router = require('express').Router();
let Producto = require('../models/producto.model');

router.route('/').get((req, res) => {
  Producto.find()
    .then(productos => res.json(productos))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const nombreproducto = req.body.nombreproducto;
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const precio = Number(req.body.precio);
  const cantidad = Number(req.body.cantidad);
  const date = Date.parse(req.body.date);

  const newProducto = new Producto({
    nombreproducto,
    marca,
    modelo,
    precio,
    cantidad,
    date,
  });

  newProducto.save()
  .then(() => res.json('Producto agregado!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Producto.findById(req.params.id)
    .then(producto => res.json(producto))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Producto.findByIdAndDelete(req.params.id)
    .then(() => res.json('Producto eliminado.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Producto.findById(req.params.id)
    .then(producto => {
      producto.nombreproducto = req.body.nombreproducto;
      producto.marca = req.body.marca;
      producto.modelo = req.body.modelo;
      producto.precio = Number(req.body.precio);
      producto.cantidad = Number(req.body.cantidad);
      producto.date = Date.parse(req.body.date);

      producto.save()
        .then(() => res.json('Producto actualizado!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;