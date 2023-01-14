const button = document.querySelector(".button");
const imageInput = document.querySelector("#file-uploader");
const comment = document.querySelector("#comment");
const msgBoard = document.querySelector(".msgboard");

fetch("/read")
  .then((res) => {
    return res.json();
  })
  .then((jsonResponse) => {
    console.log(jsonResponse);
    for (let i = jsonResponse.length - 1; i >= 0; i--) {
      let newNode = document.createElement("div");
      newNode.setAttribute("class", "message");
      let content = `
        <div class="message_comment">${jsonResponse[i].comment}</div>
        <img class="message_image" src="${jsonResponse[i].image}" alt="">`;
      newNode.innerHTML = content;
      msgBoard.appendChild(newNode);
    }
  })
  .catch((err) => {
    // handle error
    console.error(err);
  });

button.addEventListener("click", async (event) => {
  event.preventDefault();
  const file = imageInput.files[0];
  console.log("file:", file);
  const commentValue = comment.value;
  imageInput.value = "";
  comment.value = "";

  if (file == undefined || commentValue == "") {
    alert("任一欄位不可空白");
  } else {
    // get secure url from server

    const { url } = await fetch("/imgStorage").then((res) => res.json());
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

    await fetch("/database", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ comment: commentValue, imageURL: imageURL }),
    });

    // read RDS

    while (msgBoard.hasChildNodes()) {
      msgBoard.removeChild(msgBoard.firstChild);
    }
    await fetch("/read")
      .then((res) => {
        return res.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
        for (let i = jsonResponse.length - 1; i >= 0; i--) {
          let newNode = document.createElement("div");
          newNode.setAttribute("class", "message");
          let content = `
        <div class="message_comment">${jsonResponse[i].comment}</div>
        <img class="message_image" src="${jsonResponse[i].image}" alt="">`;
          newNode.innerHTML = content;
          msgBoard.appendChild(newNode);
        }
      })
      .catch((err) => {
        // handle error
        console.error(err);
      });
  }
});
