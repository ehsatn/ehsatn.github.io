document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const tooltip = document.querySelector('.tooltip');
    const copyPopup = document.getElementById('copyPopup');
    const closePopup = document.getElementById('closePopup');
    const copyCardBtn = document.getElementById('copyCardBtn');
    const copyIbanBtn = document.getElementById('copyIbanBtn');

    let currentCard = null;
    let currentEvent = null;

    // Add click event to each card
    cards.forEach(card => {
        card.addEventListener('click', (event) => {
            currentCard = card;
            currentEvent = event;
            
            // Show custom popup
            copyPopup.classList.add('show');
        });
    });

    // Close popup when clicking close button
    closePopup.addEventListener('click', () => {
        copyPopup.classList.remove('show');
        currentCard = null;
        currentEvent = null;
    });

    // Close popup when clicking outside
    copyPopup.addEventListener('click', (event) => {
        if (event.target === copyPopup) {
            copyPopup.classList.remove('show');
            currentCard = null;
            currentEvent = null;
        }
    });

    // Copy card number
    copyCardBtn.addEventListener('click', () => {
        if (currentCard && currentEvent) {
            const cardNumber = currentCard.getAttribute('data-card-number');
            copyToClipboard(cardNumber.replace(/\s/g, ''), 'Card number copied to clipboard', currentEvent);
            copyPopup.classList.remove('show');
            currentCard = null;
            currentEvent = null;
        }
    });

    // Copy IBAN
    copyIbanBtn.addEventListener('click', () => {
        if (currentCard && currentEvent) {
            const iban = currentCard.getAttribute('data-iban');
            copyToClipboard(iban.replace(/\s/g, ''), 'IBAN copied to clipboard', currentEvent);
            copyPopup.classList.remove('show');
            currentCard = null;
            currentEvent = null;
        }
    });

    // Function to copy to clipboard and show tooltip
    function copyToClipboard(text, message, event) {
        navigator.clipboard.writeText(text)
            .then(() => {
                // Update tooltip message
                tooltip.querySelector('.tooltip-content').textContent = message;
                
                // Show tooltip
                tooltip.classList.add('show');

                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                currentCard.appendChild(ripple);

                // Position ripple at click position
                const rect = currentCard.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;

                // Trigger ripple animation
                setTimeout(() => {
                    ripple.style.width = '300px';
                    ripple.style.height = '300px';
                    ripple.style.opacity = '0';
                }, 0);

                // Hide tooltip after 2 seconds
                setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 2000);

                // Remove ripple after animation
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }

    // Add subtle hover effect for shapes
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const shapes = card.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                setTimeout(() => {
                    shape.style.transform = 'scale(1.1)';
                }, index * 100);
            });
        });

        card.addEventListener('mouseleave', () => {
            const shapes = card.querySelectorAll('.shape');
            shapes.forEach(shape => {
                shape.style.transform = 'scale(1)';
            });
        });
    });

    // Add ripple effect styles
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(94, 53, 177, 0.2);
            transform: translate(-50%, -50%) scale(0);
            width: 0;
            height: 0;
            pointer-events: none;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 10;
        }

        .ripple.active {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
});
