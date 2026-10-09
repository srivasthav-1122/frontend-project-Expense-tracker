// ================= SIGN UP =================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim().toLowerCase();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("signupMessage");


        // Check passwords

        if (password !== confirmPassword) {

            message.textContent = "Passwords do not match.";
            message.style.color = "red";

            return;
        }


        // Get existing users

        let users = JSON.parse(localStorage.getItem("users")) || [];


        // Check email

        const existingUser = users.find(function (user) {

            return user.email === email;

        });


        if (existingUser) {

            message.textContent = "Email already registered.";
            message.style.color = "red";

            return;
        }


        // Create user

        const newUser = {

            id: Date.now(),

            name: name,

            email: email,

            password: password,

            role: "user"

        };


        // Save user

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));


        // Success message

        message.textContent = "Account created successfully!";
        message.style.color = "green";


        // Go to login

        setTimeout(function () {

            window.location.href = "login.html";

        }, 1000);

    });

}



// ================= LOGIN =================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email = document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("loginPassword")
            .value;

        const selectedRole = document
            .getElementById("loginRole")
            .value;

        const message = document.getElementById("loginMessage");


        // Get users

        const users = JSON.parse(localStorage.getItem("users")) || [];


        // Find user

        const user = users.find(function (user) {

            return user.email === email &&
                   user.password === password &&
                   user.role === selectedRole;

        });


        // Invalid login

        if (!user) {

            message.textContent =
                "Invalid email, password or role.";

            message.style.color = "red";

            return;
        }


        // Save current user

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );


        message.textContent = "Login successful!";
        message.style.color = "green";


        // ================= ROLE BASED REDIRECTION =================

        setTimeout(function () {

            if (user.role === "admin") {

                window.location.href = "admin.html";

            } else {

                window.location.href = "index.html";

            }

        }, 500);

    });

}



// ================= LOGOUT =================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("currentUser");

        window.location.href = "login.html";

    });

}