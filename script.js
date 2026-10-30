
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const navLinks = document.querySelectorAll(".nav-link");
const lessons = document.querySelectorAll(".lesson");

// Mobile sidebar
menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// Close sidebar after selecting a section
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });
});

// Active navigation based on current section
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, {
  rootMargin: "-20% 0px -65% 0px"
});

lessons.forEach(section => observer.observe(section));

// Copy code buttons
document.querySelectorAll(".copy-btn").forEach(button => {
  button.addEventListener("click", async () => {
    const code = button
      .closest(".codebox")
      .querySelector("code").innerText;

    try {
      await navigator.clipboard.writeText(code);
      button.textContent = "Copied!";

      setTimeout(() => {
        button.textContent = "Copy";
      }, 1500);

    } catch (error) {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();

      const success = document.execCommand("copy");
      textarea.remove();

      button.textContent = success ? "Copied!" : "Failed";

      setTimeout(() => {
        button.textContent = "Copy";
      }, 1500);
    }
  });
});

// Search reference table
const searchInput = document.getElementById("searchReference");
const tableRows = document.querySelectorAll("#referenceTable tbody tr");

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();

  tableRows.forEach(row => {
    const content = row.innerText.toLowerCase();
    row.style.display = content.includes(keyword) ? "" : "none";
  });
});
