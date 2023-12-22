
var bookmarkNameInput = document.getElementById("bookmarkName");
var websiteUrlInput = document.getElementById("websiteUrl");


var websiteContainer = [];
if (localStorage.getItem("myWebsite") != null) {
  websiteContainer = JSON.parse(localStorage.getItem("myWebsite"));
  dispalyWebsite(websiteContainer);
}

function addWebsite() {
  if (validateWebsiteName(bookmarkNameInput.value) && validateWebsiteUrl(websiteUrlInput.value)) {
    var website = {
      websiteName : bookmarkNameInput.value,
      url : websiteUrlInput.value,
    }
    websiteContainer.push(website);
    localStorage.setItem("myWebsite" , JSON.stringify(websiteContainer));
    dispalyWebsite(websiteContainer);
    clearForm();
  }
  else{
    alert(`Site Name or Url is not valid, Please follow the rules below :
    Site name must contain at least 3 characters
    Site URL must be a valid one`)
  }
}

function dispalyWebsite(arr) {
  var box = "";
  for (let i = 0; i < arr.length; i++) {
    var websiteIndex = i+1;
    box += ` <tr>
    <td>${websiteIndex}</td>
    <td>${arr[i].websiteName}</td>
    <td><button onclick = "visitWebsite(${i});" class="btn btn-success btn-sm"><i class="fa-solid fa-eye"></i> Visit</button></td>
    <td><button onclick = "deleteWebsite(${i});" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
  </tr>
    `
  }
  document.getElementById("tableBody").innerHTML = box;
}

function clearForm() {
  bookmarkNameInput.value = "";
  websiteUrlInput.value = "";
}

function deleteWebsite(websiteDeleteIndex) {
  websiteContainer.splice(websiteDeleteIndex,1);
  localStorage.setItem('myWebsite', JSON.stringify(websiteContainer));
  dispalyWebsite(websiteContainer);
}

function searchWebsite(term) {
  var matchedWebsite = [];
  for (let i = 0; i < websiteContainer.length; i++) {
    if (websiteContainer[i].websiteName.toLowerCase().includes(term.toLowerCase())) {
      matchedWebsite.push(websiteContainer[i]);
    }
  }
  dispalyWebsite(matchedWebsite);
}

function visitWebsite(visitIndex) {
  window.open(websiteContainer[visitIndex].url);
}

function validateWebsiteName(name) {
  var regexName = /^\w{3,}(\s+\w+)*$/;
  if ( regexName.test(name) ) {
    bookmarkNameInput.classList.replace("is-invalid" , "is-valid");
    return true;
  }
  else{
    bookmarkNameInput.classList.add("is-invalid");
    return false;
  }
}

function validateWebsiteUrl(Url) {
  var regexUrl = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  if ( regexUrl.test(Url) ) {
    websiteUrlInput.classList.replace("is-invalid" , "is-valid");
    return true;
  }
  else{
    websiteUrlInput.classList.add("is-invalid");
    return false;
  }
}