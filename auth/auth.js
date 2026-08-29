document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // LOGIN
    // ==============================

    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");

    if (loginForm) {

        loginForm.addEventListener("submit", async (event) => {

            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            if (!email || !password) {
                loginMessage.textContent =
                    "Please enter your email and password.";

                loginMessage.className = "form-note is-error";
                return;
            }

            loginMessage.textContent = "Logging in...";
            loginMessage.className = "form-note";

            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });

            if (error) {

                console.error("Login error:", error);

                loginMessage.textContent = error.message;
                loginMessage.className = "form-note is-error";

                return;
            }

            console.log("Logged in user:", data.user);

            loginMessage.textContent = "Login successful!";
            loginMessage.className = "form-note is-success";

            setTimeout(() => {
                window.location.href =
                    "../dashboard/customer.html";
            }, 1000);

        });

    }


    // ==============================
    // REGISTRATION
    // ==============================

    const registerForm =
        document.getElementById("registerForm");

    const registerMessage =
        document.getElementById("registerMessage");

    if (registerForm) {

        registerForm.addEventListener("submit", async (event) => {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const password =
                document.getElementById("password").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;


            // Check fields

            if (!name || !email || !password || !confirmPassword) {

                registerMessage.textContent =
                    "Please fill in all fields.";

                registerMessage.className =
                    "form-note is-error";

                return;
            }


            // Check password length

            if (password.length < 8) {

                registerMessage.textContent =
                    "Password must be at least 8 characters.";

                registerMessage.className =
                    "form-note is-error";

                return;
            }


            // Check passwords match

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


            // Create Supabase account

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

                console.error(
                    "Registration error:",
                    error
                );

                registerMessage.textContent =
                    error.message;

                registerMessage.className =
                    "form-note is-error";

                return;
            }


            console.log(
                "Registered user:",
                data.user
            );


            registerMessage.textContent =
                "Account created successfully!";

            registerMessage.className =
                "form-note is-success";


            registerForm.reset();

        });

    }

});