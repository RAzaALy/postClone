//variable initialize for number of params:
let parmasCount = 0;
//Utility Function to get Dom element by String:
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}
//hide the parameters box initially
let parameterBox = document.getElementById("paramBox");
parameterBox.style.display = "none";
//if the user click on paramsbox hide the json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("paramBox").style.display = "block";
});
//if the user click on json hide the paramsbox
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "block";
  document.getElementById("paramBox").style.display = "none";
});
//if the user click on + button ,add more params:
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `<div class="w3-row-padding w3-margin-top parameterBox" id="paramBox">
    <label for="param" class="w3-text-orange">Parameter ${
      parmasCount + 2
    }</label>
    <div class="w3-third">
        <input class="w3-input w3-border" type="text" name="paramkey" type="text" id="parameterKey${
          parmasCount + 2
        }"
            placeholder="Enter Parameter key ${parmasCount + 2}">
    </div>
    <div class="w3-third">
        <input class="w3-input w3-border" type="text" id="parameterValue${
          parmasCount + 2
        }" name="paramkey"
            placeholder="Enter Parameter Value ${parmasCount + 2}">
    </div>
    <button id="addParam" class="w3-button w3-orange deleteParam">-</button>
</div>`;
  //convert the element string to Dom node:
  let paramElement = getElementFromString(string);
  //   console.log(paramElement);
  params.appendChild(paramElement);
  parmasCount++;
  //Add eventListner to remove parms when click the - button:
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
});
//If the user click on Submit Button:
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  //Show please wait in the response box to wait from the user:
  //   document.getElementById("responseJsonText").value =
  //     "Please Wait...Fetching the Response";
  document.getElementById("prismResponse").innerHTML =
    "Please Wait...Fetching the Response";

  //Fetch all the value user has entered:
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;
  //if user has params option insted of json,collect all the paramaters in the object:
  if (contentType == "Paramaters") {
    data = {};
    for (let i = 0; i < parmasCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        console.log(key);
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
  }
  //If the user request type is GET,invoke a fetch api and to create a GET request
  if (requestType === "Get") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        //   console.log(text);
        // document.getElementById("responseJsonText").value = text;
        document.getElementById("prismResponse").innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        // console.log(text);
        // document.getElementById("responseJsonText").value = text;
        document.getElementById("prismResponse").innerHTML = text;
        Prism.highlightAll();
      });
  }
  //log all the values in the console in the debugging:
  console.log("URL Is:", url);
  console.log("Request Type:", requestType);
  console.log("Content Type:", contentType);
  console.log("Data:", data);
});
