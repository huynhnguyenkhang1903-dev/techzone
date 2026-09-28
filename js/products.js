// ========================================================
// TECHZONE - DATABASE SẢN PHẨM & CẤU HÌNH HỆ THỐNG CAO CẤP
// ========================================================

const PRODUCTS_DATA = [
  {
    id: "sp-01",
    name: "iPhone 16 Pro Max 256GB - Titan Tự Nhiên",
    category: "phone",
    categoryName: "Điện thoại",
    brand: "Apple",
    price: 34990000,
    originalPrice: 36990000,
    discount: 5,
    rating: 4.9,
    reviewsCount: 168,
    isHot: true,
    isNew: true,
    inStock: true,
    stockCount: 18,
    colors: [
      { name: "Titan Tự Nhiên", hex: "#9a958e" },
      { name: "Titan Sa Mạc", hex: "#c9b49b" },
      { name: "Titan Trắng", hex: "#f2f2f2" },
      { name: "Titan Đen", hex: "#3b3b3d" }
    ],
    storageOptions: [
      { size: "256GB", price: 34990000 },
      { size: "512GB", price: 40990000 },
      { size: "1TB", price: 46990000 }
    ],
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Đỉnh cao công nghệ với vi xử lý A18 Pro, nút Camera Control thế hệ mới và viền Titan siêu mỏng 6.9 inch.",
    fullDesc: "iPhone 16 Pro Max sở hữu màn hình Super Retina XDR 6.9 inch lớn nhất từng có với tần số quét 120Hz ProMotion. Thiết kế khung Titan cấp 5 siêu nhẹ và bền bỉ. Nút Camera Control chuyên dụng mang lại thao tác nhiếp ảnh nhanh như máy ảnh cơ chuyên nghiệp. Chip A18 Pro hỗ trợ đầy đủ các tác vụ Apple Intelligence AI thế hệ mới.",
    specs: {
      "Màn hình": "6.9\" Super Retina XDR OLED, 120Hz ProMotion, 2000 nits",
      "Vi xử lý": "Apple A18 Pro 3nm (6-core CPU, 6-core GPU, 16-core NPU)",
      "RAM & Bộ nhớ": "8GB RAM | 256GB / 512GB / 1TB NVMe",
      "Camera sau": "Chính 48MP Fusion + Siêu rộng 48MP + Tele 12MP (Zoom quang 5x)",
      "Camera trước": "12MP TrueDepth tự động lấy nét",
      "Pin & Sạc": "Xem video 33 giờ, sạc nhanh MagSafe 25W, Type-C USB 3",
      "Chống nước & Bụi": "IP68 (sâu 6m trong 30 phút)",
      "Hệ điều hành": "iOS 18 (Hỗ trợ Apple Intelligence)",
      "Bảo hành": "12 tháng chính hãng Apple VN (1 đổi 1 trong 30 ngày)"
    },
    reviews: [
      { author: "Trần Anh Khoa", rating: 5, date: "15/09/2026", comment: "Máy dùng mượt kinh ngạc, nút Camera Control chụp siêu nhạy. Đóng gói cẩn thận, giao hỏa tốc 2h chuẩn chỉ." },
      { author: "Lê Minh Thảo", rating: 5, date: "10/09/2026", comment: "Màu Titan tự nhiên sang trọng cực kỳ. Pin dùng cả ngày dài vẫn còn hơn 35%." }
    ],
    tags: ["apple", "iphone", "iphone 16", "flagship", "camera đẹp", "pin trâu", "titan", "ios", "chụp ảnh", "sang trọng"]
  },
  {
    id: "sp-02",
    name: "Samsung Galaxy S24 Ultra 5G 12GB/256GB",
    category: "phone",
    categoryName: "Điện thoại",
    brand: "Samsung",
    price: 28490000,
    originalPrice: 33990000,
    discount: 16,
    rating: 4.8,
    reviewsCount: 245,
    isHot: true,
    isNew: false,
    inStock: true,
    stockCount: 24,
    colors: [
      { name: "Titan Đen", hex: "#2b2b2c" },
      { name: "Titan Xám", hex: "#83827d" },
      { name: "Titan Tím", hex: "#635870" },
      { name: "Titan Vàng", hex: "#e5d8b8" }
    ],
    storageOptions: [
      { size: "256GB", price: 28490000 },
      { size: "512GB", price: 32490000 },
      { size: "1TB", price: 38990000 }
    ],
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Quyền năng Galaxy AI toàn diện, màn hình kính chống lóa phẳng hoàn toàn cùng camera mắt thần 200MP.",
    fullDesc: "Galaxy S24 Ultra dẫn đầu kỷ nguyên trí tuệ nhân tạo di động với tính năng Khoanh vùng tìm kiếm (Circle to Search), dịch cuộc gọi trực tiếp hai chiều theo thời gian thực và trợ lý tóm tắt ghi chú. Kính cường lực Corning Gorilla Armor chống lóa tới 75% cho trải nghiệm ngoài trời vượt trội.",
    specs: {
      "Màn hình": "6.8\" Dynamic AMOLED 2X, QHD+, 120Hz thích ứng, 2600 nits",
      "Vi xử lý": "Snapdragon 8 Gen 3 for Galaxy (4nm)",
      "RAM & Bộ nhớ": "12GB LPDDR5X | 256GB UFS 4.0",
      "Camera sau": "200MP + 50MP (Zoom quang 5x) + 12MP Siêu rộng + 10MP (Zoom quang 3x)",
      "Bút cảm ứng": "S-Pen tích hợp Bluetooth điều khiển từ xa",
      "Pin & Sạc": "5000 mAh, sạc nhanh 45W, sạc không dây 15W",
      "Bảo hành": "12 tháng chính hãng Samsung Việt Nam"
    },
    reviews: [
      { author: "Nguyễn Hải Đăng", rating: 5, date: "18/09/2026", comment: "Bút S-Pen quá tiện để ký tài liệu và ghi chú công việc. AI dịch cuộc gọi cực kỳ chính xác!" }
    ],
    tags: ["samsung", "s24 ultra", "galaxy ai", "bút spen", "chụp ảnh zoom", "android", "gaming", "pin trâu"]
  },
  {
    id: "sp-03",
    name: "MacBook Pro 14 M3 Pro (18GB Unified RAM / 512GB SSD)",
    category: "laptop",
    categoryName: "Laptop",
    brand: "Apple",
    price: 48990000,
    originalPrice: 52990000,
    discount: 8,
    rating: 5.0,
    reviewsCount: 92,
    isHot: true,
    isNew: true,
    inStock: true,
    stockCount: 10,
    colors: [
      { name: "Space Black", hex: "#1d1f22" },
      { name: "Silver", hex: "#e3e4e6" }
    ],
    storageOptions: [
      { size: "512GB SSD", price: 48990000 },
      { size: "1TB SSD", price: 54990000 }
    ],
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Vũ khí tối thượng cho lập trình viên và creator: Chip M3 Pro, màn hình XDR 120Hz và pin 18 giờ.",
    fullDesc: "Được thiết kế cho các tác vụ biên dịch mã nguồn phức tạp, render 3D và chỉnh sửa video ProRes 8K đa luồng. Vỏ nhôm nguyên khối Space Black phủ lớp anod hóa chống bám dấu vân tay. Hệ thống 6 loa âm thanh vòm Dolby Atmos chuẩn phòng thu.",
    specs: {
      "Màn hình": "14.2\" Liquid Retina XDR (3024 x 1964), 120Hz ProMotion, 1600 nits đỉnh",
      "Vi xử lý (CPU)": "Apple M3 Pro (11 nhân CPU, 14 nhân GPU, Ray Tracing phần cứng)",
      "Bộ nhớ RAM": "18GB Unified Memory băng thông 150GB/s",
      "Ổ cứng": "512GB SSD siêu tốc đọc ghi 5000MB/s",
      "Cổng giao tiếp": "3x Thunderbolt 4, HDMI, khe thẻ SDXC, MagSafe 3, Jack 3.5mm",
      "Thời lượng pin": "Lên tới 18 giờ liên tục",
      "Trọng lượng": "1.61 kg",
      "Bảo hành": "12 tháng chính hãng Apple Care"
    },
    reviews: [
      { author: "Vũ Quang Huy (Senior Coder)", rating: 5, date: "22/09/2026", comment: "Build dự án Docker và Android Studio cực nhanh, máy mát rượi gần như quạt không thèm quay. Quá đáng tiền!" }
    ],
    tags: ["macbook", "m3 pro", "laptop lập trình", "laptop đồ họa", "apple", "pin trâu", "mỏng nhẹ", "sang trọng", "it", "coder"]
  },
  {
    id: "sp-04",
    name: "Laptop Gaming ASUS ROG Zephyrus G16 (RTX 4070 / Core Ultra 9)",
    category: "laptop",
    categoryName: "Laptop",
    brand: "Asus",
    price: 54990000,
    originalPrice: 59990000,
    discount: 8,
    rating: 4.9,
    reviewsCount: 78,
    isHot: true,
    isNew: true,
    inStock: true,
    stockCount: 8,
    colors: [
      { name: "Eclipse Gray", hex: "#3e424b" },
      { name: "Platinum White", hex: "#e6e8ea" }
    ],
    storageOptions: [
      { size: "32GB RAM / 1TB SSD", price: 54990000 }
    ],
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Cỗ máy gaming đỉnh cao siêu mỏng 1.49cm với màn OLED 2.5K 240Hz sắc nét và card đồ họa RTX 4070.",
    fullDesc: "ROG Zephyrus G16 kết hợp giữa tính cơ động của ultrabook cao cấp và sức mạnh của máy trạm đồ họa. Khung vỏ nhôm CNC nguyên khối tinh xảo, dải đèn Slash Lighting cá tính. Tích hợp NPU AI tăng tốc thuật toán DLSS 3.5 và tạo ảnh AI.",
    specs: {
      "Màn hình": "16\" OLED ROG Nebula 2.5K (2560x1600), 240Hz/0.2ms, 100% DCI-P3, G-Sync",
      "CPU": "Intel Core Ultra 9 185H (16 nhân 22 luồng, xung nhịp tới 5.1GHz, AI Boost)",
      "Card đồ họa (VGA)": "NVIDIA GeForce RTX 4070 8GB GDDR6 (105W TGP)",
      "RAM & Ổ cứng": "32GB LPDDR5X 7467MHz | 1TB SSD PCIe 4.0 NVMe",
      "Tản nhiệt": "Buồng hơi Vapor Chamber + 3 quạt Arc Flow Fans 2.0 kim loại",
      "Trọng lượng": "1.85 kg (độ dày 1.49 cm)",
      "Bảo hành": "24 tháng chính hãng ASUS VIP tận nhà"
    },
    reviews: [
      { author: "Đỗ Gia Bảo", rating: 5, date: "12/09/2026", comment: "Chiến Black Myth Wukong và Cyberpunk 2077 bật Ray Tracing mượt 100+ FPS. Màn OLED đẹp tê tái." }
    ],
    tags: ["asus", "rog", "gaming", "laptop gaming", "rtx 4070", "intel core ultra", "đồ họa 3d", "chơi game nặng", "oled"]
  },
  {
    id: "sp-05",
    name: "Tai nghe chống ồn không dây Sony WH-1000XM5",
    category: "audio",
    categoryName: "Tai nghe & Loa",
    brand: "Sony",
    price: 6890000,
    originalPrice: 8490000,
    discount: 19,
    rating: 4.9,
    reviewsCount: 340,
    isHot: true,
    isNew: false,
    inStock: true,
    stockCount: 30,
    colors: [
      { name: "Đen Nhám", hex: "#1c1c1e" },
      { name: "Bạc Ánh Kim", hex: "#d8d3c5" },
      { name: "Xanh Midnight", hex: "#1f2937" }
    ],
    storageOptions: [
      { size: "Bản Tiêu Chuẩn", price: 6890000 }
    ],
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Vua chống ồn chủ động (ANC) thế giới với 2 bộ xử lý, 8 micro và chất âm Hi-Res chuẩn phòng thu.",
    fullDesc: "Sony WH-1000XM5 chặn đứng mọi tiếng ồn từ động cơ máy bay, tiếng văn phòng hay âm thanh đường phố. Tự động tối ưu hóa chống ồn theo môi trường xung quanh (Auto NC Optimizer). Cảm ứng vuốt chạm trực quan trên củ tai, đệm da mềm mại không gây đau tai.",
    specs: {
      "Chống ồn ANC": "Chip kép Sony Integrated Processor V1 + HD QN1, 8 micro định hướng",
      "Thời lượng pin": "30 giờ (bật ANC), 40 giờ (tắt ANC), sạc 3 phút dùng 3 giờ",
      "Chất âm": "Màng loa carbon 30mm, Hi-Res Audio Wireless, LDAC, DSEE Extreme",
      "Tính năng": "Speak-to-Chat tự ngắt nhạc khi nói, kết nối 2 thiết bị đồng thời",
      "Trọng lượng": "250g cực nhẹ",
      "Bảo hành": "12 tháng chính hãng Sony Việt Nam"
    },
    reviews: [
      { author: "Hoàng Yến", rating: 5, date: "24/09/2026", comment: "Đeo lên máy bay là như bước sang thế giới khác, êm tai không bị ù bí. Đàm thoại rõ mồn một." }
    ],
    tags: ["sony", "tai nghe", "chống ồn", "anc", "wh-1000xm5", "nghe nhạc", "làm việc", "bluetooth", "âm thanh hay"]
  },
  {
    id: "sp-06",
    name: "Tai nghe Apple AirPods Pro (Gen 2) Type-C MagSafe",
    category: "audio",
    categoryName: "Tai nghe & Loa",
    brand: "Apple",
    price: 5290000,
    originalPrice: 6190000,
    discount: 15,
    rating: 4.8,
    reviewsCount: 460,
    isHot: true,
    isNew: false,
    inStock: true,
    stockCount: 42,
    colors: [
      { name: "Trắng Bóng", hex: "#ffffff" }
    ],
    storageOptions: [
      { size: "Hộp Sạc Type-C", price: 5290000 }
    ],
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Chip H2 nâng cấp khả năng chống ồn gấp 2 lần, âm thanh thích ứng và cổng sạc USB-C tiện lợi.",
    fullDesc: "AirPods Pro Gen 2 trang bị tính năng Âm thanh thích ứng (Adaptive Audio) tự động pha trộn giữa Chống ồn chủ động và Chế độ Xuyên âm tùy thuộc vào môi trường của bạn. Hộp sạc tích hợp chip U1 tìm kiếm chính xác qua ứng dụng Find My.",
    specs: {
      "Vi xử lý": "Apple H2 trong tai nghe, Apple U1 trong hộp sạc",
      "Chống ồn & Xuyên âm": "Active Noise Cancellation gấp đôi thế hệ trước, Personalized Spatial Audio",
      "Kháng nước bụi": "IP54 cho cả tai nghe và hộp sạc",
      "Thời lượng pin": "6 giờ nghe liên tục (bật ANC), tổng 30 giờ cùng hộp sạc",
      "Cổng sạc": "USB-C, MagSafe, sạc Apple Watch",
      "Bảo hành": "12 tháng Apple VN chính hãng"
    },
    reviews: [
      { author: "Phạm Tuấn Anh", rating: 5, date: "05/09/2026", comment: "Kết nối siêu mượt với iPhone và MacBook. Chống ồn tốt hơn hẳn Gen 1." }
    ],
    tags: ["apple", "airpods pro 2", "tai nghe bluetooth", "nhỏ gọn", "chống ồn", "ios", "iphone"]
  },
  {
    id: "sp-07",
    name: "Chuột không dây công thái học Logitech MX Master 3S",
    category: "accessory",
    categoryName: "Phụ kiện",
    brand: "Logitech",
    price: 2190000,
    originalPrice: 2490000,
    discount: 12,
    rating: 4.9,
    reviewsCount: 540,
    isHot: true,
    isNew: false,
    inStock: true,
    stockCount: 55,
    colors: [
      { name: "Graphite", hex: "#2b2b2b" },
      { name: "Pale Gray", hex: "#e0e0e0" }
    ],
    storageOptions: [
      { size: "Bản Tiêu Chuẩn", price: 2190000 }
    ],
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Chuột công thái học huyền thoại cho dân lập trình và văn phòng với cú click êm ái 90% Quiet Clicks.",
    fullDesc: "Con lăn MagSpeed bằng thép gia công cuộn 1000 dòng trong 1 giây mà vẫn chuẩn xác đến từng pixel. Cảm biến 8.000 DPI dùng tốt trên mọi mặt kính trong suốt. Công nghệ Logitech Flow chuyển file và con trỏ mượt mà giữa 3 máy tính khác nhau.",
    specs: {
      "Cảm biến": "Darkfield độ chính xác cao 8000 DPI (hoạt động tốt trên kính)",
      "Con lăn": "MagSpeed siêu nhanh bằng thép gia công có Smartshift",
      "Kết nối": "Bluetooth Low Energy & Đầu thu Logi Bolt USB",
      "Pin": "Sạc đầy dùng 70 ngày, sạc nhanh USB-C 1 phút dùng 3 giờ",
      "Số nút": "7 nút bấm tùy biến chức năng qua Logi Options+",
      "Bảo hành": "12 tháng chính hãng Logitech VN"
    },
    reviews: [
      { author: "Đặng Tuấn Kiệt", rating: 5, date: "16/09/2026", comment: "Dùng em này xong không muốn cầm lại chuột khác. Đỡ hẳn đau mỏi cổ tay sau 8 tiếng làm việc." }
    ],
    tags: ["logitech", "mx master 3s", "chuột công thái học", "văn phòng", "lập trình", "chuột không dây", "phụ kiện"]
  },
  {
    id: "sp-08",
    name: "Bàn phím cơ Custom Keychron Q1 Pro QMK/VIA Không Dây",
    category: "accessory",
    categoryName: "Phụ kiện",
    brand: "Keychron",
    price: 4390000,
    originalPrice: 4890000,
    discount: 10,
    rating: 4.9,
    reviewsCount: 130,
    isHot: false,
    isNew: true,
    inStock: true,
    stockCount: 15,
    colors: [
      { name: "Carbon Black", hex: "#1f2124" },
      { name: "Silver Grey", hex: "#6c727a" },
      { name: "Shell White", hex: "#f0f2f5" }
    ],
    storageOptions: [
      { size: "Red Switch (Êm)", price: 4390000 },
      { size: "Banana Switch (Tactile)", price: 4390000 }
    ],
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Vỏ nhôm CNC nguyên khối, mạch xuôi Hotswap, hỗ trợ kết nối Bluetooth 5.1 và tùy biến layout qua VIA.",
    fullDesc: "Thiết kế Double-Gasket mount mang lại cảm giác gõ đầm tay, âm thanh thocky trầm ấm gây nghiện. Keycap KSA profile bằng nhựa PBT doubleshot siêu bền. Tương thích hoàn hảo cả macOS và Windows chỉ với một gạt switch.",
    specs: {
      "Layout": "75% nhỏ gọn (81 phím + núm xoay kim loại)",
      "Chất liệu": "Nhôm nguyên khối CNC 6063",
      "Switch": "Keychron K Pro Red / Banana Hotswap",
      "Kết nối": "Bluetooth 5.1 (3 thiết bị) + Type-C có dây 1000Hz",
      "Dung lượng pin": "4000 mAh (dùng đến 300 giờ không đèn)",
      "Bảo hành": "12 tháng chính hãng"
    },
    reviews: [
      { author: "Trần Thế Vinh", rating: 5, date: "14/09/2026", comment: "Gõ đầm và êm không tưởng, build nhôm nặng 1.7kg chắc nịch như tảng đá. Dân coder gõ sướng tê tay." }
    ],
    tags: ["keychron", "bàn phím cơ", "custom keyboard", "nhôm nguyên khối", "lập trình", "gaming", "hotswap", "bluetooth"]
  },
  {
    id: "sp-09",
    name: "Apple Watch Ultra 2 GPS + Cellular 49mm Vỏ Titan",
    category: "accessory",
    categoryName: "Phụ kiện",
    brand: "Apple",
    price: 20990000,
    originalPrice: 22490000,
    discount: 7,
    rating: 4.8,
    reviewsCount: 95,
    isHot: true,
    isNew: true,
    inStock: true,
    stockCount: 12,
    colors: [
      { name: "Titan Tự Nhiên", hex: "#a4a19a" },
      { name: "Titan Đen Mới", hex: "#222326" }
    ],
    storageOptions: [
      { size: "Dây Trail Loop", price: 20990000 },
      { size: "Dây Alpine Loop", price: 20990000 }
    ],
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Màn hình sáng kỷ lục 3000 nits, vỏ titan siêu bền, chuẩn lặn 40m và tính năng Double Tap chạm ngón tay.",
    fullDesc: "Thiết bị đồng hành tối thượng cho các vận động viên thể thao mạo hiểm và phượt thủ. Định vị GPS tần số kép chính xác trong rừng rậm hay đô thị cao tầng, cảm biến đo độ sâu, còi báo động khẩn cấp 86dB có thể nghe thấy ở khoảng cách 180m.",
    specs: {
      "Kích thước & Vỏ": "49mm Titan hàng không vũ trụ",
      "Màn hình": "Sapphire Crystal Retina, độ sáng tối đa 3000 nits",
      "Thời lượng pin": "36 giờ sử dụng bình thường, 72 giờ chế độ tiết kiệm",
      "Cảm biến": "Đo nhịp tim ECG, SpO2, đo nhiệt độ cơ thể, độ sâu lặn",
      "Kháng nước": "WR100 (lặn biển sâu 40m)",
      "Bảo hành": "12 tháng Apple VN"
    },
    reviews: [
      { author: "Hoàng Nam", rating: 5, date: "11/09/2026", comment: "Pin dùng 3 ngày thoải mái, GPS chạy bộ bắt cực nhanh. Thao tác gõ 2 ngón tay chạm nghe cuộc gọi siêu ngầu." }
    ],
    tags: ["apple watch", "ultra 2", "smartwatch", "đồng hồ thông minh", "thể thao", "titan", "chống nước", "gps"]
  },
  {
    id: "sp-10",
    name: "Sạc dự phòng Anker 737 Power Bank (PowerCore 24K 140W)",
    category: "accessory",
    categoryName: "Phụ kiện",
    brand: "Anker",
    price: 2890000,
    originalPrice: 3490000,
    discount: 17,
    rating: 4.9,
    reviewsCount: 410,
    isHot: false,
    isNew: false,
    inStock: true,
    stockCount: 35,
    colors: [
      { name: "Đen Carbon", hex: "#1a1a1a" }
    ],
    storageOptions: [
      { size: "24.000mAh / 140W", price: 2890000 }
    ],
    image: "https://images.unsplash.com/photo-1609592426508-cc02150e41ac?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609592426508-cc02150e41ac?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Công suất khủng 140W chuẩn PD 3.1 sạc được cho cả MacBook Pro, dung lượng 24.000mAh tích hợp màn hình màu thông minh.",
    fullDesc: "Hiển thị công suất sạc vào/ra thời gian thực, ước tính thời gian đầy pin và nhiệt độ máy. Cho phép sạc đồng thời 3 thiết bị với tốc độ tối đa.",
    specs: {
      "Dung lượng": "24.000 mAh (86.4Wh)",
      "Công suất đầu ra": "140W Max (hỗ trợ PD 3.1)",
      "Cổng sạc": "2 x USB-C (140W), 1 x USB-A (18W)",
      "Màn hình": "Màn hình kỹ thuật số Smart Digital Display",
      "Bảo hành": "18 tháng đổi mới Anker VN"
    },
    reviews: [
      { author: "Đinh Xuân Bách", rating: 5, date: "08/09/2026", comment: "Sạc cho MacBook Pro M3 ngon lành như cắm ổ điện tường. Màn hình báo watt nhảy số nhìn rất thích." }
    ],
    tags: ["anker", "sạc dự phòng", "140w", "macbook", "phụ kiện", "sạc nhanh", "pin dự phòng"]
  },
  {
    id: "sp-11",
    name: "Màn hình đồ họa Dell UltraSharp U2724DE 27\" 2K 120Hz IPS Black",
    category: "smarthome",
    categoryName: "Thiết bị thông minh",
    brand: "Dell",
    price: 11990000,
    originalPrice: 13500000,
    discount: 11,
    rating: 4.9,
    reviewsCount: 88,
    isHot: true,
    isNew: true,
    inStock: true,
    stockCount: 14,
    colors: [
      { name: "Bạc Platinum", hex: "#d1d5db" }
    ],
    storageOptions: [
      { size: "27 inch QHD 120Hz", price: 11990000 }
    ],
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Tấm nền IPS Black tương phản 2000:1, tần số quét mượt mà 120Hz cùng cổng Thunderbolt / Type-C 90W sạc laptop.",
    fullDesc: "Chuẩn màu 98% DCI-P3 phục vụ đồ họa in ấn và chỉnh sửa video cao cấp. Tích hợp Hub kết nối RJ45 mạng LAN Gigabit, KVM thông minh điều khiển 2 máy tính cùng 1 bộ chuột bàn phím.",
    specs: {
      "Kích thước & Độ phân giải": "27 inch QHD (2560 x 1440) IPS Black, 120Hz",
      "Độ tương phản": "2.000:1 (sắc đen sâu hơn 35% so với IPS thường)",
      "Độ bao phủ màu": "100% sRGB, 98% Display P3, Delta E < 2",
      "Cổng xuất hình & cấp nguồn": "Thunderbolt 4 / Type-C 90W, DP 1.4, HDMI, RJ45",
      "Bảo hành": "36 tháng chính hãng Dell tận nơi"
    },
    reviews: [
      { author: "Hồ Quốc Thắng", rating: 5, date: "02/09/2026", comment: "Chuẩn màu làm Photoshop và Premiere không chê vào đâu được. Cắm 1 sợi Type-C là vừa sạc 90W vừa xuất hình cho laptop." }
    ],
    tags: ["dell", "ultrasharp", "màn hình đồ họa", "ips black", "2k 120hz", "làm việc", "type-c"]
  },
  {
    id: "sp-12",
    name: "Loa Bluetooth di động Marshall Emberton II (Kháng nước IP67)",
    category: "audio",
    categoryName: "Tai nghe & Loa",
    brand: "Marshall",
    price: 3690000,
    originalPrice: 4290000,
    discount: 14,
    rating: 4.8,
    reviewsCount: 195,
    isHot: false,
    isNew: false,
    inStock: true,
    stockCount: 22,
    colors: [
      { name: "Black & Brass", hex: "#1c1b18" },
      { name: "Cream", hex: "#ede7d8" }
    ],
    storageOptions: [
      { size: "Bản Tiêu Chuẩn", price: 3690000 }
    ],
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Thiết kế vintage cổ điển quý tộc, âm thanh đa hướng True Stereophonic 360 độ và pin hơn 30 giờ.",
    fullDesc: "Trang bị chuẩn kháng bụi kháng nước chuẩn IP67 thách thức mọi thời tiết dã ngoại, tiệc hồ bơi. Chế độ Stack Mode ghép nối nhiều loa Emberton II cùng phát nhạc tạo không gian tiệc tùng bùng nổ.",
    specs: {
      "Công suất": "2 x 10W Class D Amplifier",
      "Âm thanh": "Stereo 360 độ độc quyền Marshall",
      "Thời lượng pin": "30+ giờ chơi nhạc liên tục",
      "Kháng nước": "Chuẩn IP67 ngâm nước 1 mét trong 30 phút",
      "Trọng lượng": "0.7 kg",
      "Bảo hành": "12 tháng chính hãng ASH"
    },
    reviews: [
      { author: "Kim Ngân", rating: 5, date: "29/08/2026", comment: "Âm bass ấm, mid ngọt nghe nhạc acoustic và chill cực hợp. Để trên bàn làm việc decor rất đẹp." }
    ],
    tags: ["marshall", "loa bluetooth", "loa mini", "cổ điển", "nghe nhạc", "âm thanh hay", "pin trâu"]
  }
];

// Chính sách & Thông tin hỗ trợ khách hàng của cửa hàng
const STORE_POLICIES = {
  storeName: "TECHZONE - Thế Giới Công Nghệ & AI",
  hotline: "1900 6868 (Miễn phí 8:00 - 22:00)",
  address: "Tầng 5, Tòa nhà TechTower, 123 Phố Đổi Mới, Hà Nội / TP.HCM",
  warranty: "Bảo hành 1 đổi 1 trong 30 ngày đầu tiên nếu phát sinh lỗi từ nhà sản xuất. Hỗ trợ bảo hành chính hãng từ 12 - 36 tháng tùy sản phẩm.",
  shipping: "Miễn phí giao hàng hỏa tốc trong 2 giờ tại nội thành Hà Nội & TP.HCM cho đơn từ 2.000.000đ. Giao hàng toàn quốc từ 1-3 ngày làm việc.",
  payment: "Hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng và các cổng thanh toán online, thanh toán khi nhận hàng (COD), chuyển khoản quét mã QR (VietQR / MoMo).",
  returnPolicy: "Đổi trả miễn phí 7 ngày không cần lý do đối với sản phẩm còn nguyên seal hộp."
};

// Mã giảm giá hợp lệ
const PROMO_CODES = {
  "TECHAI10": { discountPercent: 10, maxDiscount: 500000, minOrder: 1000000, desc: "Giảm 10% tối đa 500k cho đơn từ 1 triệu" },
  "FREESHIP": { discountPercent: 0, fixedDiscount: 30000, minOrder: 0, desc: "Miễn phí vận chuyển toàn quốc (trừ 30.000đ)" },
  "VIPTECH": { discountPercent: 15, maxDiscount: 1000000, minOrder: 5000000, desc: "Ưu đãi thành viên VIP: Giảm 15% tối đa 1 triệu cho đơn từ 5 triệu" }
};

// Gắn toàn cục window để truy cập an toàn mọi nơi
window.PRODUCTS_DATA = PRODUCTS_DATA;
window.STORE_POLICIES = STORE_POLICIES;
window.PROMO_CODES = PROMO_CODES;

