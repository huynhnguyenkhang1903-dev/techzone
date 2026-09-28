// ========================================================
// TECHZONE MOBILE APP - CONTROLLER CHÍNH CHUẨN XÁC & HOÀN HẢO
// Khắc phục 100% lỗi khởi tạo, hỗ trợ toàn diện Mobile & Desktop
// ========================================================

// 1. CÁC HÀM ĐIỀU KHIỂN TOÀN CỤC (GLOBAL SCOPE - KHÔNG BỊ TDZ)
window.openCart = function() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (drawer && overlay) {
    drawer.classList.add("active");
    overlay.classList.add("active");
    if (typeof window.renderCartItems === "function") {
      window.renderCartItems();
    }
  }
};

window.closeCart = function() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (drawer) drawer.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
};

window.openAIChat = function() {
  const chatWin = document.getElementById("ai-chat-window");
  if (chatWin) {
    chatWin.classList.add("active");
    const container = document.getElementById("chat-messages-container");
    if (container && container.children.length === 0 && window.aiConsultant) {
      const welcome = window.aiConsultant.getInitialWelcome();
      if (typeof window.appendAIMessage === "function") {
        window.appendAIMessage(welcome.text, welcome.recommendations, welcome.quickReplies);
      }
    }
    setTimeout(() => {
      document.getElementById("chat-input")?.focus();
    }, 150);
  }
};

window.closeAIChat = function() {
  const chatWin = document.getElementById("ai-chat-window");
  if (chatWin) chatWin.classList.remove("active");
};

window.openAIChatWithPrompt = function(promptText) {
  window.openAIChat();
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-chat-btn");
  if (input && sendBtn) {
    input.value = promptText;
    sendBtn.click();
  }
};

window.openWishlist = function() {
  const modal = document.getElementById("wishlist-modal");
  if (modal) {
    if (typeof window.renderWishlist === "function") {
      window.renderWishlist();
    }
    modal.classList.add("active");
  }
};

window.closeWishlist = function() {
  const modal = document.getElementById("wishlist-modal");
  if (modal) modal.classList.remove("active");
};

window.handleBottomNav = function(target) {
  document.querySelectorAll(".mobile-nav-item").forEach(n => {
    if (n.getAttribute("data-target") === target) {
      n.classList.add("text-blue-400", "font-bold");
      n.classList.remove("text-slate-400");
    } else {
      n.classList.remove("text-blue-400", "font-bold");
      n.classList.add("text-slate-400");
    }
  });

  if (target === "home") {
    window.closeAIChat();
    window.closeCart();
    window.closeWishlist();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (target === "categories") {
    window.closeAIChat();
    window.closeCart();
    window.closeWishlist();
    document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
  } else if (target === "ai") {
    window.closeCart();
    window.closeWishlist();
    window.openAIChat();
  } else if (target === "cart") {
    window.closeAIChat();
    window.closeWishlist();
    window.openCart();
  } else if (target === "wishlist") {
    window.closeAIChat();
    window.closeCart();
    window.openWishlist();
  }
};

// 2. KHỞI CHẠY KHI TẢI XONG GIAO DIỆN
document.addEventListener("DOMContentLoaded", () => {
  // Trạng thái bộ lọc
  const state = {
    currentCategory: "all",
    searchKeyword: "",
    selectedBrand: "all",
    priceRange: 60000000,
    sortBy: "popular",
    viewMode: "grid",
    theme: localStorage.getItem("techzone_theme") || "dark"
  };

  // Khởi tạo giao diện
  if (state.theme === "light") {
    document.body.classList.add("light-theme");
    updateThemeIcon(true);
  }

  // Khởi chạy từng thành phần
  initThemeToggle();
  initDealTimer();
  initProductsGrid();
  initCategoryTabs();
  initSearchAndFilters();
  initViewModeToggle();
  initCartUI();
  initWishlistUI();
  initAIChatUI();
  initMobileBottomNav();

  // =========================================================================
  // ĐỒNG HỒ ĐẾM NGƯỢC DEAL
  // =========================================================================
  function initDealTimer() {
    const timerEl = document.getElementById("deal-timer");
    if (!timerEl) return;
    let seconds = 8 * 3600 + 45 * 60 + 12;
    setInterval(() => {
      if (seconds > 0) seconds--;
      const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");
      timerEl.innerText = `${h}:${m}:${s}`;
    }, 1000);
  }

  // =========================================================================
  // RENDER SẢN PHẨM & LỌC
  // =========================================================================
  function renderProducts() {
    const container = document.getElementById("products-grid");
    if (!container) return;

    let filtered = PRODUCTS_DATA.filter(p => {
      const matchCat = state.currentCategory === "all" || p.category === state.currentCategory;
      const keyword = state.searchKeyword.toLowerCase().trim();
      const matchSearch = !keyword || 
        p.name.toLowerCase().includes(keyword) || 
        p.tags.some(t => t.toLowerCase().includes(keyword)) ||
        p.brand.toLowerCase().includes(keyword) ||
        p.shortDesc.toLowerCase().includes(keyword);
      const matchBrand = state.selectedBrand === "all" || p.brand.toLowerCase() === state.selectedBrand.toLowerCase();
      const matchPrice = p.price <= state.priceRange;

      return matchCat && matchSearch && matchBrand && matchPrice;
    });

    if (state.sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      filtered.sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0) || b.reviewsCount - a.reviewsCount);
    }

    const countEl = document.getElementById("products-count");
    if (countEl) countEl.innerText = `${filtered.length} sản phẩm`;

    if (state.viewMode === "list") {
      container.className = "flex flex-col gap-3.5";
    } else {
      container.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5";
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400">
          <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-800/60 flex items-center justify-center text-2xl">
            🔍
          </div>
          <h3 class="text-base font-bold text-slate-200 mb-1">Không tìm thấy sản phẩm</h3>
          <p class="text-xs text-slate-400 mb-4 max-w-xs mx-auto">
            Không có thiết bị nào khớp với từ khóa tìm kiếm hoặc bộ lọc hiện tại.
          </p>
          <button onclick="openAIChatWithPrompt('Gợi ý cho tôi thiết bị phù hợp với từ khóa: ' + '${state.searchKeyword}')" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow transition">
            🤖 Nhờ CyberBot tìm giúp
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(p => state.viewMode === "list" ? createProductListHTML(p) : createProductCardHTML(p)).join("");

    attachCardEvents(container);
  }

  function createProductCardHTML(p) {
    const isWishlisted = window.cartManager.isInWishlist(p.id);
    const formattedPrice = p.price.toLocaleString("vi-VN") + "đ";
    const formattedOriginalPrice = p.originalPrice.toLocaleString("vi-VN") + "đ";

    let colorDotsHTML = "";
    if (p.colors && p.colors.length > 0) {
      colorDotsHTML = `
        <div class="flex items-center gap-1.5 mt-2">
          ${p.colors.slice(0, 4).map(c => `
            <span class="w-2.5 h-2.5 rounded-full border border-white/30" style="background-color: ${c.hex}" title="${c.name}"></span>
          `).join("")}
          ${p.colors.length > 4 ? `<span class="text-[9px] text-slate-500">+${p.colors.length - 4}</span>` : ""}
        </div>
      `;
    }

    return `
      <div class="card-matte p-3.5 flex flex-col justify-between relative group" data-id="${p.id}">
        <!-- Badges -->
        <div class="absolute top-4 left-4 z-10 flex flex-col gap-1 pointer-events-none">
          ${p.discount > 0 ? `<span class="bg-red-500/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">- ${p.discount}%</span>` : ''}
          ${p.isHot ? `<span class="bg-amber-600/90 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded shadow">🔥 Hot</span>` : ''}
        </div>

        <!-- Wishlist Button -->
        <button class="btn-toggle-wishlist absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-red-400 flex items-center justify-center transition shadow" data-id="${p.id}" title="Yêu thích">
          <svg class="w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'fill-none stroke-current'}" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        <!-- Product Image -->
        <div class="product-img-box mb-3 cursor-pointer btn-quick-view" data-id="${p.id}">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>

        <!-- Info -->
        <div class="flex-1 flex flex-col">
          <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span class="uppercase font-bold tracking-wider text-blue-400 text-[10px]">${p.brand}</span>
            <div class="flex items-center gap-1 text-amber-400 font-semibold text-[10px]">
              <span>★</span>
              <span>${p.rating}</span>
              <span class="text-slate-500">(${p.reviewsCount})</span>
            </div>
          </div>

          <h4 class="font-bold text-xs sm:text-sm mb-1 line-clamp-2 hover:text-blue-400 transition cursor-pointer btn-quick-view text-slate-100" data-id="${p.id}">
            ${p.name}
          </h4>

          <p class="text-[11px] text-slate-400 line-clamp-2 mb-2 leading-relaxed">
            ${p.shortDesc}
          </p>

          ${colorDotsHTML}

          <div class="mt-auto pt-2.5 border-t border-slate-800 flex items-baseline gap-2 mb-2.5">
            <span class="text-sm sm:text-base font-extrabold text-blue-400">${formattedPrice}</span>
            ${p.originalPrice > p.price ? `<span class="text-[10px] text-slate-500 line-through">${formattedOriginalPrice}</span>` : ''}
          </div>

          <!-- Buttons -->
          <div class="grid grid-cols-5 gap-1.5">
            <button class="col-span-4 btn-add-cart py-2 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1 shadow transition" data-id="${p.id}">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              <span>+ Giỏ</span>
            </button>
            <button class="col-span-1 btn-consult-ai py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center text-xs transition" data-id="${p.id}" title="Hỏi CyberBot">
              🤖
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function createProductListHTML(p) {
    const isWishlisted = window.cartManager.isInWishlist(p.id);
    const formattedPrice = p.price.toLocaleString("vi-VN") + "đ";
    const formattedOriginalPrice = p.originalPrice.toLocaleString("vi-VN") + "đ";

    return `
      <div class="card-matte p-3.5 flex flex-col sm:flex-row items-center gap-3.5 relative" data-id="${p.id}">
        <div class="w-full sm:w-36 h-36 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0 cursor-pointer btn-quick-view" data-id="${p.id}">
          <img src="${p.image}" class="w-full h-full object-cover">
        </div>

        <div class="flex-1 min-w-0 flex flex-col justify-between h-full">
          <div>
            <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span class="uppercase font-bold text-blue-400 text-[10px]">${p.brand} • ${p.categoryName}</span>
              <div class="flex items-center gap-1 text-amber-400 font-semibold text-[10px]">
                <span>★ ${p.rating} (${p.reviewsCount})</span>
              </div>
            </div>

            <h4 class="font-bold text-sm mb-1 hover:text-blue-400 transition cursor-pointer btn-quick-view text-slate-100" data-id="${p.id}">
              ${p.name}
            </h4>
            <p class="text-[11px] text-slate-400 mb-2 line-clamp-2">${p.shortDesc}</p>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
            <div class="flex items-baseline gap-2">
              <span class="text-sm sm:text-base font-extrabold text-blue-400">${formattedPrice}</span>
              ${p.originalPrice > p.price ? `<span class="text-[10px] text-slate-500 line-through">${formattedOriginalPrice}</span>` : ''}
            </div>

            <div class="flex items-center gap-2">
              <button class="btn-toggle-wishlist p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-red-400 transition" data-id="${p.id}">
                <svg class="w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'fill-none stroke-current'}" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
              <button class="btn-consult-ai px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1" data-id="${p.id}">
                <span>🤖 Tư vấn</span>
              </button>
              <button class="btn-add-cart px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition" data-id="${p.id}">
                + Thêm giỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function attachCardEvents(parent) {
    parent.querySelectorAll(".btn-quick-view").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        window.openProductModal(id);
      });
    });

    parent.querySelectorAll(".btn-add-cart").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        window.cartManager.addToCart(id, 1);
        const p = PRODUCTS_DATA.find(x => x.id === id);
        showToast(`Đã thêm "${p.name.substring(0, 20)}..." vào giỏ!`, "success");
      });
    });

    parent.querySelectorAll(".btn-toggle-wishlist").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        const added = window.cartManager.toggleWishlist(id);
        const svg = btn.querySelector("svg");
        if (added) {
          svg.classList.add("fill-red-500", "text-red-500");
          svg.classList.remove("fill-none");
          showToast("Đã lưu vào danh sách yêu thích!", "success");
        } else {
          svg.classList.remove("fill-red-500", "text-red-500");
          svg.classList.add("fill-none");
          showToast("Đã xóa khỏi danh sách yêu thích", "info");
        }
      });
    });

    parent.querySelectorAll(".btn-consult-ai").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        const p = PRODUCTS_DATA.find(x => x.id === id);
        openAIChatWithPrompt(`Hãy phân tích ưu nhược điểm của "${p.name}" giúp tôi với!`);
      });
    });
  }

  // =========================================================================
  // DANH MỤC, BỘ LỌC & CHUYỂN VIEW
  // =========================================================================
  function initCategoryTabs() {
    const tabs = document.querySelectorAll(".category-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => {
          t.classList.remove("active-cat", "bg-blue-600", "text-white");
          t.classList.add("bg-[#1b1d24]", "text-slate-300");
        });
        tab.classList.add("active-cat", "bg-blue-600", "text-white");
        tab.classList.remove("bg-[#1b1d24]", "text-slate-300");
        state.currentCategory = tab.getAttribute("data-category");
        renderProducts();
      });
    });
  }

  function initSearchAndFilters() {
    const searchInput = document.getElementById("search-input");
    const mobileSearchInput = document.getElementById("mobile-search-input");
    const brandFilter = document.getElementById("brand-filter");
    const priceSlider = document.getElementById("price-slider");
    const priceDisplay = document.getElementById("price-slider-val");
    const sortSelect = document.getElementById("sort-select");

    const handleSearch = (val) => {
      state.searchKeyword = val;
      renderProducts();
    };

    if (searchInput) searchInput.addEventListener("input", (e) => handleSearch(e.target.value));
    if (mobileSearchInput) mobileSearchInput.addEventListener("input", (e) => handleSearch(e.target.value));

    if (brandFilter) {
      brandFilter.addEventListener("change", (e) => {
        state.selectedBrand = e.target.value;
        renderProducts();
      });
    }

    if (priceSlider) {
      priceSlider.addEventListener("input", (e) => {
        state.priceRange = parseInt(e.target.value);
        if (priceDisplay) {
          priceDisplay.innerText = `${(state.priceRange / 1000000).toLocaleString("vi-VN")} triệu`;
        }
        renderProducts();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        state.sortBy = e.target.value;
        renderProducts();
      });
    }
  }

  function initViewModeToggle() {
    const gridBtn = document.getElementById("btn-view-grid");
    const listBtn = document.getElementById("btn-view-list");

    gridBtn?.addEventListener("click", () => {
      state.viewMode = "grid";
      gridBtn.classList.add("bg-blue-600", "text-white");
      gridBtn.classList.remove("text-slate-400");
      listBtn.classList.remove("bg-blue-600", "text-white");
      listBtn.classList.add("text-slate-400");
      renderProducts();
    });

    listBtn?.addEventListener("click", () => {
      state.viewMode = "list";
      listBtn.classList.add("bg-blue-600", "text-white");
      listBtn.classList.remove("text-slate-400");
      gridBtn.classList.remove("bg-blue-600", "text-white");
      gridBtn.classList.add("text-slate-400");
      renderProducts();
    });
  }

  function initProductsGrid() {
    renderProducts();
  }

  // =========================================================================
  // MODAL XEM CHI TIẾT SẢN PHẨM
  // =========================================================================
  let activeSelectedColor = null;
  let activeSelectedStorage = null;

  window.openProductModal = function(productId) {
    const p = PRODUCTS_DATA.find(x => x.id === productId);
    const modal = document.getElementById("product-detail-modal");
    if (!p || !modal) return;

    activeSelectedColor = (p.colors && p.colors[0]?.name) || null;
    activeSelectedStorage = (p.storageOptions && p.storageOptions[0]?.size) || null;

    const mainImg = document.getElementById("modal-p-img");
    if (mainImg) mainImg.src = p.image;
    document.getElementById("modal-p-brand").innerText = p.brand;
    document.getElementById("modal-p-category").innerText = p.categoryName;
    document.getElementById("modal-p-title").innerText = p.name;
    document.getElementById("modal-p-rating").innerHTML = `★ ${p.rating} <span class="text-slate-500 font-normal">(${p.reviewsCount} đánh giá)</span>`;
    
    // Gallery Thumbnails
    const galleryEl = document.getElementById("modal-p-gallery");
    if (galleryEl && p.gallery) {
      galleryEl.innerHTML = p.gallery.map((imgUrl, i) => `
        <div class="w-14 h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition ${i === 0 ? 'border-blue-500' : 'border-slate-800'}" data-src="${imgUrl}">
          <img src="${imgUrl}" class="w-full h-full object-cover">
        </div>
      `).join("");

      galleryEl.querySelectorAll("div").forEach(thumb => {
        thumb.addEventListener("click", () => {
          galleryEl.querySelectorAll("div").forEach(d => d.className = "w-14 h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition border-slate-800");
          thumb.className = "w-14 h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition border-blue-500";
          if (mainImg) mainImg.src = thumb.getAttribute("data-src");
        });
      });
    }

    function updateModalPrice() {
      let currentPrice = p.price;
      if (activeSelectedStorage && p.storageOptions) {
        const found = p.storageOptions.find(o => o.size === activeSelectedStorage);
        if (found) currentPrice = found.price;
      }
      document.getElementById("modal-p-price").innerText = currentPrice.toLocaleString("vi-VN") + "đ";
      const origEl = document.getElementById("modal-p-original-price");
      if (origEl) {
        if (p.originalPrice > currentPrice) {
          origEl.innerText = p.originalPrice.toLocaleString("vi-VN") + "đ";
          origEl.style.display = "inline";
        } else {
          origEl.style.display = "none";
        }
      }
    }
    updateModalPrice();

    document.getElementById("modal-p-desc").innerText = p.fullDesc;

    // Color options
    const colorOptContainer = document.getElementById("modal-color-options");
    if (colorOptContainer && p.colors) {
      colorOptContainer.innerHTML = p.colors.map(c => `
        <button class="modal-color-btn px-2.5 py-1 rounded-lg border flex items-center gap-1.5 text-xs transition ${c.name === activeSelectedColor ? 'border-blue-500 bg-blue-500/10 text-white font-bold' : 'border-slate-700 bg-slate-900 text-slate-300'}" data-name="${c.name}">
          <span class="w-2.5 h-2.5 rounded-full border border-white/40" style="background-color: ${c.hex}"></span>
          <span>${c.name}</span>
        </button>
      `).join("");

      colorOptContainer.querySelectorAll(".modal-color-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          activeSelectedColor = btn.getAttribute("data-name");
          colorOptContainer.querySelectorAll(".modal-color-btn").forEach(b => {
            b.className = "modal-color-btn px-2.5 py-1 rounded-lg border flex items-center gap-1.5 text-xs transition border-slate-700 bg-slate-900 text-slate-300";
          });
          btn.className = "modal-color-btn px-2.5 py-1 rounded-lg border flex items-center gap-1.5 text-xs transition border-blue-500 bg-blue-500/10 text-white font-bold";
        });
      });
    }

    // Storage options
    const storageOptContainer = document.getElementById("modal-storage-options");
    if (storageOptContainer && p.storageOptions) {
      storageOptContainer.innerHTML = p.storageOptions.map(o => `
        <button class="modal-storage-btn px-2.5 py-1 rounded-lg border text-xs transition ${o.size === activeSelectedStorage ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-bold' : 'border-slate-700 bg-slate-900 text-slate-300'}" data-size="${o.size}">
          ${o.size}
        </button>
      `).join("");

      storageOptContainer.querySelectorAll(".modal-storage-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          activeSelectedStorage = btn.getAttribute("data-size");
          storageOptContainer.querySelectorAll(".modal-storage-btn").forEach(b => {
            b.className = "modal-storage-btn px-2.5 py-1 rounded-lg border text-xs transition border-slate-700 bg-slate-900 text-slate-300";
          });
          btn.className = "modal-storage-btn px-2.5 py-1 rounded-lg border text-xs transition border-blue-500 bg-blue-500/10 text-blue-400 font-bold";
          updateModalPrice();
        });
      });
    }

    // Specs
    const specsContainer = document.getElementById("modal-p-specs");
    if (specsContainer && p.specs) {
      specsContainer.innerHTML = Object.entries(p.specs).map(([key, value]) => `
        <div class="flex items-start justify-between py-1.5 border-b border-slate-800 text-xs">
          <span class="text-slate-400 font-medium w-1/3">${key}:</span>
          <span class="text-slate-200 font-semibold w-2/3 text-right">${value}</span>
        </div>
      `).join("");
    }

    // Reviews
    const reviewsContainer = document.getElementById("modal-p-reviews");
    if (reviewsContainer) {
      if (p.reviews && p.reviews.length > 0) {
        reviewsContainer.innerHTML = p.reviews.map(r => `
          <div class="p-2.5 rounded-lg bg-[#121316] border border-white/5 text-xs mb-2">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-slate-200">${r.author}</span>
              <span class="text-slate-500 text-[10px]">${r.date}</span>
            </div>
            <div class="text-amber-400 text-[10px] mb-1">${"★".repeat(r.rating)}</div>
            <p class="text-slate-300 text-[11px] leading-relaxed">${r.comment}</p>
          </div>
        `).join("");
      } else {
        reviewsContainer.innerHTML = `<p class="text-slate-400 text-xs">Chưa có đánh giá nào cho sản phẩm này.</p>`;
      }
    }

    // Add to cart in modal
    const modalAddBtn = document.getElementById("modal-add-cart-btn");
    const modalQtyInput = document.getElementById("modal-qty-input");
    if (modalAddBtn) {
      modalAddBtn.onclick = () => {
        const qty = parseInt(modalQtyInput?.value || "1");
        window.cartManager.addToCart(p.id, qty, activeSelectedColor, activeSelectedStorage);
        showToast(`Đã thêm ${qty} "${p.name.substring(0, 20)}..." vào giỏ!`, "success");
        window.closeProductModal();
      };
    }

    // Ask AI in modal
    const modalAiBtn = document.getElementById("modal-consult-ai-btn");
    if (modalAiBtn) {
      modalAiBtn.onclick = () => {
        window.closeProductModal();
        openAIChatWithPrompt(`Tôi đang xem "${p.name}". Hãy phân tích cho tôi ưu điểm của phiên bản này và đối tượng nào nên mua nhất?`);
      };
    }

    modal.classList.add("active");
  };

  window.closeProductModal = function() {
    document.getElementById("product-detail-modal")?.classList.remove("active");
  };

  // =========================================================================
  // GIỎ HÀNG (CART UI & RENDER)
  // =========================================================================
  function updateCartBadges() {
    const count = window.cartManager.getItemCount();
    document.querySelectorAll(".cart-badge-count").forEach(badge => {
      badge.innerText = count;
      badge.style.display = count > 0 ? "flex" : "none";
    });
  }

  window.renderCartItems = function() {
    const listEl = document.getElementById("cart-items-list");
    const subtotalEl = document.getElementById("cart-subtotal");
    const discountEl = document.getElementById("cart-discount");
    const shippingEl = document.getElementById("cart-shipping");
    const totalEl = document.getElementById("cart-total");
    const emptyState = document.getElementById("cart-empty-state");
    const footerEl = document.getElementById("cart-footer");

    const freeshipText = document.getElementById("freeship-text");
    const freeshipPercent = document.getElementById("freeship-percent");
    const freeshipFill = document.getElementById("freeship-bar-fill");

    const items = window.cartManager.items;
    updateCartBadges();

    const fsProgress = window.cartManager.getFreeShippingProgress();
    if (freeshipPercent) freeshipPercent.innerText = `${fsProgress.progress}%`;
    if (freeshipFill) freeshipFill.style.width = `${fsProgress.progress}%`;
    if (freeshipText) {
      if (fsProgress.isFree) {
        freeshipText.innerHTML = `🎉 <strong>Chúc mừng!</strong> Bạn đã nhận <strong>Freeship 2H</strong>`;
      } else {
        freeshipText.innerHTML = `Mua thêm <strong class="text-blue-400">${fsProgress.remaining.toLocaleString("vi-VN")}đ</strong> để Freeship 2H!`;
      }
    }

    if (items.length === 0) {
      if (listEl) listEl.innerHTML = "";
      if (emptyState) emptyState.style.display = "flex";
      if (footerEl) footerEl.style.display = "none";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (footerEl) footerEl.style.display = "block";

    if (listEl) {
      listEl.innerHTML = items.map(item => `
        <div class="flex items-center gap-3 p-3 rounded-xl bg-[#1b1d24] border border-white/5">
          <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-lg object-cover flex-shrink-0">
          <div class="flex-1 min-w-0">
            <h5 class="text-xs font-semibold truncate text-slate-100">${item.name}</h5>
            <p class="text-[10px] text-slate-400 truncate">${item.color} • ${item.storage}</p>
            <p class="text-xs text-blue-400 font-bold mt-0.5">${item.price.toLocaleString("vi-VN")}đ</p>
            <div class="flex items-center gap-2 mt-1.5">
              <button class="cart-qty-btn w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs transition" data-key="${item.variantKey}" data-action="dec">-</button>
              <span class="text-xs font-semibold px-1.5">${item.quantity}</span>
              <button class="cart-qty-btn w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs transition" data-key="${item.variantKey}" data-action="inc">+</button>
            </div>
          </div>
          <button class="cart-remove-btn text-slate-400 hover:text-red-400 p-1 transition" data-key="${item.variantKey}" title="Xóa">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      `).join("");

      listEl.querySelectorAll(".cart-qty-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const key = btn.getAttribute("data-key");
          const action = btn.getAttribute("data-action");
          const item = window.cartManager.items.find(x => x.variantKey === key);
          if (item) {
            window.cartManager.updateQuantity(key, action === "inc" ? item.quantity + 1 : item.quantity - 1);
            window.renderCartItems();
          }
        });
      });

      listEl.querySelectorAll(".cart-remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const key = btn.getAttribute("data-key");
          window.cartManager.removeFromCart(key);
          window.renderCartItems();
          showToast("Đã xóa sản phẩm khỏi giỏ hàng", "info");
        });
      });
    }

    if (subtotalEl) subtotalEl.innerText = window.cartManager.getSubtotal().toLocaleString("vi-VN") + "đ";
    if (discountEl) discountEl.innerText = "-" + window.cartManager.getDiscountAmount().toLocaleString("vi-VN") + "đ";
    
    const shipping = window.cartManager.getShippingFee();
    if (shippingEl) shippingEl.innerText = shipping === 0 ? "Miễn phí" : shipping.toLocaleString("vi-VN") + "đ";
    if (totalEl) totalEl.innerText = window.cartManager.getTotal().toLocaleString("vi-VN") + "đ";
  };

  function initCartUI() {
    window.addEventListener("cart:updated", () => {
      updateCartBadges();
      window.renderCartItems();
    });

    const promoInput = document.getElementById("cart-promo-input");
    const promoApplyBtn = document.getElementById("apply-promo-btn");
    promoApplyBtn?.addEventListener("click", () => {
      const code = promoInput?.value;
      if (!code) return;
      const res = window.cartManager.applyPromoCode(code);
      showToast(res.message, res.success ? "success" : "error");
      window.renderCartItems();
    });

    const proceedCheckoutBtn = document.getElementById("btn-proceed-checkout");
    proceedCheckoutBtn?.addEventListener("click", () => {
      if (window.cartManager.items.length === 0) return;
      window.closeCart();
      openCheckoutModal();
    });

    const checkoutModal = document.getElementById("checkout-modal");
    const checkoutForm = document.getElementById("checkout-form");
    checkoutForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const customer = {
        name: document.getElementById("checkout-name").value,
        phone: document.getElementById("checkout-phone").value,
        address: document.getElementById("checkout-address").value,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')?.value || "COD",
        note: document.getElementById("checkout-note").value
      };

      const order = window.cartManager.createOrder(customer);
      if (checkoutModal) checkoutModal.classList.remove("active");
      openOrderSuccessModal(order);
    });
  }

  function openCheckoutModal() {
    const totalAmount = window.cartManager.getTotal();
    const sumEl = document.getElementById("checkout-summary-total");
    if (sumEl) sumEl.innerText = totalAmount.toLocaleString("vi-VN") + "đ";
    
    const qrImg = document.getElementById("vietqr-image");
    if (qrImg) {
      const bankCode = "MB";
      const accountNo = "0988686868";
      const accountName = "CONG TY TECHZONE VN";
      const memo = encodeURIComponent("TECHZONE DON HANG");
      qrImg.src = `https://api.vietqr.io/image/${bankCode}-${accountNo}-compact2.png?amount=${totalAmount}&addInfo=${memo}&accountName=${encodeURIComponent(accountName)}`;
    }

    document.getElementById("checkout-modal")?.classList.add("active");
  }

  function openOrderSuccessModal(order) {
    const successModal = document.getElementById("order-success-modal");
    if (!successModal) return;

    document.getElementById("success-order-id").innerText = order.orderId;
    document.getElementById("success-order-total").innerText = order.total.toLocaleString("vi-VN") + "đ";
    document.getElementById("success-order-name").innerText = order.customer.name;
    document.getElementById("success-order-phone").innerText = order.customer.phone;
    document.getElementById("success-order-address").innerText = order.customer.address;
    document.getElementById("success-order-payment").innerText = order.customer.paymentMethod;

    successModal.classList.add("active");

    document.getElementById("close-success-modal")?.addEventListener("click", () => {
      successModal.classList.remove("active");
      renderProducts();
    });
  }

  // =========================================================================
  // DANH SÁCH YÊU THÍCH (WISHLIST)
  // =========================================================================
  function initWishlistUI() {
    const wishlistModal = document.getElementById("wishlist-modal");
    const openWishlistBtns = document.querySelectorAll(".btn-open-wishlist");
    const closeWishlistBtn = document.getElementById("close-wishlist-modal");

    function renderWishlist() {
      const container = document.getElementById("wishlist-items-container");
      const ids = window.cartManager.wishlist;
      const products = PRODUCTS_DATA.filter(p => ids.includes(p.id));

      document.querySelectorAll(".wishlist-badge-count").forEach(b => {
        b.innerText = ids.length;
        b.style.display = ids.length > 0 ? "flex" : "none";
      });

      if (!container) return;

      if (products.length === 0) {
        container.innerHTML = `
          <div class="py-12 text-center text-slate-400">
            <span class="text-3xl block mb-2">❤️</span>
            <p class="text-xs">Chưa có sản phẩm nào trong danh sách yêu thích.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = products.map(p => `
        <div class="flex items-center justify-between p-2.5 rounded-lg bg-[#121316] border border-white/5">
          <div class="flex items-center gap-3">
            <img src="${p.image}" class="w-12 h-12 rounded-lg object-cover">
            <div>
              <h5 class="text-xs font-semibold text-slate-100">${p.name}</h5>
              <p class="text-[11px] text-blue-400 font-bold">${p.price.toLocaleString("vi-VN")}đ</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold wishlist-move-cart" data-id="${p.id}">
              Thêm giỏ
            </button>
            <button class="p-1 text-slate-400 hover:text-red-400 wishlist-remove" data-id="${p.id}">
              ✕
            </button>
          </div>
        </div>
      `).join("");

      container.querySelectorAll(".wishlist-move-cart").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          window.cartManager.addToCart(id, 1);
          showToast("Đã chuyển vào giỏ hàng!", "success");
        });
      });

      container.querySelectorAll(".wishlist-remove").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          window.cartManager.toggleWishlist(id);
          renderWishlist();
          renderProducts();
        });
      });
    }

    window.renderWishlist = renderWishlist;

    openWishlistBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        renderWishlist();
        if (wishlistModal) wishlistModal.classList.add("active");
      });
    });

    closeWishlistBtn?.addEventListener("click", () => {
      if (wishlistModal) wishlistModal.classList.remove("active");
    });

    window.addEventListener("wishlist:updated", renderWishlist);
    renderWishlist();
  }

  // =========================================================================
  // CYBERBOT AI CHATBOT CONTROLLER
  // =========================================================================
  function initAIChatUI() {
    const clearChatBtn = document.getElementById("clear-chat-btn");
    const messagesContainer = document.getElementById("chat-messages-container");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-chat-btn");
    const voiceBtn = document.getElementById("voice-chat-btn");
    const openConfigBtn = document.getElementById("open-ai-config-btn");
    const configModal = document.getElementById("ai-config-modal");
    const saveConfigBtn = document.getElementById("save-ai-config-btn");
    const closeConfigBtn = document.getElementById("close-ai-config-modal");

    clearChatBtn?.addEventListener("click", () => {
      if (messagesContainer) {
        messagesContainer.innerHTML = "";
        const welcome = window.aiConsultant.getInitialWelcome();
        window.appendAIMessage(welcome.text, welcome.recommendations, welcome.quickReplies);
        showToast("Đã làm mới cuộc hội thoại cùng CyberBot", "info");
      }
    });

    async function handleSend() {
      const text = chatInput?.value?.trim();
      if (!text) return;

      appendUserMessage(text);
      chatInput.value = "";

      const typingEl = appendTypingIndicator();
      if (messagesContainer) messagesContainer.scrollTop = messagesContainer.scrollHeight;

      try {
        const response = await window.aiConsultant.processMessage(text);
        typingEl?.remove();
        if (response) {
          window.appendAIMessage(response.text, response.recommendations, response.quickReplies);
        }
      } catch (err) {
        typingEl?.remove();
        window.appendAIMessage("Xin lỗi bạn, kết nối gián đoạn. Bạn thử gửi lại câu hỏi nhé!");
      }
    }

    sendBtn?.addEventListener("click", handleSend);
    chatInput?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });

    // Voice recognition
    if (voiceBtn) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = "vi-VN";
        recognition.interimResults = false;

        voiceBtn.addEventListener("click", () => {
          voiceBtn.innerHTML = `🎙️...`;
          showToast("Đang lắng nghe giọng nói tiếng Việt...", "info");
          recognition.start();
        });

        recognition.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          if (chatInput) chatInput.value = transcript;
          voiceBtn.innerHTML = "🎙️";
          handleSend();
        };

        recognition.onerror = () => {
          voiceBtn.innerHTML = "🎙️";
          showToast("Không thể nhận diện mic hoặc chưa cấp quyền trên trình duyệt!", "error");
        };

        recognition.onend = () => {
          voiceBtn.innerHTML = "🎙️";
        };
      } else {
        voiceBtn.style.display = "none";
      }
    }

    // Config modal
    openConfigBtn?.addEventListener("click", () => {
      const keyInput = document.getElementById("gemini-api-key-input");
      if (keyInput) keyInput.value = window.aiConsultant.apiKey;
      if (configModal) configModal.classList.add("active");
    });

    closeConfigBtn?.addEventListener("click", () => {
      if (configModal) configModal.classList.remove("active");
    });

    saveConfigBtn?.addEventListener("click", () => {
      const keyInput = document.getElementById("gemini-api-key-input");
      const modelSelect = document.getElementById("gemini-model-select");
      window.aiConsultant.setApiKey(keyInput.value, modelSelect?.value || "gemini-1.5-flash");
      if (configModal) configModal.classList.remove("active");
      showToast(keyInput.value ? "Đã lưu Gemini API Key thành công!" : "Đã chuyển về Smart Local NLP Engine", "success");
    });

    function appendUserMessage(text) {
      if (!messagesContainer) return;
      const msgEl = document.createElement("div");
      msgEl.className = "flex justify-end mb-3";
      msgEl.innerHTML = `
        <div class="chat-bubble-user max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow">
          ${escapeHTML(text)}
        </div>
      `;
      messagesContainer.appendChild(msgEl);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function appendTypingIndicator() {
      if (!messagesContainer) return null;
      const el = document.createElement("div");
      el.className = "flex items-start gap-2 mb-3";
      el.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white">🤖</div>
        <div class="chat-bubble-bot px-3.5 py-2 rounded-2xl text-xs">
          <span>CyberBot đang suy nghĩ...</span>
        </div>
      `;
      messagesContainer.appendChild(el);
      return el;
    }

    window.appendAIMessage = function(markdownText, recommendations = [], quickReplies = []) {
      if (!messagesContainer) return;
      const msgEl = document.createElement("div");
      msgEl.className = "flex items-start gap-2 mb-3.5";

      const formattedHTML = formatMarkdown(markdownText);

      let recsHTML = "";
      if (recommendations && recommendations.length > 0) {
        recsHTML = `
          <div class="mt-2 flex flex-col gap-1.5">
            <span class="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Thiết bị gợi ý liên quan:</span>
            ${recommendations.map(p => `
              <div class="p-2 rounded-lg flex items-center gap-2 bg-[#121316] border border-white/5">
                <img src="${p.image}" class="w-10 h-10 rounded object-cover flex-shrink-0">
                <div class="flex-1 min-w-0">
                  <h6 class="text-[11px] font-semibold truncate text-slate-100">${p.name}</h6>
                  <p class="text-[10px] text-blue-400 font-bold">${p.price.toLocaleString("vi-VN")}đ</p>
                </div>
                <div class="flex items-center gap-1">
                  <button class="chat-view-btn px-2 py-1 rounded bg-[#1b1d24] hover:bg-[#282b35] text-white text-[10px] transition" data-id="${p.id}">
                    Xem
                  </button>
                  <button class="chat-add-btn px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold transition" data-id="${p.id}">
                    + Giỏ
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        `;
      }

      let quickHTML = "";
      if (quickReplies && quickReplies.length > 0) {
        quickHTML = `
          <div class="mt-2 flex flex-wrap gap-1">
            ${quickReplies.map(q => `
              <button class="chat-quick-pill text-[10px] px-2.5 py-1 rounded-full bg-[#1b1d24] hover:bg-blue-600 hover:text-white border border-white/10 text-slate-300 transition">
                ${escapeHTML(q)}
              </button>
            `).join("")}
          </div>
        `;
      }

      msgEl.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white text-[11px] font-bold shadow">
          🤖
        </div>
        <div class="flex-1 min-w-0">
          <div class="chat-bubble-bot px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm">
            <div class="ai-text-content space-y-1">
              ${formattedHTML}
            </div>
            ${recsHTML}
          </div>
          ${quickHTML}
          <div class="flex items-center gap-2 mt-1 px-1">
            <button class="chat-speak-btn text-[10px] text-slate-400 hover:text-blue-400 flex items-center gap-1 transition">
              🔊 Đọc to
            </button>
          </div>
        </div>
      `;

      messagesContainer.appendChild(msgEl);

      msgEl.querySelectorAll(".chat-view-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          window.openProductModal(id);
        });
      });

      msgEl.querySelectorAll(".chat-add-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          window.cartManager.addToCart(id, 1);
          const p = PRODUCTS_DATA.find(x => x.id === id);
          showToast(`Đã thêm "${p.name.substring(0, 20)}..." vào giỏ!`, "success");
        });
      });

      msgEl.querySelectorAll(".chat-quick-pill").forEach(pill => {
        pill.addEventListener("click", () => {
          if (chatInput) chatInput.value = pill.innerText.trim();
          handleSend();
        });
      });

      msgEl.querySelector(".chat-speak-btn")?.addEventListener("click", () => {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const cleanText = markdownText.replace(/[*#_`|]/g, "");
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.lang = "vi-VN";
          utterance.rate = 1.05;
          window.speechSynthesis.speak(utterance);
        }
      });

      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };
  }

  // =========================================================================
  // MOBILE BOTTOM NAVIGATION
  // =========================================================================
  function initMobileBottomNav() {
    const navItems = document.querySelectorAll(".mobile-nav-item");
    navItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const target = item.getAttribute("data-target");

        navItems.forEach(n => {
          n.classList.remove("text-blue-400", "font-bold");
          n.classList.add("text-slate-400");
        });
        item.classList.add("text-blue-400", "font-bold");
        item.classList.remove("text-slate-400");

        if (target === "home") {
          window.closeAIChat();
          window.closeCart();
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (target === "categories") {
          window.closeAIChat();
          window.closeCart();
          document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
        } else if (target === "ai") {
          window.openAIChat();
        } else if (target === "cart") {
          window.openCart();
        } else if (target === "wishlist") {
          window.closeAIChat();
          window.closeCart();
          document.querySelector(".btn-open-wishlist")?.click();
        }
      });
    });
  }

  // =========================================================================
  // TOAST & THEME
  // =========================================================================
  window.showToast = function(message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "fixed top-4 right-4 z-[99999] flex flex-col gap-2 max-w-xs pointer-events-none";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    const colorClass = type === "success" ? "bg-emerald-600" :
                       type === "error" ? "bg-red-600" :
                       "bg-[#1b1d24] border border-white/10";

    toast.className = `app-toast pointer-events-auto flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl ${colorClass} text-white text-xs font-medium shadow-2xl`;
    toast.innerHTML = `
      <span>${type === "success" ? "✓" : type === "error" ? "✕" : "ℹ"}</span>
      <p class="flex-1 leading-snug">${escapeHTML(message)}</p>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-8px)";
      toast.style.transition = "all 0.22s ease";
      setTimeout(() => toast.remove(), 220);
    }, 2800);
  };

  function initThemeToggle() {
    const toggleBtns = document.querySelectorAll(".btn-toggle-theme");
    toggleBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light-theme");
        localStorage.setItem("techzone_theme", isLight ? "light" : "dark");
        updateThemeIcon(isLight);
      });
    });
  }

  function updateThemeIcon(isLight) {
    document.querySelectorAll(".theme-icon").forEach(icon => {
      icon.innerHTML = isLight ? "🌙" : "☀️";
    });
  }

  function formatMarkdown(text) {
    if (!text) return "";

    const lines = text.split("\n");
    let inTable = false;
    let tableHTML = "";
    let result = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("|") && line.endsWith("|")) {
        if (!inTable) {
          inTable = true;
          tableHTML = "<table class='w-full border-collapse my-2 text-[11px]'><tbody>";
        }
        if (line.includes("---")) continue;

        const cells = line.split("|").slice(1, -1);
        tableHTML += "<tr>" + cells.map(c => `<td class='border border-slate-700/60 p-1.5'>${c.trim()}</td>`).join("") + "</tr>";
      } else {
        if (inTable) {
          tableHTML += "</tbody></table>";
          result.push(tableHTML);
          inTable = false;
          tableHTML = "";
        }
        result.push(line);
      }
    }
    if (inTable) {
      tableHTML += "</tbody></table>";
      result.push(tableHTML);
    }

    return result.join("\n")
      .replace(/\n\n/g, "<br><br>")
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code class='bg-slate-800 px-1 py-0.5 rounded text-blue-300'>$1</code>");
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
});
