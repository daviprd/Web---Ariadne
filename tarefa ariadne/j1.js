
const inputSerie = document.getElementById("inputSerie");
const btnBuscar = document.getElementById("btnBuscar");
const resultado = document.getElementById("resultado");


btnBuscar.addEventListener("click", buscarSeries);

async function buscarSeries() {

  
  const nomeSerie = inputSerie.value;

  
  resultado.innerHTML = "";

  
  if(nomeSerie === "") {
    resultado.innerHTML = "<p>Digite uma série!</p>";
    return;
  }

  try {

    
    const resposta = await fetch(
      `https://api.tvmaze.com/search/shows?q=${nomeSerie}`
    );

    
    const dados = await resposta.json();

    
    if(dados.length === 0) {
      resultado.innerHTML = "<p>Nenhum resultado encontrado.</p>";
      return;
    }

    
    dados.forEach(item => {

      
      const serie = item.show;

      
      const card = document.createElement("div");
      card.classList.add("card");

      
      let imagem;

      if(serie.image) {
        imagem = `<img src="${serie.image.medium}" alt="${serie.name}">`;
      } else {
        imagem = `<div class="sem-imagem">Sem imagem</div>`;
      }

      
      card.innerHTML = `
        ${imagem}
        <h2>${serie.name}</h2>
        <p>Score: ${item.score}</p>
      `;

      
      resultado.appendChild(card);

    });

  } catch(erro) {

    
    resultado.innerHTML = "<p>Erro ao buscar séries.</p>";

    console.log(erro);
  }
}