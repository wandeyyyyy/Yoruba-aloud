function signUp(event) {
    // prevents page form refreshing
    event.preventDefault();

    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const getName = document.getElementById("name").value;
    const getEmail = document.getElementById("email").value;
    const getPassword = document.getElementById("password").value;
    const getConfirmPassword = document.getElementById("confirmPassword").value;

    if (getName === "" || getEmail === "" || getPassword === "" || getConfirmPassword === "") {
        Swal.fire({
            icon: "info",
            text: "All Fields are Required!",
            confirmButtonColor: "#2D85DE"
        })
        getSpin.style.display = "none"
    }

    if (getConfirmPassword !== getPassword) {
        Swal.fire({
            icon: "info",
            text: "Password do not match!",
            confirmButtonColor: "#2D85DE"
        })
        getSpin.style.display = "none"
    }

    else {
        const signData = new FormData();
        signData.append("name", getName);
        signData.append("email", getEmail);
        signData.append("password", getPassword);
        signData.append("password_confirmation", getConfirmPassword);

        const signMethod = {
            method: 'POST',
            body: signData
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/register_admin";

        fetch(url, signMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: "#2D85DE"
                })

                setTimeout(() => {
                    location.href = "index.html"
                }, 3000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message.email[0]}`,
                    confirmButtonColor: "#2D85DE"
                })
                getSpin.style.display = "none"
            }
        })
        .catch(error => {
            console.log('error', error)
            Swal.fire({
                icon: 'info',
                text: `${result.message}`,
                confirmButtonColor: "#2D85DE"
            })
            getSpin.style.display = "none"
        });

    }

}

// login function
function logIn(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const getEmail = document.getElementById("email").value;
    const getPassword = document.getElementById("password").value;

    if (getEmail === "" || getPassword === "") {
        Swal.fire({
            icon: "info",
            text: "All Fields are Required!",
            confirmButtonColor: "#2D85DE"
        })
        getSpin.style.display = "none"
    }
    else {
        const signData = new FormData();
        signData.append("email", getEmail);
        signData.append("password", getPassword);

        const signMethod = {
            method: 'POST',
            body: signData
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";

        fetch(url, signMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem("admin", JSON.stringify(result))

            if (result.hasOwnProperty("email")) {
                location.href = "dashboard.html"
            } 
            else {
                Swal.fire({
                    icon: "info",
                    text: "Login Unsuccessful!",
                    confirmButtonColor: "#2D85DE"
                })
                getSpin.style.display = "none"
            }
        })
        .catch(error => console.log('error', error));
    }
}
// document.addEventListener("DOMContentLoaded", () => {
// // retrieve user details from local storage
// const newUser = localStorage.getItem("admin");
// if(newUser){
// const user = JSON.parse(newUser);
// const userName = user.name;

// const adminIdElement = document.getElementById("adminId");
// if(adminIdElement){
// adminIdElement.textContent = "Welcome, " + userName;
// }
// } 
// })






// Make authorized user login have a request for the data from the API
// function makeAuthorizedRequest(url, token) {
//   const requestOptions = {
//    method: 'GET',
//    headers: {
//     'Authorization': `Bearer ${token}`
//    }
//   };
//   return fetch(url, requestOptions)
//   .then(response => response.json())
//   .catch(error => {
//     console.error('API Request Error:', error);
//     throw error;
//   });
// }

// Function to fetch and update admin dashboard data
// function fetchAdminDashboardData(token) { 
//   const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";
//   return makeAuthorizedRequest(url, token);
// }

// Function to fetch and update all students data
// function fetchAllStudents(token) {
//   const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students";
//   return makeAuthorizedRequest(url, token);
// }

// Function to fetch and update top three students data
// function fetchTopThreeStudents(token) {
//   const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";
//   return makeAuthorizedRequest(url, token);
// }

// Fetch admin details and update the dashboard
// function dashboardApi() {
//   const userJson = localStorage.getItem("admin");
//   if (userJson) {
//    const user = JSON.parse(userJson);
//    const userToken = user.token;
//    fetchAdminDashboardData(userToken)
//     .then(data => {
//      console.log('Admin Dashboard Data:', data);
//      // Update your dashboard with the data here
//      updateDashboard(data);
//     })
//     .catch(error => console.error('Admin Dashboard Error:', error));
//   }
// }

// Fetch and update all students data
// function fetchAllStudentsApi() {
//   const userJson = localStorage.getItem("admin");
//   if (userJson) {
//    const user = JSON.parse(userJson);
//    const userToken = user.token;
//    fetchAllStudents(userToken)
//     .then(data => {
//      console.log('All Students Data:', data);
//      // Update your student data with the data here
//      updateAllStudents(data);
//     })
//     .catch(error => console.error('All Students Error:', error));
//   }
// }

// Function to update the dashboard with data
// function updateDashboard(data) {
//   const categoryElement = document.getElementById("category");
//   const learnmatElement = document.getElementById("learnmat");
//   const subCatElement = document.getElementById("subCat");
//   const quizElement = document.getElementById("quiz");
//   const studentElement = document.getElementById("student");
//   categoryElement.textContent = data.total_number_of_categories;
//   learnmatElement.textContent = data.total_number_of_learningmaterial;
//   subCatElement.textContent = data.total_number_of_subcategories;
//   quizElement.textContent = data.total_number_of_quize;
//   studentElement.textContent = data.total_number_of_students;
// }

// Function to update all students data
// function updateAllStudents(data) {
//   const tableId = document.getElementById("table-id");
//   tableId.innerHTML = "";
//   data.forEach(student => {
//    const row = document.createElement("tr");
//    row.innerHTML = `
//     <td>${student.name}</td>
//     <td>${student.email}</td>
//     <td>${student.phone_number}</td>
//     <td>${student.position}</td>
//     <td>${student.total_score}</td>
//    `;
//    tableId.appendChild(row);
//   });
// }

// function closeDashModal(){
//   const modal = document.getElementById("dash-modal");
//  modal.style.display = "block";
// }

// document.addEventListener("DOMContentLoaded", function () {
//   dashboardApi();
//   fetchAllStudentsApi();
  
// });





function getDashBoardApi() {
    // get all required id from the html , store in a variable
    const getAdmin = document.getElementById("adminId");
    const getCategory = document.getElementById("category");
    const getLearnmat = document.getElementById("learnmat");
    const getSubCat = document.getElementById("subCat");
    const getQuiz = document.getElementById("quiz");
    const getStudent = document.getElementById("student");
    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";


    const getToken = localStorage.getItem("admin"); //get admin data from local storage
    const myToken = JSON.parse(getToken); //convert it to object
    const token = myToken.token; //get only the admin token


    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);
    
    const dashMethod = {
        method: 'GET',
        headers: dashHeader
    }
    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";
    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        getAdmin.innerHTML = `Welcome, ${result.admin_name}`;
        getCategory.innerHTML = `${result.total_number_of_categories}`;
        getLearnmat.innerHTML = `${result.total_number_of_learningmaterial}`;
        getSubCat.innerHTML = `${result.total_number_of_subcategories}`;
        getQuiz.innerHTML = `${result.total_number_of_quize}`;
        getStudent.innerHTML = `${result.total_number_of_students}`;
        getSpin.style.display = "none";
    })
    .catch(error => console.log('error', error));
}
function studentModal(event) {
    event.preventDefault();
    const getTopThree = document.querySelector(".allstudent");
    const getModal = document.getElementById("dash-modal");
    getModal.style.display = "block";
    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;
    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);
    const dashMethod = {
        method: 'GET',
        headers: dashHeader
    }
    let data = [];
    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";
    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.length === 0) {
            getTopThree.innerHTML = "No Records Found!";
        }
        else {
            result.map((item) => {
                data += `
                  <div class="search-card">
                    <div class="d-flex justify-content-between">
                      <h5>Name:</h5>
                      <p>${item.name}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <h5>Email:</h5>
                      <p>${item.email}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <h5>Phone Number:</h5>
                      <p>${item.phone_number}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <h5>Position:</h5>
                      <p>${item.position}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <h5>Total Score:</h5>
                      <p>${item.total_score}</p>
                    </div>
                  </div>
                `
                getTopThree.innerHTML = data;
            })
        }
    })
    .catch(error => console.log('error', error));
}
function closeDashModal() {
    const getModal = document.getElementById("dash-modal");
    getModal.style.display = "none";
}
function getAllStudents() {
    const getTableBody = document.getElementById("table-id");
    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";
    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;
    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);
    const dashMethod = {
        method: 'GET',
        headers: dashHeader
    }
    let data = [];
    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students";
    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.length === 0) {
            getTableBody.innerHTML = "No Records Found!";
            getSpin.style.display = "none";
        }
        else {
            result.map((item) => {
                data += `
                   <tr>
                      <td>${item.name}</td>
                      <td>${item.email}</td>
                      <td>${item.phone_number}</td>
                      <td>${item.position}</td>
                      <td>${item.total_score}</td>
                   </tr>
                `
                getTableBody.innerHTML = data;
                getSpin.style.display = "none";
            })
        }
    })
    .catch(error => console.log('error', error));
}

function createCategory(event) {
    event.preventDefault();
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";
    const catName = document.getElementById("cat").value;
    const catImage = document.getElementById("imcat").files[0];
    if (catName === "") {
        Swal.fire({
            icon: 'info',
            text: 'All Fields Required!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }
    else {
        const getToken = localStorage.getItem("admin");
        const myToken = JSON.parse(getToken);
        const token = myToken.token;
        const dashHeader = new Headers();
        dashHeader.append("Authorization", `Bearer ${token}`);
        const catData = new FormData();
        catData.append("name", catName);
        catData.append("image", catImage);
        const dashMethod = {
            method: 'POST',
            headers: dashHeader,
            body: catData
        }
        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";
        fetch(url, dashMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
                setTimeout(() => {
                    location.reload();
                }, 3000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
            }
        })
        .catch(error => console.log('error', error));
    }
}
function getCategoryList() {
    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";
    const showItem = document.querySelector(".scroll-object");
    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;
    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);
    const dashMethod = {
        method: 'GET',
        headers: dashHeader
    }
    let data = [];
    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/category_list";
    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.length === 0) {
            showItem.innerHTML = "No Category Found";
            getSpin.style.display = "none";
        }
        else {
            result.map((item) => {
                data += `
                    <div class="search-card">
                      <img src=${item.image} alt="image">
                      <p class="mt-3">${item.name}</p>
                      <div class="text-right">
                        <button class="update-button" onclick="modalBox(${item.id})">update</button>
                        <button class="delete-button" onclick="delCat(${item.id})">delete</button>
                      </div>
                    </div>
                `
                showItem.innerHTML = data;
                getSpin.style.display = "none";
            })
        }
    })
    .catch(error => console.log('error', error));
}
let globalId;
function modalBox(catId, name) {
    globalId = catId;
    console.log(name)
    const showModal = document.getElementById("my-modal3");
    showModal.style.display = "block";
    console.log(globalId)
    const getUpName = document.getElementById("updateName");
    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;
    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);
    const dashMethod = {
        method: 'GET',
        headers: dashHeader
    }
    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/get_details?category_id=${catId}`;
    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        getUpName.setAttribute("value", `${result.name}`);
    })
    .catch(error => console.log('error', error));
}
function closeModal3() {
    const showModal = document.getElementById("my-modal3");
    showModal.style.display = "none"
}
function updateCategory(event) {
    event.preventDefault();
    const getSpin = document.querySelector(".spin2");
    getSpin.style.display = "inline-block";
    const catName = document.getElementById("updateName").value;
    const catImage = document.getElementById("updateImage").files[0];
    if (catName === "") {
        Swal.fire({
            icon: 'info',
            text: 'All Fields Required!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }
    else {
        const getToken = localStorage.getItem("admin");
        const myToken = JSON.parse(getToken);
        const token = myToken.token;
        const dashHeader = new Headers();
        dashHeader.append("Authorization", `Bearer ${token}`);
        const catData = new FormData();
        catData.append("name", catName);
        catData.append("image", catImage);
        catData.append("category_id", globalId)
        const dashMethod = {
            method: 'POST',
            headers: dashHeader,
            body: catData
        }
        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/update_category";
        fetch(url, dashMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
                setTimeout(() => {
                    location.reload();
                }, 3000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
            }
        })
        .catch(error => console.log('error', error));
    }
}
function deleteCategory(){
    
}