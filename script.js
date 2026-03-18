const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxLyTfUy4WKRYodSxjqeUlo81jXymwK2O8KLQ9y_9lebJ0hogewVek9ASqjIE8kfR-Xyg/exec";

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

    // Lấy dữ liệu (Bao gồm cả các ô có thuộc tính form="armor-form" ở cột trái)
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

            // MỚI: Hiện Popup phản hồi yêu thương sau 0.5s
            setTimeout(() => {
                document.getElementById('success-popup').classList.add('show');
            }, 500);

            // MỚI: Reset lại Form sau khi gửi xong
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.background = 'linear-gradient(45deg, var(--primary-pink), #ff9eb5)';
                btn.style.color = 'white';
                btn.style.border = 'none';

                // Reset form bên phải
                document.getElementById('armor-form').reset();

                // Reset thủ công các ô bên cột trái (vì nó nằm ngoài form)
                document.querySelectorAll('input[form="armor-form"]').forEach(input => input.value = '');
            }, 4000);
        })
        .catch(error => {
            console.error('Lỗi:', error);
            alert("Có lỗi khi gửi dữ liệu. Bạn hãy kiểm tra lại mạng nhé!");
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
});

// Tắt popup khi bấm "Mình biết rồi"
document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('success-popup').classList.remove('show');
});