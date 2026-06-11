/* Replaces the live #pricing-plans section with the NEW pricing (toggle +
   clickable tiers + simulator + discovery-call CTAs). Everything else on the
   page is the untouched production build, so fonts/colors/copy are exact. */
(function () {
  const OLD_CSS_UNUSED = ``; // (replaced below with the site's real design tokens)
  const CSS = `
  /* ════ Site design tokens (extracted from the prod bundle) ════
     font: Geist · cards: pink→grey gradient rim, radius 24, layered shadows
     badge: #ffe3e3 bg / #fe2623 text, centered on the top edge
     buttons: 90px pills, black gradient (#000→#666) w/ slide hover
     gradient text: 90deg #2239bd → #46d3f6 */
  .npx{--ink:#000;--mut:#959595;--line:#e5e5e5;--blue:#2239bd;--cyan:#46d3f6;
    --gradtxt:linear-gradient(90deg,#2239bd 24%,#46d3f6 83%);
    --cardbg:linear-gradient(180deg,#dce7ff,#f3f3f3 60%);
    --cardshadow:3px 9px 20px 0 rgba(77,77,77,.03),10px 36px 37px 0 rgba(77,77,77,.03),24px 80px 50px 0 rgba(77,77,77,.02);
    max-width:1120px;margin:0 auto;padding:90px 24px 30px;font-family:Geist,sans-serif}
  .npx *{box-sizing:border-box;margin:0;padding:0;font-family:Geist,sans-serif;color:var(--ink)}
  .npx .p-eyebrow{text-align:center;font-size:13px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
    background:var(--gradtxt);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
  .npx .p-title{text-align:center;font-size:42px;letter-spacing:-.02em;font-weight:600;margin:10px 0 8px;line-height:1.12}
  .npx .p-title .gt{background:var(--gradtxt);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;font-weight:600}
  .npx .p-sub{text-align:center;color:#3b3f41;font-size:16px;font-weight:400;margin-bottom:30px}
  /* toggle: white pill + black gradient pill, like the site's header buttons */
  .npx .toggle{display:flex;justify-content:center;margin-bottom:36px}
  .npx .toggle .box{display:flex;gap:6px;background:#ebedf1;border-radius:20px;padding:7px;box-shadow:inset 0 1px 4px rgba(0,0,0,.06)}
  .npx .toggle button{border-radius:14px;border:0;background:transparent;min-width:240px;
    padding:14px 32px;font-size:17px;font-weight:600;letter-spacing:-.3px;color:#7a7f87;cursor:pointer;transition:all .25s ease}
  .npx .toggle button:hover{color:#000}
  .npx .toggle button.on{background:#fff;color:#000;box-shadow:0 4px 16px rgba(0,0,0,.10),0 1px 3px rgba(0,0,0,.06)}
  .npx .toggle button.on span{color:#2239bd}
  .npx .toggle button span{display:block;font-size:12px;font-weight:500;color:#9aa0a8;letter-spacing:-.2px;margin-top:2px}
  /* tier cards: the site's pricing-card recipe: gradient rim + white inner */
  .npx .billing{display:flex;justify-content:center;margin-bottom:22px}
  .npx .bbox{display:flex;gap:4px;background:#fff;border:1px solid #e5e5e5;border-radius:90px;padding:4px;box-shadow:0 4px 15px rgba(0,0,0,.06)}
  .npx .bbox button{border:0;border-radius:90px;background:transparent;padding:8px 20px;font-size:13.5px;font-weight:600;color:#7a7f87;cursor:pointer;transition:all .2s ease}
  .npx .bbox button.on{background:linear-gradient(180deg,#000,#666 200%);color:#fff}
  .npx .bbox button em{font-style:normal;font-size:11px;font-weight:600;color:#2239bd;background:#e4edff;border-radius:99px;padding:3px 9px;margin-left:6px;display:inline-block}
  .npx .bbox button.on em{color:#fff;background:linear-gradient(90deg,#2239bd,#46d3f6)}
  .npx .incl{font-size:12px;color:#9ca3af;margin-top:4px}
  .npx .tiers{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:16px;padding-top:12px}
  .npx .tier{position:relative;border:0;border-radius:24px;background:var(--cardbg);box-shadow:var(--cardshadow);
    padding:6px;cursor:pointer;text-align:left;transition:transform .3s ease}
  .npx .tier:hover{transform:translateY(-3px) scale(1.01)}
  .npx .tier .inner{background:#fff;border-radius:19px;padding:18px 16px;height:100%;transition:background .25s ease}
  .npx .tier.active{background:linear-gradient(180deg,#9fbdff,#dbe7ff 80%)}
  .npx .tier.active .inner{background:linear-gradient(180deg,#eef4ff,#f7faff)}
  .npx .tier.active:before{content:"";position:absolute;inset:0;top:40px;height:80%;background:#7aa5ff;border-radius:24px;filter:blur(60px);opacity:.55;z-index:-1}
  .npx .tier .range{font-size:13px;font-weight:500;color:rgba(0,0,0,.6);letter-spacing:-.2px}
  .npx .tier .price{font-size:30px;font-weight:600;letter-spacing:-1px;margin-top:10px;display:flex;align-items:baseline;gap:2px}
  .npx .tier .price small{font-size:13px;font-weight:400;color:var(--mut);letter-spacing:0}
  .npx .tier .old{font-size:15px;color:var(--mut);text-decoration:line-through;font-weight:400;margin-right:7px}
  .npx .tier .tg{position:absolute;top:0;left:50%;transform:translate(-50%,-54%);background:#ffe3e3;border:1px solid #fff1f1;
    border-radius:12px;color:#fe2623;font-size:12px;font-weight:500;padding:4px 12px;display:inline-flex;align-items:center;justify-content:center}
  .npx .minnote{text-align:center;font-size:13px;color:#3b3f41;font-weight:400;margin-bottom:38px}
  .npx .minnote b{color:#000;font-weight:600}
  /* simulator: one big site-style card (gradient rim + white inner) */
  .npx .sim{border-radius:24px;background:var(--cardbg);box-shadow:var(--cardshadow);padding:6px}
  .npx .sim .simwrap{display:grid;grid-template-columns:1.25fr .85fr;background:#fff;border-radius:19px;overflow:hidden}
  .npx .sim-left{padding:30px 32px}
  .npx .sim h2{font-size:20px;font-weight:600;letter-spacing:-.4px;margin-bottom:4px}
  .npx .hint{font-size:13.5px;color:#959595;font-weight:400;margin-bottom:24px}
  .npx .lbl{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#959595;margin-bottom:10px;display:flex;justify-content:space-between;align-items:baseline}
  .npx .lbl output{font-size:17px;color:#000;font-weight:600;text-transform:none;letter-spacing:-.4px}
  .npx input[type=range]{width:100%;accent-color:var(--blue);height:32px}
  .npx .ticks{display:flex;justify-content:space-between;font-size:10.5px;color:#c4c4c4;margin:-4px 2px 22px}
  .npx .conn{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:8px}
  .npx .copt{border:1px solid #e5e5e5;border-radius:16px;padding:13px 13px 11px;cursor:pointer;background:#fff;text-align:left;
    box-shadow:0 4px 15px rgba(0,0,0,.05);transition:transform .25s ease,border-color .25s ease}
  .npx .copt:hover{transform:translateY(-2px)}
  .npx .copt.on{background:linear-gradient(180deg,#e2ecff,#fff 80%);border-color:#b9cdfb}
  .npx .copt .t{font-size:13.5px;font-weight:600;letter-spacing:-.2px}
  .npx .copt .d{font-size:11.5px;color:#959595;font-weight:400;margin-top:3px;line-height:1.45}
  .npx .copt .d b{color:#000;font-weight:600}
  .npx .country{margin-top:12px;display:none;align-items:center;gap:10px}
  .npx .country.show{display:flex}
  .npx .country label{font-size:12.5px;color:#959595;font-weight:500}
  .npx .country select{border:1px solid #e5e5e5;border-radius:90px;padding:8px 16px;font-size:13.5px;font-weight:500;background:#fff;cursor:pointer;box-shadow:0 4px 15px rgba(0,0,0,.05)}
  /* summary: black panel like the site's dark gradient buttons */
  .npx .sim-right{background:linear-gradient(180deg,#000,#3a3a3a 160%);padding:28px;display:flex;flex-direction:column}
  .npx .sim-right *{color:#fff}
  .npx .sr-row{display:flex;justify-content:space-between;font-size:13.5px;font-weight:400;padding:6px 0}
  .npx .sr-row span:first-child{color:#a3a3a3}
  .npx .sr-div{border-top:1px solid hsla(0,0%,100%,.14);margin:10px 0}
  .npx .fp{font-size:11.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#46d3f6}
  .npx .payrow{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;margin-top:2px}
  .npx .total{font-size:36px;font-weight:600;letter-spacing:-1px}
  .npx .then{font-size:14px;color:#cfcfcf;font-weight:400;padding-bottom:6px;white-space:nowrap}
  .npx .then b{font-size:17px;font-weight:600}
  .npx .eff{margin-top:12px;font-size:12px;font-weight:400;background:hsla(0,0%,100%,.08);border:1px solid hsla(0,0%,100%,.12);border-radius:12px;padding:8px 12px;color:#b8f0cf}
  .npx a.buy{margin-top:auto;display:block;width:100%;background:#fff;color:#000;border-radius:90px;padding:13px;
    font-size:15.5px;font-weight:600;letter-spacing:-.4px;text-align:center;text-decoration:none;
    transition:transform .3s ease,box-shadow .3s ease}
  .npx a.buy:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 6px 20px rgba(255,255,255,.15)}
  .npx .custom-banner{display:none;margin-top:auto;background:hsla(0,0%,100%,.06);border:1px solid hsla(0,0%,100%,.14);border-radius:16px;padding:14px;font-size:13.5px;font-weight:400;line-height:1.5}
  .npx .custom-banner a{color:#46d3f6;font-weight:600}
  /* help bar */
  .npx .help{margin-top:14px;display:flex;align-items:center;justify-content:center;gap:7px;background:transparent;border:0;box-shadow:none;padding:10px 24px;flex-wrap:wrap}
  .npx .help p{font-size:13.5px;color:#6b7280;font-weight:400}
  .npx .help b{color:#000;font-weight:600}
  .npx .help a{background:none;border:0;color:#2239bd;text-decoration:underline;text-underline-offset:2px;font-size:13.5px;font-weight:600;padding:0;white-space:nowrap}
  .npx .help a:hover{color:#46d3f6}
  /* in-house */
  .npx .inhouse{display:none;border-radius:24px;background:var(--cardbg);box-shadow:var(--cardshadow);padding:6px}
  .npx .inhouse .inwrap{background:#fff;border-radius:19px;padding:34px}
  .npx .inhouse .grid{display:grid;grid-template-columns:1.05fr .95fr;gap:34px;align-items:center}
  .npx .bigprice{font-size:42px;font-weight:600;letter-spacing:-1.4px}
  .npx .bigprice small{font-size:15px;color:#959595;font-weight:400;letter-spacing:0}
  .npx ul.feat{list-style:none;margin-top:14px}
  .npx ul.feat li{font-size:14.5px;font-weight:400;padding:6px 0 6px 26px;position:relative;color:#3b3f41}
  .npx ul.feat li b{font-weight:600;color:#000}
  .npx ul.feat li:before{content:"✓";position:absolute;left:0;background:var(--gradtxt);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;font-weight:700}
  .npx .boxshot{background:linear-gradient(180deg,#dce7ff,#f3f3f3 80%);border-radius:19px;padding:18px;text-align:center}
  .npx .boxshot .ph{height:190px;border-radius:14px;border:2px dashed #b9cdfb;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#2239bd;font-weight:600;font-size:14px;background:rgba(255,255,255,.65)}
  .npx .boxshot .ph span{font-size:34px}
  .npx .boxshot p{font-size:12px;color:#959595;font-weight:400;margin-top:10px}
  .npx .inh-note{margin-top:18px;font-size:13px;color:#2239bd;background:#eef3ff;border:1px solid #d6e2ff;border-radius:12px;padding:11px 14px;font-weight:500}
  .npx .inh-cta{display:flex;gap:10px;margin-top:14px}
  .npx .inh-cta a{flex:1;text-align:center;text-decoration:none;font-weight:500;font-size:14.5px;letter-spacing:-.3px;padding:12px;border-radius:90px;transition:transform .3s ease}
  .npx .inh-cta a:hover{transform:translateY(-2px) scale(1.02)}
  .npx .inh-cta a.primary{background:linear-gradient(180deg,#000,#666 200%);border:2px solid #353535;color:#fff}
  .npx .inh-cta a.ghost{border:1px solid #e5e5e5;color:#000;background:#fff;box-shadow:0 4px 15px rgba(0,0,0,.08)}
  @media(max-width:900px){.npx .tiers{grid-template-columns:repeat(2,1fr)}.npx .sim .simwrap{grid-template-columns:1fr}
    .npx .conn{grid-template-columns:1fr}.npx .inhouse .grid{grid-template-columns:1fr}}
  `;
  const CSS_LEGACY = `
  #pricing-plans .npx{--ink:#000;--mut:#6b7280;--line:#e8e8ea;--blue:#2239bd;--cyan:#46d3f6;
    --grad:linear-gradient(100deg,#2239bd 24%,#46d3f6 83%);--bluebg:#eef2ff;--dark:#0e1015;
    max-width:1120px;margin:0 auto;padding:90px 24px 30px;font-family:inherit}
  #pricing-plans .npx *{box-sizing:border-box;margin:0;padding:0;font-family:inherit;color:var(--ink)}
  .npx .p-eyebrow{text-align:center;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
    background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
  .npx .p-title{text-align:center;font-size:38px;letter-spacing:-.03em;font-weight:800;margin:8px 0 6px;line-height:1.15}
  .npx .p-title .gt{background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
  .npx .p-sub{text-align:center;color:var(--mut);font-size:15px;margin-bottom:26px}
  .npx .toggle{display:flex;justify-content:center;margin-bottom:30px}
  .npx .toggle .box{display:flex;background:#fff;border:1px solid var(--line);border-radius:14px;padding:5px;gap:4px;box-shadow:0 6px 24px rgba(0,0,0,.05)}
  .npx .toggle button{border:0;background:none;padding:10px 22px;border-radius:10px;font-size:14px;font-weight:600;color:var(--mut);cursor:pointer}
  .npx .toggle button.on{background:var(--bluebg);color:var(--ink);box-shadow:inset 0 0 0 1.5px #c7d2fe}
  .npx .toggle button span{display:block;font-size:11px;font-weight:500;color:var(--mut)}
  .npx .billing{display:flex;justify-content:center;margin-bottom:22px}
  .npx .bbox{display:flex;gap:4px;background:#fff;border:1px solid #e5e5e5;border-radius:90px;padding:4px;box-shadow:0 4px 15px rgba(0,0,0,.06)}
  .npx .bbox button{border:0;border-radius:90px;background:transparent;padding:8px 20px;font-size:13.5px;font-weight:600;color:#7a7f87;cursor:pointer;transition:all .2s ease}
  .npx .bbox button.on{background:linear-gradient(180deg,#000,#666 200%);color:#fff}
  .npx .bbox button em{font-style:normal;font-size:11px;font-weight:600;color:#2239bd;background:#e4edff;border-radius:99px;padding:3px 9px;margin-left:6px;display:inline-block}
  .npx .bbox button.on em{color:#fff;background:linear-gradient(90deg,#2239bd,#46d3f6)}
  .npx .incl{font-size:12px;color:#9ca3af;margin-top:4px}
  .npx .tiers{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:14px}
  .npx .tier{border:1.5px solid var(--line);border-radius:18px;padding:18px 16px;position:relative;background:#fff;transition:.18s;cursor:pointer;text-align:left;box-shadow:0 8px 30px rgba(0,0,0,.04)}
  .npx .tier:hover{border-color:#c7d2fe;transform:translateY(-2px)}
  .npx .tier.active{border-color:var(--blue);box-shadow:0 12px 40px rgba(34,57,189,.18);transform:translateY(-3px)}
  .npx .tier .range{font-size:12.5px;font-weight:700;color:var(--mut);text-transform:uppercase;letter-spacing:.04em}
  .npx .tier .price{font-size:29px;font-weight:800;letter-spacing:-.03em;margin-top:6px}
  .npx .tier .price small{font-size:13px;font-weight:500;color:var(--mut)}
  .npx .tier .old{font-size:13px;color:#b8bcc4;text-decoration:line-through;font-weight:600}
  .npx .tier .tg{position:absolute;top:-10px;right:12px;background:var(--grad);color:#fff;font-size:11px;font-weight:700;padding:3px 9px;border-radius:99px}
  .npx .minnote{text-align:center;font-size:12.5px;color:var(--mut);margin-bottom:34px}
  .npx .minnote b{color:var(--ink)}
  .npx .sim{border:1.5px solid var(--line);border-radius:22px;overflow:hidden;box-shadow:0 24px 70px rgba(14,16,21,.10);display:grid;grid-template-columns:1.25fr .85fr;background:#fff}
  .npx .sim-left{padding:30px 32px}
  .npx .sim h2{font-size:19px;letter-spacing:-.01em;margin-bottom:4px}
  .npx .hint{font-size:13px;color:var(--mut);margin-bottom:24px}
  .npx .lbl{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--mut);margin-bottom:10px;display:flex;justify-content:space-between;align-items:baseline}
  .npx .lbl output{font-size:16px;color:var(--ink);font-weight:800;text-transform:none;letter-spacing:0}
  .npx input[type=range]{width:100%;accent-color:var(--blue);height:32px}
  .npx .ticks{display:flex;justify-content:space-between;font-size:10.5px;color:#b8bcc4;margin:-4px 2px 22px}
  .npx .conn{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:8px}
  .npx .copt{border:1.5px solid var(--line);border-radius:14px;padding:13px 13px 11px;cursor:pointer;background:#fff;text-align:left;transition:.15s}
  .npx .copt:hover{border-color:#c7d2fe}
  .npx .copt.on{border-color:var(--blue);background:var(--bluebg)}
  .npx .copt .t{font-size:13.5px;font-weight:700}
  .npx .copt .d{font-size:11.5px;color:var(--mut);margin-top:3px;line-height:1.45}
  .npx .country{margin-top:12px;display:none;align-items:center;gap:10px}
  .npx .country.show{display:flex}
  .npx .country label{font-size:12.5px;color:var(--mut);font-weight:600}
  .npx .country select{border:1.5px solid var(--line);border-radius:10px;padding:8px 12px;font-size:13.5px;font-weight:600;background:#fff;cursor:pointer}
  .npx .sim-right{background:var(--dark);padding:28px;display:flex;flex-direction:column}
  .npx .sim-right *{color:#fff}
  .npx .sr-row{display:flex;justify-content:space-between;font-size:13.5px;padding:6px 0}
  .npx .sr-row span:first-child{color:#9ca3af}
  .npx .sr-div{border-top:1px solid #262a33;margin:10px 0}
  .npx .fp{font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#7dd3fc}
  .npx .total{font-size:34px;font-weight:800;letter-spacing:-.03em;margin-top:2px}
  .npx .then{font-size:14px;color:#c9cdd6;margin-top:6px}
  .npx .then b{font-size:17px}
  .npx .eff{margin-top:12px;font-size:12px;background:#171b23;border:1px solid #262a33;border-radius:10px;padding:8px 12px;color:#a5e8c4}
  .npx a.buy{margin-top:auto;display:block;width:100%;background:var(--grad);color:#fff;border-radius:12px;padding:14px;font-size:15px;font-weight:700;text-align:center;text-decoration:none;box-shadow:0 8px 24px rgba(34,57,189,.35)}
  .npx a.buy:hover{filter:brightness(1.08)}
  .npx .custom-banner{display:none;margin-top:auto;background:#171b23;border:1px solid #2b3340;border-radius:12px;padding:14px;font-size:13.5px;line-height:1.5}
  .npx .custom-banner a{color:#7dd3fc;font-weight:700}
  .npx .help{margin-top:30px;display:flex;align-items:center;justify-content:center;gap:14px;background:#fff;border:1px solid var(--line);border-radius:16px;padding:18px 22px;box-shadow:0 8px 30px rgba(0,0,0,.04)}
  .npx .help p{font-size:14px;color:var(--mut)}
  .npx .help b{color:var(--ink)}
  .npx .help a{background:var(--grad);color:#fff;text-decoration:none;font-size:13.5px;font-weight:700;padding:11px 18px;border-radius:11px;white-space:nowrap;box-shadow:0 6px 18px rgba(34,57,189,.3)}
  .npx .inhouse{display:none;border:1.5px solid var(--line);border-radius:22px;padding:34px;box-shadow:0 24px 70px rgba(14,16,21,.10);background:#fff}
  .npx .inhouse .grid{display:grid;grid-template-columns:1.05fr .95fr;gap:34px;align-items:center}
  .npx .bigprice{font-size:40px;font-weight:800;letter-spacing:-.03em}
  .npx .bigprice small{font-size:15px;color:var(--mut);font-weight:500}
  .npx ul.feat{list-style:none;margin-top:14px}
  .npx ul.feat li{font-size:14px;padding:6px 0 6px 26px;position:relative;color:#374151}
  .npx ul.feat li:before{content:"✓";position:absolute;left:0;background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;font-weight:800}
  .npx .boxshot{background:linear-gradient(150deg,#eef2ff,#e7f6fd);border:1px solid var(--line);border-radius:16px;padding:18px;text-align:center}
  .npx .boxshot .ph{height:190px;border-radius:12px;border:2px dashed #b9c4f1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--blue);font-weight:700;font-size:14px;background:rgba(255,255,255,.6)}
  .npx .boxshot .ph span{font-size:34px}
  .npx .boxshot p{font-size:12px;color:var(--mut);margin-top:10px}
  .npx .inh-cta{display:flex;gap:10px;margin-top:18px}
  .npx .inh-cta a{flex:1;text-align:center;text-decoration:none;font-weight:700;font-size:14px;padding:13px;border-radius:12px}
  .npx .inh-cta a.primary{background:var(--grad);color:#fff;box-shadow:0 6px 18px rgba(34,57,189,.3)}
  .npx .inh-cta a.ghost{border:1.5px solid var(--line);color:var(--ink)}
  @media(max-width:900px){.npx .tiers{grid-template-columns:repeat(2,1fr)}.npx .sim{grid-template-columns:1fr}
    .npx .conn{grid-template-columns:1fr}.npx .inhouse .grid{grid-template-columns:1fr}}
  `;

  const HTML = `
  <div class="npx">
    <div class="p-eyebrow">Pricing</div>
    <h2 class="p-title">Get started <span class="gt">from $49</span>. Upgrade as you grow.</h2>
    <p class="p-sub">Pay per iPhone, per month. The more you scale, the less you pay. No hidden fees.</p>
    <div class="toggle"><div class="box">
      <button id="t-office" class="on">Office <span>hosted &amp; managed by ALI</span></button>
      <button id="t-inhouse">In-house <span>our hardware, your office</span></button>
    </div></div>
    <div id="npx-office">
      <div class="billing"><div class="bbox">
        <button id="npx-bill-mo" class="on">Monthly</button>
        <button id="npx-bill-yr">Yearly <em>20% off</em></button>
      </div></div>
      <div class="tiers">
        <button class="tier" data-tier="0"><div class="inner"><div class="range">5 – 9 iPhones</div><div class="price"><span class="old o0" style="display:none">$79</span><span class="big b0">$79</span><small> /iPhone/mo</small></div></div></button>
        <button class="tier" data-tier="1"><span class="tg">20% off</span><div class="inner"><div class="range">10 – 24 iPhones</div><div class="price"><span class="old o1">$79</span><span class="big b1">$64</span><small> /iPhone/mo</small></div></div></button>
        <button class="tier" data-tier="2"><span class="tg">38% off</span><div class="inner"><div class="range">25 – 49 iPhones</div><div class="price"><span class="old o2">$79</span><span class="big b2">$49</span><small> /iPhone/mo</small></div></div></button>
        <button class="tier" data-tier="3"><div class="inner"><div class="range">50+ iPhones</div><div class="price" style="font-size:24px">Custom quote</div></div></button>
      </div>
      <div class="sim"><div class="simwrap">
        <div class="sim-left">
          <h2>Build your setup</h2>
          <p class="hint">Move the slider. The price updates live.</p>
          <div class="lbl"><span>How many iPhones?</span><output id="npx-nOut">12 iPhones</output></div>
          <input type="range" id="npx-n" min="5" max="50" value="12">
          <div class="ticks"><span>5</span><span>15</span><span>25</span><span>35</span><span>45</span><span>50+</span></div>
          <div class="lbl"><span>Connectivity</span></div>
          <div class="conn">
            <button class="copt" data-c="wifi"><div class="t">ALI Wi-Fi</div><div class="d">Use your own custom proxy.<br><b>Included, $0</b></div></button>
            <button class="copt on" data-c="sim"><div class="t">Mobile Data (SIM)</div><div class="d">1 SIM per iPhone.<br><b>$11/mo</b> + $10 setup per SIM</div></button>
            <button class="copt" data-c="proxy"><div class="t">Mobile Proxy</div><div class="d">1 proxy covers up to 20 iPhones.<br><b>$90/mo</b> + $95 setup per proxy</div></button>
          </div>
          <div class="country" id="npx-countryRow">
            <label>Proxy country:</label>
            <select id="npx-country">
              <option>🇺🇸 United States</option><option>🇬🇧 United Kingdom</option><option>🇩🇪 Germany</option><option>🇫🇷 France</option><option>🇪🇸 Spain</option><option>🇮🇹 Italy</option><option>🇨🇦 Canada</option><option>🇦🇺 Australia</option><option>🌍 Any other country</option>
            </select>
          </div>
        </div>
        <div class="sim-right">
          <div class="sr-row"><span id="npx-phLine"></span><span id="npx-phTotal"></span></div>
          <div class="sr-row"><span id="npx-connLine"></span><span id="npx-connTotal"></span></div>
          <div class="sr-row" id="npx-setupRow"><span>One-time setup</span><span id="npx-setupTotal"></span></div>
          <div class="sr-div"></div>
          <div class="fp">Your first payment</div>
          <div class="payrow">
            <div class="total" id="npx-firstPay"></div>
            <div class="then">then <b id="npx-monthly"></b>/month</div>
          </div>
          <div class="incl" id="npx-incl" style="display:none"></div>
          <div class="eff" id="npx-eff"></div>
          <a class="buy" id="npx-buyBtn" href="/#/signup"></a>
          <div class="custom-banner" id="npx-customBanner">🚀 <b>50+ iPhones?</b> You get a custom quote, even cheaper. <a href="https://cal.com/alixtudss/discovery-call">Book a quick call</a> and we'll price it for you.</div>
        </div>
      </div></div>
    </div>
    <div class="inhouse" id="npx-inhouse"><div class="inwrap">
      <div class="grid">
        <div>
          <div class="range" style="font-size:12.5px;font-weight:700;color:#6b7280;text-transform:uppercase">In-house: your office, our tech</div>
          <div class="bigprice" style="margin-top:8px">from $16<small> /iPhone/mo</small></div>
          <div style="font-size:14px;color:#6b7280;margin-top:6px">+ <b style="color:#000">$1,000</b> one-time per ALI Box, <b style="color:#000">delivery included</b></div>
          <ul class="feat">
            <li>Same ALI platform, automations &amp; dashboard</li>
            <li>Use your own iPhones from your office</li>
            <li><b>Delivery included</b> in the box price. We ship it to you</li>
            <li><b>We help you set everything up</b>, end to end</li>
            <li><b>Custom plans</b> based on how many iPhones you run</li>
            <li>Best for large teams &amp; full control</li>
          </ul>
          <div class="inh-note">📅 In-house setups are tailored to your operation, so an In-house call is required before getting started.</div>
          <div class="inh-cta">
            <a class="primary" href="https://cal.com/alixtudss/in-house-discovery">Book your In-house call →</a>
          </div>
        </div>
        <div class="boxshot">
          <div class="ph"><span>📦</span>ALI Box photo coming soon</div>
          <p>The plug-and-play hardware that runs your iPhones. Ships to your office, delivery included.</p>
        </div>
      </div>
    </div></div>
    <div class="help" id="npx-help">
      <p>🤙 <b>Not sure which setup fits your company?</b> Mobile data vs proxy, office vs in-house. We'll figure it out together in 30 minutes.</p>
      <a href="https://cal.com/alixtudss/discovery-call">Book a discovery call</a>
    </div>
  </div>`;

  let conn = "sim";
  let billing = "monthly";
  let root = null; // shadow root, full style isolation from the site CSS
  const fmt = (n) => "$" + n.toLocaleString("en-US");
  const tierBase = (n) => (n >= 50 ? null : n >= 25 ? 49 : n >= 10 ? 64 : 79);
  const tierPrice = (n) => { const b = tierBase(n); return b === null ? null : billing === "yearly" ? Math.round(b * 0.8) : b; };
  const tierIndex = (n) => (n >= 50 ? 3 : n >= 25 ? 2 : n >= 10 ? 1 : 0);
  const TIER_DEFAULT = [5, 10, 25, 50];
  const $ = (id) => root.getElementById(id);

  function render() {
    const n = +$("npx-n").value;
    $("npx-nOut").textContent = (n >= 50 ? "50+" : n) + " iPhones";
    root.querySelectorAll(".tier").forEach((t) => t.classList.toggle("active", +t.dataset.tier === tierIndex(n)));
    const p = tierPrice(n);
    const custom = p === null;
    $("npx-customBanner").style.display = custom ? "block" : "none";
    $("npx-buyBtn").style.display = custom ? "none" : "block";
    let phones = custom ? 0 : n * p, connMo = 0, once = 0, connLine = "";
    const country = $("npx-country").value;
    if (conn === "sim") { connMo = 11 * n; once = 10 * n; connLine = `Mobile Data × ${n} SIM`; }
    else if (conn === "proxy") { const b = Math.ceil(n / 20); connMo = 90 * b; once = 95 * b; connLine = `Mobile Proxy ${country.split(" ")[0]} × ${b}`; }
    else connLine = "ALI Wi-Fi (included)";
    const monthly = phones + connMo;
    // tier card prices follow the billing mode
    const bases = [79, 64, 49];
    bases.forEach((b, i) => {
      const big = root.querySelector(".b" + i), old = root.querySelector(".o" + i);
      if (!big || !old) return;
      if (billing === "yearly") { big.textContent = "$" + Math.round(b * 0.8); old.textContent = "$" + b; old.style.display = "inline"; }
      else { big.textContent = "$" + b; old.textContent = "$79"; old.style.display = i === 0 ? "none" : "inline"; }
    });
    $("npx-phLine").textContent = custom ? `50+ iPhones, custom plan` : `${n} iPhones × ${fmt(p)}`;
    $("npx-phTotal").textContent = custom ? "" : fmt(phones);
    document.querySelector ? null : null; $("npx-connLine").parentElement.style.display = custom ? "none" : "flex";
    $("npx-connLine").textContent = connLine;
    $("npx-connTotal").textContent = conn === "wifi" ? "$0" : fmt(connMo);
    $("npx-setupRow").style.display = once > 0 && !custom ? "flex" : "none";
    $("npx-phLine").parentElement.style.display = "flex";
    $("npx-setupTotal").textContent = fmt(once);
    const annual = monthly * 12 + once;
    if (billing === "yearly" && !custom) {
      root.querySelector(".fp").textContent = "Your annual payment";
      $("npx-firstPay").innerHTML = fmt(annual);
      root.querySelector(".then").style.visibility = "hidden";
      const incl = $("npx-incl");
      incl.style.display = "block";
      incl.textContent = once > 0 ? `(including your setup fee of ${fmt(once)})` : "12 months, everything included";
    } else {
      root.querySelector(".fp").textContent = "Your first payment";
      root.querySelector(".then").style.visibility = "visible";
      $("npx-incl").style.display = "none";
      $("npx-firstPay").innerHTML = custom ? 'Custom <small style="font-size:14px;color:#9ca3af">let\'s talk</small>' : fmt(monthly + once);
    }
    $("npx-monthly").textContent = fmt(monthly);
    root.querySelector(".then").style.display = custom ? "none" : "block";
    root.querySelector(".fp").style.display = custom ? "none" : "block";
    $("npx-eff").style.display = custom ? "none" : "block";
    if (!custom) $("npx-eff").textContent = `≈ ${fmt(Math.round(monthly / n))} per iPhone, everything included, billed ${billing === "yearly" ? "yearly" : "monthly"}`;
    $("npx-buyBtn").textContent = `Get started with ${n >= 50 ? "50+" : n} iPhones →`;
  }

  function mount(section) {
    section.innerHTML = "";
    section.style.cssText = "min-height:auto;height:auto;padding:0;position:relative;display:block";
    const host = document.createElement("div");
    section.appendChild(host);
    root = host.attachShadow({ mode: "open" });
    // Selectors lose the #pricing-plans prefix inside the shadow root.
    root.innerHTML = "<style>" + CSS.replaceAll("#pricing-plans ", "") + "</style>" + HTML;
    $("npx-n").addEventListener("input", render);
    $("npx-country").addEventListener("change", render);
    root.querySelectorAll(".tier").forEach((t) =>
      t.addEventListener("click", () => { $("npx-n").value = TIER_DEFAULT[+t.dataset.tier]; render(); }));
    root.querySelectorAll(".copt").forEach((b) =>
      b.addEventListener("click", () => {
        conn = b.dataset.c;
        root.querySelectorAll(".copt").forEach((x) => x.classList.toggle("on", x === b));
        $("npx-countryRow").classList.toggle("show", conn === "proxy");
        render();
      }));
    $("npx-bill-mo").addEventListener("click", () => { billing = "monthly"; $("npx-bill-mo").classList.add("on"); $("npx-bill-yr").classList.remove("on"); render(); });
    $("npx-bill-yr").addEventListener("click", () => { billing = "yearly"; $("npx-bill-yr").classList.add("on"); $("npx-bill-mo").classList.remove("on"); render(); });
    $("t-office").addEventListener("click", () => { $("npx-office").style.display = "block"; $("npx-inhouse").style.display = "none"; $("npx-help").style.display = "flex"; $("t-office").classList.add("on"); $("t-inhouse").classList.remove("on"); });
    $("t-inhouse").addEventListener("click", () => { $("npx-office").style.display = "none"; $("npx-inhouse").style.display = "block"; $("npx-help").style.display = "none"; $("t-inhouse").classList.add("on"); $("t-office").classList.remove("on"); });
    if (!document.getElementById("pricing")) {
      const anchor = document.createElement("div");
      anchor.id = "pricing";
      section.parentElement.insertBefore(anchor, section);
    }
    document.querySelectorAll('a[href="#pricing-plans"]').forEach((a) => (a.href = "#pricing"));
    document.querySelectorAll('a.message-btn, a[href*="t.me/aliremoteios"]').forEach((a) => (a.href = "https://t.me/alixtuds"));
    const homeLink = document.querySelector('header a[href="#hero"]');
    if (homeLink) (homeLink.closest("li") || homeLink).remove();
    const clientsLink = document.querySelector('header a[href="#clients"]');
    if (clientsLink && !document.querySelector('header a[href="#faq"]')) {
      const li = (clientsLink.closest("li") || clientsLink).cloneNode(true);
      const a = li.querySelector ? (li.querySelector("a") || li) : li;
      a.setAttribute("href", "#faq");
      a.textContent = "FAQ";
      (clientsLink.closest("li") || clientsLink).after(li);
    }
    const tagline = document.querySelector("footer .tagline");
    if (tagline) tagline.innerHTML = "The #1 iPhone remote control solutions.";
    mountFaq();
    render();
    console.log("[pricing-patch] new pricing mounted (shadow)");
  }

  const killBar = document.createElement("style");
  killBar.textContent = ".sticky-bar,#intercom-container,.intercom-lightweight-app,[class*=intercom]{display:none!important} .get-started-today-btn{display:none!important} .sticky-cta-buttons{left:auto!important;right:20px!important;bottom:20px!important;transform:none!important;margin:0!important} #back-to-top{bottom:84px!important;right:20px!important} header.landing-header,header{height:auto!important;min-height:0!important} header .container-header{padding-top:8px!important;padding-bottom:8px!important;height:auto!important;min-height:0!important} header img.logo{height:40px!important;width:auto!important} header .logo{height:auto!important;line-height:0!important} .fade-in-section,.fade-up,.fade-in,[class*=fade-up],[class*=fade-in],[class*=fade]{opacity:1!important;transform:none!important;filter:none!important;visibility:visible!important;animation:none!important;transition:none!important}";
  document.head.appendChild(killBar);

  const FAQ_SECTIONS = [
    ["Getting started", [
      ["What is ALI?", "ALI is a remote control software for iPhones that allows you to delegate iPhones to VAs while you always keep access to the phones."],
      ["How many iPhones do I need to start?", "Plans start from 5 iPhones (minimum). You can add more anytime, and your price per iPhone drops as you scale. Cancel anytime."],
      ["Is there a trial available?", "We do not have a self-serve free trial, but we sometimes set one up case by case. Book a call and we will see what makes sense for your operation."],
    ]],
    ["Using ALI day to day", [
      ["Can I use it for Instagram and other social media?", "Yes. ALI uses real iPhones, not emulators or APIs, so platforms see a normal device. Instagram, TikTok, Threads, Reddit, Facebook and more."],
      ["Will my accounts get flagged?", "No. Your accounts run on real, organic devices with real mobile connectivity. ALI has never been detected by any platform."],
      ["Can I migrate my existing accounts?", "Yes. With your username, password and 2FA access, logging in from an ALI iPhone is just a normal device login."],
      ["How do I upload content to the phones?", "We recommend a shared folder in Google Drive, it's the most stable at the moment. We will soon launch a new feature for faster uploads."],
      ["Can I add team members to my account?", "Yes, you can create credentials for your team, choose access levels and assign custom access to the phones."],
    ]],
    ["Devices & connectivity", [
      ["Are remote iPhones better than remote Androids?", "For social media, yes. Platforms give iOS devices stronger trust signals, and most cheap remote farms run emulated or rooted Androids that end up flagged. ALI iPhones are the same real hardware your audience uses, which protects your reach."],
      ["Which iPhones are you using?", "Mostly iPhone SE 3rd generation (2022): modern, stable and seen by platforms as a current device."],
      ["Do you use proxies?", "Depending on the preferred social media platform you want to use, we can recommend different connectivity options."],
      ["Can I choose the physical location of the phones?", "The physical location of the phones cannot be changed. We have different ways of targeting specific audiences, we can talk more about this on Telegram."],
    ]],
  ];
  function mountFaq() {
    if (document.getElementById("faq")) return;
    const clients = document.getElementById("clients");
    if (!clients) return;
    const sec = document.createElement("section");
    sec.id = "faq";
    clients.parentElement.insertBefore(sec, clients.nextSibling);
    const r = sec.attachShadow({ mode: "open" });
    r.innerHTML = `<style>
      .fq{max-width:760px;margin:0 auto;padding:90px 24px 40px;font-family:Geist,sans-serif}
      .fq *{box-sizing:border-box;margin:0;padding:0;font-family:Geist,sans-serif;color:#000}
      .fq h2{text-align:center;font-size:38px;font-weight:600;letter-spacing:-1px;line-height:1.15;margin-bottom:8px}
      .fq h2 span{background:linear-gradient(90deg,#2239bd 24%,#46d3f6 83%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
      .fq .sub{text-align:center;color:#3b3f41;font-size:15px;font-weight:400;margin-bottom:22px}
      .fq .search{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #e5e5e5;border-radius:90px;box-shadow:0 4px 15px rgba(0,0,0,.06);padding:13px 20px;margin:0 auto 26px;max-width:560px}
      .fq .search input{border:0;outline:none;flex:1;font-size:15px;font-weight:400;background:none}
      .fq .search svg{flex:none}
      .fq .cat{font-size:12.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#2239bd;margin:26px 4px 12px}
      .fq .cat:first-of-type{margin-top:4px}
      .fq details{background:#fff;border-radius:18px;box-shadow:3px 9px 20px 0 rgba(77,77,77,.04);border:1px solid #efefef;margin-bottom:10px;overflow:hidden}
      .fq details[open]{border-color:#b9cdfb}
      .fq summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:14px;padding:17px 22px;font-size:15.5px;font-weight:600;letter-spacing:-.3px}
      .fq summary::-webkit-details-marker{display:none}
      .fq .chev{font-size:20px;font-weight:400;color:#2239bd;transition:transform .25s ease;flex:none}
      .fq details[open] .chev{transform:rotate(45deg)}
      .fq details p{padding:0 22px 18px;font-size:14.5px;font-weight:400;line-height:1.6;color:#3b3f41}
      .fq .noresult{display:none;text-align:center;color:#3b3f41;font-size:14.5px;padding:18px;background:#fff;border:1px solid #efefef;border-radius:18px}
      .fq .noresult a{color:#2239bd;font-weight:600;text-decoration:none}
      .fq .more{text-align:center;margin-top:26px;font-size:14px;color:#3b3f41}
      .fq .more a{color:#2239bd;font-weight:600;text-decoration:none}
    </style>
    <div class="fq">
      <h2>Frequently asked <span>questions</span></h2>
      <p class="sub">Everything our members ask before getting started.</p>
      <div class="search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9aa1ad" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
        <input id="fqs" type="text" placeholder="Ask a question..." />
      </div>
      <div id="fqlist"></div>
      <div class="noresult" id="fqnone">No match. <a href="https://t.me/alixtuds">Ask us directly on Telegram</a> and we answer fast.</div>
      <p class="more">More questions? <a href="https://cal.com/alixtudss/discovery-call">Book a discovery call</a> or message us on <a href="https://t.me/alixtuds">Telegram</a>.</p>
    </div>`;
    const list = r.getElementById("fqlist");
    const none = r.getElementById("fqnone");
    const item = (Q, A, open) => `<details${open ? " open" : ""}><summary>${Q}<span class="chev">+</span></summary><p>${A}</p></details>`;
    function singleOpen() {
      // opening one accordion closes the others
      list.querySelectorAll("details").forEach((d) =>
        d.addEventListener("toggle", () => {
          if (d.open) list.querySelectorAll("details").forEach((o) => { if (o !== d) o.open = false; });
        }));
    }
    function renderFaq(q) {
      const query = (q || "").trim().toLowerCase();
      const terms = query.split(/\s+/).filter((t) => t.length >= 2);
      if (!terms.length) {
        // grouped by category, nothing open
        list.innerHTML = FAQ_SECTIONS.map(([cat, items]) =>
          `<div class="cat">${cat}</div>` + items.map(([Q, A]) => item(Q, A, false)).join("")).join("");
        none.style.display = "none";
      } else {
        // flat, ranked, best match open
        const flat = FAQ_SECTIONS.flatMap(([, items]) => items).map(([Q, A]) => {
          let score = 0; const ql = Q.toLowerCase(), al = A.toLowerCase();
          for (const t of terms) { if (ql.includes(t)) score += 4; if (al.includes(t)) score += 1; }
          return { Q, A, score };
        }).filter((i) => i.score > 0).sort((a, b) => b.score - a.score);
        none.style.display = flat.length ? "none" : "block";
        list.innerHTML = flat.map((i, idx) => item(i.Q, i.A, idx === 0)).join("");
      }
      singleOpen();
    }
    renderFaq("");
    r.getElementById("fqs").addEventListener("input", (e) => renderFaq(e.target.value));
  }

  function tryMount() {
    const s = document.getElementById("pricing-plans");
    if (s && !s.dataset.npxMounted) { s.dataset.npxMounted = "1"; mount(s); }
    return !!s;
  }
  if (!tryMount()) {
    const obs = new MutationObserver(() => { if (tryMount()) obs.disconnect(); });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
