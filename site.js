// "Use the scanner": with the extension installed, its dashboard opens in this tab (the website asks it by its fixed
// ID, allowed through the manifest's externally_connectable). Without it, the page goes to the extension's download
// and install steps, and opens the dashboard by itself once the extension is there. Also: the checklists' PDFs.
const EXTENSION_ID = 'llblpimelojllmohcbklacgddnbloecc'; // DIGIT Accessibility Scanner, the download (key in public-build/key.txt)
const $ = id => document.getElementById(id);

// A message to the extension; null when it is not installed (or not reachable from this browser).
function ask(message) {
  return new Promise(resolve => {
    const runtime = window.chrome?.runtime;
    if (!runtime?.sendMessage) return resolve(null);
    try {
      runtime.sendMessage(EXTENSION_ID, message, reply => resolve(runtime.lastError ? null : reply || null));
    } catch {
      resolve(null);
    }
  });
}

let installed = false;
async function checkExtension() {
  const reply = await ask({ type: 'ping' });
  installed = !!reply?.ok;
  const state = $('ext-state');
  // Shown only once the extension is found; nothing is said while it is not installed.
  state.className = 'ext-state ok';
  state.hidden = !installed;
  state.textContent = installed ? `Installed in this browser (version ${reply.version}).` : '';
  return installed;
}

function result(kind, text) {
  const box = $('use-result');
  box.hidden = !text;
  box.className = `result ${kind}`;
  box.textContent = text || '';
}

async function openDashboard() {
  result('', 'Opening the dashboard…');
  const reply = await ask({ type: 'open-scanner' });
  // On success this tab becomes the dashboard; an answer here means it did not.
  if (reply && !reply.ok) result('bad', `${reply.error || 'The extension did not answer.'} Reload the extension in chrome://extensions, then try again.`);
}

// Install steps: each card's "View Install Steps" opens them in a dialog; Close, Escape or a click outside closes it,
// and focus goes back to the button that opened it.
function openSteps(id, opener) {
  const dlg = $(id);
  dlg.opener = opener;
  if (!dlg.open) dlg.showModal();
}
document.querySelectorAll('[data-steps]').forEach(b => b.addEventListener('click', () => openSteps(b.dataset.steps, b)));
document.querySelectorAll('.steps-dialog').forEach(dlg => {
  dlg.querySelector('[data-close]').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => dlg.opener?.focus());
});

// Not installed: the extension's install steps open, and the page looks again every 3 s; it opens the dashboard as
// soon as the extension is installed.
let watching = null;
function showInstall(opener) {
  $('install-wait').hidden = false;
  openSteps('ext-steps', opener);
  $('ext-download').focus();
  if (watching) return;
  watching = setInterval(async () => {
    if (!(await checkExtension())) return;
    clearInterval(watching);
    watching = null;
    $('install-wait').hidden = true;
    $('ext-steps').close();
    result('good', 'Installed. Opening the dashboard…');
    openDashboard();
  }, 3000);
}

// Narrow screens: the Menu button shows and hides the links; choosing a link or pressing Escape closes them.
const menuBtn = $('menu-btn'), menu = $('main-nav');
const setMenu = open => { menuBtn.setAttribute('aria-expanded', String(open)); menu.classList.toggle('open', open); };
menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); } });

document.querySelectorAll('[data-use]').forEach(b => b.addEventListener('click', async () => {
  if (await checkExtension()) openDashboard();
  else showInstall(b);
}));
checkExtension();

// ── Checklists ──────────────────────────────────────────────────────────────
// Each card shows its list's name and size (a tag); its button prints that list.

for (const [key, list] of Object.entries(window.CHECKLISTS)) {
  const count = list.groups.reduce((n, [, items]) => n + items.length, 0);
  $(`cl-${key}-title`).textContent = list.title;
  $(`cl-${key}-count`).textContent = `${count} items`;
}

// ── Checklist PDF ───────────────────────────────────────────────────────────
// The checklist as a document styled like the scanner's report emails (navy header band, uppercase section titles,
// rounded cards), printed by the browser so "Save as PDF" keeps real, selectable text, with an empty box per item.
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function checklistDocument(key) {
  const list = window.CHECKLISTS[key];
  const all = list.groups.flatMap(([, items]) => items);
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const F = 'font-family:Arial,Helvetica,sans-serif;';
  const section = ([name, items]) => `<tr><td style="padding:18px 28px;border-top:1px solid #E5E7EB;">
<p style="${F}margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#6B7280;">${esc(name)}</p>
${items.map(([text, tags]) => `<div class="item" style="display:flex;gap:12px;align-items:flex-start;border:1px solid #E5E7EB;border-radius:10px;padding:10px 12px;margin-bottom:8px;">
<span aria-hidden="true" style="flex:none;width:16px;height:16px;margin-top:2px;border:2px solid #9CA3AF;border-radius:4px;background:#fff;"></span>
<div><p style="${F}margin:0 0 6px;font-size:13.5px;line-height:1.45;color:#111827;">${esc(text)}</p>
<p style="${F}margin:0;">${tags.map(t => `<span style="display:inline-block;font-size:10.5px;font-weight:700;border-radius:99px;padding:1px 8px;margin:0 4px 2px 0;background:#EEF1FF;color:#0E165D;">${esc(t)}</span>`).join('')}</p></div></div>`).join('')}</td></tr>`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${esc(list.title)} — DIGIT Accessibility Scanner</title>
<style>
  @page { size: A4; margin: 12mm; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { margin: 0; background: #F1F5F9; }
  .item { break-inside: avoid; }
  tr { break-inside: auto; }
</style></head>
<body><div style="padding:20px 12px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="max-width:720px;width:100%;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;">
<tbody>
<tr><td style="background:#0E165D;padding:26px 28px;">
<p style="${F}margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.75);">Accessibility checklist</p>
<h1 style="${F}margin:0 0 6px;font-size:23px;color:#fff;">${esc(list.title)}</h1>
<p style="${F}margin:0;font-size:13px;color:rgba(255,255,255,.85);">${all.length} items · WCAG 2.2, ADA, GIGW 3.0 and SESMag · ${esc(date)}</p></td></tr>
<tr><td style="padding:16px 28px;"><p style="${F}margin:0;font-size:13px;color:#374151;">What to check while you build, design and write. Each item shows the standards it supports.</p></td></tr>
${list.groups.map(section).join('')}
</tbody></table>
<p style="${F}text-align:center;font-size:11px;color:#9CA3AF;margin:14px 0 0;">This checklist was made by DIGIT Accessibility Scanner. Checking every item does not prove conformance; scan the product too.</p>
</div></body></html>`;
}

// Prints the document from a hidden frame: the browser's print dialog, with "Save as PDF", opens over this page.
function printChecklist(key) {
  document.getElementById('cl-print')?.remove();
  const frame = document.createElement('iframe');
  frame.id = 'cl-print';
  frame.title = 'Checklist for printing';
  frame.setAttribute('aria-hidden', 'true');
  frame.tabIndex = -1;
  Object.assign(frame.style, { position: 'fixed', right: '0', bottom: '0', width: '0', height: '0', border: '0' });
  document.body.append(frame);
  const doc = frame.contentDocument;
  doc.open();
  doc.write(checklistDocument(key));
  doc.close();
  frame.contentWindow.focus();
  setTimeout(() => frame.contentWindow.print(), 300);
}
document.querySelectorAll('[data-pdf]').forEach(b => b.addEventListener('click', () => printChecklist(b.dataset.pdf)));
