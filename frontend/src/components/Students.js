import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getStudents } from '../services/StudentService';
import "../App.css";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
   let mounted = true;
   getStudents()
     .then(data => {
       if(mounted) {
         setStudents(data)
       }
     })
   return () => mounted = false;
 }, [])

  return(
   <div className="container-fluid side-container">
   <div className="row side-row" >
    <p id="before-table"></p>
        <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
        <thead>
            <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Registration No</th>
            <th>Contact no.</th>
            <th>Course</th>
            </tr>
        </thead>
        <tbody>
            {students.map((stu, index) =>
            <tr key={stu.id}>
                <td>{index+1}</td>
                <td>{stu.FirstName}</td>
                <td>{stu.LastName}</td>
                <td>{stu.RegistrationNo}</td>
                <td>{stu.Email}</td>
                <td>{stu.Course}</td>
            </tr>)}
        </tbody>
    </Table>
    </div>
  </div>
  );
};

export async function getServerSideProps() {
  // Fetch data from an external API or database
  const res = await fetch('https://your-api-endpoint.com/students');
  const data = await res.json();

  return { props: { students: data } };
}

export default Students;