const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Désactive tous les boutons
    tabButtons.forEach(b => b.classList.remove('active'));
    // Masque tous les contenus
    tabContents.forEach(c => c.style.display = 'none');

    // Active le bouton cliqué
    btn.classList.add('active');
    // Affiche le contenu correspondant
    const tabId = btn.getAttribute('data-tab');
    document.getElementById(tabId).style.display = 'block';
  });
});