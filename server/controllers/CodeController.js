const express = require("express");
const base64 = require("base-64");
const axios = require("axios");
const popularLanguages = {
  C: 50,
  "C++": 54,

  Java: 91,

  python: 92,
};
exports.createSubmit = async function (req, res, next) {
  console.log(req.body);
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "b30599cd22msh50ae49e258cd694p1d923fjsn449731f13dc5",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },

    data: {
      language_id: popularLanguages[req.body.language_id],
      source_code: base64.encode(req.body.code),
      stdin: base64.encode(req.body.stdin),
    },
  };

  try {
    const response = await axios.request(options);
    console.log(`https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}`);
    const options1 = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}`,
      params: {
        base64_encoded: "false",
        fields: "*",
      },
      headers: {
        "X-RapidAPI-Key": "b30599cd22msh50ae49e258cd694p1d923fjsn449731f13dc5",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };

    try {
      const response1 = await axios.request(options1);
      // console.log(response.data.stdout);
      console.log(response1.data);
      res.status(200).json({
        stdout: base64.decode(response1.data.stdout),
      });
    } catch (error) {
      console.error(error);
    }

    next();
  } catch (error) {
    console.error(error);
  }
  next();
};

exports.getSubmit = async function (req, res, next) {};
