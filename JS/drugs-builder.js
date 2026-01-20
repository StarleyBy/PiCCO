// Data object from drugs.md
const drugs = {
  norepinephrine: {
    label: "Norepinephrine / Noradrenalin, Levophed / catecholamine, strong α1-adr. agonist",
    symbol: "NE",
    value: "0.01–1.0 µg/kg/min, IV",
    class: "norepinephrine",
    description: "Potent α1-adrenergic agonist → marked systemic vasoconstriction, moderate β1 stimulation → mild increase in contractility. Minimal β2. Raises MAP primarily by increasing SVRI. Metabolic: Phenylalanine → Tyrosine → L-DOPA → Dopamine → Norepinephrine. Norepinephrine itself can further be converted into epinephrine by the enzyme phenylethanolamine N-methyltransferase with S-adenosyl-L-methionine as cofactor.",
    mechanism: "Potent α1-adrenergic agonist causing marked systemic vasoconstriction via Gq-protein coupled receptors, with moderate β1 stimulation leading to mild increases in myocardial contractility and heart rate. Minimal β2 activity avoids significant vasodilation or bronchodilation. Primarily elevates mean arterial pressure (MAP) by increasing systemic vascular resistance index (SVRI), with secondary effects on cardiac index (CI) depending on preload status.",
    effects: "First-line vasopressor in septic shock, vasodilatory shock, peri-anesthetic hypotension, neurogenic shock from spinal cord injury, and as a bridge in cardiogenic shock when combined with inotropes.",
    features: "Primary SVRI driver. If CI drops → add inotrope. If ELWI rises → avoid excessive MAP targets.",
    contraindications: "Uncorrected hypovolemia (always optimize preload first), severe peripheral or mesenteric ischemia, uncorrected tachyarrhythmias, and use with caution in patients with occlusive vascular disease.",
    duration: "Onset: 1-2 minutes, duration: 1-2 minutes after discontinuation (requires continuous infusion)",
    facts: "Surviving Sepsis Campaign: FIRST-LINE pressor. Less arrhythmogenic than dopamine, as shown in SOAP-II trial, with a mortality benefit in septic shock.",
    advantages: "Always infuse via central venous access to prevent extravasation disasters; dilute in 5% dextrose (D5W) only, as it's incompatible with saline. Protect from light with foil-wrapped tubing. If possible, norepinephrine should be infused through intravenous lines not used for blood products. In pediatrics, watch for disproportionate hypertension in neonates due to immature receptors. High doses (>0.5 µg/kg/min) may impair microcirculation—consider adding vasopressin early. Target MAP ≥65 mmHg, but personalize for chronic hypertensives (aim 70–80). Fun fact: it's also called 'leave 'em dead' if you don't monitor closely!",
    dangers: "Peripheral ischemia leading to digital necrosis (especially in prolonged high-dose use), mesenteric ischemia, rare tachyarrhythmias, extravasation causing local tissue necrosis (treat with phentolamine infiltration), hypertension, and potential reflex bradycardia. Norepinephrine administration may be contraindicated for patients with hypotension secondary to cardiogenic mechanisms."
  },
  epinephrine: {
    label: "Epinephrine / Adrenaline / catecholamine, non-selective α/β-adr. agonist",
    symbol: "Adr",
    value: "0.01–0.5 µg/kg/min, IV",
    class: "epinephrine",
    description: "Non-selective α/β agonist → increases CI, SVRI, HR. β2 → lactate rise via aerobic glycolysis.",
    mechanism: "Non-selective agonist at α1/α2 (vasoconstriction, more than 0.3 mcg/kg/min) and β1/β2 (inotropy, chronotropy, and bronchodilation, less than 0.3 mcg/kg/min) receptors. Increases cardiac index (CI) via β1-mediated contractility and heart rate, while boosting SVRI through α effects. β2 stimulation promotes aerobic glycolysis in skeletal muscle, leading to lactate production without true hypoxia.",
    effects: "Second-line in septic shock when norepinephrine fails, cardiogenic shock with low output, post-cardiac surgery vasoplegia, anaphylaxis, and ACLS protocols for cardiac arrest (1 mg IV q3–5 min).",
    features: "Raises CI + SVRI simultaneously. Lactate rise ≠ tissue hypoxia — interpret carefully.",
    contraindications: "Uncontrolled tachyarrhythmias, severe ischemic heart disease (risk of demand ischemia), pheochromocytoma, and uncorrected hypovolemia.",
    duration: "Onset: immediate, duration: 1-5 minutes (continuous infusion required for sustained effect)",
    facts: "Often causes ‘false lactate’. Good rescue drug when norepinephrine insufficient.",
    advantages: "Epinephrine is a double-edged sword in the ICU—powerful rescue agent, but its arrhythmogenic potential demands vigilance. Always central line only; dilute in D5W or NS, but watch for oxidation (turns pink—discard). In kids, it's gold for neonatal shock but titrate meticulously to avoid tachycardia. From my experience, it shines in mixed shock states, but avoid as first-line in sepsis due to higher mortality signals in some trials. Interesting pearl: its lactate effect can mislead—pair with PiCCO for true perfusion insights. If adding to norepinephrine, start low to prevent overshoot.",
    dangers: "Tachyarrhythmias (VT/VF), myocardial ischemia, hyperlactatemia (often 'false' from β2 effects), hyperglycemia, hypokalemia, and pulmonary edema if over-infused. If extravasation or inadvertent digital injection occurs, infiltrate the site with 10 to 15 mL of a saline solution containing 5 to 10 mg phentolamine."
  },
  vasopressin: {
    label: "Vasopressin / Empressin",
    symbol: "Vp",
    value: "0.01–0.04 U/min (fixed)",
    class: "vasopressin",
    description: "V1 mediated vasoconstriction independent of adrenergic receptors. Preserves pulmonary circulation.",
    mechanism: "Selective V1 receptor activation causes vasoconstriction independent of adrenergic pathways, sparing pulmonary vasculature (no V1 in lungs). Also V2 effects on water retention, but minimal at low doses. Augments catecholamine sensitivity and preserves baroreflex.",
    effects: "Catecholamine-refractory septic shock (add to norepinephrine >0.25 µg/kg/min), post-cardiopulmonary bypass (CPB) vasoplegia, and neurogenic shock.",
    features: "Powerful SVRI augmenter without raising HR/CI.",
    contraindications: "Chronic hyponatremia, active coronary or mesenteric ischemia (risk of spasm), and severe peripheral vascular disease.",
    duration: "Onset: 5-10 minutes, duration: 10-30 minutes after discontinuation.",
    facts: "VASST trial: reduces norepinephrine dose, arrhythmia-neutral.",
    advantages: "Vasopressin is my go-to 'norepinephrine-sparing' agent—VASST trial showed it reduces catecholamine doses without arrhythmia risk. Infuse centrally; compatible with D5W or NS, no light protection needed. In pediatrics, it's underused but effective in septic neonates—start ultra-low. Pearl: it preserves renal perfusion better than pure alphas. From years in the trenches, adding it early in high-NE sepsis can halve pressor needs and improve outcomes. Avoid abrupt withdrawal—taper to prevent rebound hypotension.",
    dangers: "Digital ischemia, hyponatremia (monitor Na+ q6h), gut ischemia (check lactate/abdominal exam), skin necrosis, and bradycardia."
  },
  phenylephrine: {
    label: "Phenylephrine / Neo-Synephrine",
    symbol: "Ph",
    value: "20–200 µg/min",
    class: "phenylephrine",
    description: "Pure arterial vasoconstriction → reflex bradycardia → ↓CI.",
    mechanism: "Selective α1 agonism leads to pure arterial and venous vasoconstriction, increasing SVRI and preload. Often causes reflex bradycardia via baroreflex, potentially decreasing CI.",
    effects: "Anesthesia-induced hypotension, neurogenic shock, and short-term support in hyperdynamic states with preserved CI.",
    features: "Use ONLY if CI is preserved.",
    contraindications: "Low cardiac output states, bradycardia-prone patients, and uncorrected hypovolemia.",
    duration: "Onset: 1-2 minutes, duration: 15-20 minutes.",
    facts: "Avoid in septic shock with low CI.",
    advantages: "Phenylephrine is the 'quick fix' for OR hypotension, but avoid in septic ICU patients with low CI—it can tank output further. Central or large peripheral vein; dilute in NS or D5W. In kids, great for brief boluses in procedural hypotension. Tip: no tachyphylaxis like norepinephrine, but watch reflex brady—pair with atropine if needed. In my practice, it's ideal for spinal anesthesia vasodilation, but not a long-term ICU player.",
    dangers: "Bradycardia, reduced CI, peripheral ischemia, hypertension, and headache."
  },
  angiotensin_ii: {
    label: "Angiotensin II / Giapreza",
    symbol: "An",
    value: "20–80 ng/kg/min",
    class: "angiotensin_ii",
    description: "Direct AT1 mediated vasoconstriction, ↑aldosterone, ↑SVRI.",
    mechanism: "Direct activation of angiotensin II type 1 receptors causes potent vasoconstriction, aldosterone release, and SVRI increase. Bypasses ACE pathway, useful in ACEI-related vasoplegia.",
    effects: "Refractory vasodilatory shock (e.g., sepsis after NE + VP), post-CPB, and distributive shock in liver failure.",
    features: "Last-line extreme SVRI booster.",
    contraindications: "Active thrombosis (pro-thrombotic), mesenteric ischemia, and severe thrombocytopenia.",
    duration: "Onset: rapid, duration: short (continuous infusion).",
    facts: "ATHOS-3 trial: rapid MAP restoration.",
    advantages: "Angiotensin II is the 'last resort' pressor—ATHOS-3 trial demonstrated rapid MAP restoration in refractory shock. Central access mandatory; reconstitute with NS, stable 24h at room temp. Pediatric use emerging in ECMO vasoplegia. From my lectures: it's a game-changer in ACE-downregulated states like sepsis or burns, but monitor for thrombosis—add low-dose heparin if possible. Costly, so reserve for true failures.",
    dangers: "Thrombosis (monitor D-dimer/platelets), digital ischemia, hypertension, and delirium."
  },
  dobutamine: {
    label: "Dobutamine / Dobutrex",
    symbol: "Db",
    value: "2–20 µg/kg/min",
    class: "dobutamine",
    description: "Predominant β1 stimulation → ↑contractility, ↑SV, ↑CI. Mild β2 → vasodilation → ↓SVRI. Minimal α.",
    mechanism: "Predominant β1 stimulation enhances myocardial contractility via cAMP increase, boosting stroke volume (SV) and CI. Mild β2-mediated vasodilation reduces SVRI; minimal α effects at low doses.",
    effects: "Low cardiac output syndrome, cardiogenic shock with adequate MAP, septic myocardial depression, post-cardiotomy low CI, and stress echo.",
    features: "Primary CI augmenter. If SVRI falls → add norepinephrine. Improves CFI & GEF.",
    contraindications: "Dynamic LV outflow tract obstruction (e.g., HCM), uncontrolled atrial fibrillation, hypovolemia, and tachyarrhythmias.",
    duration: "Onset: 1-2 minutes, duration: 10-20 minutes.",
    facts: "Classic inotrope. Watch for tachyphylaxis. Avoid as sole agent in hypotensive shock.",
    advantages: "Dobutamine remains the classic inotrope in my arsenal—perfect for 'cold and wet' cardiogenic shock. Central line preferred; dilute in D5W or NS, protect from light. In pediatrics, it's frontline for congenital heart low output. Pearl: tolerance builds fast—rotate with milrinone if needed. From ICU rounds: always echo-guide to rule out obstruction; pairs beautifully with PiCCO for real-time CI titration.",
    dangers: "Tachyarrhythmias (dose-dependent), hypotension from vasodilation, myocardial ischemia, and tachyphylaxis after 48–72h."
  },
  levosimendan: {
    label: "Levosimendan / Simdax",
    symbol: "Ls",
    value: "0.05–0.2 µg/kg/min (no bolus in ICU)",
    class: "levosimendan",
    description: "Increases Ca sensitivity of troponin C → ↑contractility without ↑O₂ demand. Opens KATP channels → vasodilation.",
    mechanism: "Sensitizes troponin C to calcium, increasing contractility without raising myocardial O2 demand. Opens ATP-sensitive K channels causing systemic and coronary vasodilation, reducing afterload and preload.",
    effects: "Acute decompensated heart failure (HFrEF), cardiogenic shock, post-cardiotomy low cardiac output syndrome (LCOS), and weaning from mechanical support.",
    features: "Raises CI + reduces GEDVI/ELWI. Long after-effect via active metabolite.",
    contraindications: "Severe hypotension (SBP <90 mmHg), ventricular arrhythmias, severe renal failure (eGFR <30 mL/min), and liver impairment.",
    duration: "Onset: 5-10 minutes, duration: up to 7–9 days via active metabolite.",
    facts: "Active metabolite lasts 7–9 DAYS → true ‘pharmacologic assist device’.",
    advantages: "Levosimendan is like a 'pharmacologic IABP'—its 7–9 day metabolite effect makes it unique for bridging. Central infusion; dilute in D5W only (pH sensitive). In kids, emerging for post-op congenital heart. Tip: no dose adjustment for renal failure, but watch K+. In my experience, it shines in weaning VA-ECMO patients—LEOCE trial supports mortality benefit in cardiac surgery.",
    dangers: "Hypotension (vasodilation), atrial fibrillation, headache, and hypokalemia."
  },
  milrinone: {
    label: "Milrinone / Primacor",
    symbol: "Mi",
    value: "0.375–0.75 µg/kg/min",
    class: "milrinone",
    description: "PDE3 inhibition → ↑cAMP → ↑contractility + potent vasodilation (systemic & pulmonary).",
    mechanism: "Inhibits phosphodiesterase-3, increasing cAMP levels for enhanced contractility and potent vasodilation (systemic, pulmonary, and coronary). Reduces PVR markedly.",
    effects: "Low CI with high PVR, right ventricular failure, pulmonary hypertension, post-cardiotomy LCOS, and bridge to transplant.",
    features: "Excellent for RV failure & PVR reduction. Expect SVRI drop.",
    contraindications: "Severe hypotension, renal failure (adjust dose if eGFR <50), and recent MI.",
    duration: "Onset: 5-15 minutes, duration: 3-6 hours.",
    facts: "Renally cleared — reduce dose if GFR <30.",
    advantages: "Milrinone is the RV savior in my book—OPTIME-CHF showed benefits in advanced HF. Central line; dilute in D5W or NS, stable 24h. Pediatrics: standard for ductal-dependent lesions. Pearl: renally cleared—halve dose if eGFR <30. From years teaching: it's arrhythmia-prone at high doses; always co-administer with pressor if SBP dips.",
    dangers: "Hypotension, ventricular arrhythmias, thrombocytopenia (rare), and headache."
  },
  dopamine: {
    label: "Dopamine",
    symbol: "Do",
    value: "2–20 µg/kg/min",
    class: "dopamine",
    description: "Dose-dependent: low D1 renal vasodilation, medium β1 inotropy, high α vasoconstriction.",
    mechanism: "Dose-dependent: low activates D1/D2 (renal/mesenteric vasodilation), medium β1/β2 (inotropy/chronotropy), high α1 (vasoconstriction). Releases norepinephrine from stores.",
    effects: "Bradycardic hypotension, selected low-output states, and historical renal protection (now debunked).",
    features: "Unpredictable CI/SVRI effects.",
    contraindications: "Tachyarrhythmias, ischemic heart disease, pheochromocytoma, and MAOI use.",
    duration: "Onset: 5 minutes, duration: 10 minutes.",
    facts: "SOAP-II: higher arrhythmia & mortality vs norepinephrine.",
    advantages: "Dopamine's heyday is over—SOAP-II trial linked it to higher arrhythmias and mortality vs norepinephrine in shock. Central access essential; dilute in D5W. In kids, low-dose for oliguria but evidence weak. Tip: immunosuppressive effects via D2 on T-cells—avoid in sepsis. In my view, reserve for bradycardic niches; it's a relic but teaches dose-dependency beautifully.",
    dangers: "High arrhythmia rate (VT/AF), immunosuppression, increased mortality in sepsis, nausea, and tissue necrosis on extravasation."
  },
  isoproterenol: {
    label: "Isoproterenol / Isuprel",
    symbol: "Is",
    value: "0.5–5 µg/min",
    class: "isoproterenol",
    description: "Pure β1/β2 → strong chronotropy + inotropy + vasodilation.",
    mechanism: "Pure β1/β2 stimulation increases HR (chronotropy), contractility, and causes vasodilation/bronchodilation via cAMP.",
    effects: "Severe bradycardia, high-grade AV block, post-heart transplant bradyarrhythmias, and torsades suppression.",
    features: "Raises CI by HR primarily.",
    contraindications: "Ischemic heart disease, AF with rapid ventricular response, and hypotension.",
    duration: "Onset: immediate, duration: 10-15 minutes.",
    facts: "Bridge to pacing.",
    advantages: "Isoproterenol is the ultimate 'pace without a wire'—bridge to transvenous pacing. Central or large vein; dilute in D5W, light-protect. Pediatrics: useful in congenital complete heart block. Pearl: no inotropic effect without tachycardia. From my career: it's fallen out of favor due to proarrhythmia, but invaluable in denervated transplanted hearts.",
    dangers: "Tachyarrhythmias, hypotension, tremor, and angina."
  },
  enalapril: {
    label: "Enalapril / Vasotec",
    symbol: "En",
    value: "PO: 2.5–40 mg/day; IV: 0.625–1.25 mg q6h",
    class: "enalapril",
    description: "ACE inhibitor prodrug → enalaprilat. ↓Ang II, ↓aldosterone, ↑bradykinin → ↓SVRI, ↓afterload, ↓remodeling.",
    mechanism: "Prodrug converted to enalaprilat, inhibiting ACE to reduce angiotensin II, aldosterone, and increase bradykinin—leading to afterload reduction, vasodilation, and anti-remodeling effects.",
    effects: "HFrEF (mortality benefit), post-MI LV dysfunction, CKD proteinuria, diabetic nephropathy, and hypertension.",
    features: "Lowers SVRI, improves CI over time.",
    contraindications: "Pregnancy, bilateral renal artery stenosis, history of angioedema, hyperkalemia, severe AS.",
    duration: "Onset: 1 hour PO, 15 minutes IV; duration: 6-12 hours.",
    facts: "ONLY IV ACEI available (enalaprilat). SOLVD: mortality benefit.",
    advantages: "Enalapril is foundational for HF remodeling—SOLVD trial proved its mortality edge. IV enalaprilat is the only injectable ACEI, perfect for NPO patients. In kids, standard for pediatric HTN. Tip: hold in AKI; restart when Cr stabilizes. With caution in liver failure (prodrug conversion impaired). In teaching rounds: its cough drives switches to ARBs, but it's cost-effective gold.",
    dangers: "First-dose hypotension, cough (10–20%), AKI, hyperkalemia, angioedema."
  },
  ramipril: {
    label: "Ramipril / Tritace",
    symbol: "Ra",
    value: "2.5–10 mg/day",
    class: "ramipril",
    description: "Long-acting ACE inhibitor with tissue ACE affinity.",
    mechanism: "Long-acting ACEI with high tissue penetration, reducing Ang II and promoting anti-fibrotic effects beyond BP control.",
    effects: "HF, post-MI, high-risk vascular disease (HOPE trial), CKD, hypertension.",
    features: "Afterload reduction → improved CI.",
    contraindications: "Same as ACEI.",
    duration: "Onset: 1-2 hours, duration: 24 hours.",
    facts: "HOPE trial: major CV mortality reduction.",
    advantages: "Ramipril's HOPE trial legacy: CV mortality slashed in high-risk patients. No IV form; careful in hepatic impairment. Pediatrics: for renovascular HTN. Pearl: uricosuric effect helps gouty HF patients. From my perspective: longer half-life means better compliance—start post-stabilization in ICU.",
    dangers: "Cough, hypotension, hyperkalemia, AKI."
  },
  losartan: {
    label: "Losartan / Cozaar",
    symbol: "Lo",
    value: "25–100 mg/day",
    class: "losartan",
    description: "Blocks Ang II AT1 receptor → ↓afterload, ↓aldosterone, no bradykinin effect.",
    mechanism: "Selective AT1 blockade prevents Ang II effects on vasoconstriction and aldosterone, without bradykinin increase (no cough).",
    effects: "Hypertension, diabetic nephropathy, HF in ACEI-intolerant, Marfan syndrome aortic protection.",
    features: "SVRI reduction.",
    contraindications: "Pregnancy, bilateral RAS, hyperkalemia.",
    duration: "Onset: 6 hours, duration: 24 hours.",
    facts: "Uricosuric — lowers uric acid.",
    advantages: "Losartan is the cough-free ACE alternative—LIFE trial showed stroke reduction. Uricosuric bonus lowers uric acid. In kids, FDA-approved for pediatric HTN. Tip: no dose adjust in renal failure. In ICU: useful transition from IV vasodilators.",
    dangers: "Hyperkalemia, AKI, dizziness (rare cough/angioedema)."
  },
  valsartan: {
    label: "Valsartan / Diovan",
    symbol: "Vs",
    value: "80–320 mg/day",
    class: "valsartan",
    description: "Strong AT1 binding → ↓afterload.",
    mechanism: "High-affinity AT1 blockade reduces afterload and remodeling.",
    effects: "HF (Val-HeFT), post-MI LV dysfunction, hypertension.",
    features: "Improves ventricular–arterial coupling.",
    contraindications: "Same as ARBs.",
    duration: "Onset: 2 hours, duration: 24 hours.",
    facts: "Core HFrEF ARB.",
    advantages: "Core ARB for HFrEF—combine with sacubitril for ARNI power. Pediatrics: for HTN. Pearl: better tolerated in elderly. From experience: smooth ICU oral transition.",
    dangers: "Hyperkalemia, hypotension, AKI."
  },
  candesartan: {
    label: "Candesartan / Atacand",
    symbol: "Cn",
    value: "8–32 mg/day",
    class: "candesartan",
    description: "Highest AT1 receptor affinity.",
    mechanism: "Highest AT1 affinity for potent blockade.",
    effects: "HFrEF (CHARM), hypertension.",
    features: "Strong SVRI reduction.",
    contraindications: "ARBs standard.",
    duration: "Onset: 2 hours, duration: 24 hours.",
    facts: "Best ARB for HF remodeling.",
    advantages: "Best ARB for HF per CHARM—mortality reduction. Kids: HTN. Tip: dose-escalate slowly.",
    dangers: "Similar to class."
  },
  nicardipine: {
    label: "Nicardipine / Cardene",
    symbol: "Nc",
    value: "5–15 mg/hr IV",
    class: "nicardipine",
    description: "Pure arterial vasodilation → ↓afterload, preserves venous return.",
    mechanism: "Selective arterial L-type Ca channel block reduces afterload without venous effects.",
    effects: "Hypertensive emergencies, stroke/neuro ICU BP control, aortic dissection.",
    features: "Sharp SVRI reduction without preload drop.",
    contraindications: "Severe AS, acute HF, AV block.",
    duration: "Onset: 5-10 minutes, duration: 4-6 hours.",
    facts: "Gold standard in neuro-ICU.",
    advantages: "Neuro-ICU favorite—ECLIPSE trial for SAH. Central/large vein; lipid emulsion form reduces phlebitis. Pediatrics: for HTN crises. Pearl: no light sensitivity, but short half-life (titrate frequently).",
    dangers: "Reflex tachycardia, headache, flushing, phlebitis."
  },
  nitroprusside: {
    label: "Nitroprusside / Nipride",
    symbol: "Np",
    value: "0.3–5 µg/kg/min",
    class: "snitroprusside",
    description: "Potent arterial+venous dilation.",
    mechanism: "Releases NO for direct arterial and venous relaxation, reducing afterload and preload.",
    effects: "Hypertensive emergencies, acute MR/AR, acute HF with high SVR.",
    features: "Reduces SVRI and GEDVI/ELWI.",
    contraindications: "Compensatory HTN (e.g., coarctation), vitamin B12 deficiency, tobacco amblyopia.",
    duration: "Onset: immediate, duration: 1-10 minutes.",
    facts: "Light sensitive.",
    advantages: "Classic balanced dilator—wrap in foil (light-sensitive), co-infuse thiosulfate for cyanide prevention. Kids: for post-op HTN. Tip: limit <48h at high doses. In my era, it saved many aortic dissections.",
    dangers: "Cyanide toxicity (monitor thiocyanate), methemoglobinemia, hypotension, rebound HTN."
  },
  nitroglycerin: {
    label: "Nitroglycerin / Isoket",
    symbol: "Ni",
    value: "5–200 µg/min",
    class: "nitroglycerin",
    description: "Venodilation → ↓preload → ↓pulmonary congestion.",
    mechanism: "NO release preferentially dilates veins, reducing preload and pulmonary congestion; mild arterial effects at high doses.",
    effects: "Acute pulmonary edema, ACS with HTN, hypertensive HF.",
    features: "Reduces GEDVI & ELWI.",
    contraindications: "Hypotension, RV infarct, PDE5 inhibitor use (e.g., sildenafil).",
    duration: "Onset: 2-5 minutes, duration: 3-5 minutes.",
    facts: "Preload modulator.",
    advantages: "Preload king for edema—infuse via non-PVC tubing (adsorbs). Pediatrics: for ductal closure failure. Pearl: tolerance? Pause or add acetylcysteine. Duplicate entry noted—consolidated here.",
    dangers: "Headache, hypotension, tachyphylaxis (tolerance after 24h), methemoglobinemia."
  },
  urapidil: {
    label: "Urapidil / Ebrantil",
    symbol: "Ur",
    value: "5–25 mg IV",
    class: "urapidil",
    description: "Central + peripheral vasodilation without reflex tachycardia.",
    mechanism: "Peripheral α1 blockade plus central 5-HT1A agonism for vasodilation without reflex tachycardia.",
    effects: "Hypertensive crises, peri-op HTN, neurogenic HTN.",
    features: "Pure SVRI reducer.",
    contraindications: "Aortic stenosis, pregnancy.",
    duration: "Onset: 3-5 minutes, duration: 3-6 hours.",
    facts: "Perfect neuro-ICU drug.",
    advantages: "European favorite for neuro-ICU—no tachy like nicardipine. Central vein; stable in NS. Emerging pediatric use. Tip: ideal when HR control needed.",
    dangers: "Hypotension, dizziness, nausea."
  },
  amiodarone: {
    label: "Amiodarone / Cordarone",
    symbol: "Ao",
    value: "150–300 mg bolus → 900–1200 mg/24h",
    class: "amiodarone",
    description: "Blocks K+, Na+, Ca++ channels + β-blocking → prolongs AP and refractory period. Very low proarrhythmia risk.",
    mechanism: "Blocks K+, Na+, Ca channels and β-receptors, prolonging action potential and refractory period across all cardiac tissue; thyroid hormone analog effects.",
    effects: "VT/VF refractory to defibrillation, AF with RVR, electrical storm, post-op AF prevention.",
    features: "May transiently drop CI due to bradycardia.",
    contraindications: "Severe sinus/AV block without pacemaker, thyroid disease, pregnancy.",
    duration: "Onset: 2-3 days PO, immediate IV; duration: weeks to months.",
    facts: "Use D5W only. Safest ICU antiarrhythmic.",
    advantages: "Safest ICU antiarrhythmic—use D5W only for infusion (incompatible with NS). Central line to avoid phlebitis. Pediatrics: for SVT. Pearl: load aggressively in shock; monitor TSH/LFTs. From my podium: it's not just class III—it's the Swiss army knife.",
    dangers: "Hypotension (IV solvent-related), bradycardia, QT prolongation (rare TdP), thyroid dysfunction, pulmonary fibrosis (chronic), liver toxicity."
  },
  lidocaine: {
    label: "Lidocaine",
    symbol: "Li",
    value: "1–1.5 mg/kg bolus → 1–4 mg/min",
    class: "lidocaine",
    description: "Shortens AP, suppresses ventricular ectopy.",
    mechanism: "Shortens action potential in Purkinje/ventricular cells, suppressing ectopy; minimal effect on normal tissue.",
    effects: "Ischemic VT/VF, digoxin toxicity arrhythmias.",
    features: "Neutral to SVRI/CI.",
    contraindications: "Severe heart block, hepatic failure (metabolized).",
    duration: "Onset: 45-90 seconds, duration: 10-20 minutes.",
    facts: "Second-line VT/VF.",
    advantages: "Old-school VT suppressor—second to amio in ACLS. Infuse in NS/D5W. Kids: for ventricular ectopy. Tip: levels toxic fast in liver failure—halve dose.",
    dangers: "Neurotoxicity (tremor, seizures at >5 µg/mL), bradycardia."
  },
  adenosine: {
    label: "Adenosine / Adenocor",
    symbol: "As",
    value: "6–12 mg rapid IV",
    class: "adenosine",
    description: "Transient AV node block.",
    mechanism: "Transient AV nodal block via hyperpolarization; half-life <10 sec.",
    effects: "Paroxysmal SVT termination, diagnostic for wide-complex tachycardia.",
    features: "No direct effect.",
    contraindications: "Asthma (bronchospasm), WPW with AF (proarrhythmic).",
    duration: "Onset: 20-30 seconds, duration: 10-20 seconds.",
    facts: "Always flush FAST.",
    advantages: "Push fast, flush faster—central line ideal. Pediatrics: SVT gold. Pearl: caffeine blocks it—ask history.",
    dangers: "Chest pain, flushing, dyspnea, asystole (brief)."
  },
  verapamil: {
    label: "Verapamil / Ikacor",
    symbol: "Ve",
    value: "5–10 mg IV",
    class: "verapamil",
    description: "AV nodal block, negative inotrope.",
    mechanism: "Blocks L-type Ca channels in AV node, slowing conduction; negative inotrope.",
    effects: "AF/flutter rate control, PSVT (if adenosine fails).",
    features: "Lowers CI.",
    contraindications: "HFrEF (worsens), WPW with AF, beta-blocker co-use.",
    duration: "Onset: 3-5 minutes, duration: 10-20 minutes.",
    facts: "Avoid in low EF.",
    advantages: "AV node specialist—avoid in wide QRS. Slow push to prevent crash. Kids: cautious in infants.",
    dangers: "Hypotension, bradycardia, asystole."
  },
  diltiazem: {
    label: "Diltiazem / Dilatam",
    symbol: "Di",
    value: "0.25 mg/kg bolus → 5–15 mg/hr",
    class: "diltiazem",
    description: "AV node block, mild negative inotrope.",
    mechanism: "AV nodal Ca block for rate control; milder negative inotrope than verapamil.",
    effects: "AF/flutter RVR in preserved EF.",
    features: "Moderate CI reduction.",
    contraindications: "Severe HFrEF, sick sinus.",
    duration: "Onset: 3 minutes, duration: 1-3 hours.",
    facts: "Safer than Verapamil in borderline EF.",
    advantages: "Safer than verapamil in borderline EF—infuse continuously. Pediatrics: rare. Tip: transition to PO quickly.",
    dangers: "Hypotension, bradycardia."
  },
  magnesium_sulfate: {
    label: "Magnesium sulfate",
    symbol: "Mg",
    value: "1–2 g IV",
    class: "magnesium_sulfate",
    description: "Membrane stabilization, suppresses early afterdepolarizations.",
    mechanism: "Stabilizes membranes, suppresses early afterdepolarizations; cofactor in Na/K-ATPase.",
    effects: "Torsades de pointes, AF adjunct, eclampsia.",
    features: "Improves rhythm without hemodynamic penalty.",
    contraindications: "Renal failure, high-grade AV block.",
    duration: "Onset: immediate, duration: 15-30 minutes.",
    facts: "First-line for torsades.",
    advantages: "TdP first-line—always check/correct hypomagnesemia. Slow in renal failure. Kids: for arrhythmias.",
    dangers: "Hypotension (rapid push), respiratory depression (high dose)."
  },
  furosemide: {
    label: "Furosemide / Lasix",
    symbol: "Fu",
    value: "20–200 mg IV/PO",
    class: "furosemide",
    description: "Na-K-2Cl block in Henle loop → powerful natriuresis + venodilation.",
    mechanism: "Inhibits NKCC2 in loop of Henle for natriuresis; acute venodilation reduces preload.",
    effects: "Pulmonary edema, fluid overload, AKI with volume, ARDS de-resuscitation.",
    features: "Primary ELWI reducer. ↓GEDVI & EVLWI.",
    contraindications: "Hypovolemia, severe hyponatremia, sulfa allergy (rare cross).",
    duration: "Onset: 5 minutes IV, 30 minutes PO; duration: 2 hours IV, 6-8 hours PO.",
    facts: "Bolus or infusion for de-resuscitation.",
    advantages: "Decongestion champ—bolus for acute, infusion for chronic. Ototoxicity risk in aminoglycosides co-use. Pediatrics: for CHD overload.",
    dangers: "Hypokalemia, ototoxicity (high IV bolus), AKI if over-diuresed."
  },
  spironolactone: {
    label: "Spironolactone / Aldactone",
    symbol: "Sp",
    value: "25–50 mg/day",
    class: "spironolactone",
    description: "Aldosterone antagonist → ↓fibrosis/remodeling.",
    mechanism: "Competitive aldosterone block reduces Na retention and fibrosis.",
    effects: "HFrEF mortality reduction, resistant HTN, ascites.",
    features: "Stabilizes preload & remodeling.",
    contraindications: "Hyperkalemia, renal failure (eGFR <30).",
    duration: "Onset: 2-3 days, duration: 2-3 days.",
    facts: "RALES trial.",
    advantages: "RALES trial icon—monitor K+ weekly initially. Kids: for Bartter's.",
    dangers: "Hyperkalemia, gynecomastia, AKI."
  },
  propofol: {
    label: "Propofol / Diprivan",
    symbol: "Pf",
    value: "0.5–4 mg/kg/hr",
    class: "propofol",
    description: "GABA-A sedation, vasodilation.",
    mechanism: "Enhances GABA for hypnosis; causes vasodilation/hypotension.",
    effects: "ICU sedation, procedural anesthesia.",
    features: "↓SVRI, ↓CI if hypovolemic.",
    contraindications: "Egg/soy allergy, mitochondrial disease.",
    duration: "Onset: 1-2 minutes, duration: 3-10 minutes.",
    facts: "Watch PRIS.",
    advantages: "Fast on/off—monitor triglycerides in long use. Kids: PRIS risk higher.",
    dangers: "Hypotension, PRIS (rhabdo, acidosis)."
  },
  dexmedetomidine: {
    
label: "Dexmedetomidine / Precedex / α2-adreno-agonist",

symbol: "DexMed",
    
value: "loading dose 0.5 to 1.0 mcg/kg, continuous 0.2–1.5 µg/kg/hr, IV, IM, IN",
    
class: "dexmedetomidine",
    
description: "α2 agonist → cooperative sedation, provides anxiolysis, sedation, and analgesia, sympatholytic properties",
    
mechanism: "Central α2 agonism for cooperative sedation without respiratory depression.",
    
effects: "ICU sedation, delirium prevention, procedural, mimics natural sleep and can be used safely without as much fear of the respiratory drive being affected; can be used alone or in combination with other sedative and analgesic medications to reduce the doses and associated side effects",
    
features: "The most common side effects are bradycardia and a biphasic effect of hypertension initially followed by hypotension.",
    
contraindications: "Bradycardia, heart block.",
    
duration: "Onset: 5-10 minutes, duration: 60 minutes.The manufacturer does not recommend durations longer than 24 hours; however, longer durations have been demonstrated as safe and effective.",
    
facts: "Does not suppress respiration. Dexmedetomidine is metabolized by the liver",
    
advantages: "Delirium buster—central line; no load in shock.",
    
dangers: "Bradycardia, hypotension."
  },
  rocuronium: {
    label: "Rocuronium / Esmeron",
    symbol: "Rc",
    value: "0.6–1 mg/kg",
    class: "rocuronium",
    description: "Non-depolarizing NMBA.",
    mechanism: "Competitive ACh receptor block at NMJ.",
    effects: "Intubation, ARDS ventilation.",
    features: "Improves ventilation compliance.",
    contraindications: "Myasthenia, allergy.",
    duration: "Onset: 1-2 minutes, duration: 30-60 minutes.",
    facts: "Reversible by sugammadex.",
    advantages: "Sugammadex reversal—game-changer. Kids: similar.",
    dangers: "Prolonged block in renal failure."
  },
  uf_heparin: {
    label: "Heparin",
    symbol: "He",
    value: "70–100 U/kg bolus → infusion",
    class: "uf_heparin",
    description: "ATIII activation → Xa/IIa block.",
    mechanism: "Activates antithrombin III to inhibit Xa/IIa.",
    effects: "ACS, VTE, ECMO/CRRT circuit patency.",
    features: "Prevents circuit thrombosis.",
    contraindications: "HIT, active bleed.",
    duration: "Onset: immediate, duration: 1-2 hours.",
    facts: "Monitor aPTT.",
    advantages: "aPTT monitor (1.5–2.5x baseline). Reversible with protamine.",
    dangers: "Bleeding, HIT, osteoporosis (chronic)."
  },
  enoxaparin: {
    label: "Enoxaparin / Clexane",
    symbol: "Ex",
    value: "1 mg/kg BID",
    class: "enoxaparin",
    description: "Factor Xa inhibition.",
    mechanism: "ATIII-dependent Xa inhibition; less IIa.",
    effects: "VTE prophylaxis/treatment, ACS.",
    features: "Standard VTE prophylaxis/therapy.",
    contraindications: "Renal failure (CrCl <30), bleed.",
    duration: "Onset: 3-5 hours, duration: 12 hours.",
    facts: "Anti-Xa monitoring in obesity/renal. Partial protamine reversal.",
    advantages: "Anti-Xa monitoring in obesity/renal. Partial protamine reversal.",
    dangers: "Bleeding, HIT (less than UFH)."
  },
  apixaban: {
    label: "Apixaban / Eliquis",
    symbol: "Ap",
    value: "2.5–5 mg BID",
    class: "apixaban",
    description: "Direct Xa inhibition.",
    mechanism: "Directly blocks factor Xa.",
    effects: "AF stroke prevention, VTE.",
    features: "Safest NOAC for elderly.",
    contraindications: "Severe renal/liver, bleed.",
    duration: "Onset: 3-4 hours, duration: 24 hours.",
    facts: "Safest in elderly—low drug interactions.",
    advantages: "Safest in elderly—low drug interactions. Andexxa reversal.",
    dangers: "Bleeding (less GI than warfarin)."
  },
  hydralazine: {
    label: "Hydralazine / Apresoline",
    symbol: "Hy",
    value: "10–20 mg IV",
    class: "hydralazine",
    description: "Direct arterial dilator.",
    mechanism: "Direct smooth muscle relaxation (mechanism unclear; NO involvement?).",
    effects: "Hypertensive emergencies, HF afterload reduction.",
    features: "Pure SVRI reduction.",
    contraindications: "CAD (reflex tachy), lupus.",
    duration: "Onset: 5-20 minutes IV, duration: 2-6 hours.",
    facts: "Safe in pregnancy.",
    advantages: "Pregnancy-safe HTN drug. Slow onset PO.",
    dangers: "Tachycardia, headache, lupus-like syndrome (chronic)."
  },
  hydrocortisone: {
    label: "Hydrocortisone / Solu-Cortef",
    symbol: "Hc",
    value: "50 mg IV q6h (or 200 mg/day infusion)",
    class: "hydrocortisone",
    description: "Glucocorticoid receptor activation → restores catecholamine receptor sensitivity, suppresses NO overproduction, stabilizes capillary leak.",
    mechanism: "GR activation restores vasopressor sensitivity, reduces NO, stabilizes endothelium.",
    effects: "Refractory septic shock, relative adrenal insufficiency.",
    features: "Reduces vasopressor requirement, stabilizes SVRI, reduces ELWI.",
    contraindications: "Uncontrolled systemic fungal infection.",
    duration: "Onset: hours, duration: 8-12 hours.",
    facts: "Surviving Sepsis: start if NE >0.25 µg/kg/min and MAP unstable.",
    advantages: "SSC guideline for high-NE shock. Taper to avoid rebound.",
    dangers: "Hyperglycemia, delirium, immunosuppression."
  },
  albumin: {
    label: "Human Albumin",
    symbol: "Al",
    value: "5%: 250–500 ml; 20%: 50–200 ml",
    class: "albumin",
    description: "Oncotic plasma expansion, scavenges NO & free radicals.",
    mechanism: "Oncotic pull expands plasma; binds drugs/NO.",
    effects: "Septic shock after crystalloids, hypoalbuminemia, capillary leak.",
    features: "Raises GEDVI more effectively than crystalloids, lowers ELWI.",
    contraindications: "Pulmonary edema, severe heart failure.",
    duration: "Onset: immediate, duration: hours to days.",
    facts: "ALBIOS: benefit in septic shock.",
    advantages: "ALBIOS: benefit in septic shock. 20% for pulling fluid.",
    dangers: "Allergic reactions, volume overload."
  },
  calcium: {
    label: "Calcium gluconate / CaCl₂",
    symbol: "Ca",
    value: "10 ml 10% Ca gluconate IV slow",
    class: "calcium",
    description: "Restores excitation-contraction coupling.",
    mechanism: "Restores Ca for contraction; stabilizes membrane in hyperK.",
    effects: "Hypocalcemia, massive transfusion, hyperkalemia, low cardiac output.",
    features: "Immediate CI booster.",
    contraindications: "Digoxin toxicity.",
    duration: "Onset: immediate, duration: 30-60 minutes.",
    facts: "Often forgotten but extremely powerful.",
    advantages: "Underrated—give in citrate overload. Central for chloride.",
    dangers: "Bradycardia (fast push), phlebitis (chloride)."
  },
  sodium_bicarbonate: {
    label: "Sodium bicarbonate",
    symbol: "NaB",
    value: "50–100 mmol IV",
    class: "sodium_bicarbonate",
    description: "Corrects severe metabolic acidosis → restores catecholamine receptor sensitivity.",
    mechanism: "Buffers H+ to CO2 + H2O; restores pH for pressor efficacy.",
    effects: "Severe acidosis (pH <7.1) with shock, TCA OD.",
    features: "Allows vasopressors to work again.",
    contraindications: "Respiratory acidosis, alkalosis.",
    duration: "Onset: immediate, duration: variable.",
    facts: "Not for routine lactate correction.",
    advantages: "Not for lactate alone—ventilate first.",
    dangers: "Hypernatremia, fluid overload, metabolic alkalosis."
  },
  methylene_blue: {
    label: "Methylene blue",
    symbol: "Mb",
    value: "1–2 mg/kg IV",
    class: "methylene_blue",
    description: "Guanylate cyclase inhibition → blocks NO-mediated vasoplegia.",
    mechanism: "Inhibits guanylate cyclase, blocking NO vasodilation.",
    effects: "Refractory vasodilatory shock, post-CPB vasoplegia.",
    features: "Dramatic SVRI restoration.",
    contraindications: "G6PD deficiency, SSRI use (serotonin syndrome).",
    duration: "Onset: 30 minutes, duration: 2-3 hours.",
    facts: "Life-saving when NE+VP fail.",
    advantages: "Vasoplegia lifesaver—short-term use.",
    dangers: "Blue urine, false pulse ox drop, hemolysis."
  },
  inono: {
    label: "Inhaled Nitric Oxide",
    symbol: "iNO",
    value: "5–40 ppm",
    class: "inono",
    description: "Selective pulmonary vasodilation.",
    mechanism: "Selective pulmonary vasodilation via cGMP.",
    effects: "ARDS with RV failure, severe pulmonary hypertension.",
    features: "Reduces PVR, increases RV CI.",
    contraindications: "Methemoglobinemia, LV failure (flooding).",
    duration: "Onset: immediate, duration: continuous inhalation.",
    facts: "Bridge therapy.",
    advantages: "Bridge—taper slowly.",
    dangers: "Rebound PH on withdrawal, metHb."
  },
  esmolol: {
    label: "Esmolol / Brevibloc",
    symbol: "Esm",
    value: "500 µg/kg → 50–200 µg/kg/min",
    class: "esmolol",
    description: "β1 blockade → HR↓, diastolic filling↑, myocardial O2 demand↓",
    mechanism: "β1 block reduces HR, improves diastolic filling, lowers O2 demand.",
    effects: "Septic shock with HR>100–110, preserved EF",
    features: "↑SV, ↑CI, ↓EVLW, ↓lactate",
    contraindications: "EF<35%, AV block, cardiogenic shock",
    duration: "Onset: 2 minutes, duration: 10-20 minutes.",
    facts: "Proven mortality benefit in septic shock (Morelli 2013)",
    advantages: "Morelli 2013: sepsis mortality benefit. Ultra-short half-life.",
    dangers: "Bradycardia, hypotension."
  },
  ivabradine: {
    label: "Ivabradine / Corlanor",
    symbol: "Iva",
    value: "5–7.5 mg PO bid (IV 0.1 mg/kg)",
    class: "ivabradine",
    description: "If-channel inhibition (no BP or contractility drop)",
    mechanism: "Sinoatrial If current block lowers HR without BP/inotropy drop.",
    effects: "High HR with low CI",
    features: "↑SV without hypotension",
    contraindications: "AF, severe bradycardia",
    duration: "Onset: 1 hour, duration: 12 hours.",
    facts: "Useful when BB unsafe",
    advantages: "BB alternative when unsafe. SHIFT trial HF benefit.",
    dangers: "Phosphenes, bradycardia."
  },
  digoxin: {
    label: "Digoxin / Lanoxin",
    symbol: "Dig",
    value: "0.25 mg IV q6h ×2–3",
    class: "digoxin",
    description: "Na/K-ATPase inhibition → Ca²⁺↑ → inotropy↑, AV conduction↓",
    mechanism: "Increases intracellular Ca for inotropy; slows AV conduction.",
    effects: "AF + low CI, RV failure",
    features: "↑CI in AF with RV dysfunction",
    contraindications: "Hypokalemia, renal failure",
    duration: "Onset: 5-30 minutes IV, duration: 3-6 days.",
    facts: "Still ICU-relevant",
    advantages: "Still relevant—levels 0.5–2 ng/mL. DigiFab for tox.",
    dangers: "Toxicity (arrhythmias, nausea), hyperK in OD."
  },
  clevidipine: {
    label: "Clevidipine / Cleviprex",
    symbol: "Cle",
    value: "1–16 mg/h",
    class: "clevidipine",
    description: "Ultra-short L-type Ca channel arterial dilator",
    mechanism: "Arterial Ca channel block.",
    effects: "Hypertensive cardiogenic shock, LV failure",
    features: "↓SVRI → CI↑",
    contraindications: "Egg/soy allergy, lipid disorders",
    duration: "Onset: 2-4 minutes, duration: 5-15 minutes.",
    facts: "Ideal PiCCO afterload tool",
    advantages: "Titratable like nitro—lipid emulsion.",
    dangers: "Tachycardia, headache."
  },
  terlipressin: {
    label: "Terlipressin / Glypressin",
    symbol: "Ter",
    value: "1 mg IV q4–6h",
    class: "terlipressin",
    description: "V1 receptor vasoconstriction (longer than vasopressin)",
    mechanism: "Long-acting vasopressin analog for vasoconstriction.",
    effects: "Septic vasoplegia, hepatorenal syndrome",
    features: "↑SVRI, ↓vasopressor demand",
    contraindications: "Ischemic heart disease",
    duration: "Onset: 30 minutes, duration: 4-6 hours.",
    facts: "Powerful but dangerous",
    advantages: "Powerful—watch gut/skin.",
    dangers: "Ischemia, hyponatremia."
  },
  tranexamic_acid: {
    label: "Tranexamic acid / Cyklokapron",
    symbol: "TXA",
    value: "1 g IV bolus ± infusion",
    class: "tranexamic_acid",
    description: "Plasmin inhibition → antifibrinolysis",
    mechanism: "Binds plasminogen to block fibrinolysis.",
    effects: "Major bleeding, trauma, surgery",
    features: "Prevents preload collapse from bleeding",
    contraindications: "Active thrombosis",
    duration: "Onset: 5-15 minutes, duration: 3 hours.",
    facts: "CRASH-2",
    advantages: "CRASH-2: mortality cut.",
    dangers: "Seizures (high dose), thrombosis."
  },
  pcc: {
    label: "Prothrombin complex concentrate / Kcentra",
    symbol: "PCC",
    value: "25–50 IU/kg",
    class: "pcc",
    description: "Rapid reversal of anticoagulation",
    mechanism: "Rapid factor replacement.",
    effects: "Warfarin reversal, major bleed",
    features: "Stabilizes preload & DO2",
    contraindications: "HIT (some contain heparin).",
    duration: "Onset: immediate, duration: variable.",
    facts: "Life-saving in bleeding",
    advantages: "Faster than FFP.",
    dangers: "Thrombosis."
  },
  alteplase: {
    label: "Alteplase / Activase",
    symbol: "tPA",
    value: "100 mg IV",
    class: "alteplase",
    description: "Fibrin clot lysis",
    mechanism: "Converts plasminogen to plasmin for clot lysis.",
    effects: "Massive PE, cardiac arrest PE",
    features: "Explosive CI recovery",
    contraindications: "Bleed risk, recent surgery.",
    duration: "Onset: 30-60 min, duration: 4-8 hours.",
    facts: "When RV is dying",
    advantages: "Effective clot dissolution, time-sensitive benefits.",
    dangers: "Major bleeding, especially intracranial hemorrhage."
  },
  thiamine: {
    label: "Thiamine",
    symbol: "Thia",
    value: "200 mg IV q12h",
    class: "thiamine",
    description: "Pyruvate dehydrogenase activation → lactate↓",
    mechanism: "Activates PDH for glucose metabolism; reduces lactate.",
    effects: "Septic shock, alcoholic ketoacidosis, Wernicke's.",
    features: "Improves O2 utilization",
    contraindications: "None significant.",
    duration: "Onset: hours, duration: days.",
    facts: "Always give in shock",
    advantages: "Always in shock—cheap, safe.",
    dangers: "Rare anaphylaxis."
  },
  insulin: {
    label: "Insulin infusion",
    symbol: "Ins",
    value: "0.05–0.1 U/kg/h",
    class: "insulin",
    description: "Glucose uptake & metabolism normalization",
    mechanism: "Promotes glucose uptake, suppresses gluconeogenesis.",
    effects: "Hyperglycemia in shock, DKA.",
    features: "Improves cellular oxygen extraction",
    contraindications: "Hypoglycemia.",
    duration: "Onset: immediate, duration: variable.",
    facts: "Hyperglycemia kills mitochondria",
    advantages: "NICE-SUGAR: tight control harms.",
    dangers: "Hypoglycemia, hypokalemia."
  },
  potassium_magnesium: {
    label: "Potassium / Magnesium",
    symbol: "K/Mg",
    value: "KCl 10–20 mmol/h; MgSO4 2 g IV",
    class: "potassium_magnesium",
    description: "Membrane stabilization",
    mechanism: "Restore gradients for rhythm/contractility.",
    effects: "HypoK/Mg arrhythmias, shock.",
    features: "Prevents malignant arrhythmias",
    contraindications: "HyperK, renal failure.",
    duration: "Onset: immediate, duration: variable.",
    facts: "Always correct before antiarrhythmics",
    advantages: "Correct before any antiarrhythmic.",
    dangers: "Phlebitis (K), bradycardia (Mg)."
  },
  sacubitril_valsartan: {
    label: "Sacubitril/Valsartan / Entresto",
    symbol: "Sac",
    value: "49/51 mg BID → 97/103 mg BID",
    class: "sacubitril_valsartan",
    description: "Inhibits neprilysin to boost natriuretic peptides; ARB blocks AT1.",
    mechanism: "Inhibits neprilysin to boost natriuretic peptides; ARB blocks AT1.",
    effects: "HFrEF (PARADIGM-HF mortality benefit).",
    features: "Afterload/preload reduction; CI up.",
    contraindications: "Angioedema history, pregnancy.",
    duration: "Onset: days, duration: 12 hours.",
    facts: "HF game-changer—switch from ACE/ARB after 36h washout.",
    advantages: "HF game-changer—switch from ACE/ARB after 36h washout.",
    dangers: "Hypotension, hyperkalemia, cough."
  },
  empagliflozin: {
    label: "Empagliflozin / Jardiance",
    symbol: "Emp",
    value: "10–25 mg PO QD",
    class: "empagliflozin",
    description: "Blocks SGLT2 for glucose/Na excretion; osmotic diuresis, anti-remodeling.",
    mechanism: "Blocks SGLT2 for glucose/Na excretion; osmotic diuresis, anti-remodeling.",
    effects: "HFrEF/HFpEF (EMPEROR-reduced benefit), T2DM, CKD.",
    features: "Preload reduction; ELWI down.",
    contraindications: "eGFR <30, ketoacidosis.",
    duration: "Onset: hours, duration: 24 hours.",
    facts: "New pillar—mortality cut regardless of DM.",
    advantages: "New pillar—mortality cut regardless of DM.",
    dangers: "UTI, genital infections, volume depletion."
  },
  finerenone: {
    label: "Finerenone / Kerendia",
    symbol: "Fin",
    value: "10–20 mg PO QD",
    class: "finerenone",
    description: "Blocks MR with less hyperK than spiro.",
    mechanism: "Blocks MR with less hyperK than spiro.",
    effects: "CKD in T2DM, HF potential.",
    features: "Anti-fibrotic; preload stable.",
    contraindications: "HyperK, eGFR <25.",
    duration: "Onset: days, duration: 24 hours.",
    facts: "FIDELIO-DKD: renal/CV protection.",
    advantages: "FIDELIO-DKD: renal/CV protection.",
    dangers: "Hyperkalemia (mild), hyponatremia."
  },
  atropine: {
    label: "Atropine",
    symbol: "Atr",
    value: "0.5–1 mg IV q3–5 min (max 3 mg)",
    class: "atropine",
    description: "Blocks vagal tone for HR increase.",
    mechanism: "Blocks vagal tone for HR increase.",
    effects: "Symptomatic bradycardia, organophosphate OD.",
    features: "HR/CI up.",
    contraindications: "Glaucoma, myasthenia.",
    duration: "Onset: 1 minute, duration: 3-4 hours.",
    facts: "ACLS bradycardia first-line.",
    advantages: "ACLS bradycardia first-line.",
    dangers: "Tachycardia, dry mouth, delirium."
  },
  metoprolol: {
    label: "Metoprolol / Lopressor",
    symbol: "Met",
    value: "5 mg IV q5 min x3 then 25–100 mg PO BID",
    class: "metoprolol",
    description: "β1 block reduces HR/contractility.",
    mechanism: "β1 block reduces HR/contractility.",
    effects: "ACS rate control, HF long-term.",
    features: "O2 demand down.",
    contraindications: "Acute decomp HF, block.",
    duration: "Onset: 5 minutes IV, duration: 5-8 hours.",
    facts: "COMMIT trial for MI.",
    advantages: "COMMIT trial for MI.",
    dangers: "Bradycardia, fatigue."
  }
};

document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('periodicTable');
    const tooltip = document.getElementById('tooltip');
    const tooltipContent = document.getElementById('tooltipContent');
    const closeTooltipBtn = document.getElementById('closeTooltip');

    if (!table || !tooltip || !tooltipContent || !closeTooltipBtn) {
        console.error('Essential elements for drugs page not found!');
        return;
    }

    // Sort drugs alphabetically by label for consistent order
    const sortedDrugs = Object.values(drugs).sort((a, b) => a.label.localeCompare(b.label));

    sortedDrugs.forEach(drug => {
        const element = document.createElement('div');
        element.className = `element ${drug.class}`;
        element.innerHTML = `
            <div class="element-label">${drug.label}</div>
            <div class="element-symbol">${drug.symbol}</div>
            <div class="element-value">${drug.value}</div>
        `;

        const showTooltip = (e) => {
            const color = window.getComputedStyle(e.currentTarget).color;
            tooltip.style.color = color;
            tooltip.style.borderColor = color;

            tooltipContent.innerHTML = `
                <div class="tooltip-title">${drug.symbol} - ${drug.label}</div>
                ${drug.description ? `<div class="tooltip-section"><div class="tooltip-section-title">Description</div><div class="tooltip-section-content">${drug.description}</div></div>` : ''}
                ${drug.mechanism ? `<div class="tooltip-section"><div class="tooltip-section-title">Mechanism</div><div class="tooltip-section-content">${drug.mechanism}</div></div>` : ''}
                ${drug.effects ? `<div class="tooltip-section"><div class="tooltip-section-title">Clinical Use</div><div class="tooltip-section-content">${drug.effects}</div></div>` : ''}
                ${drug.features ? `<div class="tooltip-section"><div class="tooltip-section-title">PiCCO Insights</div><div class="tooltip-section-content">${drug.features}</div></div>` : ''}
                ${drug.contraindications ? `<div class="tooltip-section"><div class="tooltip-section-title">Contraindications</div><div class="tooltip-section-content">${drug.contraindications}</div></div>` : ''}
                ${drug.duration ? `<div class="tooltip-section"><div class="tooltip-section-title">Onset & Duration</div><div class="tooltip-section-content">${drug.duration}</div></div>` : ''}
                ${drug.facts ? `<div class="tooltip-section"><div class="tooltip-section-title">Key Facts</div><div class="tooltip-section-content">${drug.facts}</div></div>` : ''}
                ${drug.advantages ? `<div class="tooltip-section"><div class="tooltip-section-title">Pearls & Tips</div><div class="tooltip-section-content">${drug.advantages}</div></div>` : ''}
                ${drug.dangers ? `<div class="tooltip-section"><div class="tooltip-section-title">Dangers</div><div class="tooltip-section-content">${drug.dangers}</div></div>` : ''}
            `;
            
            // Center the tooltip on screen
            tooltip.style.left = '50%';
            tooltip.style.top = '50%';
            tooltip.style.transform = 'translate(-50%, -50%)';
            tooltip.classList.add('active');
        };

        // Tooltip is now only triggered by click
        element.addEventListener('click', (e) => {
            showTooltip(e);
            e.stopPropagation();
        });

        table.appendChild(element);
    });

    function forceHideTooltip() {
        tooltip.classList.remove('active');
    }

    closeTooltipBtn.addEventListener('click', forceHideTooltip);
});
