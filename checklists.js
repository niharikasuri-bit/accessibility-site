// What developers, designers and content writers check while they build, so accessibility is right before anything is
// scanned. Each item lists the standards it supports: the WCAG 2.2 success criterion, and ADA (Title II: WCAG 2.1 AA,
// documents, third-party content), GIGW 3.0 (Indian government websites) and SESMag where they ask for it. ADA and
// GIGW 3.0 both include the WCAG 2.1 A/AA criteria, so a WCAG item helps both.
window.CHECKLISTS = {
  developer: {
    title: 'Developer checklist',
    groups: [
      ['Structure and semantics', [
        ['One h1 per page, and headings in order (h1, h2, h3) with no levels skipped.', ['WCAG 1.3.1', 'WCAG 2.4.6']],
        ['Page regions use landmarks: header, nav, main, footer.', ['WCAG 1.3.1']],
        ['Every page has its own, descriptive <title>.', ['WCAG 2.4.2']],
        ['<html lang> is set, and text in another language (Hindi on an English page) has its own lang.', ['WCAG 3.1.1', 'WCAG 3.1.2', 'GIGW']],
        ['Lists use ul / ol; data tables use th with scope; tables are never used for layout.', ['WCAG 1.3.1']],
        ['The reading order in the code matches the order on screen (CSS does not reorder meaning).', ['WCAG 1.3.2']],
      ]],
      ['Images and media', [
        ['Every informative image has alt text; decorative images have alt="" (or are CSS backgrounds).', ['WCAG 1.1.1']],
        ['Charts and complex images also have the data or a longer description in text.', ['WCAG 1.1.1']],
        ['Buttons and links that are only an icon have an accessible name (aria-label or visually hidden text).', ['WCAG 4.1.2', 'WCAG 2.4.4', 'SESMag']],
        ['Videos have captions and, where needed, audio description; live video has live captions.', ['WCAG 1.2.2', 'WCAG 1.2.4', 'WCAG 1.2.5', 'ADA']],
        ['Audio that plays for more than 3 seconds can be paused or muted.', ['WCAG 1.4.2']],
      ]],
      ['Forms', [
        ['Every field has a visible <label> joined to it with for / id.', ['WCAG 1.3.1', 'WCAG 3.3.2']],
        ['The visible label text is part of the field\'s or button\'s accessible name.', ['WCAG 2.5.3']],
        ['Errors appear as text next to the field, joined with aria-describedby, and are announced (role="alert").', ['WCAG 3.3.1', 'WCAG 4.1.3']],
        ['Fields use the right type and autocomplete (email, tel, name, address).', ['WCAG 1.3.5']],
        ['Choosing an option or leaving a field never submits the form or jumps to another page by itself.', ['WCAG 3.2.1', 'WCAG 3.2.2']],
        ['Payments, legal and personal-data submissions can be reviewed, corrected or cancelled before they are final.', ['WCAG 3.3.4', 'SESMag']],
        ['Sign-in allows paste and password managers; CAPTCHA has a non-visual alternative (or none).', ['WCAG 3.3.8', 'GIGW']],
        ['Progress in long forms is saved, so a slow connection or a break does not lose what was typed.', ['SESMag']],
      ]],
      ['Keyboard and focus', [
        ['Everything that works with a mouse works with the keyboard: Tab, Enter, Space, arrows, Escape.', ['WCAG 2.1.1']],
        ['There are no keyboard traps: focus can always move on, and dialogs close with Escape.', ['WCAG 2.1.2']],
        ['Focus is always visible and never hidden behind a sticky header or footer.', ['WCAG 2.4.7', 'WCAG 2.4.11']],
        ['Tab order follows the order on screen; no positive tabindex.', ['WCAG 2.4.3']],
        ['Dialogs move focus inside, keep it there while open, and return it to the button that opened them.', ['WCAG 2.4.3']],
        ['A "Skip to main content" link is the first thing focus reaches.', ['WCAG 2.4.1', 'GIGW']],
        ['Shortcuts that use a single letter can be turned off or changed.', ['WCAG 2.1.4']],
      ]],
      ['ARIA and changing content', [
        ['Native elements first (button, a href, input, select); ARIA only when there is no native element.', ['WCAG 4.1.2']],
        ['Custom controls have the right role, name and state: aria-expanded, aria-selected, aria-checked, aria-pressed.', ['WCAG 4.1.2']],
        ['Messages like "Saved" or "3 results" are in an aria-live region that exists before the message appears.', ['WCAG 4.1.3']],
        ['When a new step or screen loads, focus moves to its heading (or the change is announced).', ['WCAG 2.4.3', 'WCAG 4.1.3']],
        ['Pop-ups that appear on hover or focus can be dismissed with Escape and stay while the pointer is over them.', ['WCAG 1.4.13']],
        ['Session timeouts warn first and let people extend the time.', ['WCAG 2.2.1', 'SESMag']],
      ]],
      ['Pointer, phone and settings', [
        ['Works at 320px wide and at 200% zoom with no sideways scrolling and nothing cut off.', ['WCAG 1.4.10', 'WCAG 1.4.4']],
        ['Click and touch targets are at least 24 × 24 px.', ['WCAG 2.5.8']],
        ['Swipes, pinches and drags have a simple tap or button alternative.', ['WCAG 2.5.1', 'WCAG 2.5.7']],
        ['Actions happen when the pointer is released, not when it is pressed (so a slip can be cancelled).', ['WCAG 2.5.2']],
        ['Works in both orientations; shaking or tilting is never the only way to do something.', ['WCAG 1.3.4', 'WCAG 2.5.4']],
      ]],
      ['Performance and integrations', [
        ['Pages are light: small images, few scripts, usable on a slow connection and a low-end phone.', ['SESMag', 'GIGW']],
        ['The site uses HTTPS.', ['GIGW']],
        ['Third-party parts (maps, chat, payments, embedded forms) are accessible too, or have an accessible alternative.', ['ADA']],
        ['Downloadable documents (PDF, Word) are tagged and accessible, or there is an accessible HTML version.', ['ADA', 'GIGW']],
      ]],
    ],
  },
  design: {
    title: 'Design checklist',
    groups: [
      ['Colour and contrast', [
        ['Body text contrast is at least 4.5:1; large text (24px, or 19px bold) at least 3:1.', ['WCAG 1.4.3']],
        ['Icons, field borders and focus outlines have at least 3:1 against what is next to them.', ['WCAG 1.4.11']],
        ['Colour is never the only way to show meaning (errors, status, links in text, charts).', ['WCAG 1.4.1']],
      ]],
      ['Text and layout', [
        ['Body text is at least 16px with a line height of about 1.5.', ['WCAG 1.4.12', 'SESMag']],
        ['The layout still works with larger text spacing and at 200% zoom.', ['WCAG 1.4.12', 'WCAG 1.4.4']],
        ['Every screen has a phone layout (320px wide) where nothing is cut off.', ['WCAG 1.4.10']],
        ['Text is real text, not a picture of text (logos excepted).', ['WCAG 1.4.5']],
        ['Room is left for Hindi and other languages, which can be longer than English.', ['GIGW']],
      ]],
      ['Interaction and states', [
        ['Every interactive element has a designed focus state, hover state and disabled state.', ['WCAG 2.4.7']],
        ['Buttons and links look clickable; targets are at least 24 × 24 px (44 × 44 is better).', ['WCAG 2.5.8', 'SESMag']],
        ['Nothing important appears only on hover.', ['WCAG 1.4.13']],
        ['Anything that moves, blinks or plays by itself can be paused; nothing flashes more than 3 times a second.', ['WCAG 2.2.2', 'WCAG 2.3.1']],
        ['Drag-and-drop and gestures have a button alternative.', ['WCAG 2.5.7', 'WCAG 2.5.1']],
        ['Instructions never rely only on shape, colour, size or position ("press the round button on the right").', ['WCAG 1.3.3']],
      ]],
      ['Forms and errors', [
        ['Every field has a visible label above it; placeholders are not labels.', ['WCAG 3.3.2']],
        ['Error messages say what went wrong and how to fix it, next to the field.', ['WCAG 3.3.1', 'WCAG 3.3.3']],
        ['Long forms are split into steps, show where you are, and never ask for earlier answers again.', ['WCAG 3.3.7', 'SESMag']],
        ['Sign-in never needs people to remember or copy out a code or solve a puzzle.', ['WCAG 3.3.8']],
        ['Final actions (pay, submit, delete) have a review step or can be undone.', ['WCAG 3.3.4', 'SESMag']],
        ['No time pressure: timers are avoided, or people are warned and can ask for more time.', ['WCAG 2.2.1', 'SESMag']],
      ]],
      ['Navigation and help', [
        ['Navigation, search and help are in the same place on every page.', ['WCAG 3.2.3', 'WCAG 3.2.6']],
        ['There are at least two ways to find a page: menu plus search or a sitemap.', ['WCAG 2.4.5', 'GIGW']],
        ['Every screen makes the next step obvious, and confirms when something has worked.', ['SESMag']],
        ['A Hindi / English language switch is easy to find on every page.', ['GIGW']],
        ['Links that leave the site, open a new window or download a file say so.', ['GIGW']],
      ]],
    ],
  },
  content: {
    title: 'Content checklist',
    groups: [
      ['Writing', [
        ['Plain language: short sentences and common words; technical terms are explained.', ['SESMag']],
        ['Headings describe their section, and each page title says what the page is.', ['WCAG 2.4.6', 'WCAG 2.4.2']],
        ['Link and button text says where it goes or what it does ("Download the 2025 report", not "Click here").', ['WCAG 2.4.4']],
        ['Abbreviations are written out the first time they are used.', ['SESMag']],
        ['Every page is available in Hindi and English.', ['GIGW']],
      ]],
      ['Images and media', [
        ['Alt text says what the image shows or does, in a short sentence; it does not start with "image of".', ['WCAG 1.1.1']],
        ['Videos have accurate captions (not only automatic ones) and a transcript.', ['WCAG 1.2.2', 'WCAG 1.2.3', 'ADA']],
        ['Text over images or video keeps enough contrast.', ['WCAG 1.4.3']],
      ]],
      ['Documents and downloads', [
        ['PDFs and other documents are tagged, with headings, alt text and a reading order; scanned images of text are avoided.', ['ADA', 'GIGW']],
        ['Download links state the file type and size, for example "Annual report (PDF, 2 MB)".', ['GIGW', 'SESMag']],
      ]],
      ['Required pages (GIGW 3.0)', [
        ['Website policies are published and linked from the footer: copyright, hyperlinking, privacy, terms and conditions, content archival.', ['GIGW']],
        ['Contact us (with names or designations), Help, Feedback and a Sitemap are linked from every page.', ['GIGW', 'WCAG 3.2.6']],
        ['Every page shows a "Last updated" or "Last reviewed" date.', ['GIGW']],
        ['The site says which ministry or department owns it.', ['GIGW']],
        ['A Screen Reader Access page lists free screen readers.', ['GIGW']],
      ]],
      ['Accessibility statement', [
        ['An accessibility statement is linked from every page.', ['GIGW', 'ADA']],
        ['It gives a way to report a barrier and get the information another way, and says who answers and how fast.', ['ADA']],
        ['Personal data requested on forms says why it is needed and how it is protected.', ['SESMag', 'GIGW']],
      ]],
    ],
  },
};
