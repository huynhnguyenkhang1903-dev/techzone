// ========================================================
// TECHZONE - CART & ORDER MANAGER CAO CẤP (BIẾN THỂ & LOCALSTORAGE)
// ========================================================

class CartManager {
  constructor() {
    this.cartKey = "techzone_cart_items_v2";
    this.wishlistKey = "techzone_wishlist_ids_v2";
    this.ordersKey = "techzone_orders_history_v2";

    this.items = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.activePromo = this.loadActivePromo();
  }

  // Âm thanh phản hồi xúc giác (Web Audio API Synthesizer - không phụ thuộc file ngoài)
  playAudioFeedback(type = "add") {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "add") {
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === "success") {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      // Ignore audio failure
    }
  }

  loadCart() {
    try {
      const data = localStorage.getItem(this.cartKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.items));
    window.dispatchEvent(new CustomEvent("cart:updated", { 
      detail: { items: this.items, total: this.getTotal(), count: this.getItemCount() } 
    }));
  }

  loadWishlist() {
    try {
      const data = localStorage.getItem(this.wishlistKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveWishlist() {
    localStorage.setItem(this.wishlistKey, JSON.stringify(this.wishlist));
    window.dispatchEvent(new CustomEvent("wishlist:updated", { detail: { wishlist: this.wishlist } }));
  }

  loadActivePromo() {
    try {
      const data = localStorage.getItem("techzone_active_promo");
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  saveActivePromo() {
    if (this.activePromo) {
      localStorage.setItem("techzone_active_promo", JSON.stringify(this.activePromo));
    } else {
      localStorage.removeItem("techzone_active_promo");
    }
  }

  // Thêm vào giỏ hàng hỗ trợ chọn Màu sắc & Dung lượng
  addToCart(productId, quantity = 1, selectedColor = null, selectedStorage = null) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return false;

    const color = selectedColor || (product.colors && product.colors[0]?.name) || "Tiêu chuẩn";
    let storage = selectedStorage || (product.storageOptions && product.storageOptions[0]?.size) || "Tiêu chuẩn";
    
    // Tính giá theo dung lượng/phiên bản nếu có
    let itemPrice = product.price;
    if (selectedStorage && product.storageOptions) {
      const foundOpt = product.storageOptions.find(o => o.size === selectedStorage);
      if (foundOpt) itemPrice = foundOpt.price;
    }

    // Mã khóa duy nhất theo biến thể
    const variantKey = `${product.id}__${color}__${storage}`;
    const existingIndex = this.items.findIndex(item => item.variantKey === variantKey);

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        variantKey,
        id: product.id,
        name: product.name,
        price: itemPrice,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        color: color,
        storage: storage,
        quantity: quantity
      });
    }

    this.playAudioFeedback("add");
    this.saveCart();
    return true;
  }

  updateQuantity(variantKey, quantity) {
    const item = this.items.find(i => i.variantKey === variantKey);
    if (!item) return;

    if (quantity <= 0) {
      this.removeFromCart(variantKey);
    } else {
      item.quantity = quantity;
      this.saveCart();
    }
  }

  removeFromCart(variantKey) {
    this.items = this.items.filter(i => i.variantKey !== variantKey);
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.activePromo = null;
    this.saveActivePromo();
    this.saveCart();
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Tính tiến trình nhận Freeship (ngưỡng 2 triệu)
  getFreeShippingProgress() {
    const subtotal = this.getSubtotal();
    const threshold = 2000000;
    const progress = Math.min(100, Math.round((subtotal / threshold) * 100));
    const remaining = Math.max(0, threshold - subtotal);
    return {
      isFree: subtotal >= threshold,
      progress,
      remaining
    };
  }

  applyPromoCode(code) {
    const cleanCode = (code || "").trim().toUpperCase();
    const promo = PROMO_CODES[cleanCode];

    if (!promo) {
      return { success: false, message: "Mã khuyến mãi không tồn tại hoặc đã hết hạn!" };
    }

    const subtotal = this.getSubtotal();
    if (subtotal < (promo.minOrder || 0)) {
      return {
        success: false,
        message: `Đơn hàng tối thiểu để áp dụng mã này là ${(promo.minOrder).toLocaleString("vi-VN")}đ!`
      };
    }

    this.activePromo = { code: cleanCode, ...promo };
    this.saveActivePromo();
    this.saveCart();
    return { success: true, message: `Áp dụng mã ${cleanCode} thành công: ${promo.desc}` };
  }

  removePromoCode() {
    this.activePromo = null;
    this.saveActivePromo();
    this.saveCart();
  }

  getDiscountAmount() {
    if (!this.activePromo) return 0;
    const subtotal = this.getSubtotal();

    if (this.activePromo.fixedDiscount) {
      return Math.min(this.activePromo.fixedDiscount, subtotal);
    }

    if (this.activePromo.discountPercent) {
      const discount = Math.round(subtotal * (this.activePromo.discountPercent / 100));
      return this.activePromo.maxDiscount ? Math.min(discount, this.activePromo.maxDiscount) : discount;
    }

    return 0;
  }

  getShippingFee() {
    if (this.items.length === 0) return 0;
    const subtotal = this.getSubtotal();
    if (subtotal >= 2000000) return 0;
    if (this.activePromo && this.activePromo.code === "FREESHIP") return 0;
    return 30000;
  }

  getTotal() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    const discount = this.getDiscountAmount();
    const shipping = this.getShippingFee();
    return Math.max(0, subtotal - discount + shipping);
  }

  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    let added = false;
    if (index > -1) {
      this.wishlist.splice(index, 1);
      added = false;
    } else {
      this.wishlist.push(productId);
      added = true;
      this.playAudioFeedback("add");
    }
    this.saveWishlist();
    return added;
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  createOrder(customerInfo) {
    const orderId = "TZ-" + Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const orderDate = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} - ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const subtotal = this.getSubtotal();
    const discount = this.getDiscountAmount();
    const shipping = this.getShippingFee();
    const total = this.getTotal();

    const newOrder = {
      orderId,
      orderDate,
      customer: customerInfo,
      items: [...this.items],
      subtotal,
      discount,
      shipping,
      total,
      promoApplied: this.activePromo ? this.activePromo.code : null,
      status: "Đang đóng gói hỏa tốc 2H"
    };

    let orders = [];
    try {
      orders = JSON.parse(localStorage.getItem(this.ordersKey) || "[]");
    } catch (e) {
      orders = [];
    }
    orders.unshift(newOrder);
    localStorage.setItem(this.ordersKey, JSON.stringify(orders));

    this.playAudioFeedback("success");
    this.clearCart();
    return newOrder;
  }

  getOrderHistory() {
    try {
      return JSON.parse(localStorage.getItem(this.ordersKey) || "[]");
    } catch (e) {
      return [];
    }
  }
}

// Khởi tạo instance toàn cục
window.cartManager = new CartManager();
