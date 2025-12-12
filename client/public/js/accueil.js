
document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("user"));

    const btnLogin = document.getElementById("btnLogin");
    const btnLogout = document.getElementById("btnLogout");

    if (user) {
        // Utilisateur connecté
        btnLogin.style.display = "none";
        btnLogout.style.display = "block";
    } else {
        // Aucun utilisateur connecté
        btnLogin.style.display = "block";
        btnLogout.style.display = "none";
    }
});



document.getElementById("btnLogout").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.reload();   // Rafraîchir pour mettre à jour l'affichage
});



document.getElementById("creeEvent").addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if(user) {
        window.location.href = "creation";
    }else{
        window.location.href = "compte";
    }

});

document.querySelectorAll(".lien2").forEach(btn => {
    btn.addEventListener("click", () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            window.location.href = "creation";
        } else {
            window.location.href = "compte";
        }
    });
});

document.querySelectorAll(".primary").forEach(btn => {
    btn.addEventListener("click", () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            window.location.href = "creation";
        } else {
            window.location.href = "compte";
        }
    });
});

document.addEventListener("DOMContentLoaded", async () => {

    const container = document.querySelector(".events-grid");

    if (!container) {
        console.error("La div .events-grid est introuvable dans le DOM !");
        return;
    }

    container.innerHTML = "";

    try {
        const response = await fetch(`http://localhost:3000/api/events`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (!data || data.length === 0 || data.message === "evenement non trouvés") {
            container.innerHTML = "<p>Aucun événement créé.</p>";
            return;
        }

        // Créer les cartes
        data.forEach(event => {
            const card = document.createElement("div");
            card.classList.add("event-card");

            card.innerHTML = `
                <div class="event-title">Nom Evènement</div>
                <div class="event-subtitle">${event.nom_evenement}</div>

                <div class="event-section">
                    <div class="section-label">Description</div>
                    <div class="section-content">${event.description}</div>
                </div>

                <div class="event-section">
                    <div class="section-label">Nombre de places</div>
                    <div class="section-content">${event.nbre_de_places}</div>
                </div>

                <div class="event-meta">
                    <div class="meta-item">
                        <div class="section-label">Lieu</div>
                        <div class="section-content">${event.lieu}</div>
                    </div>
                    <div class="meta-item">
                        <div class="section-label">Date</div>
                        <div class="section-content">${new Date(event.date_debut).toLocaleDateString("fr-FR")}</div>
                    </div>
                </div>

                <button class="rejoin-btn" data-id="${event._id}">Rejoindre</button>`;

            container.appendChild(card);
            
            document.querySelectorAll(".rejoin-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const eventId = btn.getAttribute("data-id");

        // Stocker l'ID dans le localStorage
        localStorage.setItem("selectedEventId", eventId);

        // Redirection vers la page détails/inscription
        window.location.href = "inscrip";
    });
});


        });
    }catch (error) {
        console.error(error);
        container.innerHTML = "<p>Erreur lors du chargement des événements.</p>";
    }
});