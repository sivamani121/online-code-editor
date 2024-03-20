import React, { useEffect, useState } from "react";
export default  function MyTabel() {
  const [submissions, setSubmissions] = useState({});
   useEffect(function () {
    fetch("https://online-code-editor-3.onrender.com/database/retrive")
      .then((resp) => resp.json())
      .then((data) => {
        const results = data.data;
        setSubmissions(results);
      });
  }, []);
  console.log(submissions);
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">UserName</th>
          <th scope="col">Code</th>
          <th scope="col">stdin</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>

      {submissions && submissions.length > 0 ? (
    submissions.map((submission) => (
      <tr>
        <td>{submission.username}</td>
        <td>{submission.code.length > 100 ? submission.code.slice(0, 100) + "..." : submission.code}</td>
        <td>{submission.stdin}</td>
        <td>{submission.timestamp}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td>No submissions found.</td>
    </tr>
  )}
      </tbody>
    </table>
  );
}
