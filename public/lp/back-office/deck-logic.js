(function () {
  var STORAGE_KEY = "connectbox-hearing-v4";
  var CONTENT_KEY = "connectbox-backoffice-content-v1";
  var CONTENT_URL = "/lp/back-office/deck-content.json";

  var form = document.getElementById("hearing-form");
  var panel = document.getElementById("hearing-panel");
  var toggle = document.getElementById("hearing-toggle");
  var challengeChecks = document.getElementById("challenge-checks");
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

  var PERSONALIZATION = {
    industryKey: {
      manufacturing: {
        scenePrefix: "製造業では、",
        caseTag: "製造業",
        talentKeywords: ["製造", "ものづくり", "工場"],
        pain: "現場・品質対応と事務の両立で、管理業務が後回しになりがち",
      },
      construction: {
        scenePrefix: "建設・工事では、",
        caseTag: "建設・工事",
        talentKeywords: ["建設", "工事", "現場"],
        pain: "現場と本社の連携・書類対応が属人化し、案件ごとに手戻りが起きやすい",
      },
      retail: {
        scenePrefix: "小売・店舗では、",
        caseTag: "小売・店舗",
        talentKeywords: ["小売", "店舗", "卸"],
        pain: "店舗運営と本部事務の兼務で、在庫・売上・請求の管理が追いつかない",
      },
      professional: {
        scenePrefix: "士業・専門サービスでは、",
        caseTag: "士業・専門",
        talentKeywords: ["士業", "専門", "BtoB"],
        pain: "専門業務に時間を取られ、顧客対応以外の事務が積み上がる",
      },
      it: {
        scenePrefix: "IT・Webでは、",
        caseTag: "IT・Web",
        talentKeywords: ["IT", "SaaS", "Web"],
        pain: "開発・納品に追われ、営業フォローや請求・管理が後回しになりやすい",
      },
      care: {
        scenePrefix: "医療・介護では、",
        caseTag: "医療・介護",
        talentKeywords: ["医療", "介護", "福祉"],
        pain: "現場サービスが最優先で、請求・記録・総務の定型が回りきらない",
      },
      trading: {
        scenePrefix: "商社・卸では、",
        caseTag: "商社・卸",
        talentKeywords: ["商社", "卸", "流通"],
        pain: "受発注・在庫・請求が案件ごとにばらつき、担当者の負荷が偏る",
      },
      startup: {
        scenePrefix: "スタートアップ／新規事業では、",
        caseTag: "スタートアップ",
        talentKeywords: ["スタートアップ", "新規", "SaaS"],
        pain: "立上げに必要な販促・事務・営業の型がなく、創業者の時間が溶ける",
      },
      other: {
        scenePrefix: "",
        caseTag: "",
        talentKeywords: [],
        pain: "",
      },
    },
    sizeKey: {
      s10: { recommendPlan: 0, teamStart: "週数時間から試せる最小単位で", planHint: "Light・月20h" },
      s30: { recommendPlan: 1, teamStart: "1領域を定着させてから広げる" },
      s50: { recommendPlan: 1, teamStart: "2領域まで並行しながら安定化" },
      s51: { recommendPlan: 2, teamStart: "複数領域の分担運用から", planHint: "Flex・月60h〜" },
    },
    staffingKey: {
      ceo: {
        teamStart: "代表の兼務負担を減らす1領域から",
        pain: "代表が営業・現場・事務を兼務し、重要な判断に時間が取れない",
        phase1a: "代表の手を離せる業務を1つに絞って切り出し",
        servicesLead: "代表の時間を戻すため、「今すぐ外に出す」領域から始めます。",
      },
      one: {
        teamStart: "担当1名の負荷を下げる領域から",
        pain: "担当1名に業務が集中し、休暇・繁忙期に止まりやすい",
        phase1a: "担当者しか分からない処理を棚卸しして切り出し",
        servicesLead: "担当1名の負荷を下げるため、定型から順に外に出します。",
      },
      team: {
        teamStart: "チームで回せる型をつくってから拡大",
        pain: "少人数チームで領域をまたぎ、引き継ぎと優先順位がぶつかる",
        phase1a: "チーム内の役割分担を整理してから切り出し",
        servicesLead: "チーム全体の負荷を平準化する切り分けから進めます。",
      },
      retire: {
        teamStart: "引き継ぎ前提で、手順化から開始",
        pain: "退職・休職に備えず属人化しており、引き継ぎが大きなリスクになっている",
        phase1a: "マニュアル化と並行して、定型業務を外部化",
        phase3goal: "属人化ゼロ・担当変更でも止まらない状態へ",
        servicesLead: "引き継ぎリスクを下げるため、手順化と外出しを同時に進めます。",
      },
    },
    idealKey: {
      focus: {
        compareLead:
          "本業・商談に時間を戻すには、雇わずに実務経験者へ任せるのが最短です。固定の採用コストを増やさず、必要な分だけ外に出せます。",
        teamStart: "本業に戻す時間を最優先に、小さく開始",
        pain: "事務・定型に時間を取られ、商談や意思決定に集中できない",
        caseBoost: ["集中", "本業", "商談", "創業者"],
      },
      nohire: {
        compareLead:
          "採用せずに回すなら、月20時間で自社採用（パート・アルバイト）より安定し、正社員を雇って充てる場合と同水準で済みます。採用・教育のリードタイムも不要です。",
        teamStart: "採用の前に、必要な業務だけ外部化",
        pain: "人を増やしたいが、採用コストと教育期間が重く、今期の数字に間に合わない",
        caseBoost: ["採用", "外部化", "固定"],
        recommendPlan: 0,
      },
      launch: {
        compareLead:
          "立上げ期はスピードが命。内製で全部やるより、LP・販促・事務の型を外に出した方が早く形になります。",
        teamStart: "LPと販促の最低限セットから一気に",
        pain: "サービスは動き始めたが、説明・販促・事務の型がなく営業が進みにくい",
        caseBoost: ["立上げ", "LP", "販促", "創業"],
        recommendPlan: 2,
      },
      stable: {
        compareLead:
          "欠員でも止まらないには、人ではなく手順とチームで回す仕組みが必要です。Connect Boxは手順化と運用をセットで担えます。",
        teamStart: "止まらない運用の型づくりから",
        pain: "担当者しか分からない処理があり、休み・退職で業務が止まる",
        caseBoost: ["仕組み", "属人", "引き継ぎ", "マニュアル"],
        phase3goal: "担当変更・欠員でも止まらない状態へ",
      },
    },
  };

  function cloneChallenge(ch) {
    return JSON.parse(JSON.stringify(ch));
  }

  function uniquePain(arr, text) {
    if (!text) return arr;
    var pains = (arr || []).slice();
    if (pains.indexOf(text) !== -1) return pains;
    pains.unshift(text);
    return pains.slice(0, 4);
  }

  function scoreCase(caseItem, keywords) {
    if (!keywords || !keywords.length) return 0;
    var blob =
      (caseItem.title || "") +
      (caseItem.challenge || "") +
      (caseItem.effect || "") +
      (caseItem.num || "");
    var score = 0;
    keywords.forEach(function (kw) {
      if (blob.indexOf(kw) !== -1) score += 2;
    });
    return score;
  }

  function reorderCases(cases, keywords) {
    if (!cases || !cases.length || !keywords || !keywords.length) return cases;
    return cases
      .map(function (c, i) {
        return { c: c, s: scoreCase(c, keywords), i: i };
      })
      .sort(function (a, b) {
        if (b.s !== a.s) return b.s - a.s;
        return a.i - b.i;
      })
      .map(function (x) {
        return x.c;
      });
  }

  function reorderTalent(talent, keywords) {
    if (!talent || !talent.length || !keywords || !keywords.length) return talent;
    return talent
      .map(function (t, i) {
        var blob = (t.industries || "") + (t.role || "") + (t.bg || "");
        var s = 0;
        keywords.forEach(function (kw) {
          if (blob.indexOf(kw) !== -1) s += 2;
        });
        return { t: t, s: s, i: i };
      })
      .sort(function (a, b) {
        if (b.s !== a.s) return b.s - a.s;
        return a.i - b.i;
      })
      .map(function (x) {
        return x.t;
      });
  }

  function resolveRecommendPlan(base, data) {
    var plan = base != null ? base : 1;
    var size = PERSONALIZATION.sizeKey[data.sizeKey];
    var ideal = PERSONALIZATION.idealKey[data.idealKey];
    if (size && size.recommendPlan != null) plan = size.recommendPlan;
    if (ideal && ideal.recommendPlan != null) {
      if (data.idealKey === "nohire" && data.sizeKey === "s51") plan = 1;
      else if (data.idealKey === "launch" && (data.sizeKey === "s10" || !data.sizeKey)) plan = 1;
      else plan = ideal.recommendPlan;
    }
    if (data.staffingKey === "retire" && plan < 1) plan = 1;
    return Math.max(0, Math.min(2, plan));
  }

  function personalizeCompare(compare, data) {
    var out = cloneChallenge(compare || {});
    var ideal = PERSONALIZATION.idealKey[data.idealKey];
    if (ideal && ideal.compareLead) out.lead = ideal.compareLead;
    if (data.idealKey === "nohire" && out.rows && out.rows[2]) {
      out.rows[2] = Object.assign({}, out.rows[2], {
        ours: "約6万円〜（採用せずに同水準で回せる）",
      });
    }
    if (data.idealKey === "stable" && out.rows && out.rows[3]) {
      out.rows[3] = Object.assign({}, out.rows[3], {
        ours: "手順化＋チーム運用で欠員でも止めない",
      });
    }
    return out;
  }

  function personalizeChallenge(ch, data) {
    if (!ch) return ch;
    var out = cloneChallenge(ch);
    if (!data) return out;

    var industry = PERSONALIZATION.industryKey[data.industryKey] || null;
    var size = PERSONALIZATION.sizeKey[data.sizeKey] || null;
    var staffing = PERSONALIZATION.staffingKey[data.staffingKey] || null;
    var ideal = PERSONALIZATION.idealKey[data.idealKey] || null;

    if (industry && industry.scenePrefix && out.sceneLead) {
      if (out.sceneLead.indexOf(industry.scenePrefix) !== 0) {
        out.sceneLead = industry.scenePrefix + out.sceneLead;
      }
    }

    if (staffing && staffing.pain) out.pains = uniquePain(out.pains, staffing.pain);
    else if (ideal && ideal.pain) out.pains = uniquePain(out.pains, ideal.pain);
    else if (industry && industry.pain) out.pains = uniquePain(out.pains, industry.pain);

    if (staffing && staffing.servicesLead) out.servicesLead = staffing.servicesLead;
    if (staffing && staffing.phase1a) out.phase1a = staffing.phase1a;
    if (staffing && staffing.phase3goal) out.phase3goal = staffing.phase3goal;
    if (ideal && ideal.phase3goal) out.phase3goal = ideal.phase3goal;

    if (ideal && ideal.teamStart) out.teamStart = ideal.teamStart;
    else if (staffing && staffing.teamStart) out.teamStart = staffing.teamStart;
    else if (size && size.teamStart) out.teamStart = size.teamStart;

    var caseKeywords = [];
    if (ideal && ideal.caseBoost) caseKeywords = caseKeywords.concat(ideal.caseBoost);
    if (data.staffingKey === "retire") caseKeywords.push("仕組み", "属人", "引き継ぎ");
    if (data.idealKey === "nohire") caseKeywords.push("採用");
    out.cases = reorderCases(out.cases || [], caseKeywords);

    if (industry && industry.caseTag) {
      out.cases = (out.cases || []).map(function (c) {
        var copy = Object.assign({}, c);
        if (copy.industry && copy.industry.indexOf(industry.caseTag) === -1) {
          copy.industry = industry.caseTag + "｜" + copy.industry;
        }
        return copy;
      });
    }

    var talentKeywords = (industry && industry.talentKeywords) || [];
    out.talent = reorderTalent(out.talent || [], talentKeywords);

    out.recommendPlan = resolveRecommendPlan(out.recommendPlan, data);
    out._hearing = {
      industryKey: data.industryKey,
      sizeKey: data.sizeKey,
      staffingKey: data.staffingKey,
      idealKey: data.idealKey,
    };
    return out;
  }

  function setOpen(open) {
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", open ? "false" : "true");
  }

  function readChallengeIds() {
    if (!challengeChecks) return [];
    return Array.prototype.map
      .call(challengeChecks.querySelectorAll('input[type="checkbox"]:checked'), function (el) {
        return el.value;
      })
      .filter(Boolean);
  }

  function readForm() {
    var data = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name) return;
      if (el.type === "checkbox") return;
      data[el.name] = el.value;
    });
    data.challengeIds = readChallengeIds();
    return data;
  }

  function writeForm(data) {
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name && data[el.name] != null && el.type !== "checkbox") {
        el.value = data[el.name];
      }
    });
    var ids = data.challengeIds;
    if (!ids && data.challengeId) ids = [data.challengeId];
    fillChallengeChecks(ids || []);
  }

  function labelOf(group, key) {
    return (LABELS[group] && LABELS[group][key]) || "";
  }

  var EDIT_MODE = false;
  var editStatusEl = null;

  function setDyn(key, value) {
    document.querySelectorAll('[data-dyn="' + key + '"]').forEach(function (el) {
      if (EDIT_MODE && el === document.activeElement) return;
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
    return null;
  }

  function fillChallengeChecks(selectedIds) {
    if (!challengeChecks) return;
    var selected = {};
    (selectedIds || []).forEach(function (id) {
      selected[id] = true;
    });
    challengeChecks.innerHTML = "";
    challenges().forEach(function (c) {
      var label = document.createElement("label");
      label.className = "check";
      var input = document.createElement("input");
      input.type = "checkbox";
      input.name = "challengeIds";
      input.value = c.id;
      input.checked = !!selected[c.id];
      label.appendChild(input);
      label.appendChild(document.createTextNode(c.label));
      challengeChecks.appendChild(label);
    });
  }

  function uniquePush(arr, value, max) {
    if (!value || arr.indexOf(value) !== -1) return;
    if (max != null && arr.length >= max) return;
    arr.push(value);
  }

  function mergeChallenges(list) {
    if (!list.length) return challenges()[0] || null;
    if (list.length === 1) return list[0];

    var base = {};
    var first = list[0];
    Object.keys(first).forEach(function (k) {
      base[k] = first[k];
    });

    base.label = list
      .map(function (c) {
        return c.shortLabel || c.label;
      })
      .join(" ／ ");
    base.packName = list
      .map(function (c) {
        return c.packName;
      })
      .filter(Boolean)
      .join(" ＋ ");
    base.sceneLead = list
      .map(function (c) {
        return (c.shortLabel || c.label) + "： " + (c.sceneLead || "");
      })
      .join("\n");
    base.servicesLead =
      "選んだ課題ごとに、今すぐ／型づくり後／社内の切り分けをまとめています。";
    base.teamSkill = list
      .map(function (c) {
        return c.teamSkill;
      })
      .filter(Boolean)
      .slice(0, 2)
      .join(" ／ ");
    base.teamStart = first.teamStart || "";

    var pains = [];
    for (var round = 0; pains.length < 4 && round < 4; round++) {
      list.forEach(function (c) {
        if (c.pains && c.pains[round]) uniquePush(pains, c.pains[round], 4);
      });
    }
    base.pains = pains;

    base.detachPhases = [0, 1, 2].map(function (i) {
      var src = (first.detachPhases && first.detachPhases[i]) || {};
      var items = [];
      list.forEach(function (c) {
        var phase = (c.detachPhases && c.detachPhases[i]) || {};
        (phase.items || []).forEach(function (it) {
          uniquePush(items, it, 5);
        });
      });
      return {
        label: src.label || "",
        hint: src.hint || "",
        items: items,
      };
    });

    base.cases = list.slice(0, 3).map(function (c) {
      return (c.cases && c.cases[0]) || {};
    });
    while (base.cases.length < 3) {
      base.cases.push((first.cases && first.cases[base.cases.length]) || {});
    }

    base.talent = first.talent || [];
    base.heroImage = first.heroImage || "";

    if (list.length > 1) {
      base.phase1a = list
        .map(function (c) {
          return (c.shortLabel || "") + "：" + (c.phase1a || "");
        })
        .join(" ／ ");
      base.phase1b = list
        .map(function (c) {
          return c.phase1b || "";
        })
        .filter(Boolean)
        .join(" ／ ");
      base.phase1goal = list
        .map(function (c) {
          return (c.shortLabel || "") + "：" + (c.phase1goal || "");
        })
        .join(" ／ ");
      base.phase2a = list
        .map(function (c) {
          return (c.shortLabel || "") + "：" + (c.phase2a || "");
        })
        .join(" ／ ");
      base.phase2b = list
        .map(function (c) {
          return c.phase2b || "";
        })
        .filter(Boolean)
        .join(" ／ ");
      base.phase2goal = list
        .map(function (c) {
          return (c.shortLabel || "") + "：" + (c.phase2goal || "");
        })
        .join(" ／ ");
      base.phase3a = list
        .map(function (c) {
          return (c.shortLabel || "") + "：" + (c.phase3a || "");
        })
        .join(" ／ ");
      base.phase3b = list
        .map(function (c) {
          return c.phase3b || "";
        })
        .filter(Boolean)
        .join(" ／ ");
      base.phase3goal = list
        .map(function (c) {
          return (c.shortLabel || "") + "：" + (c.phase3goal || "");
        })
        .join(" ／ ");
    }

    base.recommendPlan = first.recommendPlan;
    return base;
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
    setDyn("planNote", (CONTENT && CONTENT.note) || "");
    var why = (CONTENT && CONTENT.why) || {};
    setDyn("whyTitle", why.title || "なぜ、T-connectなのか");
    setDyn("whyLead", why.lead || "");
    setDyn("whyBelief", why.belief || "");
    setDyn("whyBody0", (why.body && why.body[0]) || "");
    setDyn("whyBody1", (why.body && why.body[1]) || "");
    setDyn("whyClosing", why.closing || "");
    setDyn(
      "whyClosingShort",
      why.closingShort || "適した人で、企業の未来を支える"
    );
    var about = (CONTENT && CONTENT.about) || {};
    setDyn("aboutTitle", about.title || "");
    setDyn("aboutLead", about.lead || "");
    var phases = about.phases || about.items || [];
    phases.forEach(function (item, i) {
      setDyn("about" + i + "title", item.title || "");
      setDyn("about" + i + "desc", item.desc || "");
      (item.items || []).forEach(function (line, ii) {
        setDyn("about" + i + "i" + ii, line || "");
      });
    });
  }

  function applyChallenge(ch, hearingData) {
    if (!ch) return;

    setDyn("sceneLead", ch.sceneLead || "");
    setDyn("packName", ch.packName || "");
    setDyn("servicesLead", ch.servicesLead || "");
    setDyn("teamSkill", ch.teamSkill || "");
    setDyn("teamStart", ch.teamStart || "");
    setDynSrc("heroImage", ch.heroImage || "");

    for (var pi = 0; pi < 4; pi++) {
      setDyn("pain" + pi, (ch.pains && ch.pains[pi]) || "");
    }

    (ch.detachPhases || []).forEach(function (phase, i) {
      setDyn("detach" + i + "label", phase.label || "");
      setDyn("detach" + i + "hint", phase.hint || "");
      for (var ii = 0; ii < 5; ii++) {
        setDyn("detach" + i + "i" + ii, (phase.items && phase.items[ii]) || "");
      }
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
      setDyn("talent" + i + "years", t.years || "");
      setDyn("talent" + i + "bg", t.bg || "");
      setDyn("talent" + i + "industries", t.industries || "");
      setDyn("talent" + i + "day", t.day || "");
      setDyn("talent" + i + "tools", t.tools || "");
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

    var compare = personalizeCompare((CONTENT && CONTENT.compare) || {}, hearingData || ch._hearing || {});
    setDyn("compareTitle", compare.title || "自社採用（パート・アルバイト）・正社員との違い");
    setDyn("compareLead", compare.lead || "");
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
    var ids = data.challengeIds || [];
    var selected = ids
      .map(function (id) {
        return findChallenge(id);
      })
      .filter(Boolean);
    var ch = personalizeChallenge(mergeChallenges(selected), data);

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

    applyChallenge(ch || personalizeChallenge(challenges()[0], data), data);

    document.querySelectorAll("#dyn-pains .pain-item").forEach(function (el, i) {
      var focus = false;
      if (selected.length > 0 && i === 0) focus = true;
      if (data.staffingKey || data.idealKey || data.industryKey) {
        if (i === 0) focus = true;
      }
      el.classList.toggle("is-focus", focus);
    });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function ensureWhy() {
    if (!CONTENT.why) CONTENT.why = {};
    if (!CONTENT.why.body) CONTENT.why.body = ["", ""];
  }

  function ensureAbout() {
    if (!CONTENT.about) CONTENT.about = { title: "", lead: "", phases: [] };
    if (!CONTENT.about.phases) {
      CONTENT.about.phases = (CONTENT.about.items || []).map(function (it) {
        return { title: it.title || "", desc: it.desc || "", items: ["", "", "", "", ""] };
      });
    }
  }

  function ensureCompare() {
    if (!CONTENT.compare) CONTENT.compare = { title: "", lead: "", note: "", rows: [] };
    if (!CONTENT.compare.rows) CONTENT.compare.rows = [];
  }

  function getEditableChallenge() {
    var ids = readChallengeIds();
    if (ids.length === 1) return findChallenge(ids[0]);
    if (!ids.length) return challenges()[0] || null;
    return findChallenge(ids[0]);
  }

  function writeDynToContent(key, value) {
    if (!CONTENT) return false;

    if (key === "whyTitle") {
      ensureWhy();
      CONTENT.why.title = value;
      return true;
    }
    if (key === "whyLead") {
      ensureWhy();
      CONTENT.why.lead = value;
      return true;
    }
    if (key === "whyBelief") {
      ensureWhy();
      CONTENT.why.belief = value;
      return true;
    }
    if (key === "whyBody0") {
      ensureWhy();
      CONTENT.why.body[0] = value;
      return true;
    }
    if (key === "whyBody1") {
      ensureWhy();
      CONTENT.why.body[1] = value;
      return true;
    }
    if (key === "whyClosing") {
      ensureWhy();
      CONTENT.why.closing = value;
      return true;
    }
    if (key === "whyClosingShort") {
      ensureWhy();
      CONTENT.why.closingShort = value;
      return true;
    }
    if (key === "aboutTitle") {
      ensureAbout();
      CONTENT.about.title = value;
      return true;
    }
    if (key === "aboutLead") {
      ensureAbout();
      CONTENT.about.lead = value;
      return true;
    }
    if (key === "planNote") {
      CONTENT.note = value;
      return true;
    }
    if (key === "compareTitle") {
      ensureCompare();
      CONTENT.compare.title = value;
      return true;
    }
    if (key === "compareLead") {
      ensureCompare();
      CONTENT.compare.lead = value;
      return true;
    }
    if (key === "compareNote") {
      ensureCompare();
      CONTENT.compare.note = value;
      return true;
    }

    var aboutPhase = key.match(/^about(\d+)(title|desc)$/);
    if (aboutPhase) {
      ensureAbout();
      var pi = Number(aboutPhase[1]);
      var field = aboutPhase[2];
      while (CONTENT.about.phases.length <= pi) {
        CONTENT.about.phases.push({ title: "", desc: "", items: ["", "", "", "", ""] });
      }
      CONTENT.about.phases[pi][field] = value;
      return true;
    }

    var aboutItem = key.match(/^about(\d+)i(\d+)$/);
    if (aboutItem) {
      ensureAbout();
      var api = Number(aboutItem[1]);
      var aii = Number(aboutItem[2]);
      while (CONTENT.about.phases.length <= api) {
        CONTENT.about.phases.push({ title: "", desc: "", items: ["", "", "", "", ""] });
      }
      if (!CONTENT.about.phases[api].items) CONTENT.about.phases[api].items = [];
      CONTENT.about.phases[api].items[aii] = value;
      return true;
    }

    var planField = key.match(/^plan(\d+)(name|price|hours)$/);
    if (planField) {
      var pli = Number(planField[1]);
      if (!CONTENT.plans) CONTENT.plans = [];
      while (CONTENT.plans.length <= pli) {
        CONTENT.plans.push({ name: "", price: "", hours: "", features: [] });
      }
      CONTENT.plans[pli][planField[2]] = value;
      return true;
    }

    var planFeat = key.match(/^plan(\d+)f(\d+)$/);
    if (planFeat) {
      var pfi = Number(planFeat[1]);
      var ffi = Number(planFeat[2]);
      if (!CONTENT.plans) CONTENT.plans = [];
      while (CONTENT.plans.length <= pfi) {
        CONTENT.plans.push({ name: "", price: "", hours: "", features: [] });
      }
      if (!CONTENT.plans[pfi].features) CONTENT.plans[pfi].features = [];
      CONTENT.plans[pfi].features[ffi] = value;
      return true;
    }

    var cmpField = key.match(/^cmp(\d+)(item|part|full|ours)$/);
    if (cmpField) {
      ensureCompare();
      var ci = Number(cmpField[1]);
      while (CONTENT.compare.rows.length <= ci) {
        CONTENT.compare.rows.push({ item: "", part: "", full: "", ours: "" });
      }
      CONTENT.compare.rows[ci][cmpField[2]] = value;
      return true;
    }

    var ch = getEditableChallenge();
    if (!ch) return false;

    if (key === "sceneLead") {
      ch.sceneLead = value;
      return true;
    }
    if (key === "packName") {
      ch.packName = value;
      return true;
    }
    if (key === "servicesLead") {
      ch.servicesLead = value;
      return true;
    }
    if (key === "teamSkill") {
      ch.teamSkill = value;
      return true;
    }
    if (key === "teamStart") {
      ch.teamStart = value;
      return true;
    }

    var painIdx = key.match(/^pain(\d+)$/);
    if (painIdx) {
      if (!ch.pains) ch.pains = [];
      ch.pains[Number(painIdx[1])] = value;
      return true;
    }

    var detachLabel = key.match(/^detach(\d+)label$/);
    if (detachLabel) {
      var dli = Number(detachLabel[1]);
      if (!ch.detachPhases) ch.detachPhases = [];
      while (ch.detachPhases.length <= dli) {
        ch.detachPhases.push({ label: "", hint: "", items: [] });
      }
      ch.detachPhases[dli].label = value;
      return true;
    }

    var detachHint = key.match(/^detach(\d+)hint$/);
    if (detachHint) {
      var dhi = Number(detachHint[1]);
      if (!ch.detachPhases) ch.detachPhases = [];
      while (ch.detachPhases.length <= dhi) {
        ch.detachPhases.push({ label: "", hint: "", items: [] });
      }
      ch.detachPhases[dhi].hint = value;
      return true;
    }

    var detachItem = key.match(/^detach(\d+)i(\d+)$/);
    if (detachItem) {
      var di = Number(detachItem[1]);
      var dii = Number(detachItem[2]);
      if (!ch.detachPhases) ch.detachPhases = [];
      while (ch.detachPhases.length <= di) {
        ch.detachPhases.push({ label: "", hint: "", items: [] });
      }
      if (!ch.detachPhases[di].items) ch.detachPhases[di].items = [];
      ch.detachPhases[di].items[dii] = value;
      return true;
    }

    var caseField = key.match(/^case(\d+)(industry|num|title|challenge|action|effect)$/);
    if (caseField) {
      var csi = Number(caseField[1]);
      if (!ch.cases) ch.cases = [];
      while (ch.cases.length <= csi) {
        ch.cases.push({});
      }
      ch.cases[csi][caseField[2]] = value;
      return true;
    }

    var talentField = key.match(/^talent(\d+)(role|years|bg|industries|day|tools|can)$/);
    if (talentField) {
      var ti = Number(talentField[1]);
      if (!ch.talent) ch.talent = [];
      while (ch.talent.length <= ti) {
        ch.talent.push({});
      }
      ch.talent[ti][talentField[2]] = value;
      return true;
    }

    if (key === "phase1a") {
      ch.phase1a = value;
      return true;
    }
    if (key === "phase1b") {
      ch.phase1b = value;
      return true;
    }
    if (key === "phase1goal") {
      ch.phase1goal = value;
      return true;
    }
    if (key === "phase2a") {
      ch.phase2a = value;
      return true;
    }
    if (key === "phase2b") {
      ch.phase2b = value;
      return true;
    }
    if (key === "phase2goal") {
      ch.phase2goal = value;
      return true;
    }
    if (key === "phase3a") {
      ch.phase3a = value;
      return true;
    }
    if (key === "phase3b") {
      ch.phase3b = value;
      return true;
    }
    if (key === "phase3goal") {
      ch.phase3goal = value;
      return true;
    }

    return false;
  }

  function setEditStatus(msg) {
    if (editStatusEl) editStatusEl.textContent = msg || "";
  }

  function saveContentToLocal() {
    try {
      localStorage.setItem(CONTENT_KEY, JSON.stringify(CONTENT));
      setEditStatus("ブラウザに保存しました");
    } catch (e) {
      setEditStatus("保存に失敗しました");
    }
  }

  function downloadContentJson() {
    if (!CONTENT) return;
    var blob = new Blob([JSON.stringify(CONTENT, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "deck-content.json";
    a.click();
    URL.revokeObjectURL(a.href);
    setEditStatus("JSONをダウンロードしました");
  }

  function onDynInput(e) {
    var el = e.target;
    if (!el.matches("[data-dyn][contenteditable]")) return;
    var key = el.getAttribute("data-dyn");
    var value = el.textContent.replace(/^\s+|\s+$/g, "");
    if (writeDynToContent(key, value)) saveContentToLocal();
  }

  function onDynPaste(e) {
    if (!e.target.matches("[data-dyn][contenteditable]")) return;
    e.preventDefault();
    var text = (e.clipboardData || window.clipboardData).getData("text");
    document.execCommand("insertText", false, text);
  }

  function onImageDblClick(e) {
    if (!EDIT_MODE) return;
    var el = e.target.closest("[data-dyn-src]");
    if (!el) return;
    var key = el.getAttribute("data-dyn-src");
    var next = window.prompt("画像URLを入力", el.getAttribute("src") || "");
    if (next == null) return;
    next = next.trim();
    if (!next) return;
    el.setAttribute("src", next);
    writeImageToContent(key, next);
    saveContentToLocal();
  }

  function writeImageToContent(key, value) {
    if (!CONTENT) return;
    if (key === "heroImage") {
      var ch = getEditableChallenge();
      if (ch) ch.heroImage = value;
      return;
    }
    var caseImg = key.match(/^case(\d+)image$/);
    if (caseImg) {
      var ch2 = getEditableChallenge();
      if (!ch2) return;
      var idx = Number(caseImg[1]);
      if (!ch2.cases) ch2.cases = [];
      while (ch2.cases.length <= idx) ch2.cases.push({});
      ch2.cases[idx].image = value;
      return;
    }
    var talentImg = key.match(/^talent(\d+)photo$/);
    if (talentImg) {
      var ch3 = getEditableChallenge();
      if (!ch3) return;
      var tidx = Number(talentImg[1]);
      if (!ch3.talent) ch3.talent = [];
      while (ch3.talent.length <= tidx) ch3.talent.push({});
      ch3.talent[tidx].photo = value;
    }
  }

  function setEditMode(on) {
    EDIT_MODE = !!on;
    document.body.classList.toggle("deck-edit-mode", EDIT_MODE);
    document.querySelectorAll("[data-dyn]").forEach(function (el) {
      if (EDIT_MODE) {
        el.setAttribute("contenteditable", "true");
        el.setAttribute("spellcheck", "false");
      } else {
        el.removeAttribute("contenteditable");
      }
    });
    var toggleBtn = document.getElementById("edit-mode-toggle");
    var downloadBtn = document.getElementById("edit-download");
    if (toggleBtn) {
      toggleBtn.textContent = EDIT_MODE ? "編集を終了" : "編集モード";
      toggleBtn.classList.toggle("is-active", EDIT_MODE);
    }
    if (downloadBtn) downloadBtn.style.display = EDIT_MODE ? "" : "none";
    if (EDIT_MODE) {
      var ids = readChallengeIds();
      if (ids.length > 1) {
        setEditStatus("複数課題選択中：1つ目の課題タイプに保存されます");
      } else {
        setEditStatus("クリックして文字を編集（自動保存）");
      }
    } else {
      setEditStatus("");
    }
  }

  function initEditMode() {
    editStatusEl = document.getElementById("edit-status");
    var toggleBtn = document.getElementById("edit-mode-toggle");
    var downloadBtn = document.getElementById("edit-download");
    var deck = document.querySelector(".deck");
    if (!toggleBtn || !deck) return;

    toggleBtn.addEventListener("click", function () {
      setEditMode(!EDIT_MODE);
    });
    if (downloadBtn) {
      downloadBtn.addEventListener("click", downloadContentJson);
    }
    deck.addEventListener("input", onDynInput);
    deck.addEventListener("paste", onDynPaste);
    deck.addEventListener("dblclick", onImageDblClick);
  }

  function loadContent() {
    var local = null;
    try {
      local = JSON.parse(localStorage.getItem(CONTENT_KEY) || "null");
    } catch (e) {}

    if (
      local &&
      Array.isArray(local.challenges) &&
      local.challenges.length &&
      (local.version || 0) >= 14
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

      writeForm(saved);
      apply();
      initEditMode();

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
        fillChallengeChecks([]);
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
