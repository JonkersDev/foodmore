const searchInput = document.querySelector("#search-bar");
const randomContainer = document.querySelector(".random-container");
const searchContainer = document.querySelector(".result-container");
const fullRecipe = document.querySelector(".recipe-container");

//INTRO
document.body.style = "overflow: hidden";
document.querySelector(".continue").addEventListener("click", () => {
  document.querySelector(".intro").style = "opacity: 0; pointer-events: none;";
  document.body.style = "";
});

//SEARCH RECIPE
const searchRecipe = async (term) => {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const responseResult = await response.json();
  if (responseResult.meals != null) {
    responseResult.meals.forEach((meal) => {
      let searchMeal = createRecipe(meal);
      searchContainer.appendChild(searchMeal);
    });
  } else if (responseResult.meals === null) {
    searchContainer.innerHTML = `<h3 class="no-result">No recipes found for "${term}".</h3>`;
  }
};

//RANDOM RECIPE
const randomRecipe = async () => {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const randomResult = await response.json();
  const randomMeal = randomResult.meals[0];

  let RandomCard = createRecipe(randomMeal);
  randomContainer.appendChild(RandomCard);
};

//OPEN FULL RECIPE
const lookRecipe = async (id) => {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const responseResult = await response.json();
  const idMeal = responseResult.meals[0];

  let ingr = "";

  for (i = 1; i < 21; i++) {
    let inh = eval("idMeal.strIngredient" + i);
    let inm = eval("idMeal.strMeasure" + i);

    if (!inh == "") {
      ingr = ingr + "<div class='dot'></div> " + inm + " " + inh + "<br>";
    }
  }

  const recipe = document.createElement("div");
  recipe.classList.add("modal");
  recipe.innerHTML = `
    <div class="recipe-full">
      <img src="${idMeal.strMealThumb}" alt="" class="thumb">
      <i class="fas fa-long-arrow-alt-left close-full"></i>
      <div class="info">
        <h2 class="recipe-name">${idMeal.strMeal}</h2>
        <div class="btns"><div class="slider"></div><button class="ingr-btn active" onClick="changeToIngr()">Ingredients</button>
        <button onClick="changeToPrep()" class="prep-btn">Preperation</button></div>
        <div class="ingredient-list active">${ingr}</div>
        <div class="instructions">${idMeal.strInstructions}</div>
      </div>
      <a href="${idMeal.strYoutube}" target="_blank">Watch Video</a>
    </div>
    `;

  recipe.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      fullRecipe.innerHTML = "";
    } else if (e.target.classList.contains("close-full")) {
      fullRecipe.innerHTML = "";
    }
  });

  fullRecipe.appendChild(recipe);
};

//INGREDIENT/PREP BUTTONS
const changeToPrep = () => {
  document.querySelector(".ingr-btn").classList.remove("active");
  document.querySelector(".prep-btn").classList.add("active");
  document.querySelector(".ingredient-list").classList.remove("active");
  document.querySelector(".instructions").classList.add("active");
  document.querySelector(".slider").style = "transform: translateX(100%)";
};

const changeToIngr = () => {
  document.querySelector(".ingr-btn").classList.add("active");
  document.querySelector(".prep-btn").classList.remove("active");
  document.querySelector(".ingredient-list").classList.add("active");
  document.querySelector(".instructions").classList.remove("active");
  document.querySelector(".slider").style = "";
};

//CREATE RECIPE CARD
const createRecipe = (meal) => {
  const recipeCard = document.createElement("div");
  let ingr = 0;
  for (i = 1; i < 20; i++) {
    let inh = eval("meal.strIngredient" + i);
    if (!inh == "") {
      ingr++;
    }
  }
  recipeCard.setAttribute("data-id", meal.idMeal);
  recipeCard.classList.add("recipe-card");
  recipeCard.innerHTML = `
    <img src="${meal.strMealThumb}" alt="food" class="recipe-img">
    <div class="card-info">
           <h4 class="recipe-name">${meal.strMeal}</h4>
           <div class="area">${meal.strArea}</div>
           <div class="ingredients"><i class="fas fa-carrot"></i> ${ingr} ingredients</div>
           <div class="ingredients"><i class="fas fa-clock"></i> ${
             Math.floor(Math.random() * 10) * 15 + 15 + " min"
           }</div>
           <div class="ingredients"><i class="far fa-star"></i> ${
             Math.floor(Math.random() * 6) * 0.5 + 2.5
           }</div>
          </div>
          <button>View Recipe</button>`;

  recipeCard.addEventListener("click", (e) => {
    lookRecipe(meal.idMeal);
  });

  return recipeCard;
};

//SEARCHBAR
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchContainer.innerHTML = "";
    if (searchInput.value != "") {
      searchRecipe(searchInput.value);
    }
  }
});

//CALLING STARTING RECIPES
randomRecipe();
randomRecipe();
randomRecipe();
randomRecipe();
randomRecipe();
randomRecipe();
randomRecipe();
randomRecipe();
