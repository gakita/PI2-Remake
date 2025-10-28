const API_URL = "http://localhost:3001/api"

export function createCard(title, price,imagePath){
    const card = document.createElement("div")
    card.innerHTML = `
    <div class="card">
    <div class="card-image-container">
    <img src="${API_URL}/${imagePath}" alt="" id="card-image">
    </div>
    <div class="card-infos">
    <h2 class="card-title" id="card-title">${title}</h2>
    <div class="card-price">
      <p>A partir de R$:  </p>
      <span id="card-price">${price}</span>
    </div>
    </div>
  </div>
    `
    return card
}
