import axios from "axios";

// export async function fetchWikiData(title) {
//   try {
//     const response = await axios.get(
//       `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${title}`
//     );
//     console.log(response.json());
//     return JSON.stringify(response.json(), null, 2);
//   } catch (error) {
//     if (error.response) {
//       throw new Error(error.respnse.data);
//     } else {
//       throw new Error(error.message);
//     }
//   }
// }

export async function fetchWikiData(title) {
  const url = "https://en.wikipedia.org/api/rest_v1/page/summary/Stack_Overflow"
  fetch(url)
    .then(function (response) {
        console.log(response)
      console.log(response);
      return response;
    })
    .then(function (response) {
      console.log(response);
    });
}
