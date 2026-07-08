// import React from 'react'
import { useEffect } from "react";
import {useRef} from 'react'

const ParticlesBackground = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        const colors = ["rgba(255,255,255,0.7)"];
        const maxParticles = 100;

        class Particle{
            constructor(){
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 2 + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
            }
            draw(){
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update(){
                this.x += this.speedX;
                this.y += this.speedY;
                if(this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
                if(this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

                this.draw();
            }
        }

        function createParticles(){
            particles = [];
            for(let i = 0; i < maxParticles; i++){
                particles.push(new Particle());
            }
        }

        function handleResize(){
            const rect = canvas.parentElement.getBoundingClientRect();
            const fullHeight = canvas.parentElement.scrollHeight;
            const dpr = window.devicePixelRatio || 1;
            
            canvas.width = (rect.width || window.innerWidth) * dpr;
            canvas.height = (fullHeight || window.innerHeight) * dpr;
            
            // Scale the canvas context for high DPI (only once)
            if (ctx.canvas.width / dpr > rect.width || ctx.canvas.height / dpr > fullHeight) {
                ctx.scale(dpr, dpr);
            }
            
            // Set CSS size
            canvas.style.width = (rect.width || window.innerWidth) + 'px';
            canvas.style.height = fullHeight + 'px';
            
            createParticles();
        }
        
        handleResize();
        
        const resizeObserver = new ResizeObserver(() => handleResize());
        resizeObserver.observe(canvas.parentElement);
        
        window.addEventListener('resize', handleResize);

        let animationFrameId;
        function animate(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => particle.update());
            animationFrameId = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            resizeObserver.disconnect();
        }
    }, [])
  return (
    <canvas ref={canvasRef} className='absolute inset-0 pointer-events-none z-0' style={{display: 'block'}}></canvas>
  )
}

export default ParticlesBackground