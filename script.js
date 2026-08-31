/**
 * معلم دهانات وديكورات الرياض | High-Performance Multi-Page Engine
 * Core Web Vitals +98% Optimized | Google Ads Fast Tracking Architecture
 */

(function () {
  'use strict';

  // ==========================================
  // 1. ثوابت المشروع وإعدادات التتبع
  // ==========================================
  const CONFIG = {
    phoneLocal: '0531880725',
    phoneInternational: '966531880725',
    devPhone: '966578539687',
    googleAdsId: 'AW-xxxxxxxxxxxxx',
    callConversionLabel: 'xxxxxxxxxxxxxxxxx',
    waConversionLabel: 'xxxxxxxxxxxxxx',
    formConversionLabel: 'xxxxxxxxxxxxxxxxxxx',
    brandName: 'معلم دهانات وديكورات الرياض'
  };

  // التحقق مما إذا كان المستخدم هو المطور لاستثنائه من احتساب الإعلانات
  function isDeveloperSession() {
    return (
      window.location.search.includes('dev_mode=true') ||
      localStorage.getItem('is_dev_user') === 'true'
    );
  }

  // ==========================================
  // 2. تحميل Google Ads و gtag عبر requestIdleCallback لمنع حظر العرض
  // ==========================================
  function initGoogleAdsTracking() {
    if (isDeveloperSession()) {
      console.warn('[Tracking Disabled]: Developer Mode Active.');
      return;
    }

    const loadAdsScript = () => {
      if (document.getElementById('google-ads-gtag')) return;

      const script = document.createElement('script');
      script.id = 'google-ads-gtag';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.googleAdsId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', CONFIG.googleAdsId);
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadAdsScript, { timeout: 3000 });
    } else {
      setTimeout(loadAdsScript, 2000);
    }
  }

  // إرسال حدث التحويل
  function triggerConversion(label, callback) {
    if (isDeveloperSession() || typeof window.gtag !== 'function') {
      if (typeof callback === 'function') callback();
      return;
    }

    let callbackCalled = false;
    const executeCallback = () => {
      if (!callbackCalled && typeof callback === 'function') {
        callbackCalled = true;
        callback();
      }
    };

    // مهلة زمنية احتياطية (Fallback)
    setTimeout(executeCallback, 600);

    window.gtag('event', 'conversion', {
      send_to: `${CONFIG.googleAdsId}/${label}`,
      event_callback: executeCallback
    });
  }

  // ==========================================
  // 3. التحكم بقائمة الجوال الذكية (3-Line Hamburger)
  // ==========================================
  function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-btn');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    const closeBtn = document.querySelector('.close-drawer-btn');
    const navLinks = document.querySelectorAll('.mobile-nav-links a');

    if (!hamburger || !drawer || !backdrop) return;

    const openMenu = () => {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.classList.add('menu-open');
    };

    const closeMenu = () => {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.classList.remove('menu-open');
    };

    hamburger.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ==========================================
  // 4. زر الصعود للأعلى وزر الاتصال العائم
  // ==========================================
  function initScrollBehavior() {
    const scrollBtn = document.querySelector('.floating-scroll-left');
    if (!scrollBtn) return;

    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 300) {
          scrollBtn.classList.add('show');
        } else {
          scrollBtn.classList.remove('show');
        }
      },
      { passive: true }
    );

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 5. ربط أحداث التحويل بروابط الاتصال والواتساب
  // ==========================================
  function initConversionTrackingEvents() {
    // جميع روابط الواتساب
    const waLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]');
    waLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        if (this.href.includes(CONFIG.devPhone)) return;

        e.preventDefault();
        const targetUrl = this.href;
        triggerConversion(CONFIG.waConversionLabel, () => {
          window.open(targetUrl, '_blank', 'noopener,noreferrer');
        });
      });
    });

    // جميع روابط الاتصال
    const telLinks = document.querySelectorAll('a[href^="tel:"]');
    telLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        if (this.href.includes(CONFIG.devPhone)) return;

        e.preventDefault();
        const targetUrl = this.href;
        triggerConversion(CONFIG.callConversionLabel, () => {
          window.location.href = targetUrl;
        });
      });
    });
  }

  // ==========================================
  // 6. حاسبة أسعار الدهانات والديكورات التفاعلية
  // ==========================================
  function initPaintsCalculator() {
    const calcForm = document.getElementById('paintsPriceCalculator');
    if (!calcForm) return;

    const serviceSelect = document.getElementById('calcServiceType');
    const paintTypeSelect = document.getElementById('calcPaintType');
    const areaInput = document.getElementById('calcArea');
    const priceDisplay = document.getElementById('calcEstimatedPrice');
    const submitBtn = document.getElementById('calcSubmitWhatsapp');

    // مصفوفة الأسعار التقديرية بالريال للمتر المربع/الطولي
    const rates = {
      interior: { jotun: 18, jazeera: 16, luxury_decor: 35, standard: 12 },
      exterior: { profile: 32, texture: 28, stone_shield: 45, standard: 24 },
      wood_cladding: { korean: 95, national: 75, tv_unit: 140, luxury: 120 },
      marble_alternative: { sheet_uv: 160, calacatta: 190, with_strip: 220, standard: 140 },
      gypsum_board: { regular_ceiling: 65, moisture_resistant: 85, partitions: 95, tv_wall: 130 },
      renovation: { full_apartment: 45, bathroom_restoration: 60, cracks_moisture: 35, doors_painting: 80 }
    };

    function calculate() {
      const srv = serviceSelect ? serviceSelect.value : 'interior';
      const paint = paintTypeSelect ? paintTypeSelect.value : 'jotun';
      const area = parseFloat(areaInput ? areaInput.value : 100) || 100;

      const unitPrice = rates[srv] && rates[srv][paint] ? rates[srv][paint] : 20;
      const total = unitPrice * area;

      if (priceDisplay) {
        priceDisplay.textContent = `يبدأ من ${total.toLocaleString('ar-SA')} ريال تقريباً`;
      }
      return { srv, paint, area, total, unitPrice };
    }

    [serviceSelect, paintTypeSelect, areaInput].forEach((el) => {
      if (el) el.addEventListener('input', calculate);
    });

    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const res = calculate();
        const srvText = serviceSelect.options[serviceSelect.selectedIndex].text;
        const paintText = paintTypeSelect.options[paintTypeSelect.selectedIndex].text;

        const message = `السلام عليكم ورحمة الله، أود طلب تسعيرة وحجز موعد لمعاينة دهانات وديكورات بالرياض:\n\n- الخدمة المطلوبة: ${srvText}\n- نوع الدهان/الخامة: ${paintText}\n- المساحة/الأمتار التقريبية: ${res.area} متر\n- التقدير المبدئي: ${res.total} ريال\n\nأرجو تزويدي بالموعد المتاح لزيارة الموقع ورفع المقاسات بدقة.`;
        const waUrl = `https://wa.me/${CONFIG.phoneInternational}?text=${encodeURIComponent(message)}`;

        triggerConversion(CONFIG.formConversionLabel, () => {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        });
      });
    }
  }

  // معالجة النماذج العامة
  function initSmartForms() {
    const contactForms = document.querySelectorAll('.smart-contact-form');
    contactForms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = form.querySelector('[name="name"]');
        const phoneInput = form.querySelector('[name="phone"]');
        const serviceInput = form.querySelector('[name="service"]');
        const noteInput = form.querySelector('[name="notes"]');

        const name = nameInput ? nameInput.value.trim() : 'عميل';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        const service = serviceInput ? serviceInput.value : 'عام';
        const notes = noteInput ? noteInput.value.trim() : 'لا توجد ملاحظات';

        const message = `طلب معاينة وخدمة دهانات وديكورات جديد:\n\n- الاسم: ${name}\n- الجوال: ${phone}\n- الخدمة: ${service}\n- التفاصيل والحي: ${notes}`;
        const waUrl = `https://wa.me/${CONFIG.phoneInternational}?text=${encodeURIComponent(message)}`;

        triggerConversion(CONFIG.formConversionLabel, () => {
          window.location.href = 'thank-you.html';
          setTimeout(() => {
            window.open(waUrl, '_blank', 'noopener,noreferrer');
          }, 400);
        });
      });
    });
  }

  // ==========================================
  // 7. استرجاع الصور التلقائي عند أي خطأ
  // ==========================================
  function initImageFallbacks() {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      img.addEventListener('error', function () {
        if (!this.getAttribute('data-fallback-applied')) {
          this.setAttribute('data-fallback-applied', 'true');
          this.src = 'images/logo_result.webp';
        }
      });
    });
  }

  // ==========================================
  // 8. تشغيل وتنسيق المحرك عند تحميل الصفحة
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollBehavior();
    initConversionTrackingEvents();
    initPaintsCalculator();
    initSmartForms();
    initImageFallbacks();
    initGoogleAdsTracking();
  });
})();
