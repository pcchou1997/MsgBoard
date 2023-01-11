const button = document.querySelector(".button");
const imageInput = document.querySelector("#file-uploader");

button.addEventListener("click", async (event) => {
  event.preventDefault();
  const file = imageInput.files[0];
  // get secure url from server
  const { url } = await fetch("/s3Url").then((res) => res.json());
  console.log(url);
  // post the image directly to the s3 bucket
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "multipart/form-data",
    },
    body: file,
  });

  const imageURL = url.split("?")[0];
  console.log(imageURL);
  // post request to my server to my extra data
});
