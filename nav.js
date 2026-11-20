// Shared navigation for the five MLVC pages: question buttons at the top, previous/next at the bottom.
(function () {
  var pages = [
    { file: "Least Squares Q1.html", q: "Q1", name: "Least squares" },
    { file: "Image Retrieval Q2(1).html", q: "Q2", name: "Image retrieval" },
    { file: "Denoising Q3.html", q: "Q3", name: "Denoising" },
    { file: "Texture Synthesis Q4.html", q: "Q4", name: "Texture synthesis" },
    { file: "Implicit Neural Q5(1).html", q: "Q5", name: "Implicit neural" }
  ];
  var here = decodeURIComponent(location.pathname.split("/").pop());
  var cur = pages.findIndex(function (p) { return p.file === here; });
  if (cur < 0) cur = 0;
  function href(p) { return encodeURI(p.file); }

  var css = document.createElement("style");
  css.textContent =
    ".mlvc-top{position:sticky;top:0;z-index:50;max-width:1120px;margin:-28px auto 18px;padding:10px 0;" +
    "background:var(--bg,#f2f2ee);border-bottom:1px solid var(--line,#dcdbd4)}" +
    ".mlvc-top nav{display:flex;gap:6px;overflow-x:auto}" +
    ".mlvc-top a,.mlvc-bot a{text-decoration:none;color:var(--fg,#161615);background:var(--surface,#fcfcfb);" +
    "border:1px solid var(--line,#dcdbd4);border-radius:8px;font-family:var(--f-body,system-ui,sans-serif)}" +
    ".mlvc-top a{flex:1 0 auto;padding:7px 12px;font-size:13px;font-weight:600;white-space:nowrap;text-align:center}" +
    ".mlvc-top a b{font-family:var(--f-mono,monospace);font-weight:500;color:var(--muted,#76756f);margin-right:6px}" +
    ".mlvc-top a:hover,.mlvc-bot a:hover{border-color:var(--fg2,#52514e)}" +
    ".mlvc-top a[aria-current]{background:var(--fg,#161615);color:var(--bg,#f2f2ee);border-color:var(--fg,#161615)}" +
    ".mlvc-top a[aria-current] b{color:inherit;opacity:.7}" +
    ".mlvc-bot{max-width:1120px;margin:32px auto 0;display:flex;gap:10px;justify-content:space-between}" +
    ".mlvc-bot a{flex:1;max-width:50%;padding:14px 16px;display:flex;flex-direction:column;gap:2px}" +
    ".mlvc-bot a.next{text-align:right;margin-left:auto}" +
    ".mlvc-bot small{font-family:var(--f-mono,monospace);font-size:12px;color:var(--muted,#76756f)}" +
    ".mlvc-bot span{font-weight:600;font-size:16px}";
  document.head.appendChild(css);

  var top = document.createElement("div");
  top.className = "mlvc-top";
  top.innerHTML = "<nav aria-label='Questions'>" + pages.map(function (p, i) {
    return "<a href='" + href(p) + "'" + (i === cur ? " aria-current='page'" : "") +
      "><b>" + p.q + "</b>" + p.name + "</a>";
  }).join("") + "</nav>";
  document.body.insertBefore(top, document.body.firstChild);

  var bot = document.createElement("nav");
  bot.className = "mlvc-bot";
  bot.setAttribute("aria-label", "Previous and next question");
  var html = "";
  if (cur > 0) {
    var p = pages[cur - 1];
    html += "<a class='prev' href='" + href(p) + "'><small>← " + p.q + "</small><span>" + p.name + "</span></a>";
  }
  if (cur < pages.length - 1) {
    var n = pages[cur + 1];
    html += "<a class='next' href='" + href(n) + "'><small>" + n.q + " →</small><span>" + n.name + "</span></a>";
  }
  bot.innerHTML = html;
  document.body.appendChild(bot);

  // Left/right arrow keys also move between questions (ignored while typing or using a slider).
  document.addEventListener("keydown", function (e) {
    var t = e.target.tagName;
    if (t === "INPUT" || t === "SELECT" || t === "TEXTAREA" || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowRight" && cur < pages.length - 1) location.href = href(pages[cur + 1]);
    if (e.key === "ArrowLeft" && cur > 0) location.href = href(pages[cur - 1]);
  });
})();
