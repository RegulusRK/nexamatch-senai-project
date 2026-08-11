"use strict";

const PROFILE_KEY = "nexamatch:profile";
const RESULT_KEY = "nexamatch:last-result";

function setupMenu() {
  const button = document.querySelector(".menu-button");
  const navigation = document.querySelector(".main-nav");
  if (!button || !navigation) return;

  button.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });
}

function markCurrentPage() {
  const currentLink = document.querySelector(`[data-nav="${document.body.dataset.page}"]`);
  if (currentLink) currentLink.setAttribute("aria-current", "page");
}

function setupCurrentYear() {
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
}

function setupRevealAnimation() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
}

function setupCharacterCounter(textarea) {
  const counter = document.querySelector(`[data-count-for="${textarea.id}"]`);
  if (!counter) return;

  const updateCounter = () => {
    counter.textContent = textarea.value.length;
  };

  textarea.addEventListener("input", updateCounter);
  updateCounter();
}

function setFieldError(field, message) {
  const error = document.querySelector(`[data-error-for="${field.id}"]`);
  field.classList.toggle("has-error", Boolean(message));
  field.setAttribute("aria-invalid", String(Boolean(message)));
  if (error) error.textContent = message;
}

function readProfile() {
  try {
    const storedProfile = localStorage.getItem(PROFILE_KEY);
    return storedProfile ? JSON.parse(storedProfile) : null;
  } catch {
    return null;
  }
}

function countProfileSkills(skillsText) {
  return skillsText
    .split(/[,;\n]+/)
    .map((skill) => skill.trim())
    .filter(Boolean)
    .length;
}

function setVacancyFormEnabled(form, isEnabled) {
  form.classList.toggle("is-locked", !isEnabled);
  form.querySelectorAll("input, textarea, button").forEach((element) => {
    element.disabled = !isEnabled;
  });
}

function setupAnalysisPage() {
  const profileForm = document.querySelector("#profile-form");
  const vacancyForm = document.querySelector("#match-form");
  if (!profileForm || !vacancyForm) return;

  const profileSummary = document.querySelector("#profile-summary");
  const profileName = document.querySelector("#profile-name");
  const profileSkills = document.querySelector("#profile-skills");
  const editProfileButton = document.querySelector("#edit-profile");
  const cancelProfileButton = document.querySelector("#cancel-profile-edit");
  const jobTitle = document.querySelector("#job-title");
  const jobDescription = document.querySelector("#job-description");
  const exampleButton = document.querySelector("#fill-example");
  const formMessage = document.querySelector("#form-message");
  const loadingOverlay = document.querySelector("#loading-overlay");

  setupCharacterCounter(profileSkills);
  setupCharacterCounter(jobDescription);

  function showSavedProfile(profile) {
    profileForm.hidden = true;
    profileSummary.hidden = false;
    document.querySelector("[data-profile-name]").textContent = profile.name || "Seu perfil";
    document.querySelector("[data-profile-count]").textContent = countProfileSkills(profile.skills);
    setVacancyFormEnabled(vacancyForm, true);
  }

  function showProfileEditor(profile = null) {
    profileForm.hidden = false;
    profileSummary.hidden = true;
    profileName.value = profile?.name || "";
    profileSkills.value = profile?.skills || "";
    profileSkills.dispatchEvent(new Event("input"));
    cancelProfileButton.hidden = !profile;
    setVacancyFormEnabled(vacancyForm, false);
  }

  const existingProfile = readProfile();
  if (existingProfile?.skills) showSavedProfile(existingProfile);
  else showProfileEditor();

  profileSkills.addEventListener("input", () => setFieldError(profileSkills, ""));

  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const skills = profileSkills.value.trim();

    if (skills.length < 10) {
      setFieldError(profileSkills, "Informe ao menos algumas competências.");
      profileSkills.focus();
      return;
    }

    const profile = {
      name: profileName.value.trim(),
      skills,
      updatedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      showSavedProfile(profile);
      vacancyForm.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch {
      setFieldError(profileSkills, "O navegador não permitiu salvar o perfil localmente.");
    }
  });

  editProfileButton.addEventListener("click", () => showProfileEditor(readProfile()));
  cancelProfileButton.addEventListener("click", () => {
    const profile = readProfile();
    if (profile) showSavedProfile(profile);
  });

  exampleButton.addEventListener("click", () => {
    jobTitle.value = "Desenvolvedor Backend Júnior";
    jobDescription.value = "Buscamos pessoa desenvolvedora backend júnior com conhecimento em JavaScript, Node.js, Git, APIs REST, banco de dados MySQL e Linux. Será responsável por desenvolver e testar endpoints, corrigir erros e colaborar com o time. Conhecimento em Docker, testes automatizados e inglês será considerado diferencial.";
    jobDescription.dispatchEvent(new Event("input"));
  });

  [jobTitle, jobDescription].forEach((field) => {
    field.addEventListener("input", () => setFieldError(field, ""));
  });

  vacancyForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    formMessage.textContent = "";

    const profile = readProfile();
    if (!profile?.skills) {
      formMessage.textContent = "Salve seu perfil antes de analisar uma vaga.";
      showProfileEditor();
      return;
    }

    const invalidTitle = jobTitle.value.trim().length < 3;
    const invalidDescription = jobDescription.value.trim().length < 30;
    setFieldError(jobTitle, invalidTitle ? "Informe o título da vaga." : "");
    setFieldError(jobDescription, invalidDescription ? "Cole requisitos mais completos da vaga." : "");

    if (invalidTitle || invalidDescription) {
      formMessage.textContent = "Revise os campos destacados antes de continuar.";
      document.querySelector(".has-error")?.focus();
      return;
    }

    if (!window.NexaMatcher || typeof window.NexaMatcher.analyze !== "function") {
      formMessage.textContent = "O matcher.js ainda precisa ser criado para realizar a comparação.";
      return;
    }

    loadingOverlay.hidden = false;
    document.body.classList.add("is-loading");

    try {
      const result = await Promise.resolve(
        window.NexaMatcher.analyze(profile.skills, jobDescription.value.trim())
      );

      if (!result || typeof result !== "object") {
        throw new Error("O matcher.js não devolveu um resultado válido.");
      }

      sessionStorage.setItem(RESULT_KEY, JSON.stringify({
        ...result,
        candidateName: profile.name,
        jobTitle: jobTitle.value.trim(),
        createdAt: new Date().toISOString()
      }));

      window.location.href = "resultado.html";
    } catch (error) {
      formMessage.textContent = error.message || "Não foi possível concluir a comparação.";
      loadingOverlay.hidden = true;
      document.body.classList.remove("is-loading");
    }
  });
}

function createTag(text, type) {
  const tag = document.createElement("span");
  tag.className = `tag tag-${type}`;
  tag.textContent = text;
  return tag;
}

function renderTags(container, items, type, emptyText) {
  container.replaceChildren();
  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "empty-list-message";
    empty.textContent = emptyText;
    container.appendChild(empty);
    return;
  }

  items.forEach((item) => container.appendChild(createTag(item, type)));
}

function createRecommendation(number, title, description) {
  const article = document.createElement("article");
  const badge = document.createElement("span");
  const content = document.createElement("div");
  const heading = document.createElement("h3");
  const paragraph = document.createElement("p");

  badge.textContent = number;
  heading.textContent = title;
  paragraph.textContent = description;
  content.append(heading, paragraph);
  article.append(badge, content);
  return article;
}

function renderRecommendations(result) {
  const container = document.querySelector("[data-recommendations]");
  container.replaceChildren();
  const missingFocus = result.missingSkills.slice(0, 3).join(", ");
  const recommendations = [
    ["1", "Personalize seu currículo", "Destaque experiências e projetos relacionados às competências encontradas."],
    ["2", "Estude com prioridade", missingFocus ? `Comece pelas lacunas mais relevantes: ${missingFocus}.` : "Aprofunde as competências que a vaga mais repete."],
    ["3", "Avalie o contexto", "Experiência, projetos e capacidade de aprender também influenciam uma candidatura."]
  ];
  recommendations.forEach((item) => container.appendChild(createRecommendation(...item)));
}

function setupResultPage() {
  const resultContent = document.querySelector("#result-content");
  const emptyResult = document.querySelector("#empty-result");
  if (!resultContent || !emptyResult) return;

  const storedResult = sessionStorage.getItem(RESULT_KEY);
  if (!storedResult) {
    emptyResult.hidden = false;
    return;
  }

  try {
    const result = JSON.parse(storedResult);
    const matchedSkills = Array.isArray(result.matchedSkills) ? result.matchedSkills : [];
    const missingSkills = Array.isArray(result.missingSkills) ? result.missingSkills : [];
    const safeScore = Math.min(100, Math.max(0, Number(result.score) || 0));

    resultContent.hidden = false;
    document.querySelector("[data-result-name]").textContent = result.candidateName || "Seu perfil";
    document.querySelector("[data-result-job]").textContent = result.jobTitle || "a vaga";
    document.querySelector("[data-result-score]").textContent = `${Math.round(safeScore)}%`;
    document.querySelector("[data-score-ring]").style.setProperty("--score", safeScore);
    document.querySelector("[data-result-level]").textContent = result.level || "Resultado disponível";
    document.querySelector("[data-result-message]").textContent = result.message || "Confira os detalhes da comparação abaixo.";
    document.querySelector("[data-total-required]").textContent = result.totalRequired ?? matchedSkills.length + missingSkills.length;
    document.querySelector("[data-total-matched]").textContent = matchedSkills.length;
    document.querySelector("[data-total-missing]").textContent = missingSkills.length;

    renderTags(document.querySelector("[data-matched-list]"), matchedSkills, "success", "Nenhuma competência foi localizada nos dois textos.");
    renderTags(document.querySelector("[data-missing-list]"), missingSkills, "attention", "Nenhuma lacuna foi identificada na lista analisada.");
    renderRecommendations({ ...result, missingSkills });
  } catch {
    sessionStorage.removeItem(RESULT_KEY);
    emptyResult.hidden = false;
  }

  document.querySelector("#print-result")?.addEventListener("click", () => window.print());
}

document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  markCurrentPage();
  setupCurrentYear();
  setupRevealAnimation();
  setupAnalysisPage();
  setupResultPage();
});
