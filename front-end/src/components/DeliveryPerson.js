import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './DeliveryPerson.css';

const DeliveryPerson = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [newEntry, setNewEntry] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Fetch delivery persons from the API fetch('http://localhost:5001/api/delivery-persons') // Update to the new port

  useEffect(() => {
    fetch('http://localhost:5001/api/delivery-persons') // Update to the new port
    .then(response => response.json())
    .then(data => {
      console.log("Fetched data on mount:", data); // Debugging log
      setData(Array.isArray(data) ? data : []);
    })
    .catch(error => console.error('Error fetching delivery persons:', error));
  
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEntry(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (editIndex === null) {
      // Add new entry (POST)
      fetch('http://localhost:5001/api/delivery-persons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry)
      })
        .then(response => response.json())
        .then(() => {
          setData(prevData => [...prevData, newEntry]);
          setNewEntry({ name: '', phone: '', email: '', address: '' });
          setModalVisible(false);
        })
        .catch(error => console.error('Error adding delivery person:', error));
    } else {
      // Update existing entry (PUT)
      const id = data[editIndex]._id;
      fetch(`http://localhost:5001/api/delivery-persons/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry)
      })
        .then(response => response.json())
        .then(() => {
          const updatedData = [...data];
          updatedData[editIndex] = newEntry;
          setData(updatedData);
          setNewEntry({ name: '', phone: '', email: '', address: '' });
          setModalVisible(false);
          setEditIndex(null);
        })
        .catch(error => console.error('Error updating delivery person:', error));
    }
  };

  const handleCancel = () => {
    setNewEntry({ name: '', phone: '', email: '', address: '' });
    setModalVisible(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setNewEntry(data[index]);
    setEditIndex(index);
    setModalVisible(true);
  };

  const handleDelete = (index) => {
    const id = data[index]._id;
    fetch(`http://localhost:5001/api/delivery-persons/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setData(prevData => prevData.filter((_, i) => i !== index));
      })
      .catch(error => console.error('Error deleting delivery person:', error));
  };

  const handleAddNew = () => {
    setNewEntry({ name: '', phone: '', email: '', address: '' });
    setModalVisible(true);
    setEditIndex(null);
  };

  return (
    <div className="delivery-person-page">
      <Sidebar />
      <div className="content">
        <h1>Delivery Person</h1>
        <div className="controls">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button className="add-button btn-warning" onClick={handleAddNew}>Add New +</button>
        </div>

        <table className="delivery-person-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Address</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.filter(item =>
              (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
              (item.phone || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
              (item.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
              (item.address || '').toLowerCase().includes(searchTerm.toLowerCase())
            ).map((item, index) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td><button className="update-button" onClick={() => handleEdit(index)}>Update</button></td>
                <td><button className="delete-button" onClick={() => handleDelete(index)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalVisible && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{editIndex === null ? 'Add New Entry' : 'Edit Entry'}</h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newEntry.name}
                onChange={handleInputChange}
                className="form-input"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={newEntry.phone}
                onChange={handleInputChange}
                className="form-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newEntry.email}
                onChange={handleInputChange}
                className="form-input"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={newEntry.address}
                onChange={handleInputChange}
                className="form-input"
              />
              <div className="modal-buttons">
                <button className="save-button" onClick={handleSave}>{editIndex === null ? 'Save' : 'Update'}</button>
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryPerson;
