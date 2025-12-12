document.getElementById("btnInscrire").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const msg = document.getElementById("msg");

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        msg.style.color = "red";
        msg.innerText = "Vous devez vous connecter avant de vous inscrire.";
        return;
    }

    const id_user = user._id || user.id;
    const id_event = localStorage.getItem("selectedEventId"); 

    if (!email) {
        msg.style.color = "red";
        msg.innerText = "Veuillez entrer votre email.";
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/api/insEvent/${id_user}/${id_event}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        const data = await res.json();

        if (res.status === 201) {
            window.location.href = "/";
        } else {
            msg.style.color = "red";
            msg.innerText = data.message || "Erreur lors de l'inscription.";
        }

    } catch (error) {
        msg.style.color = "red";
        msg.innerText = "Erreur serveur.";
        console.log(error);
    }
});