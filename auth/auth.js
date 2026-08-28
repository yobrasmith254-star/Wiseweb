document.addEventListener("DOMContentLoaded", function () {


const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");


// =========================
// LOGIN
// =========================

if (loginForm) {

    const loginMessage =
        document.getElementById("loginMessage");

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        if (email === "" || password === "") {

            loginMessage.textContent =
                "Please enter your email and password.";

            loginMessage.className =
                "form-note is-error";

            return;
        }


        loginMessage.textContent =
            "Logging in...";

        loginMessage.className =
            "form-note";


        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });


        if (error) {

            console.error(error);

            loginMessage.textContent =
                "Login failed: " + error.message;

            loginMessage.className =
                "form-note is-error";

            return;
        }


        console.log("Logged in user:", data.user);

        loginMessage.textContent =
            "Login successful!";

        loginMessage.className =
            "form-note is-success";

    });

}


// =========================
// REGISTRATION
// =========================

if (registerForm) {

    const registerMessage =
        document.getElementById("registerMessage");


    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        if (name === "" || email === "" || password === "") {

            registerMessage.textContent =
                "Please fill in all required fields.";

            registerMessage.className =
                "form-note is-error";

            return;
        }


        if (password.length < 8) {

            registerMessage.textContent =
                "Password must be at least 8 characters.";

            registerMessage.className =
                "form-note is-error";

            return;
        }


        if (password !== confirmPassword) {

            registerMessage.textContent =
                "Passwords do not match.";

            registerMessage.className =
                "form-note is-error";

            return;
        }


        registerMessage.textContent =
            "Creating your account...";

        registerMessage.className =
            "form-note";


        const { data, error } =
            await supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            });


        if (error) {

            console.error(error);

            registerMessage.textContent =
                "Registration failed: " + error.message;

            registerMessage.className =
                "form-note is-error";

            return;
        }


        console.log("Registered user:", data.user);

        registerMessage.textContent =
            "Account created successfully! Check your email to confirm your account.";

        registerMessage.className =
            "form-note is-success";

    });

}


});
