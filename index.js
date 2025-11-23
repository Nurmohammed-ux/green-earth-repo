const manageSpinner = (status) => {
  if(status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("category-trees").classList.add("hidden");
  }
  else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("category-trees").classList.remove("hidden");
  }
}


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
    .then((json) => displayCategoryTrees(json.plants));
};

const displayCategoryTrees = (plants) => {
  
  const categoryTreesContainer = document.getElementById("category-trees");
  const initialMessage = document.getElementById("initial-message");
  initialMessage.style.display = "none";
  categoryTreesContainer.innerHTML = "";


  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.innerHTML = `
                    <div class="bg-white md:w-[343.33px] p-4 rounded-xl h-full flex flex-col">
              <img class="w-full h-[250px] mb-4 rounded-xl" src="${plant.image}" alt="image">
              <h3 class="text-xl font-semibold mb-3">${plant.name}</h3>
              <p class="text-base font-medium text-gray-600 my-3">${plant.description}</p>
              <div class="flex justify-between mb-3">
                <p class="bg-[#16653420] text-[#166534] font-medium px-3 rounded-full">${plant.category}</p>
                <p class="font-bold"><span class="font-extrabold">৳</span> <span>${plant.price}</span></p>
              </div>
              <button class="bg-[#15803D] text-white font-semibold hover:bg-[#16653420] hover:text-[#15803D] px-22 md:px-[111.17px] mt-auto py-3 rounded-full">Add to Cart</button>
            </div>
    
    `;
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
      <h6 onclick="loadCategoryTrees('${category.id}')"
          class="text-2xl pl-2 py-1 my-2 hover:bg-[#166534] hover:text-white rounded-lg">

          ${category.category_name}
      </h6>
    `;

    AllCategories.appendChild(categoriesDiv);
  });
};

loadAllCategories();
