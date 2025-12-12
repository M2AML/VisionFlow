document.getElementById("loginForm").addEventListener("submit", async function(e) {
        e.preventDefault();

        const nom = document.getElementById("nom").value;
        const email = document.getElementById("email").value;
        const motpasse = document.getElementById("motpasse").value;

        const response = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom, email, motpasse })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("user", JSON.stringify({
        email: email}));
        
        window.location.href = "connexion";
    } else {
        
        document.getElementById("message").innerText = data.message || "Erreur lors de l'inscription";
    }
});
