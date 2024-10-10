const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());


// MongoDB connection string
const uri = 'mongodb+srv://chathuminijayalath2020:1234567890@deliveryappcluster.29vsc.mongodb.net/?retryWrites=true&w=majority&appName=DeliveryAppCluster';

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define the DeliveryPerson schema
const deliveryPersonSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String
});

const DeliveryPerson = mongoose.model('DeliveryPerson', deliveryPersonSchema);

// Get all delivery persons
app.get('/api/delivery-persons', (req, res) => {
  DeliveryPerson.find()
    .then(persons => res.json(persons))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new delivery person
app.post('/api/delivery-persons', (req, res) => {
  const newPerson = new DeliveryPerson(req.body);

  newPerson.save()
    .then(() => res.json('Delivery person added successfully'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update a delivery person by ID
app.put('/api/delivery-persons/:id', (req, res) => {
  DeliveryPerson.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => res.json('Delivery person updated successfully'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a delivery person by ID
app.delete('/api/delivery-persons/:id', (req, res) => {
  DeliveryPerson.findByIdAndDelete(req.params.id)
    .then(() => res.json('Delivery person deleted successfully'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
