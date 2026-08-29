document.addEventListener("DOMContentLoaded", async () => {

    // Prevent the browser from caching the dashboard
    window.history.replaceState(null, "", window.location.href);

    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const logoutBtn = document.getElementById("logoutBtn");

    // Check Supabase session
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
        console.error("Session error:", error);
        window.location.replace("../auth/login.html");
        return;
    }

    const session = data.session;

    // No active session = go back to login
    if (!session) {
        window.location.replace("../auth/login.html");
        return;
    }

    const user = session.user;

    console.log("Logged in user:", user);

    // Display email
    userEmail.textContent = user.email;

    // Display name
    const fullName = user.user_metadata?.full_name;

    if (fullName) {
        userName.textContent = fullName.split(" ")[0];
    } else {
        userName.textContent = user.email.split("@")[0];
    }

    // Logout
    logoutBtn.addEventListener("click", async () => {

        logoutBtn.disabled = true;
        logoutBtn.textContent = "Logging out...";

        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            console.error("Logout error:", error);

            logoutBtn.disabled = false;
            logoutBtn.textContent = "Logout";

            return;
        }

        // Replace dashboard history entry with login page
        window.location.replace("../auth/login.html");
    });

});