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