// Step 1:Imports
import React, { useEffect, useState } from "react";
import axios from "axios";

// Step 2:Backend API Address
const API="http://localhost:4000";

export default function App(){
  // State Variables to store 
  const [people,setPeople]=useState([]);
  const [form,setForm]=useState({name:"",age:""});

  async function load() {
    // Ask backend to give data
    const res=await axios.get(`${API}/`);
    setPeople(res.data);
  }
  useEffect(()=>{
    load();
  },[]);

  // To Prevent default actions
  async function addPerson(e) {
    e.preventDefault();

    if(!form.name|!form.age)
      return alert("Enter Name & Age");

    // To call API
    const res=await axios.post(`${API}/`,{
      name:form.name,
      age:Number(form.age)
    });
    setPeople([...people,res.data]);
    setForm({name:"",age:""});
  }

  // Return
  return(
    <div style={{fontFamily:"sans-serif",maxWidth:520,margin:'auto'}}>
      <h1>List of People</h1>

      <form onSubmit={addPerson}>
        <input type="text" placeholder="Enter Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
        <input type="number" placeholder="Enter Age" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} required/>

        <button>Add User</button>
      </form>


      {people.length === 0 ?(
        <p>No people found.</p>
      ):(
        <ul>

          {people.map(p=>(
            <li key={p.id}>
              <strong>{p.name}</strong> - age{p.age}
            </li>
          ))}

        </ul>
      )}
    </div>
  );
}