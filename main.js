window.onload = () => {
  document.getElementById("form").reset();
};
let form = document.getElementById("form");
let status = document.getElementById("status");
let name = document.getElementById("name");
let date = document.getElementById("date");
let hair = document.getElementById("hair");
let bio = document.getElementById("bio");

function getRadioValue(theRadioGroup) {
  var elements = document.getElementsByName(theRadioGroup);
  for (var i = 0, l = elements.length; i < l; i++) {
    if (elements[i].checked) {
      return elements[i].value;
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (name.value === "" || date.value === "" || bio.value === "") {
    console.log("faliure");
    status.innerHTML = "Error: Blank Fields!";
    status.style.color = "#d50000";
  } else {
    console.log("success");
    status.innerHTML = "Submitted!";
    status.style.color = "#2e7d26";

    acceptData();
  }
};

let data = [];

let acceptData = () => {
  data.push({
    first_name: name.value,
    date_of_birth: date.value,
    bio: bio.value,
    hair: getRadioValue("hair"),
  });
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createPost();
};

let createPost = () => {
  posts.innerHTML = "";
  data.map((x, y) => {
    return (posts.innerHTML += `
<article>
  <span class="name_post">${x.first_name}</span>
  <span class="date_post">${x.date_of_birth}</span>
  <span class="hair_post">${x.hair}</span>
  <p class="bio">
    ${x.bio}
  </p>
  <span class="options">
    <i class="fas fa-edit" onclick="editPost(this)"></i>
    <i class="fas fa-trash-alt" onclick="deletePost(this)"></i>
  </span>
</article>
`);
  });
  resetForm();
};

let resetForm = () => {
  name.value = "";
  date.value = "";
  bio.value = "";
};

let deletePost = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

let editPost = (e) => {
  let selectedPost = e.parentElement.parentElement;

  name.value = selectedPost.children[0].innerHTML;
  date.value = selectedPost.children[1].innerHTML;
  bio.value = selectedPost.children[3].innerHTML;

  deletePost(e);
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createPost();
})();
