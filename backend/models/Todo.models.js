const mongoose = require('mongoose');


const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true, },
  completed: { type: Boolean, default: false },
});


const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;


// const SignupSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   firstName: { type: String },
//   lastName: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   isActive: { type: Boolean, default: true }
// });

// const Signup = mongoose.model('Signup', SignupSchema);

// module.exports.Signup = Signup;


// const ProductSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   price: { type: Number, required: true },
//   inStock: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const Product = mongoose.model('Product', ProductSchema);

// module.exports.Product = Product;