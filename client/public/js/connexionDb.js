document.getElementById("loginFormC").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const motpasse = document.getElementById("motpasse").value;

    try {
        const response = await fetch("http://localhost:3000/api/user/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, motpasse })
        });

        const data = await response.json();
        console.log("Réponse serveur :", data);

        // Vérifie le statut renvoyé par le serveur
        if (data.status === "success") {

            // Stocke le token
            localStorage.setItem("token", data.token);

            // Stocke les infos utilisateur (id, nom, email)
            localStorage.setItem("user", JSON.stringify(data.user));
            

            // Redirection
            window.location.href = "/";
        } else {
            document.getElementById("message").innerText = data.message || "Erreur lors de la connexion";
        }

    } catch (error) {
        console.error(error);
        document.getElementById("message").innerText = "Serveur injoignable";
    }
});
