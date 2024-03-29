import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Search() {

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // PlaceHolder/Loader Component
  const PlaceHolder = ()=> {
    return(
      <div className='col-12'>
        <span class="placeholder col-12"></span>
        <span class="placeholder col-12 bg-primary"></span>
        <span class="placeholder col-12 bg-secondary"></span>
        <span class="placeholder col-12 bg-success"></span>
        <span class="placeholder col-12 bg-danger"></span>
        <span class="placeholder col-12 bg-warning"></span>
        <span class="placeholder col-12 bg-info"></span>
        <span class="placeholder col-12 bg-dark"></span>
      </div>
    )
  }

  // Fetch Users
  const fetchUsers = async()=> {
    const baseURl = "http://localhost:5001/api";
    setIsLoading(true);

    try {

      const res = await axios.get(`${baseURl}/user/search`, {
        params: {
          search: searchInput
        }
      });
      setUsers(res.data.data);
      // toast.success(res.data.message)

    } catch (error) {
      console.log(error);
      toast.error("Server Error")

    } finally{
      setIsLoading(false)
    }
  }

  // Handle Search input change
  const handleSearchInputChange = (e)=> {
    setSearchInput(e.target.value);
    debounce(fetchUsers, 3000);
  }

  // Debouncer
  // const debounce = ()=> {
  //   const timeout = setTimeout(() => {
  //      fetchUsers();
  //   }, 3000);

  // }

  const debounce = (func, delay) => {
    const timeout = setTimeout(() => {
      func();
    }, delay);
    // clearTimeout(timeout);
    return timeout;
  };

  // useEffect(()=> {
  //   debounce();
  // }, [searchInput])
  
  useEffect(()=> {
    fetchUsers();
  }, [])

  useEffect(() => {
    const timeoutId = debounce(fetchUsers, 3000);
    return () => clearTimeout(timeoutId);
  }, [searchInput]);


  return (
    <div className='container'>
      <h1>Welcome to the Search Component</h1>

      <div className='container d-flex justify-content-center'>
        <form>
          <div className="my-3">
            <input value={searchInput} onChange={handleSearchInputChange} type="text" className="form-control" placeholder='Search..'/>          </div>
        </form>
      </div>
      {/* <PlaceHolder/> */}
      <div className="table-responsive">
        <table className='table'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>IP Addr</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {
              isLoading ?
              <div className="row">
                <PlaceHolder/>
              </div>
              :
              users.map((user)=> {
                return(
                  <tr>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.ipAddr}</td>
                    <td>{user.gender}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Search