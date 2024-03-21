import React, { useEffect, useState } from "react";
import spinner from "./../spinner.svg";
export default function MyTabel() {
  const [submissions, setSubmissions] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    setLoading(true); // Set loading to true before starting the fetch process
    fetch("https://online-code-editor-3.onrender.com/database/retrive")
      .then((resp) => resp.json())
      .then((data) => {
        const results = data.data;
        setSubmissions(results);
        setLoading(false); // Set loading back to false after fetch is completed
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading back to false in case of error
      });
  }, []);

  console.log(submissions);
  return (
    <div style={{ justifyContent: "center", padding: "20px" }}>
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
          {submissions && submissions.length > 0 && !loading ? (
            submissions.map((submission) => (
              <tr>
                <td>{submission.username}</td>
                <td>
                  {submission.code.length > 100
                    ? submission.code.slice(0, 100) + "..."
                    : submission.code}
                </td>
                <td>{submission.stdin}</td>
                <td>{submission.timestamp}</td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>

      {loading ? (
        <div
          className="spinner-box"
          style={{ justifyContent: "center", backgroundColor: "white" }}
        >
          <img
            src={spinner}
            alt="Loading..."
            style={{ backgroundColor: "white", justifySelf: "center" }}
          />
        </div>
      ) : submissions.length < 1 ? (
        <div className="output-box">NO data avilabel</div>
      ) : (
        <></>
      )}
    </div>
  );
}
