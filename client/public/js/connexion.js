document.addEventListener('DOMContentLoaded', function() {
            // Éléments du DOM
            const showPasswordCheckbox = document.getElementById('show-password');
            const passwordField = document.getElementById('motpasse');
            const forgotPasswordLink = document.getElementById('forgot-password-link');
            const forgotPasswordModal = document.getElementById('forgotPasswordModal');
            const closeModal = document.getElementById('closeModal');
            const resetPasswordForm = document.getElementById('resetPasswordForm');
            const successMessage = document.getElementById('successMessage');
            const loginForm = document.getElementById('loginFormC');
            
            // Gestion de l'affichage du mot de passe
            showPasswordCheckbox.addEventListener('change', function() {
                passwordField.type = this.checked ? 'text' : 'password';
            });
            
            // Ouvrir le modal "Mot de passe oublié"
            forgotPasswordLink.addEventListener('click', function(e) {
                e.preventDefault();
                forgotPasswordModal.style.display = 'flex';
            });
            
            // Fermer le modal
            closeModal.addEventListener('click', function() {
                forgotPasswordModal.style.display = 'none';
                resetForm();
            });
            
            // Fermer le modal en cliquant à l'extérieur
            window.addEventListener('click', function(e) {
                if (e.target === forgotPasswordModal) {
                    forgotPasswordModal.style.display = 'none';
                    resetForm();
                }
            });
            
            // Soumission du formulaire de réinitialisation
            resetPasswordForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simulation d'envoi d'email
                const email = document.getElementById('reset-email').value;
                
                // Afficher le message de succès
                successMessage.style.display = 'block';
                
                // Réinitialiser le formulaire après 3 secondes et fermer le modal
                setTimeout(function() {
                    resetForm();
                    forgotPasswordModal.style.display = 'none';
                }, 3000);
            });
            
            // Soumission du formulaire de connexion
            
            // Fonction pour réinitialiser le formulaire
            function resetForm() {
                resetPasswordForm.reset();
                successMessage.style.display = 'none';
            }
            
            // Animation d'entrée
            const loginBox = document.querySelector('.login-box');
            loginBox.style.opacity = '0';
            loginBox.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                loginBox.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                loginBox.style.opacity = '1';
                loginBox.style.transform = 'translateY(0)';
            }, 100);
        });