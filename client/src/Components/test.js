// const options = {
//   method: "POST",
//   url: "https://judge0-ce.p.rapidapi.com/submissions",
//   params: {
//     base64_encoded: "true",
//     fields: "*",
//   },
//   headers: {
//     "content-type": "application/json",
//     "Content-Type": "application/json",
//     "X-RapidAPI-Key": "b30599cd22msh50ae49e258cd694p1d923fjsn449731f13dc5",
//     "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//   },
//   data: {
//     language_id: popularLanguages[userLang],
//     // encode source code in base64
//     source_code: btoa(userCode),
//     stdin: btoa(userInput),
//   },
// };
// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }