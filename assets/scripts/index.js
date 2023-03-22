class User {
  #name;
  #userName;
  #email;

  constructor(name, userName, email) {
    this.#name = name;
    this.#userName = userName;
    this.#email = email;
  }

  get name() {
    return this.#name;
  }

  get userName() {
    return this.#userName;
  }

  get email() {
    return this.#email;
  }

  getInfo() {
    return {
      name: this.#name,
      userName: this.#userName,
      email: this.#email,
    };
  }
}

class Subscriber extends User {
  #pages;
  #groups;
  #canMonetize;

  constructor(name, userName, email, pages, groups, canMonetize) {
    super(name, userName, email);
    this.#pages = pages;
    this.#groups = groups;
    this.#canMonetize = canMonetize;
  }

  get pages() {
    this.#pages;
  }

  get groups() {
    return this.#groups;
  }

  get canMonetize() {
    return this.#canMonetize;
  }
}

const user = new User("AjayPal Singh", "ajeypalsingh", "ajeypals7@gmail.com");

const form = document.querySelector(".post");
const newPost = document.querySelector(".new-post");
const profileEl = document.querySelector(".profile");
const select = document.querySelector(".selected-image");

const post = (user, caption, image) => {
  const today = new Date();
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const newEl = `
  <div class="content">
  <div class="user">
  <div class="user-name">
  <img
  src="./assets/images/profile.jpg"
  />
  <div class="username">${user.userName}</div>
  </div>
  <div class="date">${formattedDate}</div>
  </div>
  <div class="caption">
  ${caption}
  </div>
  <div class="media">
  <img
  src="${image}"
  alt=""
  />
  </div>
  </div>
  `;

  newPost.innerHTML += newEl;
};

const imageEl = document.getElementById("image");
let pic = "";
imageEl.addEventListener("change", (event) => {
  pic = event.target.files[0].name;
  const getImage = new FileReader();

  getImage.addEventListener("load", () => {
    localStorage.setItem(pic, getImage.result);
  });
  getImage.readAsDataURL(event.target.files[0]);
});

// Adding a post
form.addEventListener("submit", (event) => {
  event.preventDefault();
  post(user, event.target[0].value, localStorage.getItem(pic));
  event.target[0].value = "";
});

// modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnsOpenModal = document.querySelector(".show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  const userInfo = user.getInfo();
  const profileInfo = `
    <div class='user-profile'>
    <p><b>User Profile</b></p><br>
      <img src="./assets/images/profile.jpg" style="height: 70px" />
      <div class='margin'>
      <p>Name :  ${userInfo.name}</p>
      <p>UserName : ${userInfo.userName}</p>
      <p>Email : ${userInfo.email}</p>
      </div>
    </div>
  `;
  document.querySelector(".modal").innerHTML = "";

  document.querySelector(".modal").innerHTML =
    profileInfo + document.querySelector("#profile").innerHTML;
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  window.addEventListener("load", function () {
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal")) {
        closeModal();
      }
    });
  });
};

profileEl.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
