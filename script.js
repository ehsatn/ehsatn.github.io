document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const tooltip = document.querySelector('.tooltip');

    // Add click event to each card
    cards.forEach(card => {
        card.addEventListener('click', (event) => {
            // Get card number and IBAN
            const cardNumber = card.getAttribute('data-card-number');
            const iban = card.getAttribute('data-iban');

            // Show choice dialog
            const choice = confirm('Choose what to copy:\n\nOK = Copy Card Number\nCancel = Copy IBAN');
            
            let textToCopy, tooltipMessage;
            
            if (choice) {
                // Copy card number
                textToCopy = cardNumber.replace(/\s/g, '');
                tooltipMessage = 'Card number copied to clipboard';
            } else {
                // Copy IBAN
                textToCopy = iban.replace(/\s/g, '');
                tooltipMessage = 'IBAN copied to clipboard';
            }

            // Copy to clipboard
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Update tooltip message
                    tooltip.querySelector('.tooltip-content').textContent = tooltipMessage;
                    
                    // Show tooltip
                    tooltip.classList.add('show');

                    // Add ripple effect
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple');
                    card.appendChild(ripple);

                    // Position ripple at click position
                    const rect = card.getBoundingClientRect();
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
        });

        // Add subtle hover effect for shapes
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
