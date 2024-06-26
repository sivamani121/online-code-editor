import { useEffect, useState } from "react";
import "./../Styles/Compiler.css";
import Editor from "@monaco-editor/react";
import Navbar from "./Navbar";
import Axios from "axios";
import spinner from "./../spinner.svg";
import { decode } from "base-64";
function Compiler() {
  // State variable to set users source code
  const [userCode, setUserCode] = useState("");
  const [Username, setUsername] = useState("");
  // State variable to set editors default language
  const [userLang, setUserLang] = useState("python");

  // State variable to set editors default theme
  const [userTheme, setUserTheme] = useState("vs-dark");

  // State variable to set editors default font size
  const [fontSize, setFontSize] = useState(20);

  // State variable to set users input
  const [userInput, setUserInput] = useState("");

  // State variable to set users output
  const [userOutput, setUserOutput] = useState("");

  // Loading state variable to show spinner
  // while fetching data
  const [loading, setLoading] = useState(false);
  useEffect(
    function () {
      setUserInput("");
      setUserCode("");
      setUserOutput("");
    },
    [userLang]
  );
  const saveSubmit = () => {
    console.log(userLang, userCode, userInput);
    const formData = {
      username: Username,
      language: userLang,
      code: userCode,
      stdin: userInput,
    };
    fetch("https://online-code-editor-3.onrender.com/database/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if required
      },
      body: JSON.stringify(formData),
    });
  };
  const options = {
    fontSize: fontSize,
  };
  const popularLanguages = {
    C: 50,
    cpp: 54,

    java: 91,

    python: 92,
  };
  // Function to call the compile endpoint
  const compile = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: {
        base64_encoded: "true",
        fields: "*",
        wait:true,
      },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "b30599cd22msh50ae49e258cd694p1d923fjsn449731f13dc5",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        language_id: popularLanguages[userLang],
        // encode source code in base64
        source_code: btoa(userCode),
        stdin: btoa(userInput),
      },
    };
    console.log(options.data);
    try {
      const response = await Axios.request(options);
      console.log(response.data);
      const axios = require("axios");

      const options2 = {
        method: "GET",
        url: `https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}`,
        params: {
          base64_encoded: "true",
          fields: "*",
          wait:true
        },
        headers: {
          "X-RapidAPI-Key":
            "b30599cd22msh50ae49e258cd694p1d923fjsn449731f13dc5",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      };

      try {
        const response = await Axios.request(options2);
        console.log(response.data);
        // console.log(decode(response.data.stdout));
        setUserOutput(decode(response.data.stdout));
        setLoading(false);
      } catch (error) {
        console.error(error);

        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    // Axios.request(options)
    //   .then(function (response) {
    //     console.log("res.data", response.data);
    //     const token = response.data.token;
    //     checkStatus(token);
    //   })
    //   .catch((err) => {
    //     let error = err.response ? err.response.data : err;
    //     setLoading(false);
    //     console.log(error);
    //   });
  };

  // const checkStatus = async (token) => {
  //   const options = {
  //     method: "GET",
  //     url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token,
  //     params: { base64_encoded: "false", fields: "*" },
  //     headers: {
  //       "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  //       "X-RapidAPI-Key": "b30599cd22msh50ae49e258cd694p1d923fjsn449731f13dc5",
  //     },
  //   };
  //   try {
  //     let response = await Axios.request(options);
  //     let statusId = response.data.status?.id;

  //     // Processed - we have a result
  //     if (statusId === 1 || statusId === 2) {
  //       // still processing
  //       setTimeout(() => {
  //         checkStatus(token);
  //       }, 2000);
  //       return;
  //     } else {
  //       setLoading(false);
  //       setUserOutput(response.data);

  //       console.log("response.data", response.data);
  //       return;
  //     }
  //   } catch (err) {
  //     console.log("err", err);
  //     setLoading(false);
  //   }
  // };

  // Function to clear the output screen
  function clearOutput() {
    setUserOutput("");
  }

  return (
    <div className="App">
      <Navbar
        userLang={userLang}
        setUserLang={setUserLang}
        userTheme={userTheme}
        setUserTheme={setUserTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        SubmitAction={saveSubmit}
        Username={Username}
        setUsername={setUsername}
      />
      <div className="main ">
        
        <div className="left-container ">
          <Editor
            options={options}
            height="calc(100vh - 50px)"
            width="100%"
            theme={userTheme}
            language={userLang}
            defaultLanguage="python"
            defaultValue="# Enter your code here"
            onChange={(value) => {
              setUserCode(value);
            }}
          />
          <button className="run-btn" onClick={() => compile()}>
            Run
          </button>
        </div>
        <div className="right-container col-lg-4 col-md-4">
          <h4>Input:</h4>
          <div className="input-box">
            <textarea
              id="code-inp"
              onChange={(e) => setUserInput(e.target.value)}
            ></textarea>
          </div>
          <h4>Output:</h4>
          {loading ? (
            <div className="spinner-box">
              <img src={spinner} alt="Loading..." />
            </div>
          ) : (
            <div className="output-box">
              <p>{userOutput}</p>
              <button
                onClick={() => {
                  clearOutput();
                }}
                className="clear-btn"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    
    </div>
  );
}

export default Compiler;
