// Personalize these values before publishing.
const SITE_CONFIG = {
  name: "Alex Morgan",
  email: "alex@example.com"
};

const projectData = {
  portfolio: {
    kicker: "01 / AWS · HOSTING",
    title: "Cloud-hosted portfolio",
    description: "Deploy a static site to an Amazon S3 bucket, then optionally distribute it through CloudFront with HTTPS and a custom domain. This portfolio itself is a suitable starting point.",
    checklist: ["Create a private S3 bucket for website files.", "Upload index.html, style.css, and script.js.", "Use CloudFront with Origin Access Control for secure public delivery.", "Configure HTTPS and optionally connect a custom domain.", "Test mobile layout, navigation, and browser console."],
    tech: ["Amazon S3", "CloudFront", "HTML/CSS/JS"]
  },
  monitoring: {
    kicker: "02 / AWS · MONITORING",
    title: "EC2 health monitoring",
    description: "A learning lab to understand instance health, system metrics, logs, alarms, and the first steps of investigating a failing service.",
    checklist: ["Launch a small test EC2 instance within a budget.", "Review status checks and CloudWatch metrics.", "Install and configure the CloudWatch Agent if needed.", "Create an alarm and test a notification path.", "Document troubleshooting steps and delete unused resources."],
    tech: ["EC2", "CloudWatch", "Linux"]
  },
  backup: {
    kicker: "03 / LINUX · AUTOMATION",
    title: "Linux backup automation",
    description: "A shell-script practice project for creating timestamped archives, checking command results, logging outcomes, and scheduling repeatable backups.",
    checklist: ["Create a dedicated test directory with sample files.", "Write a Bash script with variables and error handling.", "Create timestamped archives and write a log.", "Schedule the script with cron on a test machine.", "Test restore procedures and clean up old archives safely."],
    tech: ["Bash", "Cron", "Linux"]
  }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

document.title = `${SITE_CONFIG.name} | Cloud Engineer`;
$("#emailLink").href = `mailto:${SITE_CONFIG.email}`;
$("#emailLink").firstChild.textContent = SITE_CONFIG.email + " ";
$("#year").textContent = new Date().getFullYear();

const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
$$(".nav-links a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Reading progress indicator.
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  $("#scrollProgress").style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// Reveal sections as they enter the viewport.
const revealElements = $$(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(el => revealObserver.observe(el));
} else {
  revealElements.forEach(el => el.classList.add("visible"));
}

// Animate the example metrics once.
const countElements = $$("[data-count]");
const countObserver = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const start = performance.now();
    const duration = 900;
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3))) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 }) : null;
countElements.forEach(el => countObserver ? countObserver.observe(el) : el.textContent = el.dataset.count + (el.dataset.suffix || ""));

// Filter projects by topic.
$$(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    $$(".filter-btn").forEach(item => item.classList.toggle("active", item === button));
    const filter = button.dataset.filter;
    $$(".project-card").forEach(card => {
      const categories = card.dataset.categories.split(" ");
      card.hidden = filter !== "all" && !categories.includes(filter);
    });
  });
});

// Project detail dialogs.
const dialog = $("#projectDialog");
const showProject = key => {
  const project = projectData[key];
  if (!project) return;
  $("#dialogKicker").textContent = project.kicker;
  $("#dialogTitle").textContent = project.title;
  $("#dialogDescription").textContent = project.description;
  $("#dialogChecklist").replaceChildren(...project.checklist.map(item => {
    const li = document.createElement("li");
    li.textContent = item;
    return li;
  }));
  $("#dialogTech").replaceChildren(...project.tech.map(item => {
    const span = document.createElement("span");
    span.textContent = item;
    return span;
  }));
  if (typeof dialog.showModal === "function") dialog.showModal();
  else showToast(project.title + " — details are available in the project section.");
};
$$("[data-project]").forEach(button => button.addEventListener("click", () => showProject(button.dataset.project)));
$("#dialogClose").addEventListener("click", () => dialog.close());
$("#dialogDone").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

// Copy email address with a graceful fallback.
const showToast = message => {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove("show"), 2600);
};
$("#copyEmail").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(SITE_CONFIG.email);
    showToast("Email address copied.");
  } catch {
    const helper = document.createElement("textarea");
    helper.value = SITE_CONFIG.email;
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.append(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();
    showToast(copied ? "Email address copied." : `Email: ${SITE_CONFIG.email}`);
  }
});

// Static HTML has no server-side mail handler: prepare a message in the visitor's email app.
$("#contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  const name = String(formData.get("name")).trim();
  const email = String(formData.get("email")).trim();
  const message = String(formData.get("message")).trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nReply email: ${email}\n\n${message}`);
  $("#formNote").textContent = "Opening your email application. If it doesn't open, email me directly using the address shown.";
  window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
});

