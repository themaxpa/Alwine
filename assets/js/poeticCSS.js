
    (function() {
        // Inject poetic CSS automatically
        const poeticStyles = `
            @keyframes gentleFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-4px); }
            }
            @keyframes rippleStone {
                0% { width: 0; height: 0; opacity: 0.6; transform: translate(-50%, -50%) scale(0); }
                100% { width: 180px; height: 180px; opacity: 0; transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes softBreath {
                0% { transform: scale(1); }
                50% { transform: scale(1.02); }
                100% { transform: scale(1); }
            }
            @keyframes echoWave {
                0% { transform: translateY(0px); }
                30% { transform: translateY(-5px); }
                60% { transform: translateY(-2px); }
                100% { transform: translateY(0px); }
            }
            .poetic-ripple {
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%);
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 10;
                animation: rippleStone 0.8s ease-out forwards;
            }
            .photo-item.awaken {
                animation: softBreath 0.5s ease forwards;
                z-index: 2;
            }
            .photo-item.echo {
                animation: echoWave 0.35s ease forwards;
            }
            .photo-item {
                transition: all 0.3s ease;
            }
            .photo-item.awaken .clean-image {
                transform: scale(1.05);
                transition: transform 0.4s ease;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = poeticStyles;
        document.head.appendChild(styleSheet);
        
        // Poetic JavaScript effect
        document.addEventListener('DOMContentLoaded', function() {
            const images = document.querySelectorAll('.photo-item');
            
            images.forEach((image, index) => {
                image.style.setProperty('--poetic-order', index);
                
                image.addEventListener('mouseenter', function(e) {
                    createRipple(e, this);
                    this.classList.add('awaken');
                    
                    const siblings = getNearbySiblings(images, index, 3);
                    siblings.forEach((sibling, i) => {
                        setTimeout(() => {
                            sibling.classList.add('echo');
                        }, i * 40);
                    });
                });
                
                image.addEventListener('mouseleave', function() {
                    this.classList.remove('awaken');
                    
                    const siblings = getNearbySiblings(images, index, 3);
                    siblings.forEach(sibling => {
                        setTimeout(() => {
                            sibling.classList.remove('echo');
                        }, 200);
                    });
                });
                
                image.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;
                    this.style.setProperty('--gaze-x', x);
                    this.style.setProperty('--gaze-y', y);
                });
            });
            
            function getNearbySiblings(arr, center, radius) {
                const start = Math.max(0, center - radius);
                const end = Math.min(arr.length - 1, center + radius);
                const siblings = [];
                for (let i = start; i <= end; i++) {
                    if (i !== center) {
                        siblings.push(arr[i]);
                    }
                }
                return siblings;
            }
            
            function createRipple(event, element) {
                const rect = element.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.className = 'poetic-ripple';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                element.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 800);
            }
            
            images.forEach((image, idx) => {
                const floatDelay = (idx * 0.15) % 4;
                image.style.animation = `gentleFloat 5s ease-in-out infinite ${floatDelay}s`;
            });
        });
    })();
