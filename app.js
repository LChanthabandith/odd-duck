// Constructor function for a product
function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.timesShown = 0;
  this.timesClicked = 0;
}

// Product objects
var products = [
  new Product("bag", "images/bag.jpg"),
  new Product("banana", "images/banana.jpg"),
  new Product("bathroom", "images/bathroom.jpg"),
  new Product("boots", "images/boots.jpg"),
  new Product("breakfast", "images/breakfast.jpg"),
  new Product("bubblegum", "images/bubblegum.jpg"),
  new Product("chair", "images/chair.jpg"),
  new Product("cthulhu", "images/cthulhu.jpg"),
  new Product("dog-duck", "images/dog-duck.jpg"),
  new Product("dragon", "images/dragon.jpg"),
  new Product("pen", "images/pen.jpg"),
  new Product("pet-sweep", "images/pet-sweep.jpg"),
  new Product("scissors", "images/scissors.jpg"),
  new Product("shark", "images/shark.jpg"),
  new Product("sweep", "images/sweep.png"),
  new Product("tauntaun", "images/tauntaun.jpg"),
  new Product("unicorn", "images/unicorn.jpg"),
  new Product("water-can", "images/water-can.jpg"),
  new Product("wine-glass", "images/wine-glass.jpg")
];

var rounds = 25; // Number of voting rounds
var currentRound = 0; // Counter for the current round
var selectedProduct; // Variable to store the selected product

var productsConsidered = products.slice(); // Copy the products array to track all the products being considered

// Function to display three unique products
function displayProducts() {
  var productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  var uniqueIndices = [];
  while (uniqueIndices.length < 3) {
    var randomIndex = Math.floor(Math.random() * productsConsidered.length);
    if (!uniqueIndices.includes(randomIndex)) {
      uniqueIndices.push(randomIndex);

      var product = productsConsidered[randomIndex];
      var productElement = document.createElement("div");
      productElement.className = "product";
      productElement.id = "product-" + (uniqueIndices.length);

      var img = document.createElement("img");
      img.src = product.imagePath;
      img.alt = product.name;

      productElement.appendChild(img);
      productContainer.appendChild(productElement);

      product.timesShown++; // Increment the timesShown property
    }
  }

  productContainer.addEventListener("click", productClick); // Attach event listener to the product container
}

// Event listener for product clicks
function productClick(event) {
  var clickedProduct = event.target;
  var productContainer = document.getElementById("product-container");
  var productElements = productContainer.getElementsByClassName("product");

  for (var i = 0; i < productElements.length; i++) {
    if (clickedProduct === productElements[i] || clickedProduct === productElements[i].getElementsByTagName("img")[0]) {
      var productIndex = parseInt(productElements[i].id.split("-")[1]) - 1;
      selectedProduct = productsConsidered[productIndex];
      selectedProduct.timesClicked++;
      break;
    }
  }

  currentRound++;
  if (currentRound < rounds) {
    displayProducts(); // Generate new products after a click
  } else {
    productContainer.removeEventListener("click", productClick); // Remove the event listener after all rounds
    console.log("Voting session ended.");
    showResults(); // Display the voting results
  }
}

// Function to display the voting results
function showResults() {
  var resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = "";

  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var result = document.createElement("p");
    result.textContent = `${product.name}: ${product.timesClicked} votes, seen ${product.timesShown} times`;
    resultsContainer.appendChild(result);
  }
}

// Event listener for the "View Results" button
var viewResultsBtn = document.getElementById("view-results-btn");
viewResultsBtn.addEventListener("click", showResults);

// Initialize the app
displayProducts();

