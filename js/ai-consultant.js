// ========================================================
// TECHZONE - TRỢ LÝ AI TƯ VẤN BÁN HÀNG CYBERBOT PRO (V2)
// Hệ thống AI Dual-Engine:
// 1. Smart Local NLP Engine: So sánh thiết bị, bóc tách ngân sách, tư vấn theo ngành nghề
// 2. Live Cloud LLM: Kết nối Google Gemini API trực tiếp với fallback tự động
// ========================================================

class AIConsultant {
  constructor() {
    this.apiKey = localStorage.getItem("techzone_gemini_api_key") || "";
    this.customModel = localStorage.getItem("techzone_gemini_model") || "gemini-1.5-flash";
    this.conversationHistory = [];
    this.isProcessing = false;
    this.useLiveApi = Boolean(this.apiKey);
  }

  // Âm thanh bot phản hồi (Web Audio API Synthesizer)
  playBotChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08); // A5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.22);
    } catch (e) {
      // Ignore
    }
  }

  setApiKey(key, model = "gemini-1.5-flash") {
    this.apiKey = key.trim();
    this.customModel = model;
    if (this.apiKey) {
      localStorage.setItem("techzone_gemini_api_key", this.apiKey);
      localStorage.setItem("techzone_gemini_model", this.customModel);
      this.useLiveApi = true;
    } else {
      localStorage.removeItem("techzone_gemini_api_key");
      this.useLiveApi = false;
    }
  }

  getInitialWelcome() {
    return {
      text: `Xin chào quý khách! Tôi là **CyberBot Pro** 🤖 - Chuyên gia AI tư vấn công nghệ tại **${STORE_POLICIES.storeName}**.\n\nTôi có thể hỗ trợ bạn ngay lập tức:\n- 🎯 **Tư vấn cấu hình theo nhu cầu thực tế** (Lập trình CNTT, Đồ họa 3D, Gaming hay Văn phòng)\n- 💰 **Lọc sản phẩm tối ưu theo ngân sách** (VD: *\"Tìm laptop 30-50 triệu\"* hoặc *\"Tai nghe dưới 6 triệu\"*)\n- ⚖️ **So sánh thông số chuyên sâu** giữa các siêu phẩm (iPhone 16 Pro Max vs S24 Ultra, MacBook vs ROG...)\n- 🎁 **Cung cấp mã giảm giá độc quyền & hướng dẫn trả góp 0%**\n\nBạn đang quan tâm đến sản phẩm nào để tôi hỗ trợ nhé?`,
      recommendations: [
        PRODUCTS_DATA.find(p => p.id === "sp-01"),
        PRODUCTS_DATA.find(p => p.id === "sp-03"),
        PRODUCTS_DATA.find(p => p.id === "sp-05")
      ].filter(Boolean),
      quickReplies: [
        "🔥 Siêu phẩm bán chạy nhất hôm nay",
        "💻 Laptop cho dân IT & lập trình viên",
        "⚖️ So sánh iPhone 16 Pro Max vs S24 Ultra",
        "🎧 Tai nghe chống ồn văn phòng",
        "🎁 Lấy mã giảm giá hôm nay"
      ]
    };
  }

  async processMessage(userMessage) {
    if (this.isProcessing) return null;
    this.isProcessing = true;

    const trimmedMsg = userMessage.trim();
    this.conversationHistory.push({ role: "user", text: trimmedMsg });

    let response;

    // Nếu có API Key Gemini, ưu tiên gọi Cloud LLM
    if (this.useLiveApi && this.apiKey) {
      try {
        response = await this.queryGeminiLive(trimmedMsg);
      } catch (err) {
        console.warn("Lỗi khi kết nối Gemini Cloud, tự động chuyển về Smart Local AI Engine:", err);
        response = this.queryLocalAIEngine(trimmedMsg);
        response.text = `*(Chuyển về chế độ Smart Local AI Engine)*\n\n` + response.text;
      }
    } else {
      await new Promise(resolve => setTimeout(resolve, 380));
      response = this.queryLocalAIEngine(trimmedMsg);
    }

    this.playBotChime();
    this.conversationHistory.push({ role: "assistant", text: response.text });
    this.isProcessing = false;
    return response;
  }

  // =========================================================================
  // SMART LOCAL NLP ENGINE CAO CẤP (Xử lý tiếng Việt & so sánh chuyên sâu)
  // =========================================================================
  queryLocalAIEngine(text) {
    const raw = text.toLowerCase();

    // 1. KỊCH BẢN SO SÁNH SẢN PHẨM TRỰC TIẾP
    const isCompare = raw.includes("so sánh") || raw.includes("vs") || raw.includes("khác gì") || raw.includes("nên mua") || raw.includes("chọn con nào");

    // So sánh: iPhone 16 Pro Max vs Samsung Galaxy S24 Ultra
    if (isCompare && ((raw.includes("iphone") && raw.includes("s24")) || (raw.includes("apple") && raw.includes("samsung")))) {
      const p1 = PRODUCTS_DATA.find(p => p.id === "sp-01");
      const p2 = PRODUCTS_DATA.find(p => p.id === "sp-02");
      return {
        text: `⚖️ **So Sánh Chuyên Sâu: iPhone 16 Pro Max vs Galaxy S24 Ultra**\n\n` +
              `| Tiêu chí | iPhone 16 Pro Max | Galaxy S24 Ultra |\n` +
              `| :--- | :--- | :--- |\n` +
              `| **Màn hình** | 6.9" OLED Super Retina XDR (120Hz) | 6.8" Dynamic AMOLED 2X Chống lóa |\n` +
              `| **Hiệu năng** | Apple A18 Pro (Mạnh nhất CPU đơn nhân) | Snapdragon 8 Gen 3 for Galaxy |\n` +
              `| **Camera** | 48MP, Zoom quang 5x, Camera Control cơ | 200MP, Zoom quang 5x/10x, Space Zoom 100x |\n` +
              `| **Điểm nhấn** | Hệ sinh thái iOS, Apple Intelligence | Bút S-Pen, Galaxy AI dịch trực tiếp |\n\n` +
              `💡 **Lời khuyên từ CyberBot:**\n` +
              `- Chọn **iPhone 16 Pro Max** nếu bạn thích sự mượt mà lâu dài, quay video chuẩn điện ảnh và đang dùng Mac/iPad.\n` +
              `- Chọn **Galaxy S24 Ultra** nếu bạn cần bút S-Pen ghi chú công việc, màn hình chống chói đỉnh cao và chụp zoom xa sự kiện.`,
        recommendations: [p1, p2].filter(Boolean),
        quickReplies: ["Xem chi tiết iPhone 16 Pro Max", "Xem chi tiết S24 Ultra", "Chính sách trả góp 0%"]
      };
    }

    // So sánh: MacBook Pro M3 vs Asus ROG Zephyrus G16
    if (isCompare && ((raw.includes("macbook") && raw.includes("rog")) || (raw.includes("macbook") && raw.includes("zephyrus")) || (raw.includes("macbook") && raw.includes("asus")))) {
      const p1 = PRODUCTS_DATA.find(p => p.id === "sp-03");
      const p2 = PRODUCTS_DATA.find(p => p.id === "sp-04");
      return {
        text: `⚖️ **So Sánh: MacBook Pro 14 M3 Pro vs ASUS ROG Zephyrus G16**\n\n` +
              `- **MacBook Pro M3 Pro:** Lựa chọn số 1 cho dân Lập trình (iOS/Web/Backend), dựng video 4K/8K, pin cực trâu 18 tiếng, máy mát và không cần cắm sạc vẫn giữ 100% hiệu năng.\n` +
              `- **ROG Zephyrus G16:** Cỗ máy đồ họa 3D, Render kiến trúc và Gaming AAA với card đồ họa RTX 4070 mạnh mẽ cùng màn OLED 240Hz siêu mượt.\n\n` +
              `👉 Cả 2 máy đều thuộc phân khúc cao cấp nhất hiện tại tại TECHZONE!`,
        recommendations: [p1, p2].filter(Boolean),
        quickReplies: ["Xem chi tiết MacBook Pro M3", "Xem ROG Zephyrus G16", "Mã giảm giá áp dụng"]
      };
    }

    // So sánh: Sony WH-1000XM5 vs Apple AirPods Pro 2
    if (isCompare && ((raw.includes("sony") && raw.includes("airpods")) || (raw.includes("xm5") && raw.includes("pro 2")))) {
      const p1 = PRODUCTS_DATA.find(p => p.id === "sp-05");
      const p2 = PRODUCTS_DATA.find(p => p.id === "sp-06");
      return {
        text: `⚖️ **So Sánh: Sony WH-1000XM5 vs AirPods Pro 2 Type-C**\n\n` +
              `- **Sony WH-1000XM5 (Over-ear):** Chống ồn chủ động mạnh nhất, đệm tai êm ái trùm kín tai, pin khủng 30 giờ, âm thanh Hi-Res LDAC cho người sành nhạc.\n` +
              `- **AirPods Pro 2 (In-ear):** Siêu nhỏ gọn bỏ túi quần, chống nước mồ hôi IP54 thích hợp tập gym chạy bộ, kết nối liền mạch với iPhone/MacBook.`,
        recommendations: [p1, p2].filter(Boolean),
        quickReplies: ["Chi tiết Sony XM5", "Chi tiết AirPods Pro 2"]
      };
    }

    // 2. CHÍNH SÁCH BẢO HÀNH & HỖ TRỢ
    if (raw.includes("bảo hành") || raw.includes("lỗi") || raw.includes("hỏng") || raw.includes("đổi trả")) {
      return {
        text: `🛡️ **Chính Sách Bảo Hành Vàng & Đổi Mới Tại TECHZONE:**\n\n` +
              `- **1 ĐỔI 1 TRONG 30 NGÀY:** Nếu sản phẩm có lỗi từ nhà sản xuất, đổi ngay máy mới nguyên seal.\n` +
              `- **BẢO HÀNH CHÍNH HÃNG 12 - 36 THÁNG:** Tại tất cả các trung tâm ủy quyền chính thức (Apple AASP, Samsung, Sony VN, Asus Care...).\n` +
              `- **ĐỔI TRẢ 7 NGÀY MIỄN PHÍ:** Hỗ trợ trả hàng nếu chưa bóc seal sử dụng.\n` +
              `- **TRA CỨU TIỆN LỢI:** Chỉ cần đọc SĐT mua hàng, không cần giữ hóa đơn giấy!`,
        recommendations: [],
        quickReplies: ["Chi phí giao hàng?", "Địa chỉ cửa hàng ở đâu?", "Xem tất cả sản phẩm"]
      };
    }

    if (raw.includes("giao hàng") || raw.includes("ship") || raw.includes("vận chuyển") || raw.includes("bao lâu nhận")) {
      return {
        text: `🚀 **Dịch Vụ Giao Hàng Siêu Tốc TECHZONE:**\n\n` +
              `- **HỎA TỐC 2 GIỜ:** Áp dụng tại nội thành Hà Nội & TP.HCM. Miễn phí 100% cho đơn từ **2.000.000đ**!\n` +
              `- **GIAO HÀNG TOÀN QUỐC:** Từ 1 đến 3 ngày làm việc qua Viettel Post / GHTK chuyên tuyến công nghệ cao.\n` +
              `- **ĐỒNG KIỂM TẠI CHỖ:** Khách hàng được mở hộp kiểm tra ngoại quan máy trước khi thanh toán COD.\n\n` +
              `*Mẹo: Áp dụng mã **FREESHIP** ở giỏ hàng để được miễn phí vận chuyển ngay!*`,
        recommendations: [],
        quickReplies: ["Mã khuyến mãi hôm nay", "Phương thức thanh toán", "Xem sản phẩm hot"]
      };
    }

    if (raw.includes("mã giảm giá") || raw.includes("khuyến mãi") || raw.includes("voucher") || raw.includes("coupon") || raw.includes("sale")) {
      return {
        text: `🎁 **Kho Voucher Độc Quyền Dành Cho Bạn Hôm Nay:**\n\n` +
              `1. 🌟 **TECHAI10** ➔ Giảm ngay **10%** (tối đa 500.000đ) cho đơn từ 1 triệu.\n` +
              `2. 🚚 **FREESHIP** ➔ Miễn phí vận chuyển toàn quốc (giảm 30.000đ).\n` +
              `3. 👑 **VIPTECH** ➔ Giảm trực tiếp **15%** (tối đa 1.000.000đ) cho đơn từ 5 triệu.\n\n` +
              `*Bạn chỉ cần nhấp nút 'Áp dụng' trong giỏ hàng hoặc copy mã dán vào là xong!*`,
        recommendations: PRODUCTS_DATA.filter(p => p.discount >= 10).slice(0, 3),
        quickReplies: ["Top sản phẩm giảm giá khủng", "Tư vấn iPhone", "Tư vấn Laptop"]
      };
    }

    if (raw.includes("địa chỉ") || raw.includes("ở đâu") || raw.includes("hotline") || raw.includes("liên hệ") || raw.includes("sđt") || raw.includes("số điện thoại")) {
      return {
        text: `📍 **Thông Tin Showroom & Liên Hệ Trực Tiếp:**\n\n` +
              `- **Showroom:** ${STORE_POLICIES.address}\n` +
              `- **Hotline Tư Vấn:** **${STORE_POLICIES.hotline}**\n` +
              `- **Email:** support@techzone.vn\n` +
              `- **Thời gian làm việc:** 8:00 - 22:00 (mở cửa cả Thứ 7, Chủ Nhật và ngày Lễ). Có khu vực trải nghiệm máy trực tiếp!`,
        recommendations: [],
        quickReplies: ["Chính sách bảo hành", "Xem thiết bị mới nhất"]
      };
    }

    if (raw.includes("trả góp") || raw.includes("thanh toán")) {
      return {
        text: `💳 **Chính Sách Trả Góp 0% Lãi Suất & Thanh Toán Đa Kênh:**\n\n` +
              `- **TRẢ GÓP 0%:** Qua thẻ tín dụng (Visa, Master, JCB) của hơn 25 ngân hàng đối tác, kỳ hạn 3 - 6 - 12 tháng.\n` +
              `- **TRẢ GÓP CCCD:** Duyệt nhanh online chỉ 10 phút, không giữ giấy tờ gốc.\n` +
              `- **QUÉT MÃ VIETQR:** Tích hợp sinh mã QR động tự động khớp tiền và nội dung chuyển khoản bảo mật.\n` +
              `- **THANH TOÁN COD:** Nhận hàng, kiểm tra máy rồi mới giao tiền cho shipper.`,
        recommendations: [],
        quickReplies: ["Tư vấn iPhone 16 Pro Max", "Tư vấn ROG Gaming"]
      };
    }

    // 3. PHÂN TÍCH NGÂN SÁCH (BUDGET PARSING)
    let maxBudget = null;
    let minBudget = null;

    const underMatch = raw.match(/dưới\s+(\d+)\s*(triệu|tr|củ|m)?/i) || raw.match(/<\s*(\d+)\s*(triệu|tr|củ|m)?/i);
    if (underMatch) {
      maxBudget = parseInt(underMatch[1]) * 1000000;
    }

    const rangeMatch = raw.match(/tầm\s+(\d+)\s*[-đến]+\s*(\d+)\s*(triệu|tr|củ|m)?/i) || raw.match(/từ\s+(\d+)\s*[-đến]+\s*(\d+)\s*(triệu|tr|củ|m)?/i);
    if (rangeMatch) {
      minBudget = parseInt(rangeMatch[1]) * 1000000;
      maxBudget = parseInt(rangeMatch[2]) * 1000000;
    } else {
      const approxMatch = raw.match(/(tầm|khoảng|cỡ|tầm cỡ)\s+(\d+)\s*(triệu|tr|củ|m)?/i);
      if (approxMatch) {
        const center = parseInt(approxMatch[2]) * 1000000;
        minBudget = center * 0.75;
        maxBudget = center * 1.25;
      }
    }

    // 4. PHÂN TÍCH NHU CẦU NGÀNH NGHỀ & USE-CASE
    const wantsLaptop = raw.includes("laptop") || raw.includes("máy tính") || raw.includes("macbook") || raw.includes("zephyrus");
    const wantsPhone = raw.includes("điện thoại") || raw.includes("phone") || raw.includes("smartphone") || raw.includes("iphone") || raw.includes("samsung") || raw.includes("s24");
    const wantsAudio = raw.includes("tai nghe") || raw.includes("headphone") || raw.includes("loa") || raw.includes("marshall") || raw.includes("sony") || raw.includes("airpods");
    const wantsAccessory = raw.includes("chuột") || raw.includes("bàn phím") || raw.includes("keychron") || raw.includes("logitech") || raw.includes("sạc") || raw.includes("anker") || raw.includes("đồng hồ") || raw.includes("smartwatch") || raw.includes("apple watch");
    const wantsScreen = raw.includes("màn hình") || raw.includes("monitor") || raw.includes("dell") || raw.includes("ultrasharp");

    const wantsGaming = raw.includes("chơi game") || raw.includes("gaming") || raw.includes("fps") || raw.includes("đồ họa") || raw.includes("rtx") || raw.includes("pubg") || raw.includes("wukong");
    const wantsCoding = raw.includes("lập trình") || raw.includes("code") || raw.includes("cntt") || raw.includes("it") || raw.includes("developer") || raw.includes("sinh viên");
    const wantsNoiseCancelling = raw.includes("chống ồn") || raw.includes("anc") || raw.includes("yên tĩnh") || raw.includes("tập trung");
    const wantsOffice = raw.includes("văn phòng") || raw.includes("gõ phím") || raw.includes("êm") || raw.includes("công thái học") || raw.includes("mỏi tay");

    // Tính điểm phù hợp của từng sản phẩm
    let scoredList = PRODUCTS_DATA.map(p => {
      let score = 0;
      const textBlock = (p.name + " " + p.shortDesc + " " + p.fullDesc + " " + p.tags.join(" ") + " " + p.categoryName).toLowerCase();

      if (wantsLaptop && p.category === "laptop") score += 12;
      if (wantsPhone && p.category === "phone") score += 12;
      if (wantsAudio && p.category === "audio") score += 12;
      if (wantsAccessory && p.category === "accessory") score += 12;
      if (wantsScreen && p.id === "sp-11") score += 15;

      if (raw.includes("apple") && p.brand === "Apple") score += 8;
      if (raw.includes("samsung") && p.brand === "Samsung") score += 8;
      if (raw.includes("sony") && p.brand === "Sony") score += 8;
      if (raw.includes("asus") && p.brand === "Asus") score += 8;
      if (raw.includes("dell") && p.brand === "Dell") score += 8;
      if (raw.includes("logitech") && p.brand === "Logitech") score += 8;
      if (raw.includes("keychron") && p.brand === "Keychron") score += 8;
      if (raw.includes("anker") && p.brand === "Anker") score += 8;
      if (raw.includes("marshall") && p.brand === "Marshall") score += 8;

      if (wantsCoding && (p.tags.includes("lập trình") || p.tags.includes("laptop lập trình"))) score += 9;
      if (wantsGaming && (p.tags.includes("gaming") || p.tags.includes("laptop gaming"))) score += 9;
      if (wantsNoiseCancelling && p.tags.includes("chống ồn")) score += 9;
      if (wantsOffice && (p.tags.includes("công thái học") || p.tags.includes("văn phòng"))) score += 7;

      const words = raw.split(/\s+/).filter(w => w.length > 2);
      words.forEach(w => {
        if (textBlock.includes(w)) score += 2;
      });

      if (maxBudget) {
        if (p.price <= maxBudget) score += 9;
        else score -= 12;
      }
      if (minBudget && p.price < minBudget) {
        score -= 6;
      }

      return { product: p, score };
    });

    scoredList.sort((a, b) => b.score - a.score);
    const topMatches = scoredList.filter(item => item.score > 2).slice(0, 3).map(i => i.product);

    if (topMatches.length > 0) {
      let adviceIntro = "";

      if (wantsCoding) {
        adviceIntro = `💻 **Gợi Ý Thiết Bị Chuẩn Cho Lập Trình Viên & Sinh Viên CNTT:**\n` +
                      `Đối với công việc coding và biên dịch dự án, bạn cần vi xử lý đa nhân mạnh, bàn phím gõ êm đầm tay và chuột chống mỏi cổ tay. Đây là hệ sinh thái được các Software Engineer đánh giá cao nhất:`;
      } else if (wantsGaming) {
        adviceIntro = `🎮 **Gợi Ý Cỗ Máy Gaming Hiệu Năng Đỉnh Cao:**\n` +
                      `Để chiến mượt mà các tựa game đồ họa nặng với FPS cao nhất, màn hình OLED 240Hz và GPU RTX là combo lý tưởng:`;
      } else if (wantsNoiseCancelling) {
        adviceIntro = `🎧 **Gợi Ý Thiết Bị Chống Ồn Tuyệt Đối Cho Làm Việc:**\n` +
                      `Giúp bạn tập trung 100% không gian tĩnh lặng dù đang ở quán cafe hay trên máy bay:`;
      } else if (maxBudget) {
        const bText = (maxBudget / 1000000).toLocaleString("vi-VN") + " triệu";
        adviceIntro = `💰 **Gợi Ý Thiết Bị Tốt Nhất Trong Tầm Giá Dưới ${bText}:**\n` +
                      `CyberBot đã lọc ra các sản phẩm có điểm số hiệu năng trên giá thành (P/P) tốt nhất cho bạn:`;
      } else {
        adviceIntro = `Dựa trên yêu cầu của bạn, CyberBot đã tổng hợp các thiết bị công nghệ phù hợp nhất đang có sẵn tại TECHZONE:`;
      }

      return {
        text: adviceIntro,
        recommendations: topMatches,
        quickReplies: [
          "Xem chi tiết thông số",
          "Có được trả góp 0% không?",
          "Mã giảm giá có thể áp dụng"
        ]
      };
    }

    // Chào hỏi
    if (raw.includes("xin chào") || raw.includes("hello") || raw.includes("chào") || raw.includes("hi")) {
      return {
        text: `Dạ chào bạn! Rất vui được đồng hành cùng bạn tại **TECHZONE**. Bạn đang muốn tìm thiết bị công nghệ nào hôm nay? (Điện thoại, Laptop, Tai nghe hay Phụ kiện setup bàn làm việc?)`,
        recommendations: PRODUCTS_DATA.filter(p => p.isHot).slice(0, 2),
        quickReplies: [
          "Tư vấn Laptop mỏng nhẹ",
          "Top điện thoại chụp ảnh đẹp",
          "Tai nghe chống ồn tốt nhất"
        ]
      };
    }

    // Mặc định
    return {
      text: `Tôi hiểu bạn đang tìm kiếm giải pháp công nghệ phù hợp. Để CyberBot tư vấn chuẩn xác nhất cho bạn, bạn có thể chia sẻ thêm:\n\n` +
            `1. **Loại thiết bị** bạn cần (Laptop, Điện thoại, Tai nghe, Phụ kiện)?\n` +
            `2. **Ngân sách dự kiến** (ví dụ: *dưới 10 triệu*, *tầm 30-40 triệu*)?\n` +
            `3. **Mục đích chính** (Học tập, Lập trình, Chơi game hay Giải trí)?`,
      recommendations: PRODUCTS_DATA.slice(0, 2),
      quickReplies: [
        "Laptop sinh viên & văn phòng",
        "Top điện thoại bán chạy",
        "Phụ kiện bàn làm việc setup"
      ]
    };
  }

  // =========================================================================
  // LIVE CLOUD LLM ENGINE (Google Gemini API trực tiếp)
  // =========================================================================
  async queryGeminiLive(userMessage) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.customModel}:generateContent?key=${this.apiKey}`;

    const catalogSummary = PRODUCTS_DATA.map(p => 
      `- [ID: ${p.id}] ${p.name} | Loại: ${p.categoryName} | Giá: ${p.price.toLocaleString("vi-VN")}đ | Điểm nhấn: ${p.shortDesc} | Tags: ${p.tags.join(", ")}`
    ).join("\n");

    const systemPrompt = `Bạn là CyberBot Pro - Chuyên gia AI tư vấn bán hàng công nghệ tại siêu thị TECHZONE.
Nhiệm vụ:
1. Trả lời tư vấn khách hàng bằng tiếng Việt lịch sự, nhiệt tình, chuyên sâu về công nghệ.
2. Danh mục sản phẩm TECHZONE hiện có:
${catalogSummary}
3. Nếu bạn giới thiệu hoặc gợi ý sản phẩm, hãy đính kèm mã sản phẩm ở cuối câu trả lời theo định dạng [RECOMMEND: sp-01, sp-03] để hệ thống tự động render thẻ sản phẩm tương tác cho khách hàng.
4. Thông tin chính sách: Bảo hành 1 đổi 1 trong 30 ngày, bảo hành 12-36 tháng chính hãng, miễn phí ship từ 2 triệu, hotline 1900 6868.`;

    const body = {
      contents: [
        {
          role: "user",
          parts: [
            { text: systemPrompt + "\n\nKhách hàng hỏi: " + userMessage }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800
      }
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      throw new Error(`Gemini API error code: ${res.status}`);
    }

    const data = await res.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, hiện tại tôi chưa thể phản hồi. Vui lòng thử lại!";

    const recRegex = /\[RECOMMEND:\s*([^\]]+)\]/i;
    const match = text.match(recRegex);
    let recommendations = [];

    if (match) {
      const ids = match[1].split(",").map(s => s.trim());
      recommendations = PRODUCTS_DATA.filter(p => ids.includes(p.id));
      text = text.replace(recRegex, "").trim();
    } else {
      recommendations = PRODUCTS_DATA.filter(p => text.toLowerCase().includes(p.name.toLowerCase().substring(0, 15))).slice(0, 2);
    }

    return {
      text,
      recommendations,
      quickReplies: ["Xem chi tiết thông số", "Chính sách trả góp 0%", "Xem giỏ hàng"]
    };
  }
}

// Khởi tạo instance toàn cục
window.aiConsultant = new AIConsultant();
