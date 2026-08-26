(function () {
  var STORAGE_KEY = "connectbox-hearing-v3";
  var CONTENT_KEY = "connectbox-backoffice-content-v1";
  var CONTENT_URL = "/lp/back-office/deck-content.json";

  var form = document.getElementById("hearing-form");
  var panel = document.getElementById("hearing-panel");
  var toggle = document.getElementById("hearing-toggle");
  var challengeSelect = document.getElementById("challenge-select");
  var CONTENT = null;

  var LABELS = {
    industryKey: {
      manufacturing: "製造",
      construction: "建設・工事",
      retail: "小売・店舗",
      professional: "士業・専門サービス",
      it: "IT・Web",
      care: "医療・介護",
      trading: "商社・卸",
      startup: "スタートアップ／新規事業",
      other: "その他",
    },
    sizeKey: {
      s10: "〜10名",
      s30: "11〜30名",
      s50: "31〜50名",
      s51: "51名〜",
    },
    staffingKey: {
      ceo: "代表が兼務",
      one: "担当1名",
      team: "少人数チーム",
      retire: "退職・休職の予定あり",
    },
    idealKey: {
      focus: "本業／商談に集中したい",
      nohire: "採用せずに回したい",
      launch: "立ち上げを早く形にしたい",
      stable: "欠員でも止まらない状態にしたい",
    },
  };

  function setOpen(open) {
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", open ? "false" : "true");
  }

  function readForm() {
    var data = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name) data[el.name] = el.value;
    });
    return data;
  }

  function writeForm(data) {
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name && data[el.name] != null) el.value = data[el.name];
    });
  }

  function labelOf(group, key) {
    return (LABELS[group] && LABELS[group][key]) || "";
  }

  function setDyn(key, value) {
    document.querySelectorAll('[data-dyn="' + key + '"]').forEach(function (el) {
      el.textContent = value == null ? "" : String(value);
    });
  }

  function setDynSrc(key, value) {
    if (!value) return;
    document.querySelectorAll('[data-dyn-src="' + key + '"]').forEach(function (el) {
      el.setAttribute("src", value);
    });
  }

  function challenges() {
    return (CONTENT && CONTENT.challenges) || [];
  }

  function findChallenge(id) {
    var list = challenges();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return list[0] || null;
  }

  function fillChallengeSelect(selected) {
    if (!challengeSelect) return;
    var current = selected || challengeSelect.value;
    challengeSelect.innerHTML = '<option value="">選択してください</option>';
    challenges().forEach(function (c) {
      var opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = c.label;
      challengeSelect.appendChild(opt);
    });
    if (current) challengeSelect.value = current;
  }

  function applyPlans(recommendIndex) {
    var plans = (CONTENT && CONTENT.plans) || [];
    plans.forEach(function (plan, i) {
      setDyn("plan" + i + "name", plan.name || "");
      setDyn("plan" + i + "price", plan.price || "");
      setDyn("plan" + i + "hours", plan.hours || "");
      (plan.features || []).forEach(function (f, fi) {
        setDyn("plan" + i + "f" + fi, f);
      });
      var card = document.querySelector('[data-plan="' + i + '"]');
      if (!card) return;
      var isRec =
        recommendIndex != null ? recommendIndex === i : !!plan.recommend;
      card.classList.toggle("is-recommend", isRec);
      var badge = card.querySelector(".plan-badge");
      if (isRec && !badge) {
        badge = document.createElement("span");
        badge.className = "plan-badge";
        badge.textContent = "おすすめ";
        card.insertBefore(badge, card.firstChild);
      } else if (badge) {
        badge.style.display = isRec ? "" : "none";
      }
    });

    var setup = (CONTENT && CONTENT.setupFee) || {};
    setDyn("setupLabel", setup.label || "初回費用（一度きり）");
    setDyn("setupPrice", setup.price || "");
    setDyn("setupDesc", setup.desc || "");
    setDyn("planNote", (CONTENT && CONTENT.note) || "");
  }

  function applyChallenge(ch) {
    if (!ch) return;

    setDyn("sceneLead", ch.sceneLead || "");
    setDyn("packName", ch.packName || "");
    setDyn("servicesLead", ch.servicesLead || "");
    setDyn("teamSkill", ch.teamSkill || "");
    setDyn("teamStart", ch.teamStart || "");
    setDynSrc("heroImage", ch.heroImage || "");

    (ch.pains || []).forEach(function (text, i) {
      setDyn("pain" + i, text);
    });

    (ch.services || []).forEach(function (text, i) {
      setDyn("svc" + i, text);
    });
    document.querySelectorAll("#dyn-services li").forEach(function (el, i) {
      el.classList.toggle("is-focus", (ch.focusSvc || []).indexOf(i) !== -1);
    });

    (ch.cases || []).forEach(function (c, i) {
      setDyn("case" + i + "industry", c.industry || "");
      setDyn("case" + i + "num", c.num || "");
      setDyn("case" + i + "title", c.title || "");
      setDyn("case" + i + "challenge", c.challenge || "");
      setDyn("case" + i + "action", c.action || "");
      setDyn("case" + i + "effect", c.effect || "");
      setDynSrc("case" + i + "image", c.image || "");
    });

    (ch.talent || []).forEach(function (t, i) {
      setDyn("talent" + i + "role", t.role || "");
      setDyn("talent" + i + "bg", t.bg || "");
      setDyn("talent" + i + "can", t.can || "");
      setDynSrc("talent" + i + "photo", t.photo || "");
    });

    setDyn("phase1a", ch.phase1a || "");
    setDyn("phase1b", ch.phase1b || "");
    setDyn("phase1goal", ch.phase1goal || "");
    setDyn("phase2a", ch.phase2a || "");
    setDyn("phase2b", ch.phase2b || "");
    setDyn("phase2goal", ch.phase2goal || "");
    setDyn("phase3a", ch.phase3a || "");
    setDyn("phase3b", ch.phase3b || "");
    setDyn("phase3goal", ch.phase3goal || "");

    var compare = (CONTENT && CONTENT.compare) || {};
    setDyn("compareTitle", compare.title || "アルバイト・正社員との違い");
    setDyn("compareLead", compare.lead || "");
    setDyn("comparePunch", compare.punch || "");
    setDyn("compareNote", compare.note || "");
    (compare.rows || []).forEach(function (row, i) {
      setDyn("cmp" + i + "item", row.item || "");
      setDyn("cmp" + i + "part", row.part || "");
      setDyn("cmp" + i + "full", row.full || "");
      setDyn("cmp" + i + "ours", row.ours || "");
    });

    var rec =
      ch.recommendPlan != null
        ? ch.recommendPlan
        : (CONTENT.plans || []).findIndex(function (p) {
            return p.recommend;
          });
    applyPlans(rec >= 0 ? rec : 1);
  }

  function apply() {
    if (!CONTENT) return;
    var data = readForm();
    var ch = findChallenge(data.challengeId);

    var industryLabel = labelOf("industryKey", data.industryKey);
    var sizeLabel = labelOf("sizeKey", data.sizeKey);
    data.industryLabel =
      industryLabel && sizeLabel
        ? industryLabel + " / 従業員" + sizeLabel
        : industryLabel || sizeLabel || "";
    data.staffingLabel = labelOf("staffingKey", data.staffingKey);
    data.idealLabel = labelOf("idealKey", data.idealKey);
    data.challengeLabel = ch ? ch.label : "";
    data.packName = ch ? ch.packName : "";

    document.querySelectorAll("[data-bind]").forEach(function (el) {
      var key = el.getAttribute("data-bind");
      var fallback = el.getAttribute("data-fallback") || "";
      var value = (data[key] || "").trim();
      el.textContent = value || fallback;
      el.classList.toggle("placeholder", !value);
    });

    applyChallenge(ch || challenges()[0]);

    // highlight first pain always as focus when challenge selected
    document.querySelectorAll("#dyn-pains .pain-item").forEach(function (el, i) {
      el.classList.toggle("is-focus", !!data.challengeId && i === 0);
    });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function loadContent() {
    var local = null;
    try {
      local = JSON.parse(localStorage.getItem(CONTENT_KEY) || "null");
    } catch (e) {}

    // Prefer local edits only when version is current (avoids stale pricing)
    if (
      local &&
      Array.isArray(local.challenges) &&
      local.challenges.length &&
      (local.version || 0) >= 4
    ) {
      CONTENT = local;
      return Promise.resolve(CONTENT);
    }

    return fetch(CONTENT_URL + "?t=" + Date.now())
      .then(function (r) {
        return r.json();
      })
      .then(function (json) {
        CONTENT = json;
        return CONTENT;
      });
  }

  loadContent()
    .then(function () {
      var saved = {};
      try {
        saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      } catch (e) {}

      fillChallengeSelect(saved.challengeId || "");
      writeForm(saved);
      apply();

      form.addEventListener("input", apply);
      form.addEventListener("change", apply);
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        apply();
        setOpen(false);
      });

      toggle.addEventListener("click", function () {
        setOpen(!panel.classList.contains("is-open"));
      });
      document.getElementById("hearing-close").addEventListener("click", function () {
        setOpen(false);
      });
      document.getElementById("hearing-reset").addEventListener("click", function () {
        form.reset();
        fillChallengeSelect("");
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (e) {}
        apply();
      });
    })
    .catch(function (err) {
      console.error(err);
      alert("資料コンテンツの読み込みに失敗しました。");
    });
})();
