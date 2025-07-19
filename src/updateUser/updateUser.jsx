import React, { useEffect } from 'react'
import axios from 'axios';
  
import { useState } from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import toast from 'react-hot-toast';

const UpdateUser = () => {
     const users={
        name: '',
        email: '',  
        age: ''
    }
 const [user, setUser] = useState(users);
    const Navigate = useNavigate();
    const { email } = useParams();
    useEffect(() => {
        const fetchUser = async () => { 


            axios.get(`http://localhost:8000/api/getUser/${email}`)
            .then((response) => {
                const data = response.data;
                console.log(data);
                setUser(data);
            })
            .catch((error) => { 
                console.error('Error fetching user:', error);
            });
        }
    fetchUser();
    }, [email]);
   
   
    const inputHandle = (e) => {
        const { name, value } = e.target
    setUser({...user, [name]: value })
    }
    const submitHandle =async (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/updateUser/${email}`, user).then((response) => {
           
            toast.success(response.data.message,{position: 'top-right', duration: 3000});
        Navigate('/');
       
        })
            
            .catch((error) => {
            console.error('Error adding user:', error);});
      
         
      
       
    }
  return (
    <div>
        <h2>Update User Page</h2>
        <p>Welcome to the Update User page!</p>
        <form onSubmit={submitHandle} className="container mt-5">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input  onChange={inputHandle} type="text" id="name" value={user.name} name="name" className="form-control" required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input  onChange={inputHandle}type="email" value={user.email} id="email" name="email" className="form-control" required />
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age:</label>
                <input  onChange={inputHandle}type="number" id="age" value={user.age} name="age" className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">Update User</button>
       </form>
    </div>
  )
}

export default UpdateUser
