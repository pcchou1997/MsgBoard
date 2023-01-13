const button = document.querySelector(".button");
const imageInput = document.querySelector("#file-uploader");
const comment = document.querySelector("#comment");

button.addEventListener("click", async (event) => {
  event.preventDefault();
  const file = imageInput.files[0];
  console.log("imageInput:", imageInput);
  console.log("file:", file);
  const commentValue = comment.value;
  console.log("commentValue:", commentValue);

  if (file == undefined || commentValue == "") {
    alert("任一欄位不可空白");
  } else {
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

    // fetch RDS

    await fetch("/rds", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ comment: commentValue, imageURL: imageURL }),
    });
  }
});
