/* =========================
   CARDIOFIT APP
========================= */


/* =========================
   PAGE NAVIGATION
========================= */

function showPage(pageId, button = null) {

    document.querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active-page");
        });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active-page");
    }


    document.querySelectorAll(".nav-item")
        .forEach(item => {
            item.classList.remove("active");
        });


    if (button) {
        button.classList.add("active");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    closeSidebar();


    if (pageId === "progress") {

        if (typeof updateProgressPage === "function") {
            updateProgressPage();
        }

    }


    if (pageId === "nutrition") {

        if (typeof updateNutritionPage === "function") {
            updateNutritionPage();
        }

    }

}


/* =========================
   MOBILE SIDEBAR
========================= */

function toggleSidebar() {

    const sidebar =
        document.querySelector(".sidebar");

    sidebar.classList.toggle("open");
}


function closeSidebar() {

    const sidebar =
        document.querySelector(".sidebar");

    sidebar.classList.remove("open");
}


/* =========================
   STORAGE
========================= */

function getData(key, defaultValue = null) {

    const data =
        localStorage.getItem(key);

    if (!data) {
        return defaultValue;
    }

    try {

        return JSON.parse(data);

    } catch {

        return defaultValue;

    }

}


function saveData(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


/* =========================
   PROFILE
========================= */

function editProfile() {

    const profile =
        getData("cardiofit_profile", {});


    document.getElementById("profileName").value =
        profile.name || "";

    document.getElementById("profileHeight").value =
        profile.height || "";

    document.getElementById("profileStartWeight").value =
        profile.startWeight || "";

    document.getElementById("profileWeight").value =
        profile.weight || "";

    document.getElementById("profileTarget").value =
        profile.target || "";

    document.getElementById("profileWaist").value =
        profile.waist || "";

    document.getElementById("profileChest").value =
        profile.chest || "";

    document.getElementById("profileHips").value =
        profile.hips || "";


    document
        .getElementById("profileModal")
        .classList.remove("hidden");
}


function closeProfile() {

    document
        .getElementById("profileModal")
        .classList.add("hidden");

}


function saveProfile() {

    const profile = {

        name:
            document.getElementById("profileName").value,

        height:
            Number(
                document.getElementById("profileHeight").value
            ),

        startWeight:
            Number(
                document.getElementById("profileStartWeight").value
            ),

        weight:
            Number(
                document.getElementById("profileWeight").value
            ),

        target:
            Number(
                document.getElementById("profileTarget").value
            ),

        waist:
            Number(
                document.getElementById("profileWaist").value
            ),

        chest:
            Number(
                document.getElementById("profileChest").value
            ),

        hips:
            Number(
                document.getElementById("profileHips").value
            )

    };


    saveData(
        "cardiofit_profile",
        profile
    );


    closeProfile();

    updateDashboard();

    updateProgressPage();

}


/* =========================
   BMI
========================= */

function calculateBMI(height, weight) {

    if (!height || !weight) {
        return null;
    }


    const heightMeter =
        height / 100;


    return (
        weight /
        (heightMeter * heightMeter)
    ).toFixed(1);

}


function getBMIStatus(bmi) {

    if (!bmi) {
        return "Add your profile";
    }


    bmi = Number(bmi);


    if (bmi < 18.5) {
        return "Below normal range";
    }

    if (bmi < 25) {
        return "Normal range";
    }

    if (bmi < 30) {
        return "Above normal range";
    }

    return "High range";
}


/* =========================
   WATER
========================= */

function getTodayKey() {

    return new Date()
        .toISOString()
        .split("T")[0];

}


function addWater() {

    const data =
        getData(
            "cardiofit_water",
            {}
        );


    const today =
        getTodayKey();


    data[today] =
        Math.min(
            (data[today] || 0) + 1,
            8
        );


    saveData(
        "cardiofit_water",
        data
    );


    updateDashboard();

    updateNutritionPage();

}


function getTodayWater() {

    const data =
        getData(
            "cardiofit_water",
            {}
        );


    return data[getTodayKey()] || 0;

}


/* =========================
   WORKOUT STATS
========================= */

function getWorkoutHistory() {

    return getData(
        "cardiofit_workouts",
        []
    );

}


function getWorkoutMinutesToday() {

    const today =
        getTodayKey();


    const history =
        getWorkoutHistory();


    return history
        .filter(item => item.date === today)
        .reduce(
            (total, item) =>
                total + item.minutes,
            0
        );

}


/* =========================
   DASHBOARD
========================= */

function updateDashboard() {

    const profile =
        getData(
            "cardiofit_profile",
            {}
        );


    const currentWeight =
        profile.weight || 0;

    const targetWeight =
        profile.target || 0;


    document.getElementById(
        "dashboardWeight"
    ).textContent =
        currentWeight
            ? `${currentWeight} kg`
            : "-- kg";


    document.getElementById(
        "dashboardTarget"
    ).textContent =
        targetWeight
            ? `${targetWeight} kg`
            : "-- kg";


    /* Progress */

    let progress = 0;


    if (
        profile.startWeight &&
        profile.weight &&
        profile.target
    ) {

        const total =
            profile.startWeight -
            profile.target;


        const completed =
            profile.startWeight -
            profile.weight;


        progress =
            (completed / total) * 100;


        progress =
            Math.max(
                0,
                Math.min(
                    100,
                    progress
                )
            );

    }


    document.getElementById(
        "weightProgress"
    ).style.width =
        `${progress}%`;


    document.getElementById(
        "progressPercent"
    ).textContent =
        `${Math.round(progress)}%`;


    /* BMI */

    const bmi =
        calculateBMI(
            profile.height,
            profile.weight
        );


    document.getElementById(
        "dashboardBMI"
    ).textContent =
        bmi || "--";


    document.getElementById(
        "bmiStatus"
    ).textContent =
        getBMIStatus(bmi);


    /* Workout */

    const history =
        getWorkoutHistory();


    document.getElementById(
        "dashboardWorkoutCount"
    ).textContent =
        history.length;


    document.getElementById(
        "todayWorkout"
    ).textContent =
        `${getWorkoutMinutesToday()} min`;


    /* Water */

    document.getElementById(
        "todayWater"
    ).textContent =
        `${getTodayWater()} / 8`;


    /* Calories */

    const calories =
        getTodayCalories();


    document.getElementById(
        "todayCalories"
    ).textContent =
        `${calories} kcal`;

}


/* =========================
   INITIALIZATION
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateDashboard();

        if (
            typeof updateProgressPage ===
            "function"
        ) {

            updateProgressPage();

        }


        if (
            typeof updateNutritionPage ===
            "function"
        ) {

            updateNutritionPage();

        }


        const profile =
            getData(
                "cardiofit_profile",
                null
            );


        if (!profile) {

            setTimeout(
                () => {

                    editProfile();

                },
                700
            );

        }

    }
);
