/* =========================
   CARDIOFIT PROGRESS
========================= */

let weightChart = null;


/* =========================
   UPDATE PAGE
========================= */

function updateProgressPage() {

    const profile =
        getData(
            "cardiofit_profile",
            {}
        );


    document.getElementById(
        "startWeightDisplay"
    ).textContent =
        profile.startWeight
            ? `${profile.startWeight} kg`
            : "-- kg";


    document.getElementById(
        "currentWeightDisplay"
    ).textContent =
        profile.weight
            ? `${profile.weight} kg`
            : "-- kg";


    document.getElementById(
        "targetWeightDisplay"
    ).textContent =
        profile.target
            ? `${profile.target} kg`
            : "-- kg";


    document.getElementById(
        "heightDisplay"
    ).textContent =
        profile.height
            ? `${profile.height} cm`
            : "-- cm";


    document.getElementById(
        "waistDisplay"
    ).textContent =
        profile.waist
            ? `${profile.waist} cm`
            : "-- cm";


    document.getElementById(
        "chestDisplay"
    ).textContent =
        profile.chest
            ? `${profile.chest} cm`
            : "-- cm";


    document.getElementById(
        "hipsDisplay"
    ).textContent =
        profile.hips
            ? `${profile.hips} cm`
            : "-- cm";


    /* BMI */

    const bmi =
        calculateBMI(
            profile.height,
            profile.weight
        );


    document.getElementById(
        "progressBMI"
    ).textContent =
        bmi || "--";


    document.getElementById(
        "progressBMIStatus"
    ).textContent =
        getBMIStatus(bmi);


    /* Streak */

    document.getElementById(
        "streakDisplay"
    ).textContent =
        calculateStreak();


    createWeightChart();

}


/* =========================
   WEIGHT HISTORY
========================= */

function getWeightHistory() {

    return getData(
        "cardiofit_weight_history",
        []
    );

}


function saveWeightEntry(weight) {

    const history =
        getWeightHistory();


    history.push({

        date: getTodayKey(),

        weight: Number(weight)

    });


    saveData(
        "cardiofit_weight_history",
        history
    );

}


/* =========================
   CHART
========================= */

function createWeightChart() {

    const canvas =
        document.getElementById(
            "weightChart"
        );


    if (!canvas) {
        return;
    }


    const history =
        getWeightHistory();


    const profile =
        getData(
            "cardiofit_profile",
            {}
        );


    let labels =
        history.map(
            item => item.date
        );


    let values =
        history.map(
            item => item.weight
        );


    /* If no history yet */

    if (
        values.length === 0 &&
        profile.weight
    ) {

        labels = [
            getTodayKey()
        ];

        values = [
            profile.weight
        ];

    }


    if (weightChart) {

        weightChart.destroy();

    }


    weightChart =
        new Chart(
            canvas,
            {

                type: "line",

                data: {

                    labels: labels,

                    datasets: [

                        {

                            label:
                                "Weight",

                            data:
                                values,

                            borderColor:
                                "#7c3aed",

                            backgroundColor:
                                "rgba(124,58,237,.08)",

                            borderWidth: 3,

                            fill: true,

                            tension: .35,

                            pointRadius: 4

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        }

                    },

                    scales: {

                        y: {

                            beginAtZero: false

                        }

                    }

                }

            }
        );

}


/* =========================
   STREAK
========================= */

function calculateStreak() {

    const history =
        getWorkoutHistory();


    if (!history.length) {
        return 0;
    }


    const dates =
        [
            ...new Set(
                history.map(
                    item => item.date
                )
            )
        ];


    dates.sort(
        (a, b) =>
            new Date(b) -
            new Date(a)
    );


    let streak = 1;


    for (
        let i = 0;
        i < dates.length - 1;
        i++
    ) {

        const current =
            new Date(
                dates[i]
            );


        const previous =
            new Date(
                dates[i + 1]
            );


        const difference =
            (
                current -
                previous
            ) /
            (
                1000 *
                60 *
                60 *
                24
            );


        if (
            difference === 1
        ) {

            streak++;

        }

        else {

            break;

        }

    }


    return streak;

}
