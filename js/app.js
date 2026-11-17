/**
 * AgriShield (AgroVision) - Main Web Application Logic & Bilingual Engine
 * Precision Agriculture & Foliar Protection Decision-Support System
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D Scene
  let scene3D = null;
  if (typeof window.initAgriShield3D === 'function') {
    scene3D = window.initAgriShield3D('scene-viewport');
  }

  // 2. Bilingual Dictionaries (English & Arabic)
  const translations = {
    en: {
      site_title: 'AgriShield (AgroVision)',
      site_subtitle: 'Proactive Decision-Support System for Precision Agriculture & Foliar Protection',
      domain_tag: 'Domain: Precision Agriculture & Edge AI • Multimodal Fusion & HITL',
      
      // Nav
      nav_overview: 'Overview',
      nav_lab: '3D Anatomy Lab',
      nav_pillars: 'System Pillars',
      nav_arch: 'Multimodal Arch',
      nav_demos: 'Live Simulators',
      nav_impact: 'Academic Impact',
      nav_gallery: 'Visual Gallery',
      nav_proposal: 'Proposal PDF',
      btn_try_scanner: 'Launch AI Scanner',
      
      // Hero
      hero_badge: 'Graduation Project 2026 • Edge AI & Microclimate Fusion',
      hero_title_1: 'Proactive Foliar Protection',
      hero_title_2: 'Before Symptoms Appear.',
      hero_desc: 'AgriShield transforms crop health from reactive post-infection chemical flooding into proactive early foliar protection — orchestrating time-series microclimate forecasting, edge deep learning vision, and deterministic soil chemistry with certified Human-in-the-Loop oversight.',
      hero_tag_1: 'Multimodal Data Fusion',
      hero_tag_2: 'Deterministic NPK Titration',
      hero_tag_3: 'Edge PyTorch Vision',
      hero_tag_4: 'Certified Agronomist Gate',
      btn_explore_3d: 'Explore 3D Plant Anatomy',
      btn_read_proposal: 'Download Proposal PDF',
      
      // Stats
      stat_1_val: '97.8',
      stat_1_lbl: 'Diagnostic Accuracy',
      stat_2_val: '<140',
      stat_2_lbl: 'Edge Latency (ms)',
      stat_3_val: '35',
      stat_3_lbl: 'Chemical Runoff Reduction (%)',
      stat_4_val: '100',
      stat_4_lbl: 'HITL High-Risk Audited (%)',

      // 3D Lab
      lab_badge: 'WebGL Interactive 3D Digital Twin',
      lab_title: 'Interactive Plant Anatomy & AI Scanning Chamber',
      lab_desc: 'Rotate, dissect, and inspect the plant anatomy in 3D space. Explore how AgriShield integrates foliar computer vision, vascular fluidics, and rhizosphere soil chemistry.',
      preset_overview: '🌿 Consolidated View',
      preset_exploded: '💥 Explode 3D Anatomy',
      preset_leaves: '🍃 Foliar Canopy Zoom',
      preset_stem: '🔬 Vascular Cross-Section',
      preset_roots: '🌾 Rhizosphere & Roots',
      preset_gallery: '🖼️ 3D Image Carousel',
      
      toggle_laser: '⚡ AI Laser Scanner',
      toggle_particles: '💧 Microclimate Mist',
      toggle_spores: '⚠️ Spore Outbreak Sim',
      toggle_rotate: '🔄 Auto-Orbit',

      // Pillars
      pillars_badge: 'Three Operational Pillars (ركائز النظام)',
      pillars_title: 'Engineered for Proactive Field Immunity',
      pillars_desc: 'Rooted in the official project proposal, AgriShield operates on three synchronized pillars to replace late reactive treatment with early mathematical precision.',
      
      p1_title: '1. Predictive Microclimate Analytics',
      p1_desc: 'Continuous real-time ingestion of microclimate indicators (Air Temperature, Relative Humidity, and Leaf Wetness Duration) to model pathogen spore incubation curves days before any visible lesions develop.',
      p1_f1: 'Leaf Wetness Duration (LWD) integration',
      p1_f2: 'Fungal/bacterial outbreak risk forecasting',
      p1_f3: 'Proactive preventative spraying window',

      p2_title: '2. Edge Vision & Foliar Pathology',
      p2_desc: 'Custom deep convolutional networks (PyTorch / TensorFlow) deployed on edge mobile devices, delivering instant offline foliar disease classification with calibrated confidence scores.',
      p2_f1: 'Instant lesion detection from mobile camera',
      p2_f2: 'Multi-class foliar pathogen taxonomy',
      p2_f3: 'Calibrated confidence thresholds & bounding boxes',

      p3_title: '3. Deterministic Soil & Chemical Titration',
      p3_desc: 'Strict mathematical engine computing micro-dosed NPK fertilization ratios and pesticide volume based on field dimensions, crop growth stage, and dynamic soil pH/fertility laboratory metrics.',
      p3_f1: 'Precision NPK element calculation',
      p3_f2: 'Zero chemical leaf burn or overspray',
      p3_f3: 'Groundwater ecological runoff prevention',

      // Paradigm Shift
      paradigm_old_title: 'Reactive Management (Legacy Paradigm)',
      paradigm_old_desc: 'Farmers inspect crops manually only after severe chlorosis and wilting appear. Chemical pesticides are dumped indiscriminately, burning foliage, contaminating groundwater, and driving high financial losses.',
      paradigm_new_title: 'AgriShield Proactive Decision-Support (New Paradigm)',
      paradigm_new_desc: 'Predicts pathogen incubation prior to visible symptoms. Prescribes calibrated micro-doses verified by certified agronomists, reducing chemical waste by 35% while maximizing crop yield.',

      // Multimodal Architecture
      arch_badge: 'Multimodal System Architecture',
      arch_title: '5-Tier Distributed Technical Pipeline',
      arch_desc: 'Bridging field sensors, edge neural networks, deterministic agronomy algorithms, and certified agronomist web gateways into a unified decision ecosystem.',

      // Demos Section
      demos_badge: 'Live Interactive Simulators',
      demos_title: 'Experience AgriShield Engines in Action',
      demos_desc: 'Test each core subsystem directly in your browser: AI foliar scanner, microclimate disease predictor, NPK fertilizer calculator, and human-in-the-loop review station.',
      tab_scanner: 'AI Foliar Scanner',
      tab_climate: 'Microclimate Predictor',
      tab_titration: 'NPK Titration Engine',
      tab_hitl: 'HITL Expert Station',

      // Innovation
      inno_badge: 'Innovation & Academic Value',
      inno_title: 'Scientific Impact & Deliverables',
      inno_desc: 'Demonstrating real-world feasibility, technological innovation, and ecological protection for graduation capstone standards.',
      
      inno_1_title: 'Multimodal Data Fusion',
      inno_1_desc: 'Synchronous synthesis of unstructured visual imagery with continuous microclimate time-series and laboratory soil chemistry in a unified decision platform.',
      inno_2_title: 'Human-in-the-Loop Safety Gate',
      inno_2_desc: 'Eliminating catastrophic autonomous AI failure modes by gating high-toxicity or low-confidence treatments through certified agronomist portals before spraying.',
      inno_3_title: 'Ecological & Financial ROI',
      inno_3_desc: 'Reduces smallholder farmer operational expenditures by cutting redundant chemical purchases by ~35% and preserving beneficial soil microbiome.',

      // Gallery
      gallery_badge: 'Visual Asset Studio',
      gallery_title: 'High-Resolution Botanical Diagnostics',
      gallery_desc: 'All empirical assets provided for the AgriShield graduation project, exhibiting plant cellular morphology from leaf cuticle to underground rhizosphere.',
      
      // Proposal Box
      proposal_cta_title: 'Download Full Academic Proposal PDF',
      proposal_cta_desc: 'Access the complete project specification submitted for the Graduation Project: "AgriShield (AgroVision) - A Proactive Decision-Support System for Precision Agriculture & Foliar Protection".',
      btn_download_pdf: 'Download Proposal PDF (98 KB)',
      btn_view_pdf: 'View PDF Document'
    },
    ar: {
      site_title: 'AgriShield (AgroVision)',
      site_subtitle: 'منظومة دعم القرار الاستباقي للزراعة الدقيقة وحماية الأوراق النباتية',
      domain_tag: 'المجال: الزراعة الدقيقة والذكاء الاصطناعي الطرفي • دمج متعدد الوسائط مع التدخل البشري HITL',
      
      // Nav
      nav_overview: 'نظرة عامة',
      nav_lab: 'مختبر التشريح 3D',
      nav_pillars: 'ركائز النظام',
      nav_arch: 'المعمارية التقنية',
      nav_demos: 'المحاكيات الحية',
      nav_impact: 'الأثر الأكاديمي',
      nav_gallery: 'معرض الصور',
      nav_proposal: 'المقترح (PDF)',
      btn_try_scanner: 'تشغيل ماسح الذكاء الاصطناعي',

      // Hero
      hero_badge: 'مشروع التخرج 2026 • دمج الذكاء الاصطناعي والمناخ الدقيق',
      hero_title_1: 'حماية استباقية للأوراق',
      hero_title_2: 'قبل ظهور أي أعراض.',
      hero_desc: 'يمثل مشروع AgriShield منظومة متطورة لدعم القرار الزراعي تهدف إلى التحول الجذري في إدارة الحقول من مجرد رد فعل علاجي بعد إصابة النباتات إلى الوقاية الاستباقية المبكرة، بدمج تحليلات المناخ الدقيق، ونماذج الرؤية الحاسوبية، وخوارزميات المعايرة الكيميائية الدقيقة مع بوابات التدخل البشري المتخصص (Human-in-the-Loop).',
      hero_tag_1: 'تكامل متعدد الوسائط (Multimodal)',
      hero_tag_2: 'معايرة حتمية لجرعات NPK',
      hero_tag_3: 'رؤية حاسوبية طرفية PyTorch',
      hero_tag_4: 'اعتماد المهندسين الزراعيين (HITL)',
      btn_explore_3d: 'استكشاف تشريح النبات ثلاثي الأبعاد',
      btn_read_proposal: 'تحميل مقترح المشروع (PDF)',

      // Stats
      stat_1_val: '97.8',
      stat_1_lbl: 'دقة التشخيص التشريحي (%)',
      stat_2_val: '<140',
      stat_2_lbl: 'زمن الاستجابة الطرفي (مللي ثانية)',
      stat_3_val: '35',
      stat_3_lbl: 'نسبة خفض الهدر الكيميائي (%)',
      stat_4_val: '100',
      stat_4_lbl: 'اعتماد الحالات الحرجة عبر الخبير (%)',

      // 3D Lab
      lab_badge: 'التوأم الرقمي التفاعلي WebGL 3D',
      lab_title: 'مختبر تشريح النبات التفاعلي وغرفة الفحص الذكي',
      lab_desc: 'قم بتدوير، وتفكيك، وفحص أجزاء النبات في الفضاء ثلاثي الأبعاد. اكتشف كيف يربط نظام AgriShield بين فحص الأوراق السطحية، وأنابيب النقل الوعائي، وكيمياء الجذور والتربة.',
      preset_overview: '🌿 العرض الشامل الموحد',
      preset_exploded: '💥 تفكيك التشريح 3D',
      preset_leaves: '🍃 تكبير مظلة الأوراق',
      preset_stem: '🔬 مقطع الساق الوعائي',
      preset_roots: '🌾 شبكة الجذور والتربة',
      preset_gallery: '🖼️ معرض الصور ثلاثي الأبعاد',

      toggle_laser: '⚡ ليزر المسح الذكي',
      toggle_particles: '💧 محاكاة رطوبة المناخ',
      toggle_spores: '⚠️ محاكاة تفشي الجراثيم',
      toggle_rotate: '🔄 دوران سينمائي تلقائي',

      // Pillars
      pillars_badge: 'ركائز النظام التشغيلية الثلاث',
      pillars_title: 'هندسة وقائية لمناعة الحقول الاستباقية',
      pillars_desc: 'استناداً إلى وثيقة مقترح المشروع الرسمية، يعتمد نظام AgriShield على ثلاث ركائز مترابطة لتحويل إدارة المحاصيل من التدخل العلاجي المتأخر إلى الدقة الحسابية الوقائية المبكرة.',

      p1_title: '1. التنبؤ الاستباقي بالمناخ الدقيق',
      p1_desc: 'تحليل مستمر لمؤشرات الطقس الدقيق (درجة الحرارة، الرطوبة النسبية، وفترة بلل الأوراق LWD) للتنبؤ بتفشي الفطريات والبكتيريا قبل ظهور أي أثر مرئي على المحصول.',
      p1_f1: 'حساب فترة بلل الأوراق (Leaf Wetness Duration)',
      p1_f2: 'التنبؤ بحضانة الجراثيم الفطرية مسبقاً',
      p1_f3: 'تحديد نافذة الرش الوقائي الدقيقة',

      p2_title: '2. الرؤية الحاسوبية والتشخيص الطرفي',
      p2_desc: 'نموذج تعلم عميق (PyTorch / TensorFlow) مدرب خصيصاً لتصنيف أمراض الأوراق النباتية فورياً من صور الهواتف الذكية مع تقديم درجات ثقة واضحة ومعايرة لكل تشخيص.',
      p2_f1: 'تشخيص فوري للأمراض عبر كاميرا الموبايل',
      p2_f2: 'تصنيف متعدد الفئات للأمراض الفطرية والبكتيرية',
      p2_f3: 'تحديد مناطق الإصابة بدرجات ثقة دقيقة',

      p3_title: '3. معايرة الجرعات وكيمياء التربة',
      p3_desc: 'محرك خوارزمي حتمي دقيق يحسب نسب العناصر التسميدية (NPK) وجرعات المبيدات آلياً بالاعتماد على مساحة الحقل، ونوع المحصول، وقياسات حموضة وخصوبة التربة (pH/NPK).',
      p3_f1: 'حساب دقيق لمركبات اليوريا وسوبر فوسفات وبوتاسيوم',
      p3_f2: 'منع احتراق النباتات نتيجة زيادة الجرعات',
      p3_f3: 'حماية المياه الجوفية والتربة من التلوث الكيميائي',

      // Paradigm Shift
      paradigm_old_title: 'الإدارة العلاجية التقليدية (النمط القديم)',
      paradigm_old_desc: 'فحص يدوي بصري متأخر بعد ذبول المحصول واشتداد العدوى، يعقبه رش عشوائي مفرط للمبيدات يسبب حروقاً للأوراق، وإهداراً فادحاً للمال، وتلويثاً بيئياً للمياه الجوفية.',
      paradigm_new_title: 'منظومة AgriShield الاستباقية (النمط الحديث)',
      paradigm_new_desc: 'تنبؤ استباقي بحضانة العدوى قبل الرؤية بالعين المجردة، وتحديد جرعات دقيقة ومقيدة معتمدة من مهندسين زراعيين، مما يوفر 35% من الكيماويات ويحافظ على الإنتاجية الزراعية.',

      // Multimodal Architecture
      arch_badge: 'المعمارية التقنية والتكامل متعدد الوسائط',
      arch_title: 'طبقات النظام الخمس (Multimodal 5-Tier)',
      arch_desc: 'تنسيق متناغم بين أجهزة الاستشعار الميدانية، ونماذج التعلم العميق، والحسابات الحتمية، وبوابة المهندسين الزراعيين المعتمدين.',

      // Demos Section
      demos_badge: 'المحاكيات التفاعلية الحية',
      demos_title: 'جرّب محركات AgriShield مباشرة في المتصفح',
      demos_desc: 'اختبر وظائف النظام الأساسية: ماسح أمراض الأوراق، محاكي مخاطر المناخ وتفشي الفطريات، حاسبة التسميد الدقيق NPK، ومحطة اعتماد المهندس الزراعي.',
      tab_scanner: 'ماسح أوراق النبات AI',
      tab_climate: 'محاكي مناخ الأمراض',
      tab_titration: 'حاسبة جرعات NPK الدقيقة',
      tab_hitl: 'بوابة اعتماد الخبير HITL',

      // Innovation
      inno_badge: 'الابتكار والأثر المتوقع',
      inno_title: 'القيمة العلمية والأثر البيئي والاقتصادي',
      inno_desc: 'إثبات الجدوى الميدانية، والابتكار الخوارزمي، والأمان التشغيلي المعتمد لمعايير مشروعات التخرج الرائدة.',

      inno_1_title: 'التكامل متعدد الوسائط (Multimodal Data Fusion)',
      inno_1_desc: 'الدمج المتزامن بين البيانات الصورية غير المهيكلة (Foliar Images) وبيانات السلاسل الزمنية للمناخ وكيمياء التربة في منصة اتخاذ قرار موحدة.',
      inno_2_title: 'الأمان والموثوقية (Human-in-the-Loop)',
      inno_2_desc: 'وضع بوابات اعتماد يدوي للخبراء الزراعيين المعتمدين لمنع الأخطاء الكارثية في التدخلات الكيميائية ذات التأثير الحرج قبل رش المحصول.',
      inno_3_title: 'المردود الاقتصادي والبيئي المستدام',
      inno_3_desc: 'تقليل تكاليف التشغيل للمزارع الصغير عبر خفض الفاقد الكيميائي بنحو 35%، وحماية التنوع الحيوي للتربة، ومنع الجريان السام للمبيدات.',

      // Gallery
      gallery_badge: 'معرض الأصول المرئية والتشريحية',
      gallery_title: 'التشخيص البصري عالي الدقة للنبات',
      gallery_desc: 'جميع الصور والأصول المعتمدة في مشروع تخرج AgriShield، موثقة بالكامل من بشرة الأوراق حتى الشعيرات الجذرية العميقة.',

      // Proposal Box
      proposal_cta_title: 'تحميل مقترح المشروع الأكاديمي كاملاً (PDF)',
      proposal_cta_desc: 'اطّلع على وثيقة المقترح الرسمية المعتمدة لمشروع التخرج: "AgriShield (AgroVision) - منظومة دعم القرار الاستباقي للزراعة الدقيقة وحماية الأوراق".',
      btn_download_pdf: 'تحميل ملف المقترح (98 ك.ب)',
      btn_view_pdf: 'معاينة المقترح'
    }
  };

  let currentLang = 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    const isAr = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', isAr);

    // Update lang button text
    const langBtnText = document.getElementById('lang-btn-text');
    if (langBtnText) {
      langBtnText.textContent = isAr ? 'English' : 'العربية';
    }

    // Replace all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Replace data-i18n-html elements if any
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  }

  // Toggle Language Click
  const langToggleBtn = document.getElementById('btn-lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const newLang = currentLang === 'en' ? 'ar' : 'en';
      applyLanguage(newLang);
    });
  }

  // ==========================================================
  // 3. 3D Scene UI Controls Binding
  // ==========================================================
  const presetButtons = document.querySelectorAll('.preset-btn');
  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const preset = btn.getAttribute('data-preset');
      if (scene3D) {
        scene3D.setPreset(preset);
      }
    });
  });

  // Toggles
  const toggleLaserBtn = document.getElementById('toggle-laser');
  if (toggleLaserBtn && scene3D) {
    toggleLaserBtn.addEventListener('click', () => {
      const active = scene3D.toggleLaserScanner();
      toggleLaserBtn.classList.toggle('active', active);
    });
  }

  const toggleParticlesBtn = document.getElementById('toggle-particles');
  if (toggleParticlesBtn && scene3D) {
    toggleParticlesBtn.addEventListener('click', () => {
      const active = scene3D.toggleParticles();
      toggleParticlesBtn.classList.toggle('active', active);
    });
  }

  const toggleSporesBtn = document.getElementById('toggle-spores');
  if (toggleSporesBtn && scene3D) {
    toggleSporesBtn.addEventListener('click', () => {
      const active = scene3D.toggleSporeOutbreak();
      toggleSporesBtn.classList.toggle('active', active);
    });
  }

  const toggleRotateBtn = document.getElementById('toggle-rotate');
  if (toggleRotateBtn && scene3D) {
    toggleRotateBtn.addEventListener('click', () => {
      const active = scene3D.toggleAutoRotate();
      toggleRotateBtn.classList.toggle('active', active);
    });
  }

  const btnResetView = document.getElementById('btn-reset-view');
  if (btnResetView && scene3D) {
    btnResetView.addEventListener('click', () => {
      scene3D.setPreset('overview');
      presetButtons.forEach(b => b.classList.remove('active'));
      const ovBtn = document.querySelector('[data-preset="overview"]');
      if (ovBtn) ovBtn.classList.add('active');
    });
  }

  const btnFullscreen = document.getElementById('btn-fullscreen');
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      const container = document.getElementById('scene-viewport');
      if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => alert(err.message));
      } else {
        document.exitFullscreen();
      }
    });
  }

  // Update Telemetry Card when user clicks an organ in 3D
  if (scene3D) {
    scene3D.onSelectOrgan = (data) => {
      const nameEl = document.getElementById('telemetry-name');
      const tagEl = document.getElementById('telemetry-tag');
      const descEl = document.getElementById('telemetry-desc');
      const metricsContainer = document.getElementById('telemetry-metrics');

      if (nameEl) nameEl.textContent = data.name;
      if (tagEl) tagEl.textContent = data.tag;
      if (descEl) descEl.textContent = data.desc;

      if (metricsContainer && data.metrics) {
        metricsContainer.innerHTML = '';
        for (const [key, val] of Object.entries(data.metrics)) {
          const div = document.createElement('div');
          div.className = 'metric-box';
          div.innerHTML = `<span>${key}</span><strong>${val}</strong>`;
          metricsContainer.appendChild(div);
        }
      }
    };
  }

  // Click on Organ Cards under 3D Scene
  const organCards = document.querySelectorAll('.organ-card');
  organCards.forEach((card) => {
    card.addEventListener('click', () => {
      organCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const preset = card.getAttribute('data-target-preset') || 'exploded';
      if (scene3D) {
        scene3D.setPreset(preset);
      }

      // Update preset buttons state
      presetButtons.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-preset') === preset);
      });
    });
  });

  // ==========================================================
  // 4. Interactive Live Demos Logic
  // ==========================================================
  // Tab Switcher
  const demoTabs = document.querySelectorAll('.demo-tab-btn');
  const demoPanels = document.querySelectorAll('.demo-panel');
  demoTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      demoTabs.forEach(t => t.classList.remove('active'));
      demoPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      const panel = document.getElementById(`panel-${target}`);
      if (panel) panel.classList.add('active');
    });
  });

  // ----------------------------------------------------------
  // Demo 1: Foliar AI Scanner
  // ----------------------------------------------------------
  const leafSamples = {
    'sample-1': {
      img: 'assets/card_foliar_leaf.jpg',
      name: 'Early Blight (Alternaria solani)',
      nameAr: 'اللفحة المبكرة (ألترناريا سولاني)',
      confidence: '96.8%',
      severity: 'Moderate (Stage 2)',
      severityAr: 'متوسط (المرحلة الثانية)',
      rx: 'Copper Hydroxide 77% WP (2.5 g/L) + Mancozeb (2 g/L)',
      rxAr: 'هيدروكسيد النحاس 77% (2.5 جم/لتر) + مانكوزيب (2 جم/لتر)',
      hitl: 'NORMAL: Calibrated confident detection. Auto-approved.',
      hitlAr: 'طبيعي: تشخيص معاير عالي الثقة. معتمد تلقائياً.',
      hitlClass: 'text-emerald'
    },
    'sample-2': {
      img: 'assets/card_stem_joint.jpg',
      name: 'Healthy Vegetative Tissue',
      nameAr: 'نسيج نباتي سليم وخالٍ من الإصابة',
      confidence: '99.2%',
      severity: 'Healthy (Zero Lesions)',
      severityAr: 'سليم تماماً (لا توجد آفات)',
      rx: 'No fungicide required. Maintain standard irrigation.',
      rxAr: 'لا يتطلب مبيدات فطرية. استمرار جدول الري الطبيعي.',
      hitl: 'CLEAR: No pathogen threat detected.',
      hitlAr: 'سليم: لم يتم رصد أي تهديد مرضي.',
      hitlClass: 'text-emerald'
    },
    'sample-3': {
      img: 'assets/card_stem_cross_section.jpg',
      name: 'Bacterial Vascular Wilt Risk',
      nameAr: 'اشتباه ذبول وعائي بكتيري (Ralstonia)',
      confidence: '78.4%',
      severity: 'Critical / Low AI Confidence',
      severityAr: 'حرج / دقة ذكاء اصطناعي منخفضة',
      rx: 'Kasugamycin + Copper Oxychloride (Requires Agronomist Audit)',
      rxAr: 'كاسوغاميسين + أوكسي كلوريد النحاس (يتطلب اعتماد الخبير)',
      hitl: 'ESCALATED: Confidence < 85%. Routed to HITL Agronomist Gate.',
      hitlAr: 'تصعيد فوري: نسبة الثقة أقل من 85%. أُحيل لبوابة المهندس الزراعي.',
      hitlClass: 'text-amber'
    },
    'sample-4': {
      img: 'assets/card_roots_rhizosphere.jpg',
      name: 'Root Rhizosphere Salinity Stress',
      nameAr: 'إجهاد ملوحة في المحيط الجذري',
      confidence: '94.5%',
      severity: 'Sub-surface Osmotic Stress',
      severityAr: 'إجهاد أسموزي تحت سطحي',
      rx: 'Humic Acid (5 L/ha) + Soil gypsum leach flushing',
      rxAr: 'حمض الهيوميك (5 لتر/هكتار) + غسيل ترابي بجبس زراعي',
      hitl: 'NORMAL: Soil titration algorithm applied.',
      hitlAr: 'طبيعي: تم تطبيق خوارزمية معايرة التربة.',
      hitlClass: 'text-emerald'
    }
  };

  const sampleThumbs = document.querySelectorAll('.sample-thumb');
  sampleThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      sampleThumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      const sampleKey = thumb.getAttribute('data-sample');
      const data = leafSamples[sampleKey];
      if (!data) return;

      // Update image
      const scannerImg = document.getElementById('scanner-target-img');
      if (scannerImg) scannerImg.src = data.img;

      // Simulate Scanning Progress
      const confFill = document.getElementById('scanner-conf-fill');
      const confVal = document.getElementById('scanner-conf-val');
      const nameEl = document.getElementById('scanner-disease-name');
      const sevEl = document.getElementById('scanner-severity');
      const rxEl = document.getElementById('scanner-rx');
      const hitlEl = document.getElementById('scanner-hitl-status');

      if (confFill) confFill.style.width = '0%';
      if (nameEl) nameEl.textContent = 'Scanning leaf morphology...';

      setTimeout(() => {
        const isAr = currentLang === 'ar';
        if (confFill) confFill.style.width = data.confidence;
        if (confVal) confVal.textContent = data.confidence;
        if (nameEl) nameEl.textContent = isAr ? data.nameAr : data.name;
        if (sevEl) sevEl.textContent = isAr ? data.severityAr : data.severity;
        if (rxEl) rxEl.textContent = isAr ? data.rxAr : data.rx;
        if (hitlEl) hitlEl.textContent = isAr ? data.hitlAr : data.hitl;
      }, 350);
    });
  });

  // ----------------------------------------------------------
  // Demo 2: Microclimate Disease Risk Predictor
  // ----------------------------------------------------------
  const tempInput = document.getElementById('input-temp');
  const humInput = document.getElementById('input-humidity');
  const lwdInput = document.getElementById('input-lwd');

  function calculateMicroclimateRisk() {
    const temp = parseFloat(tempInput ? tempInput.value : 24);
    const hum = parseFloat(humInput ? humInput.value : 85);
    const lwd = parseFloat(lwdInput ? lwdInput.value : 14);

    // Update display values
    const tempVal = document.getElementById('val-temp');
    const humVal = document.getElementById('val-humidity');
    const lwdVal = document.getElementById('val-lwd');

    if (tempVal) tempVal.textContent = `${temp} °C`;
    if (humVal) humVal.textContent = `${hum} %`;
    if (lwdVal) lwdVal.textContent = `${lwd} hrs`;

    // Agronomic Disease Risk Index Formula (Based on Proposal Microclimate Ingestion)
    // Fungal spores thrive when Temp is 18-28°C, Humidity > 80%, LWD > 10 hours
    let tempFactor = 0;
    if (temp >= 15 && temp <= 30) {
      tempFactor = 1 - Math.abs(temp - 24) / 10;
    }
    tempFactor = Math.max(0, Math.min(1, tempFactor));

    const humFactor = Math.max(0, (hum - 40) / 60);
    const lwdFactor = Math.min(1, lwd / 16);

    // Composite Index (0 to 100)
    let riskIndex = Math.round((tempFactor * 0.35 + humFactor * 0.35 + lwdFactor * 0.3) * 100);
    riskIndex = Math.max(5, Math.min(99, riskIndex));

    // Update Gauge
    const gaugeVal = document.getElementById('gauge-risk-val');
    const gaugeStatus = document.getElementById('gauge-risk-status');
    const gaugeCircle = document.getElementById('gauge-circle');
    const incubationEl = document.getElementById('calc-incubation');
    const actionEl = document.getElementById('calc-proactive-action');

    if (gaugeVal) gaugeVal.textContent = `${riskIndex}%`;

    const isAr = currentLang === 'ar';
    if (riskIndex < 40) {
      if (gaugeStatus) {
        gaugeStatus.textContent = isAr ? 'منخفض (آمن)' : 'LOW (SAFE)';
        gaugeStatus.style.color = 'var(--primary-light)';
      }
      if (gaugeCircle) gaugeCircle.style.borderColor = 'var(--primary)';
      if (incubationEl) incubationEl.textContent = isAr ? 'لا يوجد خطر تفشٍ حالياً (> 14 يوماً)' : 'No outbreak imminent (> 14 days)';
      if (actionEl) actionEl.textContent = isAr ? 'متابعة الرصد المناخي دون تدخل كيميائي' : 'Passive monitoring; zero chemical action required.';
    } else if (riskIndex < 75) {
      if (gaugeStatus) {
        gaugeStatus.textContent = isAr ? 'متوسط (تأهب)' : 'MODERATE (ALERT)';
        gaugeStatus.style.color = 'var(--amber)';
      }
      if (gaugeCircle) gaugeCircle.style.borderColor = 'var(--amber)';
      if (incubationEl) incubationEl.textContent = isAr ? 'حضانة متوقعة خلال 4 - 6 أيام' : 'Spore incubation in 4 - 6 days';
      if (actionEl) actionEl.textContent = isAr ? 'تجهيز الرش الوقائي قبل اكتمال الحضانة' : 'Stage preventative copper spray within 48h window.';
    } else {
      if (gaugeStatus) {
        gaugeStatus.textContent = isAr ? 'حرج (تفشٍ وشيك)' : 'CRITICAL OUTBREAK';
        gaugeStatus.style.color = 'var(--rose)';
      }
      if (gaugeCircle) gaugeCircle.style.borderColor = 'var(--rose)';
      if (incubationEl) incubationEl.textContent = isAr ? 'ظهور الآفات خلال 24 - 48 ساعة!' : 'Foliar lesions emerging in 24 - 48 hrs!';
      if (actionEl) actionEl.textContent = isAr ? 'تدخل كيميائي وقائي فوري بموافقة المهندس الزراعي' : 'Immediate systemic fungicide intervention authorized.';
    }
  }

  [tempInput, humInput, lwdInput].forEach((input) => {
    if (input) input.addEventListener('input', calculateMicroclimateRisk);
  });
  calculateMicroclimateRisk();

  // ----------------------------------------------------------
  // Demo 3: Deterministic NPK Titration Engine
  // ----------------------------------------------------------
  const areaInput = document.getElementById('input-area');
  const cropSelect = document.getElementById('input-crop');
  const phInput = document.getElementById('input-ph');
  const soilNInput = document.getElementById('input-n');
  const soilPInput = document.getElementById('input-p');
  const soilKInput = document.getElementById('input-k');

  function calculateNPKTitration() {
    const area = parseFloat(areaInput ? areaInput.value : 5);
    const crop = cropSelect ? cropSelect.value : 'potato';
    const ph = parseFloat(phInput ? phInput.value : 6.8);
    const curN = parseFloat(soilNInput ? soilNInput.value : 30);
    const curP = parseFloat(soilPInput ? soilPInput.value : 18);
    const curK = parseFloat(soilKInput ? soilKInput.value : 140);

    // Target NPK per hectare based on crop
    const cropTargets = {
      potato: { N: 180, P: 80, K: 220, waterPerHa: 400 },
      tomato: { N: 160, P: 70, K: 200, waterPerHa: 350 },
      citrus: { N: 140, P: 50, K: 150, waterPerHa: 500 },
      wheat:  { N: 120, P: 40, K: 90,  waterPerHa: 300 }
    };

    const target = cropTargets[crop] || cropTargets.potato;

    // pH efficiency factor (optimal 6.0 - 7.0, efficiency drops outside)
    let phEfficiency = 1.0;
    if (ph > 7.5) phEfficiency = 0.82; // Alkaline soil locks P and micronutrients
    if (ph < 5.8) phEfficiency = 0.85; // Acidic soil locks N and K

    // Calculate required supplement (kg)
    const reqN = Math.max(0, (target.N - curN * 1.5) / phEfficiency) * area;
    const reqP = Math.max(0, (target.P - curP * 1.2) / phEfficiency) * area;
    const reqK = Math.max(0, (target.K - curK * 0.8) / phEfficiency) * area;

    // Converted to commercial fertilizers
    // Urea is 46% N
    const ureaKg = Math.round(reqN / 0.46);
    // DAP (Diammonium Phosphate 18-46-0)
    const dapKg = Math.round(reqP / 0.46);
    // Potassium Sulfate (50% K2O)
    const mopKg = Math.round(reqK / 0.50);
    // Total Spray Water (L)
    const totalWater = Math.round(target.waterPerHa * area);

    // Chemical savings compared to uncalibrated random spraying (~35%)
    const savedChemicalKg = Math.round((ureaKg + dapKg + mopKg) * 0.35);

    // Update UI elements
    const ureaEl = document.getElementById('res-urea');
    const dapEl = document.getElementById('res-dap');
    const mopEl = document.getElementById('res-potash');
    const waterEl = document.getElementById('res-water');
    const savedEl = document.getElementById('res-saved-kg');

    if (ureaEl) ureaEl.textContent = `${ureaKg} kg`;
    if (dapEl) dapEl.textContent = `${dapKg} kg`;
    if (mopEl) mopEl.textContent = `${mopKg} kg`;
    if (waterEl) waterEl.textContent = `${totalWater} L`;
    if (savedEl) savedEl.textContent = `${savedChemicalKg} kg (-35% waste)`;
  }

  [areaInput, cropSelect, phInput, soilNInput, soilPInput, soilKInput].forEach((elem) => {
    if (elem) {
      elem.addEventListener('input', calculateNPKTitration);
      elem.addEventListener('change', calculateNPKTitration);
    }
  });
  calculateNPKTitration();

  // ----------------------------------------------------------
  // Demo 4: HITL Agronomist Validation Station
  // ----------------------------------------------------------
  const hitlCases = {
    'case-101': {
      id: 'CASE #101',
      crop: 'Solanum tuberosum (Potato - Russet)',
      cropAr: 'بطاطس (صنف روسيت)',
      finding: 'Early Blight (Alternaria solani) with borderline chlorosis',
      findingAr: 'لفحة مبكرة (ألترناريا سولاني) مع اصفرار حاد',
      confidence: '81.4% (Threshold <85% Triggered)',
      prescription: 'Difenoconazole (250 EC) @ 250 mL/ha',
      prescriptionAr: 'ديفينوكونازول (250 EC) بمعدل 250 مل/هكتار',
      weather: '24°C, 88% RH, 16h Leaf Wetness',
      status: 'AWAITING_REVIEW'
    },
    'case-102': {
      id: 'CASE #102',
      crop: 'Lycopersicon esculentum (Tomato - San Marzano)',
      cropAr: 'طماطم (صنف سان مارزانو)',
      finding: 'Suspected Late Blight (Phytophthora infestans)',
      findingAr: 'اشتباه لفحة متأخرة (فيتوفثورا إنفستانس)',
      confidence: '91.2% (High-Toxicity Chemical Alert)',
      prescription: 'Metalaxyl-M + Chlorothalonil @ 1.8 kg/ha',
      prescriptionAr: 'ميتالاكسيل + كلوروثالونيل بمعدل 1.8 كجم/هكتار',
      weather: '18°C, 94% RH, 20h Leaf Wetness',
      status: 'AWAITING_REVIEW'
    }
  };

  const queueItems = document.querySelectorAll('.hitl-queue-item');
  queueItems.forEach((item) => {
    item.addEventListener('click', () => {
      queueItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const caseId = item.getAttribute('data-case');
      const data = hitlCases[caseId];
      if (!data) return;

      const idEl = document.getElementById('hitl-case-id');
      const cropEl = document.getElementById('hitl-crop-name');
      const findingEl = document.getElementById('hitl-finding');
      const confEl = document.getElementById('hitl-conf');
      const rxEl = document.getElementById('hitl-rx');
      const weatherEl = document.getElementById('hitl-weather');

      const isAr = currentLang === 'ar';
      if (idEl) idEl.textContent = data.id;
      if (cropEl) cropEl.textContent = isAr ? data.cropAr : data.crop;
      if (findingEl) findingEl.textContent = isAr ? data.findingAr : data.finding;
      if (confEl) confEl.textContent = data.confidence;
      if (rxEl) rxEl.textContent = isAr ? data.prescriptionAr : data.prescription;
      if (weatherEl) weatherEl.textContent = data.weather;
    });
  });

  const btnApproveRx = document.getElementById('btn-approve-rx');
  if (btnApproveRx) {
    btnApproveRx.addEventListener('click', () => {
      const isAr = currentLang === 'ar';
      alert(isAr 
        ? 'تم اعتماد الوصفة الكيميائية بنجاح بواسطة المهندس الزراعي المعتمد رقم #EG-AGRI-842!' 
        : 'Prescription officially signed & certified by Agronomist #AGRI-842. Dispatching dosage telemetry to field sprayer!');
      btnApproveRx.textContent = isAr ? '✓ معتمد وموثق' : '✓ Prescription Certified';
      btnApproveRx.style.background = '#059669';
    });
  }

  // ==========================================================
  // 5. Gallery Lightbox Modal
  // ==========================================================
  const modalOverlay = document.getElementById('modal-lightbox');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const btnCloseModal = document.getElementById('btn-close-lightbox');

  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-item-title');
      if (img && modalImg) {
        modalImg.src = img.src;
        if (modalCaption && title) modalCaption.textContent = title.textContent;
        if (modalOverlay) modalOverlay.classList.add('active');
      }
    });
  });

  if (btnCloseModal && modalOverlay) {
    btnCloseModal.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }

  // 6. Navigation Smooth Scroll & Active Tracking
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach((sec) => {
      const secHeight = sec.offsetHeight;
      const secTop = sec.offsetTop - 100;
      const secId = sec.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${secId}"]`);
      if (link) {
        if (scrollY > secTop && scrollY <= secTop + secHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });
});
