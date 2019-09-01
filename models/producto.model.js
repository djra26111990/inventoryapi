const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productoSchema = new Schema({
  nombreproducto: { type: String, required: true },
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;