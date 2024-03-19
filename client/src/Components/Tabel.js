import React from "react";
function MyTabel({submissions}){
    return <table class="table">
    <thead>
      <tr>
    
        <th scope="col">UserName</th>
        <th scope="col">Code</th>
        <th scope="col">stdin</th>
        <th scope="col">Time</th>
      </tr>
    </thead>
    <tbody>
        {submissions.map((submission)=>{<tr>
      
      <td>{submission.username}</td>
      <td>{submission.timestamp}</td>

    
    </tr>})}
      
    </tbody>
  </table>
}