# ⚡ TECHZONE - Website Bán Hàng Công Nghệ & Trợ Lý AI Tư Vấn Thông Minh (CyberBot Pro)

Một ứng dụng Web thương mại điện tử công nghệ cao cấp, tương thích hoàn hảo **100% Mobile (iOS, Android) & Desktop PC**, tích hợp **Trợ lý Trí tuệ Nhân tạo riêng (CyberBot Pro)** có khả năng hiểu ngữ cảnh tiếng Việt, so sánh thông số thiết bị, bóc tách ngân sách, tư vấn theo ngành nghề và tạo đơn hàng quét mã VietQR tự động.

---

## 🌟 Những Nâng Cấp Vượt Trội Mới Nhất

### 1. 🎨 Giao Diện Tinh Tế, Chỉn Chu & Hiện Đại (Apple / Vercel Aesthetic)
- **Glassmorphism & Viền Mờ Tinh Xảo**: Hiệu ứng kính mờ `backdrop-filter: blur(20px)`, hệ màu tối sâu (`#090d16`) kết hợp dải gradient cyberpunk tinh tế.
- **Thanh Đếm Ngược Flash Deal Tự Động**: Thẻ tiêu điểm sản phẩm của ngày với đồng hồ đếm ngược thời gian thực, tiến trình số lượng máy còn lại.
- **Tùy Chọn Chế Độ Hiển Thị**: Chuyển đổi linh hoạt giữa **Xem dạng Lưới (Grid 4 cột)** và **Xem dạng Danh sách chi tiết (List View)**.
- **Micro-interactions & Phản Hồi Âm Thanh**: Tích hợp bộ tổng hợp âm thanh Web Audio API Synthesizer khi thêm vào giỏ hàng hoặc khi CyberBot phản hồi tin nhắn.

### 2. 📱 Chi Tiết Sản Phẩm & Biến Thể Động (Variants)
- **Bộ sưu tập ảnh đa góc độ (Gallery Thumbnails)**: Nhấp để chuyển ảnh xem sắc nét.
- **Chọn Màu Sắc (Color Swatch)**: Hiển thị các chấm màu thực tế (Titan Tự Nhiên, Titan Sa Mạc, Đen, Xanh Midnight...).
- **Chọn Dung Lượng & Phiên Bản (Storage Options)**: Tự động điều chỉnh mức giá tương ứng (256GB / 512GB / 1TB).
- **Đánh Giá Khách Hàng Thực Tế**: Tên người mua, số sao đánh giá, ngày mua và phản hồi chân thực.
- **Thông Số Kỹ Thuật Đầy Đủ**: Màn hình, chip xử lý, RAM, camera, pin sạc, chuẩn kháng nước IP68/IP54.

### 3. 🤖 Trợ Lý CyberBot Pro Chuyên Sâu
- **Ma trận So Sánh Thiết Bị**: Tự động lập bảng so sánh chi tiết khi khách hỏi:
  - *"So sánh iPhone 16 Pro Max và Galaxy S24 Ultra"*
  - *"Nên mua MacBook Pro M3 hay ASUS ROG Zephyrus G16"*
  - *"So sánh tai nghe Sony WH-1000XM5 và AirPods Pro 2"*
- **Tư Vấn Ngành Nghề & Use-case**: Nhận diện tức thời nhu cầu của *Lập trình viên CNTT, Dân đồ họa 3D kiến trúc, Game thủ AAA, Dân văn phòng công thái học*.
- **Thẻ Sản Phẩm Tương Tác**: Hiển thị ảnh, giá, nút `Xem` và `+ Giỏ` trực tiếp trong tin nhắn bot.
- **Giao Tiếp Giọng Nói 2 Chiều**: Micro nhận diện giọng nói tiếng Việt (Web Speech API) và nút đọc to câu trả lời.
- **Xóa Lịch Sử & Làm Mới**: Nút dọn dẹp hội thoại để bắt đầu phiên tư vấn mới.

### 4. 🛒 Giỏ Hàng & Thanh Toán VietQR Tự Động
- **Thanh Tiến Trình Freeship Hỏa Tốc 2H**: Hiển thị phần trăm và số tiền cần mua thêm để được miễn phí vận chuyển.
- **Mã Khuyến Mãi Độc Quyền**:
  - `TECHAI10`: Giảm 10% (tối đa 500.000đ)
  - `FREESHIP`: Miễn phí ship toàn quốc
  - `VIPTECH`: Giảm 15% (tối đa 1.000.000đ)
- **Quét Mã VietQR Napas 24/7**: Tự động sinh mã QR đúng số tiền và nội dung chuyển khoản bảo mật.
- **In Hóa Đơn Trực Tiếp**: Hỗ trợ in hóa đơn xuất kho ngay khi hoàn tất đơn hàng.

---

## 📁 Cấu Trúc Mã Nguồn

```
App di động/
├── index.html              # Giao diện chính hoàn chỉnh (Responsive, Modal, Banner, Flash Deal)
├── css/
│   └── style.css           # Styling tinh tế, Glassmorphism, animations, mobile bottom navigation
├── js/
│   ├── products.js         # Dữ liệu sản phẩm, biến thể màu sắc/dung lượng, thông số specs & reviews
│   ├── ai-consultant.js    # CyberBot Pro (Ma trận so sánh, NLP ngân sách, Gemini API fallback)
│   ├── cart.js             # Quản lý giỏ hàng biến thể, thanh freeship, âm thanh phản hồi & đơn hàng
│   └── app.js              # Controller điều phối UI, modal gallery, lọc đa tiêu chí, đếm ngược deal
├── server.ps1              # Local Web Server phục vụ test trên mạng nội bộ không cần Admin
├── start-server.bat        # Nhấp đúp chuột để bật server test cho điện thoại iOS & Android
└── README.md               # Tài liệu hướng dẫn sử dụng
```

---

## 🚀 Cách Chạy & Kiểm Tra Trên Điện Thoại

### 1. Trên máy tính PC:
- Nhấp đúp vào file [**index.html**](file:///c:/Users/ADMIN/Downloads/App%20di%20%C4%91%E1%BB%99ng/index.html) để mở trực tiếp trên Chrome hoặc Edge.

### 2. Trên điện thoại iOS (iPhone) & Android:
- Nhấp đúp vào file [**start-server.bat**](file:///c:/Users/ADMIN/Downloads/App%20di%20%C4%91%E1%BB%99ng/start-server.bat).
- Mở trình duyệt Safari trên iPhone hoặc Chrome trên Android, truy cập vào địa chỉ IP được hiển thị (ví dụ: `http://10.12.5.136:5000`).
