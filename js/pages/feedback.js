import { el, svgIcon } from "../utils/dom.js";
import { ICONS } from "../components/icons.js";

export function initFeedbackPage() {
  const root = document.getElementById("feedback-root");
  if (!root) return;

  let rating = 5;

  root.innerHTML = `
    <div class="feedback-container">
      <div class="page-header-banner" style="text-align: center; margin-bottom: var(--space-6);">
        <h1>Platform Feedback</h1>
        <p style="margin: 0 auto; max-width: 58ch;">
          Help us enhance IntelliMatch AI. Let us know how the resume analysis, ATS templates, and multi-domain role matching performed for your target career.
        </p>
      </div>

      <div class="card" style="box-shadow: var(--shadow-card);">
        <div class="card-header" style="background: var(--color-surface-subtle); padding: var(--space-4) var(--space-6);">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <div style="color: var(--color-primary);">${ICONS.feedback}</div>
            <h2 class="card-title" style="font-size: var(--font-size-md);">Share Your Experience</h2>
          </div>
          <span class="badge badge-demo">Interactive Prototype</span>
        </div>
        <div class="card-body" style="padding: var(--space-6);">
          <form id="feedback-form" novalidate>
            <!-- Category -->
            <div class="form-group">
              <label class="form-label" for="feedback-category">
                <span>Feedback Category <span style="color: var(--color-error);">*</span></span>
              </label>
              <select id="feedback-category" class="select" required>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="ui-ux" selected>UI/UX Suggestion</option>
                <option value="analysis-quality">Analysis Quality</option>
                <option value="other">Other</option>
              </select>
            </div>

            <!-- Rating -->
            <div class="form-group">
              <label class="form-label">
                <span>Rating <span style="color: var(--color-error);">*</span></span>
                <span class="form-hint" id="rating-label">5 out of 5 stars</span>
              </label>
              <div class="star-rating-wrap" id="star-rating" role="radiogroup" aria-label="1 to 5 Star Rating">
                ${[1, 2, 3, 4, 5]
                  .map(
                    (star) => `
                  <button
                    type="button"
                    class="star-btn ${star <= rating ? "is-active" : ""}"
                    data-star="${star}"
                    role="radio"
                    aria-checked="${star === rating}"
                    aria-label="${star} of 5 stars"
                  >★</button>
                `
                  )
                  .join("")}
              </div>
            </div>

            <!-- Message (Required) -->
            <div class="form-group">
              <label class="form-label" for="feedback-message">
                <span>Feedback Message <span style="color: var(--color-error);">*</span></span>
                <span class="form-hint" id="feedback-char-count">0 / 600</span>
              </label>
              <textarea
                id="feedback-message"
                class="textarea"
                placeholder="Describe your suggestions, reported issue, or feature idea in detail..."
                maxlength="600"
                required
                style="min-height: 140px; background: #ffffff; border: 1px solid var(--color-border); color: var(--color-text);"
              ></textarea>
            </div>

            <!-- Optional Email -->
            <div class="form-group">
              <label class="form-label" for="feedback-email">
                <span>Email Address <span style="font-weight: normal; color: var(--color-text-muted);">(Optional)</span></span>
                <span class="form-hint">For follow-up questions only</span>
              </label>
              <input
                type="email"
                id="feedback-email"
                class="input"
                placeholder="alex.engineer@example.com"
              />
            </div>

            <!-- Inline Validation Alert -->
            <div id="feedback-alert" style="display: none; padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); font-size: var(--font-size-xs); background: var(--color-error-light); color: var(--color-error-on); border: 1px solid rgba(217, 75, 98, 0.3); margin-bottom: var(--space-4);" role="alert"></div>

            <!-- Action Controls (Normal medium-sized button, not full-width) -->
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3); padding-top: var(--space-4); border-top: 1px solid var(--color-border-subtle);">
              <div style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
                In this frontend phase, submissions are recorded locally in browser session storage.
              </div>
              <button type="submit" class="btn btn-primary" id="submit-feedback-btn">
                ${ICONS.feedback}
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Toast Placeholder -->
      <div id="feedback-toast-container" class="toast-container"></div>
    </div>
  `;

  // Star Rating Interaction
  const starBtns = root.querySelectorAll(".star-btn");
  const ratingLabel = document.getElementById("rating-label");

  starBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      rating = parseInt(btn.dataset.star, 10);
      ratingLabel.textContent = `${rating} out of 5 stars`;
      starBtns.forEach((b) => {
        const starVal = parseInt(b.dataset.star, 10);
        b.classList.toggle("is-active", starVal <= rating);
        b.setAttribute("aria-checked", String(starVal === rating));
      });
    });
  });

  // Character Count
  const messageInput = document.getElementById("feedback-message");
  const charCount = document.getElementById("feedback-char-count");
  messageInput?.addEventListener("input", () => {
    charCount.textContent = `${messageInput.value.length} / 600`;
  });

  // Form Submit
  const form = document.getElementById("feedback-form");
  const alertEl = document.getElementById("feedback-alert");
  const toastContainer = document.getElementById("feedback-toast-container");
  const emailInput = document.getElementById("feedback-email");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = messageInput.value.trim();
    const email = emailInput ? emailInput.value.trim() : "";

    if (!msg || msg.length < 10) {
      alertEl.textContent = "Please provide a feedback message with at least 10 characters.";
      alertEl.style.display = "block";
      messageInput.focus();
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alertEl.textContent = "Please provide a valid email address or leave the field blank.";
      alertEl.style.display = "block";
      emailInput.focus();
      return;
    }

    alertEl.style.display = "none";

    // Record locally in session storage
    const category = document.getElementById("feedback-category")?.value || "ui-ux";
    const record = {
      category,
      rating,
      message: msg,
      email: email || null,
      timestamp: new Date().toISOString()
    };
    try {
      const stored = JSON.parse(sessionStorage.getItem("intellimatch_feedback") || "[]");
      stored.push(record);
      sessionStorage.setItem("intellimatch_feedback", JSON.stringify(stored));
    } catch {
      // safe fallback
    }

    // Show Demo Toast Notification
    const toast = el(
      "div",
      { class: "toast toast-success" },
      [
        svgIcon(ICONS.check, "nav-icon"),
        el("div", {}, [
          el("div", { style: "font-weight: 700;" }, "Feedback Recorded (Local Demo)"),
          el(
            "div",
            { style: "font-size: 0.775rem; color: var(--color-text-muted);" },
            "Thank you! Your feedback has been stored in your local session. In the full release, this will sync with the backend."
          ),
        ]),
      ]
    );

    toastContainer.replaceChildren(toast);
    setTimeout(() => {
      toast.remove();
    }, 4500);

    form.reset();
    rating = 5;
    ratingLabel.textContent = "5 out of 5 stars";
    charCount.textContent = "0 / 600";
    starBtns.forEach((b) => {
      b.classList.add("is-active");
      b.setAttribute("aria-checked", "false");
    });
    starBtns[4].setAttribute("aria-checked", "true");
  });
}
