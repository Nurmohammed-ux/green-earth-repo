const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("category-trees").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("category-trees").classList.remove("hidden");
  }
};

const removeActive = () => {
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
};

const loadAllTrees = () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      removeActive();
      const allTreesBtn = document.getElementById("all-trees-btn");
      if (allTreesBtn) {
        allTreesBtn.classList.add("active");
      }
      displayCategoryTrees(data.plants);
    });
};

const loadAllCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      // console.log(json.categories);
      displayAllCategories(json.categories);
    });
};


const loadCategoryTrees = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      removeActive();

      const categoryBtn = document.getElementById(`category-btn-${id}`);
      categoryBtn.classList.add("active");
      displayCategoryTrees(json.plants);
    });
};

const loadTreeDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const response = await fetch(url);
  const details = await response.json();
  displayTreeDetails(details.plants);
};

const displayTreeDetails = (plant) => {
  // console.log(plant);

  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
                         <div class="bg-[#EDF7FF40] border-3 border-[#EDF7FF] p-6 rounded-3xl">
                         <img class="w-full h-[350px] mb-4 rounded-xl" src="${plant.image}" alt="image">              
                         <h2 class="text-4xl font-semibold mb-7">${plant.name}</h2>
                         <p class="text-2xl font-semibold mb-2.5">Description</p>
                         <p class="text-xl text-gray-700 mb-6">${plant.description}</p>

                         <p class="text-2xl font-semibold mb-2">Category</p>
                         <p class="text-xl font-medium text-gray-700 mb-6">${plant.category}</p>

                         <p class="text-2xl font-semibold mb-2">Price</p>
                         <p class="text-xl font-bold mb-4"><span class="font-extrabold">৳</span> ${plant.price}</p>
                         </div>
  
   `;
  document.getElementById("tree_modal").showModal();
};

let cart = [];
const loadCart = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const response = await fetch(url);
  const cartDetails = await response.json();
  const plant = cartDetails.plants;

  const existing = cart.find((item) => item.id === plant.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...plant, quantity: 1 });
  }
  displayCart();
};

const displayCart = () => {
  const cartContainer = document.getElementById("cart-container");
  const cartTotal = document.getElementById("cart-total");
  cartContainer.innerHTML = "";

  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalPrice += item.price * item.quantity;
    const cartDiv = document.createElement("div");
    cartDiv.innerHTML = `
                      <div class="bg-[#15803D10] flex justify-between items-center mb-3 p-4 rounded-3xl">
                <div>
                  <h4 class="text-xl font-medium mb-2">${item.name}</h4>
                  <p class="text-xl text-gray-600"><span class="text-2xl">৳</span>${item.price} x ${item.quantity}</p>
                </div>
                <a class="btn border-none text-2xl cursor-pointer">x</a>
              </div>
  
  `;
    cartDiv.querySelector("a").addEventListener("click", () => {
      cart.splice(index, 1);
      displayCart();
    });

    cartContainer.appendChild(cartDiv);
  });

  cartTotal.innerText = `Total: ৳ ${totalPrice}`;
};

const displayCategoryTrees = (plants) => {
  const categoryTreesContainer = document.getElementById("category-trees");
  categoryTreesContainer.innerHTML = "";

  plants.forEach((plant) => {
    const card = document.createElement("div");

    card.innerHTML = `
        <div class="bg-white md:w-[343.33px] p-4 rounded-xl h-full flex flex-col cursor-pointer">

          <img class="w-full h-[280px] mb-4 rounded-xl" src="${plant.image}" alt="${plant.name}">
          <h3 onclick="loadTreeDetails(${plant.id})" class="text-xl font-semibold mb-3">${plant.name}</h3>

          <p class="text-base font-medium text-gray-600 my-3 line-clamp-2">${plant.description}</p>

          <div class="flex justify-between mt-3 mb-5">
            <p class="bg-[#16653420] text-[#166534] font-medium px-3 rounded-full">${plant.category}</p>
            <p class="font-bold"><span class="font-extrabold">৳</span> ${plant.price}</p>
          </div>

          <button onclick="event.stopPropagation(); loadCart(${plant.id})" class="bg-[#15803D] text-white font-semibold hover:bg-[#16653420] hover:text-[#15803D] px-22 md:px-[111.17px] mt-auto py-3 rounded-full">
            Add to Cart
          </button>
        </div>
    `;

    // Modal click handler
    // card.addEventListener("click", () => {
    //   loadTreeDetails(plant.id);
    // });

    categoryTreesContainer.appendChild(card);
  });

  manageSpinner(false);
};

const displayAllCategories = (categories) => {
  const AllCategories = document.getElementById("all-categories");
  AllCategories.innerHTML = "";

  categories.forEach((category) => {
    const categoriesDiv = document.createElement("div");

    categoriesDiv.innerHTML = `
                 <h6 id="category-btn-${category.id}"        onclick="loadCategoryTrees('${category.id}')"
          class="text-2xl pl-2 py-1 my-2 hover:bg-[#166534] hover:text-white rounded-lg category-btn">

          ${category.category_name}
      </h6>
    `;

    AllCategories.appendChild(categoriesDiv);
  });
};

// Plant A Tree buttons (both mobile & desktop)
document.querySelectorAll(".btn-plantTree").forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById("plantATree-section").scrollIntoView({
            behavior: "smooth"
        });
    });
});

loadAllTrees();
loadAllCategories();
