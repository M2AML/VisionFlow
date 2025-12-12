document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
        alert("Vous devez être connecté pour voir vos événements");
        window.location.href = "connexion";
        return;
    }

    const id_user = user.id;
    const container = document.querySelector(".events-grid");

    if (!container) {
        console.error("La div .events-grid est introuvable dans le DOM !");
        return;
    }

    container.innerHTML = "";

    try {
        const response = await fetch(`http://localhost:3000/api/events/user/${id_user}`, {
            method: "GET",
            headers: { "Authorization": "Bearer " + token }
        });

        const data = await response.json();

        if (!data || data.length === 0 || data.message === "evenement non trouvés") {
            container.innerHTML = "<p>Aucun événement créé.</p>";
            return;
        }

        // Éléments du modal
        const modal = document.getElementById("edit-modal");
        const closeModal = document.getElementById("close-modal");
        const editForm = document.getElementById("edit-form");

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

                <button class="rejoin-btn">Modifier</button>
            `;

            container.appendChild(card);

            // Bouton Modifier
            const modifyBtn = card.querySelector(".rejoin-btn");
            modifyBtn.addEventListener("click", () => {
                document.getElementById("edit-nom").value = event.nom_evenement;
                document.getElementById("edit-description").value = event.description;
                document.getElementById("edit-lieu").value = event.lieu;
                document.getElementById("edit-nbre_de_places").value = event.nbre_de_places;
                document.getElementById("edit-date_debut").value = event.date_debut.split("T")[0];

                editForm.dataset.eventId = event._id;
                modal.style.display = "block";
            });
        });

        // Fermer le modal
        closeModal.addEventListener("click", () => { modal.style.display = "none"; });
        window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

        // Soumettre le formulaire
        editForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const eventId = editForm.dataset.eventId;
            const dataToUpdate = {
                nom_evenement: document.getElementById("edit-nom").value,
                description: document.getElementById("edit-description").value,
                lieu: document.getElementById("edit-lieu").value,
                nbre_de_places: document.getElementById("edit-nbre_de_places").value,
                date_debut: document.getElementById("edit-date_debut").value
            };

            try {
                const response = await fetch(`http://localhost:3000/api/update/event/${eventId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(dataToUpdate)
                });

                const result = await response.json();
                alert(result.message || "Événement modifié !");
                modal.style.display = "none";
                window.location.reload();
            } catch (error) {
                console.error(error);
                alert("Erreur lors de la modification.");
            }
        });

    } catch (error) {
        console.error(error);
        container.innerHTML = "<p>Erreur lors du chargement des événements.</p>";
    }
});
