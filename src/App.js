import './App.css';
import Users from './getUsers/Users';
import AddUser from './addUser/addUser';  
import UpdateUser from './updateUser/updateUser';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
function App() {
  const route=createBrowserRouter([

{
   path: '/',

   
    element: <Users />,},

    {
      path: '/addUser',
      element: <AddUser />,
    },
  
  
  {

    path: '/editUser/:email',
    element: <UpdateUser />,
  }])
  return (
    <div className="App">
     
    <RouterProvider router={route} />
    </div>
  );
}

export default App;
