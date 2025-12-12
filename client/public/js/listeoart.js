
        document.querySelectorAll('.badge').forEach(badge => {
            badge.addEventListener('click', function() {
                const participantItem = this.closest('.participant-item');
                const badges = participantItem.querySelectorAll('.badge');
                
                badges.forEach(b => {
                    b.classList.remove('accepted', 'refused');
                });
                
                if (this.textContent.trim() === 'Accepter') {
                    this.classList.add('accepted');
                } else if (this.textContent.trim() === 'Refuser') {
                    this.classList.add('refused');
                }
            });
        });
document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
        alert("Vous devez être connecté pour voir vos événements");
        window.location.href = "connexion";
        return;
    }

    const id_user = user.id || user._id;

    try {
        const response = await fetch(`http://localhost:3000/api/myEvent/${id_user}`);
        const events = await response.json();
  const participantList = document.getElementById("participant-list");
        participantList.innerHTML = ""; // Vide le container avant de remplir

        if (!Array.isArray(events) || events.length === 0) {
            participantList.innerHTML = "<p>Aucun événement créé pour l'instant.</p>";
            return;
        }

        events.forEach(ev => {
            // Crée une div pour chaque événement
            const eventDiv = document.createElement("div");
            eventDiv.className = "events-container";

            // Contenu de l'événement
            eventDiv.innerHTML = `
                <h2 id="event">Nom de l'evenement</h2>
                <h3>${ev.nom_evenement}</h3>
                <br>
                <h4>Participants :</h4>
                <ul>
                    ${
                        ev.participants && ev.participants.length > 0
                        ? ev.participants.map(p => `<li>${p.email}</li>`).join("")
                        : "<li>Aucun participant .</li>"
                        
                    }
        
                </ul>
                
            `;

            // Ajoute la div de l'événement dans le container principal
            participantList.appendChild(eventDiv);
        });

    } catch (error) {
        console.error("Erreur :", error);
        participantList.innerHTML = "<p>Impossible de récupérer les événements.</p>";
    }
});