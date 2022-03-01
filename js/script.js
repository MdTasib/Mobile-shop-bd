// search input field
const searchProduct = () => {
	const searchInput = document.getElementById("search-input");
	const errorMessage = document.getElementById("error");
	const searchText = searchInput.value;

	if (!isNaN(searchText) || searchText == "") {
		errorMessage.innerText = "Not a valid search";
		document.getElementById("product-container").textContent = "";
		document.getElementById("product-detail").textContent = "";
	} else {
		errorMessage.innerText = "";
		loadProduct(searchText);
	}

	searchInput.value = "";
};

// search load product
const loadProduct = phone => {
	const url = `https://openapi.programming-hero.com/api/phones?search=${phone}`;
	fetch(url)
		.then(response => response.json())
		.then(data => displayProduct(data.data));
};

// display search product
const displayProduct = products => {
	const productContainer = document.getElementById("product-container");
	productContainer.textContent = "";

	// clear previos content
	document.getElementById("product-detail").textContent = "";

	// check products lenght
	if (products.length === 0) {
		document.getElementById("error").innerText = "No result found";
	}

	// each products display
	for (const product of products.slice(0, 20)) {
		const div = document.createElement("div");
		div.classList.add("col");
		div.innerHTML = `
      <div class="card h-100 shadow p-3 mb-3 bg-body rounded border-3 border-light">
        <img width="250px" src="${product.image}" class="card-img-top w-75 h-auto m-auto" alt="..." />
        <div class="card-body">
          <h6 class="card-title"><b class="text-warning">Name :</b> ${product.phone_name}</h6>
          <p class="card-text"><b class="text-warning">Brand :</b> ${product.brand}</p>
        </div>
        <button class="btn btn-warning text-white" onclick="loadDetails('${product.slug}')">SEE DETAILS</button>
      </div>
    `;

		productContainer.appendChild(div);
	}
};

// load details product
const loadDetails = productId => {
	const url = `https://openapi.programming-hero.com/api/phone/${productId}`;
	fetch(url)
		.then(response => response.json())
		.then(data => displayDetails(data.data));
};

// show display product details
const displayDetails = product => {
	console.log(product);
	const detailsContainer = document.getElementById("product-detail");
	detailsContainer.textContent = "";

	const div = document.createElement("div");
	// add multiple classes classlist
	const classes = ["card", "mb-3"];
	div.classList.add(...classes);

	div.innerHTML = `
				<div class="row p-3 g-0">
					<div class="col-md-4 d-flex justify-content-center">
						<img
							src="${product.image}"
							class="img-fluid rounded-start h-50"
							alt="..."
						/>
					</div>
					<div class="col-md-8">
						<div class="card-body">
							<h6 class="card-title"><b class="text-warning">Name :</b> ${product.name}</h6>
							<p class="card-text"><b class="text-warning">Brand :</b> ${product.brand}</p>
							<p class="card-text"><b class="text-warning">Storage :</b> ${
								product.mainFeatures.storage
							}</p>
							<p class="card-text"><b class="text-warning">Display Size :</b> ${
								product.mainFeatures.displaySize
							}</p>
							<p class="card-text"><b class="text-warning">Chipset :</b> ${
								product.mainFeatures.chipSet
							}</p>
							<p class="card-text"><b class="text-warning">Memory :</b> ${
								product.mainFeatures.memory
							}</p>
							<p class="card-text"><b class="text-warning">Sensors :</b> ${product.mainFeatures.sensors.map(
								sersor => sersor
							)}</p>

							<p class="card-text"><b class="text-warning">WLAN :</b> ${
								product?.others?.WLAN || "Not available"
							}</p>
							<p class="card-text"><b class="text-warning">Bluetooth :</b> ${
								product?.others?.Bluetooth || "Not available"
							}</p>
							<p class="card-text"><b class="text-warning">GPS :</b> ${
								product?.others?.GPS || "Not available"
							}</p>
							<p class="card-text"><b class="text-warning">NFC :</b> ${
								product?.others?.NFC || "Not available"
							}</p>
							<p class="card-text"><b class="text-warning">Radio :</b> ${
								product?.others?.Radio || "Not available"
							}</p>
							<p class="card-text"><b class="text-warning">USB :</b> ${
								product?.others?.USB || "Not available"
							}</p>
							<p class="card-text"><b class="text-warning">Release Date :</b> ${
								product.releaseDate || "Not Available Release Date"
							}</p>
						</div>
					</div>
				</div>
	`;
	detailsContainer.appendChild(div);
};
