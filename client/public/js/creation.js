document.getElementById("creactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const nom_evenement = document.getElementById("nom_evenement").value;
    const description = document.getElementById("description").value;
    const date_debut = document.getElementById("date_debut").value;
    const lieu = document.getElementById("lieu").value;
    const nbre_de_places = document.getElementById("nbre_de_places").value;

    // Récupérer l'utilisateur connecté
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
        document.getElementById("message").innerText = "Vous devez être connecté pour créer un évènement.";
        return;
    }

    // L'id est : user.id
    const id_user = user.id;

    try {
        const response = await fetch("http://localhost:3000/api/event", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token    // 🔥 Ajout du token
            },
            body: JSON.stringify({
                nom_evenement,
                description,
                date_debut,
                lieu,
                nbre_de_places,
                id_user
            })
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = "listeeve";
        } else {
            document.getElementById("message").innerText = data.message || "Erreur lors de la création de l'évènement";
        }

    } catch (error) {
        console.error(error);
        document.getElementById("message").innerText = "Serveur injoignable";
    }
});
