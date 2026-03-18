const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw035xI-8WPiYQ-cHrwEclugkhIKTsQTbekyri-d2nBMT93VKZuIXcEs2eqpsZKhcGweQ/exec";

function createFloatingIcons() {
    const container = document.getElementById('animation-container');
    if(!container) return;
    const icon = document.createElement('div');
    icon.style.position = 'absolute';
    icon.style.color = '#ffd1dc';
    icon.style.opacity = '0.6';
    icon.innerHTML = ['🤍', '🌸', '✨', '🩹'][Math.floor(Math.random() * 4)];
    icon.style.left = Math.random() * 100 + 'vw';
    icon.style.fontSize = Math.random() * 15 + 10 + 'px';
    icon.style.animation = `floatUp ${Math.random() * 4 + 5}s linear forwards`;
    container.appendChild(icon);
    setTimeout(() => icon.remove(), 9000);
}
setInterval(createFloatingIcons, 400);

document.getElementById('armor-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.querySelector('.btn-submit');
    const originalText = btn.innerHTML;

    btn.innerHTML = '⏳ Đang gửi...';
    btn.disabled = true;

    const formData = new FormData(this);
    const queryString = new URLSearchParams(formData).toString();
    fetch(`${SCRIPT_URL}?${queryString}`, { method: 'POST' })
        .then(() => {
            btn.innerHTML = '✨ Đã gửi thành công! ✨';
            btn.style.background = '#fff';
            btn.style.color = '#ff85a2';
            btn.style.border = '2px solid #ff85a2';

            // Pháo hoa ăn mừng
            for(let i = 0; i < 20; i++) {
                setTimeout(createFloatingIcons, i * 100);
            }

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.background = 'linear-gradient(45deg, var(--primary-pink), #ff9eb5)';
                btn.style.color = 'white';
                btn.style.border = 'none';
                this.reset();
            }, 4000);
        })
        .catch(error => {
            console.error('Lỗi:', error);
            alert("Có lỗi khi gửi dữ liệu. Bạn hãy kiểm tra lại mạng nhé!");
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
});