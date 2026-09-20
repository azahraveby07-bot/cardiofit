/* =========================
   CARDIOFIT WORKOUT ENGINE
========================= */


/* =========================
   30 MIN WALKING WORKOUT
========================= */

const walkingWorkout = [

    {
        name: "Walk in Place",
        duration: 40
    },

    {
        name: "Arm Lift + High Knee",
        duration: 40
    },

    {
        name: "Punch & Step",
        duration: 40
    },

    {
        name: "Side to Side",
        duration: 40
    },

    {
        name: "Front Ankle Tap",
        duration: 40
    },

    {
        name: "Back Ankle Tap",
        duration: 40
    },

    {
        name: "Standing Bicycle",
        duration: 40
    },

    {
        name: "Arm Push Up",
        duration: 40
    },

    {
        name: "Square Crab Walk",
        duration: 40
    },

    {
        name: "High Knee Tap",
        duration: 40
    },

    {
        name: "Sky Reach Kickback",
        duration: 40
    },

    {
        name: "Punch Down",
        duration: 40
    },

    {
        name: "Sidestep Jack",
        duration: 40
    },

    {
        name: "Quick Walk",
        duration: 40
    },

    {
        name: "Leg 3-Ways",
        duration: 40
    },

    {
        name: "Basic Walk",
        duration: 40
    },

    {
        name: "Standing Twist",
        duration: 40
    },

    {
        name: "Scissors & Cross",
        duration: 40
    },

    {
        name: "Skipping",
        duration: 40
    },

    {
        name: "March + Opposite Arm",
        duration: 40
    },

    {
        name: "Side Punch",
        duration: 40
    },

    {
        name: "Knee Tap",
        duration: 40
    },

    {
        name: "Knee Tap - Other Side",
        duration: 40
    },

    {
        name: "Swim + Leg Circle",
        duration: 40
    },

    {
        name: "Crab Walk + Heel Raise",
        duration: 40
    },

    {
        name: "Knee Raise + Clap",
        duration: 40
    },

    {
        name: "Walking Clap",
        duration: 40
    },

    {
        name: "Pull + Step Back",
        duration: 40
    },

    {
        name: "Wide Quick Squat",
        duration: 40
    },

    {
        name: "Quick Jog",
        duration: 40
    }

];


/* =========================
   OTHER WORKOUTS
========================= */

const beginnerWorkout = [

    {
        name: "Walk in Place",
        duration: 40
    },

    {
        name: "Side Step",
        duration: 40
    },

    {
        name: "Arm Reach",
        duration: 40
    },

    {
        name: "Light Knee Raise",
        duration: 40
    },

    {
        name: "Step Touch",
        duration: 40
    },

    {
        name: "March",
        duration: 40
    },

    {
        name: "Front Tap",
        duration: 40
    },

    {
        name: "Side Tap",
        duration: 40
    },

    {
        name: "Arm Circle",
        duration: 40
    },

    {
        name: "Easy Walk",
        duration: 40
    }

];


const fatBurnWorkout = [

    {
        name: "Quick March",
        duration: 40
    },

    {
        name: "High Knee",
        duration: 40
    },

    {
        name: "Punch & Step",
        duration: 40
    },

    {
        name: "Side Jack",
        duration: 40
    },

    {
        name: "Squat & Reach",
        duration: 40
    },

    {
        name: "Knee Drive",
        duration: 40
    },

    {
        name: "Fast Punch",
        duration: 40
    },

    {
        name: "Side Kick",
        duration: 40
    },

    {
        name: "Mountain Step",
        duration: 40
    },

    {
        name: "Quick Jog",
        duration: 40

    }

];


const fullBodyWorkout = [

    {
        name: "March + Arms",
        duration: 40
    },

    {
        name: "Squat + Reach",
        duration: 40
    },

    {
        name: "High Knee",
        duration: 40
    },

    {
        name: "Punch",
        duration: 40
    },

    {
        name: "Side Step",
        duration: 40
    },

    {
        name: "Knee Drive",
        duration: 40
    },

    {
        name: "Standing Crunch",
        duration: 40
    },

    {
        name: "Jack Step",
        duration: 40
    },

    {
        name: "Quick Jog",
        duration: 40

    },

    {
        name: "Final Squat",
        duration: 40
    }

];


/* =========================
   WORKOUT STATE
========================= */

let currentWorkout = [];

let currentWorkoutType = "";

let currentExerciseIndex = 0;

let remainingTime = 40;

let timerInterval = null;

let isPaused = false;

let isResting = false;

let completedExercises = 0;


/* =========================
   START WORKOUT
========================= */

function startWorkout(type) {

    if (type === "walking") {

        currentWorkout =
            walkingWorkout;

        currentWorkoutType =
            "30 MIN WALKING";

    }

    else if (type === "beginner") {

        currentWorkout =
            beginnerWorkout;

        currentWorkoutType =
            "BEGINNER CARDIO";

    }

    else if (type === "fatburn") {

        currentWorkout =
            fatBurnWorkout;

        currentWorkoutType =
            "FAT BURN CARDIO";

    }

    else if (type === "fullbody") {

        currentWorkout =
            fullBodyWorkout;

        currentWorkoutType =
            "FULL BODY CARDIO";

    }


    currentExerciseIndex = 0;

    completedExercises = 0;

    isPaused = false;

    isResting = false;


    const player =
        document.getElementById(
            "workoutPlayer"
        );


    player.classList.remove("hidden");


    document.getElementById(
        "playerProgram"
    ).textContent =
        currentWorkoutType;


    loadExercise();

}


/* =========================
   RECOMMENDED
========================= */

function startRecommendedWorkout() {

    showPage("workout");

    startWorkout("walking");

}


/* =========================
   LOAD EXERCISE
========================= */

function loadExercise() {

    clearInterval(timerInterval);

    isResting = false;

    const exercise =
        currentWorkout[
            currentExerciseIndex
        ];


    if (!exercise) {

        finishWorkout();

        return;

    }


    remainingTime =
        exercise.duration;


    document.getElementById(
        "timerType"
    ).textContent =
        "EXERCISE";


    document.getElementById(
        "exerciseName"
    ).textContent =
        exercise.name;


    document.getElementById(
        "exerciseNumber"
    ).textContent =
        `${currentExerciseIndex + 1} / ${currentWorkout.length}`;


    const next =
        currentWorkout[
            currentExerciseIndex + 1
        ];


    document.getElementById(
        "nextExercise"
    ).textContent =
        next
            ? next.name
            : "Workout Complete";


    updateTimerDisplay();


    timerInterval =
        setInterval(
            countdown,
            1000
        );

}


/* =========================
   TIMER
========================= */

function countdown() {

    if (isPaused) {
        return;
    }


    remainingTime--;


    updateTimerDisplay();


    if (remainingTime <= 0) {

        clearInterval(timerInterval);


        completedExercises++;


        /* 15 sec rest */

        if (
            currentExerciseIndex <
            currentWorkout.length - 1
        ) {

            startRest();

        }

        else {

            finishWorkout();

        }

    }

}


/* =========================
   REST
========================= */

function startRest() {

    isResting = true;

    remainingTime = 15;


    document.getElementById(
        "timerType"
    ).textContent =
        "REST";


    document.getElementById(
        "exerciseName"
    ).textContent =
        "Take a breath";


    document.getElementById(
        "nextExercise"
    ).textContent =
        currentWorkout[
            currentExerciseIndex + 1
        ].name;


    updateTimerDisplay();


    timerInterval =
        setInterval(
            restCountdown,
            1000
        );

}


function restCountdown() {

    if (isPaused) {
        return;
    }


    remainingTime--;


    updateTimerDisplay();


    if (remainingTime <= 0) {

        clearInterval(timerInterval);


        currentExerciseIndex++;

        loadExercise();

    }

}


/* =========================
   DISPLAY
========================= */

function updateTimerDisplay() {

    document.getElementById(
        "timer"
    ).textContent =
        remainingTime;


    const exercise =
        currentWorkout[
            currentExerciseIndex
        ];


    if (!exercise) {
        return;
    }


    const total =
        exercise.duration;


    const progress =
        ((total - remainingTime) / total) * 100;


    document.getElementById(
        "exerciseProgress"
    ).style.width =
        `${progress}%`;

}


/* =========================
   PAUSE
========================= */

function togglePause() {

    isPaused =
        !isPaused;


    document.getElementById(
        "pauseButton"
    ).textContent =
        isPaused
            ? "▶"
            : "❚❚";

}


/* =========================
   NEXT
========================= */

function nextExercise() {

    clearInterval(timerInterval);


    currentExerciseIndex++;


    if (
        currentExerciseIndex >=
        currentWorkout.length
    ) {

        finishWorkout();

        return;

    }


    loadExercise();

}


/* =========================
   PREVIOUS
========================= */

function previousExercise() {

    clearInterval(timerInterval);


    if (
        currentExerciseIndex > 0
    ) {

        currentExerciseIndex--;

    }


    loadExercise();

}


/* =========================
   FINISH
========================= */

function finishWorkout() {

    clearInterval(timerInterval);


    const type =
        currentWorkoutType;


    let minutes = 10;

    let calories = 80;


    if (
        type === "30 MIN WALKING"
    ) {

        minutes = 30;
        calories = 220;

    }

    else if (
        type === "FAT BURN CARDIO"
    ) {

        minutes = 20;
        calories = 160;

    }

    else if (
        type === "FULL BODY CARDIO"
    ) {

        minutes = 30;
        calories = 250;

    }


    const history =
        getData(
            "cardiofit_workouts",
            []
        );


    history.push({

        date: getTodayKey(),

        type: type,

        minutes: minutes,

        calories: calories

    });


    saveData(
        "cardiofit_workouts",
        history
    );


    alert(
        `Workout Complete!\n\n${minutes} minutes\n🔥 ~${calories} kcal`
    );


    closeWorkout();


    updateDashboard();


    if (
        typeof updateProgressPage ===
        "function"
    ) {

        updateProgressPage();

    }

}


/* =========================
   CLOSE
========================= */

function closeWorkout() {

    clearInterval(timerInterval);


    document
        .getElementById(
            "workoutPlayer"
        )
        .classList.add("hidden");

}


/* =========================
   VIDEO
========================= */

function openVideo() {

    document
        .getElementById(
            "videoModal"
        )
        .classList.remove("hidden");

}


function closeVideo() {

    document
        .getElementById(
            "videoModal"
        )
        .classList.add("hidden");

}
