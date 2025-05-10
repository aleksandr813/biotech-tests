
document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.createElement("button");
  backButton.textContent = "Выйти в меню";
  backButton.style.position = "fixed";
  backButton.style.top = "10px";
  backButton.style.right = "10px";
  backButton.style.padding = "10px 15px";
  backButton.style.backgroundColor = "#007bff";
  backButton.style.color = "#fff";
  backButton.style.border = "none";
  backButton.style.borderRadius = "5px";
  backButton.style.cursor = "pointer";
  backButton.onclick = () => {
    window.location.href = "../../index.html";
  };

  document.body.appendChild(backButton);
});
