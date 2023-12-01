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
