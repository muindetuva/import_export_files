const form = document.querySelector("form");

const people = []; // Store people here

let name = document.querySelector("#name");
let age = document.querySelector("#age");

let list = document.querySelector("#list");

let createButton = document.querySelector("#create");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(name.value.trim(), age.value);

  people.push({ name: name.value, age: age.value });

  let li = document.createElement("li");

  li.innerText = `${name.value}  - ${age.value}`;

  list.appendChild(li);

  localStorage.setItem("people", JSON.stringify(people));
});

const fetchFromLocalStorage = () => {
  peopleJson = localStorage.getItem("people");

  // console.log(peopleJson.length)

  //   let name = "Alfred";
  // console.log(name[0])

  peopleArray = JSON.parse(peopleJson);
  // console.log(peopleJson)

  // console.log(peopleArray)

  people.push(...peopleArray);

  if (peopleArray) {
    peopleArray.map((person) => {
      let li = document.createElement("li");

      li.innerText = `${person.name}  - ${person.age}`;

      list.appendChild(li);
    });
  }
};

fetchFromLocalStorage();

createButton.addEventListener("click", () => {
  // Fetch data from local storage

  jsonData = localStorage.getItem("people");
  console.log(jsonData);

  // Create a file and write the data to the file
  const file = new Blob([jsonData], { type: "application/json" });

  // Create a link and attach the file to this link
  let link = document.createElement("a"); // <a></a>
  link.href = URL.createObjectURL(file); // <a href="pathoffile"></a>
  link.download = "export.json"; // <a href="pathoffile" download="export.json"></a>

  // Click the link
  link.click();
});

const fileImport = document.querySelector("#fileImport");

// const processFile = (e) => {
//   //   let file = e.target.files[0];
//   //   console.log(file);
//   //   const reader = new FileReader();
//   //   console.log(reader);
//   //   reader.onload = function (event) {
//   //     const peopleArray = JSON.parse(event.target.result);
//   //     console.log(event.target.result);
//   //     console.log("inside");
//   //     console.log(peopleArray);
//   //   };
//   //   reader.readAsText(file);
// };

fileImport.addEventListener("change", (e) => {
  // Grab the file from the input
  const file = e.target.files[0]; // Filelist
  console.log(file);
  // Use FileReader to read the file
  const reader = new FileReader();

  reader.readAsText(file);

  // On success reader.onload
  // On failure reader.onerror

  // Use the data we get after reading the file
  reader.onload = function (e) {
    console.log(reader.result);
    // Convert Json string to JS objects
    let peopleArray = JSON.parse(reader.result);

    people.push(...peopleArray);

    // Store in localstorage
    localStorage.setItem("people", JSON.stringify(people));

    console.log(peopleArray);
    // Loop through array and display them
    peopleArray.map((person) => {
      let listItem = document.createElement("li");
      listItem.innerText = `${person.name} is ${person.age} years old`;

      list.appendChild(listItem);
    });
  };

  //   const file = e.target.files[0];
  //   // New instance of FileReader
  //   let reader = new FileReader();
  //   // Read our file
  //   reader.readAsText(file);
  //   // Handle a succesful read
  //   reader.onload = function () {
  //     console.log("Read was succesful");
  //     console.log(reader.result);
  //     let peopleArray = JSON.parse(reader.result);
  //     console.log(peopleArray);
  //     if (peopleArray) {
  //       peopleArray.map((person) => {
  //         let li = document.createElement("li");
  //         li.innerText = `${person.name}  - ${person.age}`;
  //         list.appendChild(li);
  //       });
  //     }
  //   };
  //   reader.onerror = function () {
  //     console.log(reader.error);
  //   };
});
