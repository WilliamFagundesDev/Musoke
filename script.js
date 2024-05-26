// Requisição AJAX para carregar o arquivo JSON
const xhr = new XMLHttpRequest();
xhr.open('GET', 'Musicas.json', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        createMusicCards(data.Musicas); // Remova o "F" aqui
    }
};
xhr.send();

// Função para criar os cards das músicas
function createMusicCards(musicas) {
    const musicCardsContainer = document.getElementById('music-cards');
    musicCardsContainer.innerHTML = ''; // Limpa o conteúdo antes de adicionar os novos cards
    musicas.forEach(musica => {
        const card = document.createElement('div');
        card.classList.add('card-Musicas');
        card.innerHTML = `
        <div class="card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${musica.Nome}</h5>
        <p class="card-text">${musica.Trecho}</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>Código: ${musica.Codigo}</strong></li>
        <li class="list-group-item">Interprete: ${musica.Interprete}</li>
        <li class="list-group-item">Idioma: ${musica.Idioma}</li>
    </ul>
    </div>
    </div>
`;
        musicCardsContainer.appendChild(card);
    });
}

function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'Musicas.json', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const musicas = JSON.parse(xhr.responseText).Musicas;
        const searchResult = musicas.filter(musica => {
          return (
            musica.Codigo.toString().includes(searchInput) ||
            musica.Nome.toLowerCase().includes(searchInput) ||
            musica.Interprete.toLowerCase().includes(searchInput)
          );
        });
        createMusicCards(searchResult);
      }
    };
    xhr.send();
}

function search_por_autor(autor) {
    autor = autor.toLowerCase();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'Musicas.json', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const musicas = JSON.parse(xhr.responseText).Musicas;
        const searchResult = musicas.filter(musica => {
          return (
            musica.Codigo.toString().includes(autor) ||
            musica.Nome.toLowerCase().includes(autor) ||
            musica.Interprete.toLowerCase().includes(autor) ||
            musica.Idioma.toLowerCase().includes(autor)
          );
        });
        createMusicCards(searchResult);
      }
    };
    xhr.send();
}

let isBRA = true;
const image_pais = document.getElementById("img");

  function toggleFunction() {
    if (isBRA) {
      search_por_autor('EUA');
    } else {
      search_por_autor('BRA');
    }
    isBRA = !isBRA;
    updateButtonColor();
  }

  function updateButtonColor() {
    const button = document.getElementById("toggleButton");
    if (isBRA) {
      button.classList.remove("EUA");
      button.classList.add("BRA");
      image_pais.src = "imgbrasil.png";
      console.log("BRA");
    } else {
      button.classList.remove("BRA");
      button.classList.add("EUA");
      image_pais.src = "imgeua.png";
      console.log("EUA");
    }
  }