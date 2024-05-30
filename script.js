// Classe représentant un produit
class Product {
  // Constructeur de la classe Product, initialise les propriétés du produit
  constructor(id, name, price, image) {
    this.id = id; // Identifiant unique du produit
    this.name = name; // Nom du produit
    this.price = price; // Prix du produit
    this.image = image; // URL de l'image du produit
  }
}

// Classe représentant un article dans le panier
class ShoppingCartItem {
  // Constructeur de la classe ShoppingCartItem, initialise les propriétés de l'article
  constructor(product, quantity = 1) {
    this.product = product; // Référence à un objet Product
    this.quantity = quantity; // Quantité de ce produit dans le panier
  }

  // Méthode pour calculer le prix total de l'article
  getTotalPrice() {
    return this.product.price * this.quantity; // Retourne le prix unitaire multiplié par la quantité
  }
}

// Classe représentant le panier d'achat
class ShoppingCart {
  // Constructeur de la classe ShoppingCart, initialise la liste des articles
  constructor() {
    this.items = []; // Tableau pour stocker les articles du panier
  }

  // Méthode pour ajouter un article au panier
  addItem(product) {
    // Cherche si le produit est déjà dans le panier
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      // Si le produit existe déjà, augmenter la quantité
      existingItem.quantity++;
    } else {
      // Sinon, ajouter un nouveau ShoppingCartItem pour ce produit
      this.items.push(new ShoppingCartItem(product));
    }
    this.displayCart(); // Mettre à jour l'affichage du panier
  }

  // Méthode pour supprimer un article du panier
  removeItem(productId) {
    // Filtrer les articles pour exclure celui avec l'id correspondant
    this.items = this.items.filter(item => item.product.id !== productId);
    this.displayCart(); // Mettre à jour l'affichage du panier
  }

  // Méthode pour obtenir le total des prix des articles dans le panier
  getTotalPrice() {
    // Réduire le tableau des articles pour calculer le total des prix
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  // Méthode pour afficher les articles du panier dans le DOM
  displayCart() {
    const cartElement = document.getElementById("cart"); // Récupérer l'élément du DOM pour le panier
    cartElement.innerHTML = ""; // Vider le contenu actuel du panier

    // Parcourir les articles du panier et les ajouter au DOM
    this.items.forEach(item => {
      const itemElement = document.createElement("div"); // Créer un conteneur pour l'article
      itemElement.classList.add("item"); // Ajouter une classe CSS à l'élément

      const nameElement = document.createElement("span"); // Créer un élément pour le nom du produit
      nameElement.textContent = item.product.name; // Définir le texte de l'élément
      itemElement.appendChild(nameElement); // Ajouter l'élément au conteneur de l'article

      const quantityElement = document.createElement("span"); // Créer un élément pour la quantité
      quantityElement.textContent = "Quantity: " + item.quantity; // Définir le texte de l'élément
      itemElement.appendChild(quantityElement); // Ajouter l'élément au conteneur de l'article

      const increaseButton = document.createElement("button"); // Créer un bouton pour augmenter la quantité
      increaseButton.textContent = "+"; // Définir le texte du bouton
      increaseButton.addEventListener("click", () => {
        item.quantity++; // Augmenter la quantité
        quantityElement.textContent = "Quantity: " + item.quantity; // Mettre à jour le texte de la quantité
        this.updateTotalPrice(); // Mettre à jour le prix total
      });
      itemElement.appendChild(increaseButton); // Ajouter le bouton au conteneur de l'article

      const decreaseButton = document.createElement("button"); // Créer un bouton pour diminuer la quantité
      decreaseButton.textContent = "-"; // Définir le texte du bouton
      decreaseButton.addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--; // Diminuer la quantité si elle est supérieure à 1
          quantityElement.textContent = "Quantity: " + item.quantity; // Mettre à jour le texte de la quantité
        } else {
          this.removeItem(item.product.id); // Sinon, supprimer l'article du panier
        }
        this.updateTotalPrice(); // Mettre à jour le prix total
      });
      itemElement.appendChild(decreaseButton); // Ajouter le bouton au conteneur de l'article

      const productImage = document.createElement("img"); // Créer un élément image pour le produit
      productImage.setAttribute('src', item.product.image); // Définir la source de l'image
      productImage.setAttribute('class', 'ProductImage'); // Ajouter une classe CSS à l'image
      itemElement.appendChild(productImage); // Ajouter l'image au conteneur de l'article

      const deleteButton = document.createElement("button"); // Créer un bouton pour supprimer l'article
      deleteButton.textContent = "Delete"; // Définir le texte du bouton
      deleteButton.addEventListener("click", () => {
        this.removeItem(item.product.id); // Supprimer l'article du panier
        this.updateTotalPrice(); // Mettre à jour le prix total
      });
      itemElement.appendChild(deleteButton); // Ajouter le bouton au conteneur de l'article

      const likeButton = document.createElement("button"); // Créer un bouton pour aimer l'article
      likeButton.textContent = "Like"; // Définir le texte du bouton
      likeButton.classList.add("like-button"); // Ajouter une classe CSS au bouton
      likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("liked"); // Alterner la classe 'liked'
        if (likeButton.classList.contains("liked")) {
          item.product.isLiked = true; // Marquer l'article comme aimé
          likeButton.style.color = "red"; // Changer la couleur du bouton en rouge
        } else {
          item.product.isLiked = false; // Retirer l'indication d'aimé
          likeButton.style.color = "black"; // Changer la couleur du bouton en noir
        }
      });
      itemElement.appendChild(likeButton); // Ajouter le bouton au conteneur de l'article

      cartElement.appendChild(itemElement); // Ajouter le conteneur de l'article au panier
    });

    this.updateTotalPrice(); // Mettre à jour le prix total
  }

  // Méthode pour mettre à jour le prix total affiché
  updateTotalPrice() {
    const totalPriceElement = document.getElementById("total-price"); // Récupérer l'élément du DOM pour le prix total
    totalPriceElement.textContent = "Total Price: $" + this.getTotalPrice(); // Mettre à jour le texte du prix total
  }
}

// Créer des instances de produit
const products = [
  new Product(1, "Item 1", 10, './img/987ca2af.webp'), // Instance de Product pour Item 1
  new Product(2, "Item 2", 20, './img/bff3c1c2.webp'), // Instance de Product pour Item 2
  new Product(3, "Item 3", 15, './img/f9645056.webp'), // Instance de Product pour Item 3
  new Product(4, "Item 4", 15, './img/nike.png'), // Instance de Product pour Item 4
];

// Créer une instance du panier d'achat
const cart = new ShoppingCart();

// Ajouter des produits au panier pour démonstration
products.forEach(product => cart.addItem(product)); // Ajouter chaque produit au panier
