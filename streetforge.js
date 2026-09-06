// ============================================================
// STREETFORGE V1
// GAME CORE
// ============================================================

const STREETFORGE_STORAGE = "streetforgeGame";

const STREETFORGE_DEFAULT = {
    money: 5000,
    xp: 0,
    level: 1,

    highScore: 0,
    bestLevel: 1,
    totalEarned: 0,

    difficulty: "easy",

    selectedVehicle: "nightfall",

    settings: {
        volume: 70,
        muted: false,
        music: true,
        effects: true
    },

    vehicles: {
        nightfall: {
            owned: true,
            upgrades: {
                engine: 0,
                handling: 0,
                brakes: 0,
                acceleration: 0
            }
        },

        streetking: {
            owned: false,
            upgrades: {
                engine: 0,
                handling: 0,
                brakes: 0,
                acceleration: 0
            }
        },

        phantomr: {
            owned: false,
            upgrades: {
                engine: 0,
                handling: 0,
                brakes: 0,
                acceleration: 0
            }
        },

        titanx: {
            owned: false,
            upgrades: {
                engine: 0,
                handling: 0,
                brakes: 0,
                acceleration: 0
            }
        },

        apexrr: {
            owned: false,
            upgrades: {
                engine: 0,
                handling: 0,
                brakes: 0,
                acceleration: 0
            }
        }
    }
};


// ============================================================
// VEHICLES
// ============================================================

const STREETFORGE_VEHICLES = {

    nightfall: {
        id: "nightfall",
        name: "NIGHTFALL",
        type: "Motorcycle",
        price: 0,
        rarity: "Common",

        description:
            "A lightweight street bike built for speed, control and getting started.",

        stats: {
            speed: 72,
            acceleration: 78,
            handling: 84,
            braking: 70
        },

        icon: "🏍️"
    },

    streetking: {
        id: "streetking",
        name: "STREET KING",
        type: "Car",
        price: 7500,
        rarity: "Rare",

        description:
            "A powerful street machine with serious acceleration.",

        stats: {
            speed: 82,
            acceleration: 85,
            handling: 68,
            braking: 76
        },

        icon: "🏎️"
    },

    phantomr: {
        id: "phantomr",
        name: "PHANTOM R",
        type: "Motorcycle",
        price: 12000,
        rarity: "Rare",

        description:
            "A precision superbike designed for aggressive cornering.",

        stats: {
            speed: 91,
            acceleration: 93,
            handling: 88,
            braking: 82
        },

        icon: "🏍️"
    },

    titanx: {
        id: "titanx",
        name: "TITAN X",
        type: "Car",
        price: 18000,
        rarity: "Epic",

        description:
            "Heavy, brutal and extremely fast. The Titan X owns the road.",

        stats: {
            speed: 95,
            acceleration: 89,
            handling: 74,
            braking: 86
        },

        icon: "🚘"
    },

    apexrr: {
        id: "apexrr",
        name: "APEX RR",
        type: "Motorcycle",
        price: 30000,
        rarity: "Legendary",

        description:
            "The ultimate street weapon. Extremely fast and incredibly rare.",

        stats: {
            speed: 99,
            acceleration: 98,
            handling: 96,
            braking: 94
        },

        icon: "🏍️"
    }
};


// ============================================================
// LEVELS
// ============================================================

const STREETFORGE_LEVELS = [

    {
        id: 1,
        name: "FIRST RUN",
        location: "Industrial District",
        requirement: 0,
        reward: 500,
        xp: 100
    },

    {
        id: 2,
        name: "NIGHT SHIFT",
        location: "Downtown",
        requirement: 2,
        reward: 750,
        xp: 150
    },

    {
        id: 3,
        name: "NEON RUN",
        location: "Neon District",
        requirement: 4,
        reward: 1000,
        xp: 200
    },

    {
        id: 4,
        name: "HIGHWAY HUNT",
        location: "Outer Highway",
        requirement: 6,
        reward: 1400,
        xp: 275
    },

    {
        id: 5,
        name: "CITY LIMITS",
        location: "Central City",
        requirement: 8,
        reward: 2000,
        xp: 350
    },

    {
        id: 6,
        name: "BLACKOUT",
        location: "Underground",
        requirement: 10,
        reward: 2750,
        xp: 450
    },

    {
        id: 7,
        name: "REDLINE",
        location: "Mountain Pass",
        requirement: 12,
        reward: 3500,
        xp: 550
    },

    {
        id: 8,
        name: "FINAL CIRCUIT",
        location: "Streetforge Circuit",
        requirement: 15,
        reward: 5000,
        xp: 750
    }
];


// ============================================================
// DIFFICULTIES
// ============================================================

const STREETFORGE_DIFFICULTIES = {

    easy: {
        name: "EASY",
        multiplier: 0.8,
        rewardMultiplier: 0.8,
        description: "Relaxed traffic and forgiving gameplay."
    },

    normal: {
        name: "NORMAL",
        multiplier: 1,
        rewardMultiplier: 1,
        description: "The standard Streetforge experience."
    },

    hard: {
        name: "HARD",
        multiplier: 1.35,
        rewardMultiplier: 1.35,
        description: "Faster traffic and much less room for mistakes."
    },

    extreme: {
        name: "EXTREME",
        multiplier: 1.8,
        rewardMultiplier: 1.8,
        description: "Only the best drivers survive."
    }
};


// ============================================================
// GAME STATE
// ============================================================

let streetforgeGame = loadStreetforgeGame();


// ============================================================
// LOAD / SAVE
// ============================================================

function loadStreetforgeGame() {

    try {

        const saved =
            localStorage.getItem(STREETFORGE_STORAGE);

        if (!saved) {

            const fresh =
                JSON.parse(JSON.stringify(STREETFORGE_DEFAULT));

            localStorage.setItem(
                STREETFORGE_STORAGE,
                JSON.stringify(fresh)
            );

            return fresh;
        }

        const parsed = JSON.parse(saved);

        return mergeStreetforgeData(
            STREETFORGE_DEFAULT,
            parsed
        );

    } catch (error) {

        console.error(
            "Streetforge save could not be loaded:",
            error
        );

        return JSON.parse(
            JSON.stringify(STREETFORGE_DEFAULT)
        );
    }
}


function mergeStreetforgeData(defaults, saved) {

    const result = {
        ...defaults,
        ...saved
    };

    result.settings = {
        ...defaults.settings,
        ...(saved.settings || {})
    };

    result.vehicles = {
        ...defaults.vehicles,
        ...(saved.vehicles || {})
    };

    Object.keys(defaults.vehicles).forEach(vehicleId => {

        result.vehicles[vehicleId] = {

            ...defaults.vehicles[vehicleId],

            ...(saved.vehicles?.[vehicleId] || {}),

            upgrades: {
                ...defaults.vehicles[vehicleId].upgrades,
                ...(saved.vehicles?.[vehicleId]?.upgrades || {})
            }
        };

    });

    return result;
}


function saveStreetforgeGame() {

    try {

        localStorage.setItem(
            STREETFORGE_STORAGE,
            JSON.stringify(streetforgeGame)
        );

    } catch (error) {

        console.error(
            "Streetforge save failed:",
            error
        );
    }
}


// ============================================================
// MONEY
// ============================================================

function streetforgeGetMoney() {

    return streetforgeGame.money;
}


function streetforgeAddMoney(amount) {

    streetforgeGame.money += amount;

    streetforgeGame.totalEarned += amount;

    saveStreetforgeGame();

    streetforgeRefreshUI();
}


function streetforgeSpendMoney(amount) {

    if (streetforgeGame.money < amount) {

        streetforgeNotify(
            "Not enough money.",
            "error"
        );

        return false;
    }

    streetforgeGame.money -= amount;

    saveStreetforgeGame();

    streetforgeRefreshUI();

    return true;
}


// ============================================================
// XP / LEVEL
// ============================================================

function streetforgeXPNeeded() {

    return streetforgeGame.level * 500;
}


function streetforgeAddXP(amount) {

    streetforgeGame.xp += amount;

    let leveledUp = false;

    while (
        streetforgeGame.xp >= streetforgeXPNeeded()
    ) {

        streetforgeGame.xp -= streetforgeXPNeeded();

        streetforgeGame.level++;

        leveledUp = true;

        if (
            streetforgeGame.level >
            streetforgeGame.bestLevel
        ) {

            streetforgeGame.bestLevel =
                streetforgeGame.level;
        }

    }

    if (leveledUp) {

        streetforgeNotify(
            `LEVEL UP! You are now Level ${streetforgeGame.level}.`,
            "success"
        );
    }

    saveStreetforgeGame();

    streetforgeRefreshUI();
}


function streetforgeGetXPProgress() {

    const needed = streetforgeXPNeeded();

    return Math.min(
        100,
        Math.round(
            (streetforgeGame.xp / needed) * 100
        )
    );
}


// ============================================================
// VEHICLES
// ============================================================

function streetforgeGetVehicle(id) {

    return STREETFORGE_VEHICLES[id] || null;
}


function streetforgeOwnsVehicle(id) {

    return !!streetforgeGame.vehicles[id]?.owned;
}


function streetforgeBuyVehicle(id) {

    const vehicle =
        streetforgeGetVehicle(id);

    if (!vehicle) return;

    if (streetforgeOwnsVehicle(id)) {

        streetforgeSelectVehicle(id);

        return;
    }

    if (
        streetforgeGame.level <
        streetforgeVehicleLevelRequirement(id)
    ) {

        streetforgeNotify(
            `Reach Level ${streetforgeVehicleLevelRequirement(id)} first.`,
            "error"
        );

        return;
    }

    if (
        !streetforgeSpendMoney(vehicle.price)
    ) {

        return;
    }

    streetforgeGame.vehicles[id].owned = true;

    streetforgeGame.selectedVehicle = id;

    saveStreetforgeGame();

    streetforgeNotify(
        `${vehicle.name} purchased!`,
        "success"
    );

    streetforgeRefreshUI();
}


function streetforgeSelectVehicle(id) {

    if (!streetforgeOwnsVehicle(id)) {

        streetforgeNotify(
            "You don't own this vehicle yet.",
            "error"
        );

        return;
    }

    streetforgeGame.selectedVehicle = id;

    saveStreetforgeGame();

    streetforgeRefreshUI();
}


function streetforgeVehicleLevelRequirement(id) {

    const requirements = {

        nightfall: 1,

        streetking: 2,

        phantomr: 4,

        titanx: 7,

        apexrr: 12
    };

    return requirements[id] || 1;
}


function streetforgeGetSelectedVehicle() {

    return streetforgeGetVehicle(
        streetforgeGame.selectedVehicle
    );
}


// ============================================================
// VEHICLE STATS WITH UPGRADES
// ============================================================

function streetforgeGetVehicleStats(id) {

    const vehicle =
        streetforgeGetVehicle(id);

    if (!vehicle) return null;

    const saved =
        streetforgeGame.vehicles[id];

    const upgrades =
        saved?.upgrades || {};

    return {

        speed: Math.min(
            100,
            vehicle.stats.speed +
            upgrades.engine * 3
        ),

        acceleration: Math.min(
            100,
            vehicle.stats.acceleration +
            upgrades.acceleration * 3
        ),

        handling: Math.min(
            100,
            vehicle.stats.handling +
            upgrades.handling * 3
        ),

        braking: Math.min(
            100,
            vehicle.stats.braking +
            upgrades.brakes * 3
        )
    };
}


// ============================================================
// UPGRADES
// ============================================================

function streetforgeUpgradeCost(type) {

    const vehicle =
        streetforgeGame.vehicles[
            streetforgeGame.selectedVehicle
        ];

    const currentLevel =
        vehicle?.upgrades?.[type] || 0;

    return 750 + currentLevel * 750;
}


function streetforgeUpgrade(type) {

    const validTypes = [
        "engine",
        "handling",
        "brakes",
        "acceleration"
    ];

    if (!validTypes.includes(type)) return;

    const vehicle =
        streetforgeGame.vehicles[
            streetforgeGame.selectedVehicle
        ];

    if (!vehicle) return;

    const current =
        vehicle.upgrades[type] || 0;

    if (current >= 5) {

        streetforgeNotify(
            "This upgrade is already maxed.",
            "error"
        );

        return;
    }

    const cost =
        streetforgeUpgradeCost(type);

    if (!streetforgeSpendMoney(cost)) {

        return;
    }

    vehicle.upgrades[type] =
        current + 1;

    saveStreetforgeGame();

    streetforgeNotify(
        `${streetforgeUpgradeName(type)} upgraded!`,
        "success"
    );

    streetforgeRefreshUI();
}


function streetforgeUpgradeName(type) {

    const names = {

        engine: "Engine",

        handling: "Handling",

        brakes: "Brakes",

        acceleration: "Acceleration"
    };

    return names[type] || type;
}


// ============================================================
// DIFFICULTY
// ============================================================

function streetforgeSetDifficulty(difficulty) {

    if (!STREETFORGE_DIFFICULTIES[difficulty]) {
        return;
    }

    streetforgeGame.difficulty =
        difficulty;

    saveStreetforgeGame();

    streetforgeRefreshUI();
}


function streetforgeGetDifficulty() {

    return STREETFORGE_DIFFICULTIES[
        streetforgeGame.difficulty
    ];
}


// ============================================================
// LEVELS
// ============================================================

function streetforgeIsLevelUnlocked(levelId) {

    const level =
        STREETFORGE_LEVELS.find(
            item => item.id === levelId
        );

    if (!level) return false;

    return (
        streetforgeGame.bestLevel >=
        level.requirement
    );
}


function streetforgeGetLevel(levelId) {

    return STREETFORGE_LEVELS.find(
        level => level.id === levelId
    );
}


// ============================================================
// PLAY LEVEL
// ============================================================

function streetforgePlayLevel(levelId) {

    const level =
        streetforgeGetLevel(levelId);

    if (!level) return;

    if (!streetforgeIsLevelUnlocked(levelId)) {

        streetforgeNotify(
            "This level is locked.",
            "error"
        );

        return;
    }

    const vehicle =
        streetforgeGetSelectedVehicle();

    if (!vehicle) return;

    const difficulty =
        streetforgeGetDifficulty();

    /*
        TEMPORARY V1 SCORE SYSTEM

        The actual driving system will replace
        this later when we build the road/gameplay.
    */

    const stats =
        streetforgeGetVehicleStats(vehicle.id);

    const average =
        (
            stats.speed +
            stats.acceleration +
            stats.handling +
            stats.braking
        ) / 4;

    const randomBonus =
        Math.floor(
            Math.random() * 500
        );

    const baseScore =
        Math.floor(
            average * 100 +
            level.id * 250 +
            randomBonus
        );

    const score =
        Math.floor(
            baseScore *
            difficulty.multiplier
        );

    const reward =
        Math.floor(
            level.reward *
            difficulty.rewardMultiplier
        );

    streetforgeFinishLevel(
        level,
        score,
        reward
    );
}


function streetforgeFinishLevel(
    level,
    score,
    reward
) {

    if (score > streetforgeGame.highScore) {

        streetforgeGame.highScore =
            score;

        streetforgeNotify(
            `NEW HIGH SCORE: ${score.toLocaleString()}`,
            "success"
        );
    }

    if (
        level.id + 1 >
        streetforgeGame.bestLevel
    ) {

        streetforgeGame.bestLevel =
            Math.min(
                level.id + 1,
                STREETFORGE_LEVELS.length
            );
    }

    streetforgeAddMoney(reward);

    streetforgeAddXP(level.xp);

    saveStreetforgeGame();

    streetforgeShowResult({
        level: level.name,
        score: score,
        reward: reward,
        xp: level.xp
    });
}


// ============================================================
// RESULT SCREEN
// ============================================================

function streetforgeShowResult(result) {

    const event =
        new CustomEvent(
            "streetforgeResult",
            {
                detail: result
            }
        );

    document.dispatchEvent(event);

    streetforgeRefreshUI();
}


// ============================================================
// RESET
// ============================================================

function streetforgeResetGame() {

    const confirmed =
        confirm(
            "Reset ALL Streetforge progress?\n\nThis cannot be undone."
        );

    if (!confirmed) return;

    streetforgeGame =
        JSON.parse(
            JSON.stringify(STREETFORGE_DEFAULT)
        );

    saveStreetforgeGame();

    streetforgeNotify(
        "Streetforge progress reset.",
        "success"
    );

    streetforgeRefreshUI();
}


// ============================================================
// SETTINGS
// ============================================================

function streetforgeSetVolume(value) {

    let volume =
        Number(value);

    if (Number.isNaN(volume)) {
        volume = 70;
    }

    volume =
        Math.max(
            0,
            Math.min(
                100,
                volume
            )
        );

    streetforgeGame.settings.volume =
        volume;

    saveStreetforgeGame();

    streetforgeRefreshUI();
}


function streetforgeToggleMute() {

    streetforgeGame.settings.muted =
        !streetforgeGame.settings.muted;

    saveStreetforgeGame();

    streetforgeRefreshUI();
}


function streetforgeToggleMusic() {

    streetforgeGame.settings.music =
        !streetforgeGame.settings.music;

    saveStreetforgeGame();

    streetforgeRefreshUI();
}


function streetforgeToggleEffects() {

    streetforgeGame.settings.effects =
        !streetforgeGame.settings.effects;

    saveStreetforgeGame();

    streetforgeRefreshUI();
}


// ============================================================
// NOTIFICATIONS
// ============================================================

function streetforgeNotify(
    message,
    type = "normal"
) {

    const event =
        new CustomEvent(
            "streetforgeNotification",
            {
                detail: {
                    message,
                    type
                }
            }
        );

    document.dispatchEvent(event);

    console.log(
        `[STREETFORGE] ${message}`
    );
}


// ============================================================
// UI REFRESH EVENT
// ============================================================

function streetforgeRefreshUI() {

    const event =
        new CustomEvent(
            "streetforgeRefresh",
            {
                detail: streetforgeGame
            }
        );

    document.dispatchEvent(event);
}


// ============================================================
// GAME DATA ACCESS
// ============================================================

function streetforgeGetGameData() {

    return streetforgeGame;
}


// ============================================================
// DEBUG / DEVELOPMENT
// ============================================================

function streetforgeDebug() {

    console.log(
        "========== STREETFORGE =========="
    );

    console.log(
        "Game:",
        streetforgeGame
    );

    console.log(
        "Selected Vehicle:",
        streetforgeGetSelectedVehicle()
    );

    console.log(
        "Difficulty:",
        streetforgeGetDifficulty()
    );

    console.log(
        "================================="
    );
}


// ============================================================
// INITIALIZE
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        streetforgeGame =
            loadStreetforgeGame();

        streetforgeRefreshUI();

        console.log(
            "STREETFORGE V1 loaded."
        );
    }
);
