import React from "react";
import Select from "react-select";
import "../Styles/Navbar.css";

const Navbar = ({
  userLang,
  setUserLang,
  userTheme,
  setUserTheme,
  fontSize,
  setFontSize,
  SubmitAction,
  setUsername,
  Username,
}) => {
  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];
  return (
    <div className="navbar" style={{ paddingBottom: "10px" }}>
      <h1>Compiler</h1>
      <Select
        options={languages}
        value={userLang}
        onChange={(e) => setUserLang(e.value)}
        placeholder={userLang}
      />
      <Select
        options={themes}
        value={userTheme}
        onChange={(e) => setUserTheme(e.value)}
        placeholder={userTheme}
      />
      <div>
        <label>User name:</label>
        <input
          placeholder="Username"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      {/* <input
        type="range"
        min="18"
        max="30"
        value={fontSize}
        step="2"
        onChange={(e) => {
          setFontSize(e.target.value);
        }}
      /> */}
      <button
        onClick={() => {
          SubmitAction();
        }}
        className={`btn`}
        style={{ backgroundColor: "#1c7ed6" }}
      >
        Save
      </button>
      <a href="/activity">activity</a>
    </div>
  );
};

export default Navbar;
