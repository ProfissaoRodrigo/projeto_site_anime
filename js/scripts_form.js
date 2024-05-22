// Variável para controlar o estado do formulário
let formVisible = false;

// Mostrar ou esconder o formulário ao clicar no botão flutuante
document.querySelectorAll(".floating-button").forEach(function(button) {
  button.addEventListener("click", function() {
    if (!formVisible) {
      document.getElementById("popupForm").style.display = "block";
    } else {
      document.getElementById("popupForm").style.display = "none";
    }
    formVisible = !formVisible;
  });
});
