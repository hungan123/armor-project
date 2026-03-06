// 1. CHỨC NĂNG TẠO ICON BAY LƠ LỬNG TRONG BACKGROUND
function createFloatingIcons() {
    const container = document.getElementById('animation-container');
    const icon = document.createElement('div');

    // Đặt class để ăn CSS
    icon.classList.add('bg-icon');

    // Mảng các icon cute, nó sẽ lấy ngẫu nhiên
    const icons = ['🤍', '🌸', '✨', '🩹'];
    icon.innerHTML = icons[Math.floor(Math.random() * icons.length)];

    // Random vị trí xuất hiện (chiều ngang)
    icon.style.left = Math.random() * 100 + 'vw';

    // Random thời gian bay (từ 5 đến 9 giây)
    icon.style.animationDuration = Math.random() * 4 + 5 + 's';

    // Random kích thước icon
    icon.style.fontSize = Math.random() * 15 + 10 + 'px';

    container.appendChild(icon);

    // Tự động xóa icon sau khi bay xong để web không bị đơ
    setTimeout(() => {
        icon.remove();
    }, 9000);
}

// Cứ mỗi 400 mili-giây sẽ tạo ra 1 icon mới
setInterval(createFloatingIcons, 400);

// 2. CHỨC NĂNG KHI BẤM NÚT "GỬI"
document.getElementById('armor-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn trang tự động load lại

    const btn = document.querySelector('.btn-submit');

    // Đổi chữ và màu để người dùng biết đã bấm
    btn.innerHTML = '✨ Đã gửi thành công! ✨';
    btn.style.background = '#fff';
    btn.style.color = '#ff85a2';
    btn.style.border = '2px solid #ff85a2';

    // Tạo "pháo hoa" nhỏ bằng cách gọi hàm tạo icon liên tục
    for(let i = 0; i < 15; i++) {
        setTimeout(createFloatingIcons, i * 100);
    }

    // Sau 3 giây, nút bấm quay lại trạng thái ban đầu
    setTimeout(() => {
        btn.innerHTML = '🤍 Gửi';
        btn.style.background = 'linear-gradient(45deg, var(--primary-pink), #ff9eb5)';
        btn.style.color = 'white';
        btn.style.border = 'none';

        // Xóa nội dung form
        document.getElementById('armor-form').reset();
    }, 3000);
});