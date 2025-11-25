const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("category-trees").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("category-trees").classList.remove("hidden");
  }
};

const loadAllCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json.categories);
      displayAllCategories(json.categories);
    });
};

// {
// "id": 1,
// "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// "name": "Mango Tree",
// "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// "category": "Fruit Tree",
// "price": 500
// },

const loadCategoryTrees = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      document.querySelectorAll(".category-btn").forEach((btn) => {
        btn.classList.remove("active");
      });

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
  console.log(plant);

   const detailsBox = document.getElementById("details-container");
   detailsBox.innerHTML = `
                         <div class="bg-[#EDF7FF40] border-3 border-[#EDF7FF] p-6 rounded-3xl">
                         <img class="w-full h-[300px] mb-4 rounded-xl" src="${plant.image}" alt="image">              
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

const displayCategoryTrees = (plants) => {
  const categoryTreesContainer = document.getElementById("category-trees");
  document.getElementById("initial-message").style.display = "none";
  categoryTreesContainer.innerHTML = "";

  plants.forEach((plant) => {
    const card = document.createElement("div");

    card.innerHTML = `
        <div class="bg-white md:w-[343.33px] p-4 rounded-xl h-full flex flex-col cursor-pointer">

          <img class="w-full h-[250px] mb-4 rounded-xl" src="${plant.image}" alt="${plant.name}">
          <h3 class="text-xl font-semibold mb-3">${plant.name}</h3>

          <p class="text-base font-medium text-gray-600 my-3">${plant.description}</p>

          <div class="flex justify-between mb-3">
            <p class="bg-[#16653420] text-[#166534] font-medium px-3 rounded-full">${plant.category}</p>
            <p class="font-bold">৳ ${plant.price}</p>
          </div>

          <button class="bg-[#15803D] text-white font-semibold hover:bg-[#16653420] hover:text-[#15803D] px-22 md:px-[111.17px] mt-auto py-3 rounded-full">
            Add to Cart
          </button>
        </div>
    `;

    card.addEventListener("click", () => {
      loadTreeDetails(plant.id);
    })

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

loadAllCategories();
