// search input field
const searchProduct = () => {
	const searchInput = document.getElementById("search-input");
	const errorMessage = document.getElementById("error");
	const searchText = searchInput.value;

	if (!isNaN(searchText) || searchText == "") {
		errorMessage.innerText = "Not a valid search";
		document.getElementById("product-container").textContent = "";
	} else {
		errorMessage.innerText = "";
		loadProduct(searchText);
	}

	searchInput.value = "";
};

// search load product
const loadProduct = phone => {
	const url = `https://openapi.programming-hero.com/api/phones?search=${phone}`;
	console.log(url);
	fetch(url)
		.then(response => response.json())
		.then(data => displayProduct(data.data))
		.catch(error => console.log(error));
	// .catch(error => (document.getElementById("error").innerText = error));
};

// display search product
const displayProduct = products => {
	const productContainer = document.getElementById("product-container");
	productContainer.textContent = "";

	// check products lenght
	if (products.length === 0) {
		document.getElementById("error").innerText = "No result found";
	}

	// each products display
	for (const product of products) {
		const div = document.createElement("div");
		div.classList.add("col");
		div.innerHTML = `
      <div class="card h-100 shadow-sm p-3 mb-3 bg-body rounded">
        <img width="250px" src="${product.image}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h6 class="card-title"><b class="text-warning">Name :</b> ${product.phone_name}</h6>
          <p class="card-text"><b class="text-warning">Brand :</b> ${product.brand}</p>
        </div>
        <button class="btn btn-warning text-white">SEE DETAILS</button>
      </div>
    `;

		productContainer.appendChild(div);
	}
};
