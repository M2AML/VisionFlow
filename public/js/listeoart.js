
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