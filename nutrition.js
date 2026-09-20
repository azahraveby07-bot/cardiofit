/* =========================
   CARDIOFIT NUTRITION
========================= */


/* =========================
   DAILY MENU
========================= */

const dailyMenus = [

    {

        breakfast: {
            name: "Oatmeal + Banana",
            calories: 350
        },

        lunch: {
            name: "Rice + Grilled Chicken + Vegetables",
            calories: 550
        },

        snack: {
            name: "Apple + Yogurt",
            calories: 180
        },

        dinner: {
            name: "Rice + Fish + Vegetables",
            calories: 450
        }

    },


    {

        breakfast: {
            name: "Egg + Whole Wheat Toast",
            calories: 320
        },

        lunch: {
            name: "Rice + Beef + Vegetables",
            calories: 560
        },

        snack: {
            name: "Banana + Milk",
            calories: 200
        },

        dinner: {
            name: "Chicken Soup + Vegetables",
            calories: 400
        }

    },


    {

        breakfast: {
            name: "Greek Yogurt + Fruit",
            calories: 300
        },

        lunch: {
            name: "Rice + Chicken + Salad",
            calories: 500
        },

        snack: {
            name: "Fruit + Nuts",
            calories: 200
        },

        dinner: {
            name: "Fish + Potato + Vegetables",
            calories: 450
        }

    }

];


/* =========================
   GET MENU
========================= */

function getTodayMenu() {

    return getData(
        "cardiofit_menu",
        dailyMenus[0]
    );

}


/* =========================
   GENERATE MENU
========================= */

function generateMenu() {

    const randomIndex =
        Math.floor(
            Math.random() *
            dailyMenus.length
        );


    const menu =
        dailyMenus[randomIndex];


    saveData(
        "cardiofit_menu",
        menu
    );


    renderMeals(menu);

}


/* =========================
   RENDER MEALS
========================= */

function renderMeals(menu) {

    const list =
        document.getElementById(
            "mealList"
        );


    if (!list) {
        return;
    }


    list.innerHTML = "";


    const meals = [

        {
            type: "Breakfast",
            data: menu.breakfast
        },

        {
            type: "Lunch",
            data: menu.lunch
        },

        {
            type: "Snack",
            data: menu.snack
        },

        {
            type: "Dinner",
            data: menu.dinner
        }

    ];


    meals.forEach(
        meal => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "meal-item";


            item.innerHTML = `

                <div>

                    <span>
                        ${meal.type}
                    </span>

                    <strong>
                        ${meal.data.name}
                    </strong>

                </div>

                <div class="meal-calories">
                    ${meal.data.calories} kcal
                </div>

            `;


            list.appendChild(item);

        }
    );

}


/* =========================
   ADD MEAL
========================= */

function addMeal() {

    const name =
        prompt(
            "Meal name:"
        );


    if (!name) {
        return;
    }


    const calories =
        Number(
            prompt(
                "Calories:"
            )
        );


    if (
        !calories ||
        calories <= 0
    ) {

        return;

    }


    const meals =
        getData(
            "cardiofit_meals",
            {}
        );


    const today =
        getTodayKey();


    if (!meals[today]) {

        meals[today] = [];

    }


    meals[today].push({

        name: name,

        calories: calories

    });


    saveData(
        "cardiofit_meals",
        meals
    );


    updateNutritionPage();

    updateDashboard();

}


/* =========================
   CALORIES
========================= */

function getTodayCalories() {

    const meals =
        getData(
            "cardiofit_meals",
            {}
        );


    const today =
        getTodayKey();


    if (!meals[today]) {

        return 0;

    }


    return meals[today]
        .reduce(
            (total, meal) =>
                total +
                Number(meal.calories),
            0
        );

}


/* =========================
   UPDATE PAGE
========================= */

function updateNutritionPage() {

    const calories =
        getTodayCalories();


    document.getElementById(
        "caloriesConsumed"
    ).textContent =
        calories;


    const caloriePercentage =
        Math.min(
            (calories / 1800) * 100,
            100
        );


    document.getElementById(
        "calorieProgress"
    ).style.width =
        `${caloriePercentage}%`;


    /* Water */

    const water =
        getTodayWater();


    document.getElementById(
        "waterCount"
    ).textContent =
        water;


    renderWater();


    /* Menu */

    renderMeals(
        getTodayMenu()
    );

}


/* =========================
   WATER UI
========================= */

function renderWater() {

    const container =
        document.getElementById(
            "waterGlasses"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const water =
        getTodayWater();


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const glass =
            document.createElement(
                "span"
            );


        glass.className =
            "water-glass";


        if (i < water) {

            glass.classList.add(
                "active"
            );

        }


        glass.textContent =
            "💧";


        container.appendChild(
            glass
        );

    }

}
