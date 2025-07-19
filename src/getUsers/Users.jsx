import React, {  useEffect } from 'react'
import './user.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
 const  Users=()=> {
    const [users, setUsers] = React.useState([]);
    const Navigate =useNavigate();
    useEffect (()=>{
        const fetchUsers = async () => {
            try {
          const response=   await axios.get('http://localhost:8000/api/getUser')
                const data = response.data;
                console.log(data);
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }   
        fetchUsers();
    }, [])


   const deleteUser =async (email) => {
      
        axios.delete(`http://localhost:8000/api/deleteUser/${email}`, ).then((response) => {
            setUsers(users.filter(user => user.email !== email));
            toast.success(response.data.message,{position: 'top-right', duration: 3000});
        Navigate('/');
            
       
        })
            
            .catch((error) => {
            console.error('Error deleting user:', error); });  
            }
  
  return (
    <div className="container mt-5">
      <h2>Hello Page Users</h2>
        <p>Welcome to the Users page!</p>
        <div className='UserTable'>
        <Link  style={{ marginBottom: "30px" }} to="/addUser" className='btn btn-primary'>Add</Link>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th scope='col'>Name</th>  
                     <th scope='col'>Email</th>
                     <th  scope='col'>Age</th>
                     <th scope='col'>Actions</th>
                    </tr>
            </thead>
     <tbody>
        {users.map((user, index) => (
            user && (
            <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                    <Link  to={`/editUser/`+user.email} className='btn btn-warning'>Edit</Link>
                    <button  style={{ marginLeft: "30px" }}onClick={() => deleteUser(user.email)}
   className='btn btn-danger'>Delete</button>
                </td>
            </tr>
            )
        ))}
        </tbody>
     


        </table> </div>
    </div>
  )
}
export default Users;
