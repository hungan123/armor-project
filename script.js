function createFloatingIcons() {
    const container = document.getElementById('animation-container');
    const icon = document.createElement('div');
    icon.classList.add('bg-icon');

    const icons = ['🤍', '🌸', '✨', '🩹'];
    icon.innerHTML = icons[Math.floor(Math.random() * icons.length)];

    icon.style.left = Math.random() * 100 + 'vw';
    icon.style.animationDuration = Math.random() * 4 + 5 + 's';
    icon.style.fontSize = Math.random() * 15 + 10 + 'px';

    container.appendChild(icon);

    setTimeout(() => { icon.remove(); }, 9000);
}

setInterval(createFloatingIcons, 400);

document.getElementById('armor-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.querySelector('.btn-submit');

    btn.innerHTML = '✨ Đã gửi thành công! ✨';
    btn.style.background = '#fff';
    btn.style.color = '#ff85a2';
    btn.style.border = '2px solid #ff85a2';

    for(let i = 0; i < 15; i++) {
        setTimeout(createFloatingIcons, i * 100);
    }

    setTimeout(() => {
        btn.innerHTML = '🤍 Gửi';
        btn.style.background = 'linear-gradient(45deg, var(--primary-pink), #ff9eb5)';
        btn.style.color = 'white';
        btn.style.border = 'none';
        document.getElementById('armor-form').reset();
    }, 3000);
});