import axios from 'axios';
  
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
const AddUser = () => {


    const Navigate = useNavigate();
    const users={
        name: '',
        email: '',  
        age: ''
    }
    const [user, setUser] = useState(users);
    const inputHandle = (e) => {
        const { name, value } = e.target
    setUser({...user, [name]: value })
    }
    const submitHandle =async (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/addUser', user).then((response) => {
           
            toast.success(response.data.message,{position: 'top-right', duration: 3000});
        Navigate('/');
       
        })
            
            .catch((error) => {
            console.error('Error adding user:', error);});
      
         
      
       
    }
  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Add User</h2>
        <p className="text-center text-muted">Welcome to the Add User page!</p>

        <form onSubmit={submitHandle}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name :</label>
            <input
              onChange={inputHandle}
              type="text"
              id="name"
              name="name"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email :</label>
            <input
              onChange={inputHandle}
              type="email"
              id="email"
              name="email"
              className="form-control"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="form-label">Age :</label>
            <input
              onChange={inputHandle}
              type="number"
              id="age"
              name="age"
              className="form-control"
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">Add User</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUser
