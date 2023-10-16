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
document.addEventListener("DOMContentLoaded", () => {
// retrieve user details from local storage
const newUser = localStorage.getItem("admin");
if(newUser){
const user = JSON.parse(newUser);
const userName = user.name;

const adminIdElement = document.getElementById("adminId");
if(adminIdElement){
adminIdElement.textContent = "Welcome, " + userName;
}
}
})






// Make authorized user login have a request for the data from the API
Code
function makeAuthorizedRequest(url, token) {
  const requestOptions = {
   method: 'GET',
   headers: {
    'Authorization': `Bearer ${token}`
   }
  };
  return fetch(url, requestOptions)
  .then(response => response.json())
  .catch(error => {
    console.error('API Request Error:', error);
    throw error;
  });
}

// Function to fetch and update admin dashboard data
function fetchAdminDashboardData(token) {
  const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";
  return makeAuthorizedRequest(url, token);
}

// Function to fetch and update all students data
function fetchAllStudents(token) {
  const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students";
  return makeAuthorizedRequest(url, token);
}

// Function to fetch and update top three students data
function fetchTopThreeStudents(token) {
  const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";
  return makeAuthorizedRequest(url, token);
}

// Fetch admin details and update the dashboard
function dashboardApi() {
  const userJson = localStorage.getItem("admin");
  if (userJson) {
   const user = JSON.parse(userJson);
   const userToken = user.token;
   fetchAdminDashboardData(userToken)
    .then(data => {
     console.log('Admin Dashboard Data:', data);
     // Update your dashboard with the data here
     updateDashboard(data);
    })
    .catch(error => console.error('Admin Dashboard Error:', error));
  }
}

// Fetch and update all students data
function fetchAllStudentsApi() {
  const userJson = localStorage.getItem("admin");
  if (userJson) {
   const user = JSON.parse(userJson);
   const userToken = user.token;
   fetchAllStudents(userToken)
    .then(data => {
     console.log('All Students Data:', data);
     // Update your student data with the data here
     updateAllStudents(data);
    })
    .catch(error => console.error('All Students Error:', error));
  }
}

// Function to update the dashboard with data
function updateDashboard(data) {
  const categoryElement = document.getElementById("category");
  const learnmatElement = document.getElementById("learnmat");
  const subCatElement = document.getElementById("subCat");
  const quizElement = document.getElementById("quiz");
  const studentElement = document.getElementById("student");
  categoryElement.textContent = data.total_number_of_categories;
  learnmatElement.textContent = data.total_number_of_learningmaterial;
  subCatElement.textContent = data.total_number_of_subcategories;
  quizElement.textContent = data.total_number_of_quize;
  studentElement.textContent = data.total_number_of_students;
}

// Function to update all students data
function updateAllStudents(data) {
  const tableId = document.getElementById("table-id");
  tableId.innerHTML = "";
  data.forEach(student => {
   const row = document.createElement("tr");
   row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.email}</td>
    <td>${student.phone_number}</td>
    <td>${student.position}</td>
    <td>${student.total_score}</td>
   `;
   tableId.appendChild(row);
  });
}

function closeDashModal() {
  const modal = document.getElementById("dash-modal");
  modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  dashboardApi();
  fetchAllStudentsApi();
});