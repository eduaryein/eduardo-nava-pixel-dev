(function(){
    // Canvas animado (Metroidvania vibes)
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    function resizeCanvas(){
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    let time = 0;
    let stars = [];
    for(let i=0;i<200;i++) stars.push({ x:Math.random(), y:Math.random(), sz:1+Math.random()*2, spd:0.002+Math.random()*0.01 });
    
    function draw() {
        if(!ctx) return;
        ctx.clearRect(0,0,width,height);
        // Fondo gradiente metroidvania
        let grad = ctx.createLinearGradient(0,0,width*0.8,height);
        grad.addColorStop(0,'#0b1221');
        grad.addColorStop(0.7,'#192842');
        ctx.fillStyle = grad;
        ctx.fillRect(0,0,width,height);
        
        // Neblina
        ctx.fillStyle = '#2a4b7c20';
        for(let i=0;i<5;i++) {
            ctx.beginPath();
            ctx.arc(width*(0.2+ i*0.2 + Math.sin(time*0.1)*0.05), height*0.6, 200, 0, Math.PI*2);
            ctx.fill();
        }
        
        // Estrellas parpadeantes
        stars.forEach(s => {
            ctx.fillStyle = `rgba(200,220,255,${0.5+Math.sin(time*5+s.x)*0.3})`;
            ctx.fillRect(s.x*width, s.y*height, s.sz, s.sz);
        });
        
        // Silueta castillo metroidvania
        ctx.fillStyle = '#1e2a47';
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, height-120);
        ctx.lineTo(width*0.2, height-180);
        ctx.lineTo(width*0.4, height-90);
        ctx.lineTo(width*0.6, height-220);
        ctx.lineTo(width*0.8, height-140);
        ctx.lineTo(width, height-60);
        ctx.lineTo(width, height);
        ctx.fill();
        
        ctx.fillStyle = '#2a3f6e';
        ctx.font = `bold ${Math.floor(width/35)}px "Press Start 2P"`;
        ctx.fillText("METROIDVANIA", width*0.6, height-250);
        
        requestAnimationFrame(()=>{ time+=0.01; draw(); });
    }
    draw();

    // Tabs de servicios
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            tabs.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            contents.forEach(c => c.classList.add('hidden'));
            document.getElementById(tabId).classList.remove('hidden');
        });
    });

    // Menú móvil
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // Función para alternar menú
    function toggleMenu() {
        mobileMenu.classList.toggle('hidden');
        // Cambiar icono de hamburguesa
        const icon = menuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    }
    
    // Abrir/Cerrar con botón hamburguesa
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }
    
    // Cerrar con botón "CERRAR"
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    }
    
    // Cerrar menú al hacer clic en cualquier enlace
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!mobileMenu.classList.contains('hidden') && 
            !mobileMenu.contains(event.target) && 
            !menuBtn.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Prevenir que clics dentro del menú lo cierren
    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    
})();