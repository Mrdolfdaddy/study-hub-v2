(function () {
    "use strict";

    /* =========================================================
       STREETFORGE HOME SCREEN v2
       ========================================================= */

    /* ---------- FONT ---------- */

    if (!document.getElementById("sfCyberFont")) {
        const font = document.createElement("link");
        font.id = "sfCyberFont";
        font.rel = "stylesheet";
        font.href =
            "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap";

        document.head.appendChild(font);
    }

    /* ---------- STYLES ---------- */

    if (!document.getElementById("sfHomeV2CSS")) {

        const style = document.createElement("style");
        style.id = "sfHomeV2CSS";

        style.textContent = `

        /* =====================================================
           HOME ROOT
           ===================================================== */

        #sfMenu {
            position: relative !important;
            overflow: hidden !important;
            padding: 0 !important;
            min-height: calc(100vh - 90px) !important;
            background: #070913 !important;
        }

        /* Remove old home elements */
        #sfMenu > .sf-hero,
        #sfMenu > .sf-menu-grid,
        #sfMenu > .sf-home-world {
            display: none !important;
        }

        .sf-v2-home {
            position: absolute;
            inset: 0;
            overflow: hidden;
            background:
                linear-gradient(
                    180deg,
                    #11182b 0%,
                    #111a2b 28%,
                    #172033 52%,
                    #10151e 72%,
                    #080b11 100%
                );
        }

        /* =====================================================
           SKY
           ===================================================== */

        .sf-v2-sky {
            position: absolute;
            inset: 0;
            background:
                radial-gradient(
                    ellipse at 50% 25%,
                    rgba(111, 74, 180, .30),
                    transparent 38%
                ),
                radial-gradient(
                    ellipse at 20% 35%,
                    rgba(34, 211, 238, .12),
                    transparent 30%
                ),
                radial-gradient(
                    ellipse at 80% 40%,
                    rgba(139, 92, 246, .13),
                    transparent 35%
                );
        }

        /* =====================================================
           MOON
           ===================================================== */

        .sf-v2-moon {
            position: absolute;
            width: 120px;
            height: 120px;
            right: 13%;
            top: 11%;
            border-radius: 50%;

            background:
                radial-gradient(
                    circle at 35% 35%,
                    #ffffff,
                    #d9dcff 38%,
                    #a5a9d8 58%,
                    rgba(139,92,246,.4) 72%,
                    transparent 73%
                );

            box-shadow:
                0 0 35px rgba(255,255,255,.18),
                0 0 90px rgba(139,92,246,.22);

            opacity: .9;
        }

        /* =====================================================
           STARS
           ===================================================== */

        .sf-v2-stars {
            position: absolute;
            inset: 0;

            background-image:
                radial-gradient(
                    circle,
                    rgba(255,255,255,.75) 1px,
                    transparent 1.5px
                ),
                radial-gradient(
                    circle,
                    rgba(167,139,250,.5) 1px,
                    transparent 1.5px
                );

            background-size:
                110px 110px,
                190px 190px;

            animation:
                sfStarsDrift
                40s
                linear
                infinite;

            opacity: .45;
        }

        @keyframes sfStarsDrift {
            from {
                background-position:
                    0 0,
                    0 0;
            }

            to {
                background-position:
                    110px 110px,
                    -190px 190px;
            }
        }

        /* =====================================================
           REDWOOD FOREST
           ===================================================== */

        .sf-v2-forest {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 29%;
            height: 54%;
        }

        .sf-v2-tree {
            position: absolute;
            bottom: 0;
            width: 70px;
            height: 100%;
            background:
                linear-gradient(
                    90deg,
                    transparent 0 30%,
                    #10151b 31% 69%,
                    transparent 70%
                );
        }

        .sf-v2-tree::before {
            content: "";
            position: absolute;
            left: 50%;
            bottom: 25%;
            transform: translateX(-50%);

            width: 230px;
            height: 300px;

            background:
                linear-gradient(
                    155deg,
                    transparent 42%,
                    #10161c 43% 57%,
                    transparent 58%
                );

            clip-path: polygon(
                50% 0,
                70% 23%,
                58% 22%,
                88% 45%,
                67% 43%,
                100% 73%,
                70% 68%,
                83% 100%,
                17% 100%,
                30% 68%,
                0 73%,
                33% 43%,
                12% 45%,
                42% 22%,
                30% 23%
            );
        }

        .sf-v2-tree:nth-child(1) {
            left: -3%;
            transform: scale(1.25);
        }

        .sf-v2-tree:nth-child(2) {
            left: 7%;
            transform: scale(.8);
        }

        .sf-v2-tree:nth-child(3) {
            left: 15%;
            transform: scale(1.5);
        }

        .sf-v2-tree:nth-child(4) {
            left: 26%;
            transform: scale(.72);
        }

        .sf-v2-tree:nth-child(5) {
            left: 36%;
            transform: scale(1.15);
        }

        .sf-v2-tree:nth-child(6) {
            left: 48%;
            transform: scale(.8);
        }

        .sf-v2-tree:nth-child(7) {
            left: 58%;
            transform: scale(1.4);
        }

        .sf-v2-tree:nth-child(8) {
            left: 70%;
            transform: scale(.78);
        }

        .sf-v2-tree:nth-child(9) {
            left: 80%;
            transform: scale(1.3);
        }

        .sf-v2-tree:nth-child(10) {
            left: 91%;
            transform: scale(.95);
        }

        /* brighter forest depth */

        .sf-v2-forest-light {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 25%;
            height: 30%;

            background:
                radial-gradient(
                    ellipse at center,
                    rgba(139,92,246,.23),
                    rgba(34,211,238,.08) 35%,
                    transparent 70%
                );

            filter: blur(18px);
        }

        /* =====================================================
           ROAD
           ===================================================== */

        .sf-v2-road {
            position: absolute;
            left: 50%;
            bottom: -5%;

            width: 110%;
            height: 52%;

            transform: translateX(-50%);

            background:
                linear-gradient(
                    90deg,
                    #090b10 0%,
                    #181b24 30%,
                    #252832 50%,
                    #181b24 70%,
                    #090b10 100%
                );

            clip-path:
                polygon(
                    40% 0,
                    60% 0,
                    100% 100%,
                    0 100%
                );

            box-shadow:
                0 -20px 80px rgba(0,0,0,.7);
        }

        .sf-v2-road::before {
            content: "";

            position: absolute;
            left: 50%;
            top: 0;

            width: 7px;
            height: 100%;

            transform: translateX(-50%);

            background:
                repeating-linear-gradient(
                    to bottom,
                    rgba(255,255,255,.7) 0 25px,
                    transparent 25px 80px
                );

            opacity: .32;

            animation:
                sfRoadSpeed
                .5s
                linear
                infinite;
        }

        @keyframes sfRoadSpeed {
            from {
                background-position-y: 0;
            }

            to {
                background-position-y: 105px;
            }
        }

        .sf-v2-road::after {
            content: "";

            position: absolute;
            inset: 0;

            background:
                linear-gradient(
                    90deg,
                    rgba(139,92,246,.15),
                    transparent 25%,
                    transparent 75%,
                    rgba(34,211,238,.12)
                );
        }

        /* =====================================================
           MOVING LIGHTS
           ===================================================== */

        .sf-v2-streaks {
            position: absolute;
            inset: 0;
            pointer-events: none;
        }

        .sf-v2-streak {
            position: absolute;

            width: 3px;
            height: 80px;

            border-radius: 999px;

            background:
                linear-gradient(
                    transparent,
                    rgba(167,139,250,.9)
                );

            box-shadow:
                0 0 12px rgba(139,92,246,.8);

            animation:
                sfLightStreak
                1.1s
                linear
                infinite;

            opacity: 0;
        }

        .sf-v2-streak:nth-child(1) {
            left: 18%;
            animation-delay: -.2s;
        }

        .sf-v2-streak:nth-child(2) {
            left: 29%;
            animation-delay: -.7s;
        }

        .sf-v2-streak:nth-child(3) {
            left: 40%;
            animation-delay: -.4s;
        }

        .sf-v2-streak:nth-child(4) {
            left: 60%;
            animation-delay: -.9s;
        }

        .sf-v2-streak:nth-child(5) {
            left: 72%;
            animation-delay: -.3s;
        }

        .sf-v2-streak:nth-child(6) {
            left: 84%;
            animation-delay: -.8s;
        }

        @keyframes sfLightStreak {

            0% {
                top: 30%;
                transform: scale(.25);
                opacity: 0;
            }

            20% {
                opacity: .65;
            }

            100% {
                top: 100%;
                transform: scale(3);
                opacity: 0;
            }
        }

        /* =====================================================
           FOG
           ===================================================== */

        .sf-v2-fog {
            position: absolute;
            left: -20%;
            right: -20%;
            bottom: 24%;
            height: 28%;

            background:
                linear-gradient(
                    180deg,
                    transparent,
                    rgba(210,210,235,.08),
                    rgba(255,255,255,.045),
                    transparent
                );

            filter: blur(22px);

            animation:
                sfFogMove
                12s
                ease-in-out
                infinite
                alternate;
        }

        @keyframes sfFogMove {
            from {
                transform: translateX(-5%);
            }

            to {
                transform: translateX(5%);
            }
        }

        /* =====================================================
           TITLE
           ===================================================== */

        .sf-v2-title {
            position: absolute;

            z-index: 20;

            top: 8%;
            left: 50%;

            transform: translateX(-50%);

            width: 100%;

            text-align: center;

            pointer-events: none;
        }

        .sf-v2-title h1 {
            margin: 0;

            font-family:
                "Orbitron",
                sans-serif;

            font-size:
                clamp(
                    55px,
                    9vw,
                    118px
                );

            font-weight: 900;

            letter-spacing:
                clamp(
                    3px,
                    .7vw,
                    10px
                );

            line-height: .9;

            color: #ffffff;

            text-shadow:
                0 0 10px rgba(255,255,255,.8),
                0 0 25px rgba(139,92,246,.8),
                0 0 60px rgba(139,92,246,.45);
        }

        .sf-v2-title h1 span {
            color: #a78bfa;

            background:
                linear-gradient(
                    90deg,
                    #8b5cf6,
                    #c4b5fd,
                    #22d3ee,
                    #8b5cf6
                );

            background-size: 250% auto;

            -webkit-background-clip: text;
            background-clip: text;

            -webkit-text-fill-color: transparent;

            animation:
                sfTitleGradient
                5s
                linear
                infinite;
        }

        @keyframes sfTitleGradient {
            from {
                background-position: 0%;
            }

            to {
                background-position: 250%;
            }
        }

        /* =====================================================
           3D CAR
           ===================================================== */

        .sf-v2-car-wrap {
            position: absolute;

            z-index: 16;

            left: 50%;
            bottom: 15%;

            width: min(700px, 75vw);
            height: 340px;

            transform:
                translateX(-50%);

            pointer-events: none;

            filter:
                drop-shadow(
                    0 25px 35px
                    rgba(0,0,0,.75)
                );
        }

        model-viewer.sf-v2-car {
            width: 100%;
            height: 100%;

            --poster-color: transparent;

            background: transparent;

            pointer-events: none;

            filter:
                drop-shadow(
                    0 0 20px
                    rgba(139,92,246,.35)
                );
        }

        .sf-v2-car-glow {
            position: absolute;

            left: 15%;
            right: 15%;
            bottom: 12%;

            height: 45px;

            border-radius: 50%;

            background:
                radial-gradient(
                    ellipse,
                    rgba(139,92,246,.65),
                    rgba(34,211,238,.18),
                    transparent 70%
                );

            filter: blur(18px);

            animation:
                sfCarGlow
                2s
                ease-in-out
                infinite;
        }

        @keyframes sfCarGlow {
            0%,100% {
                opacity: .65;
                transform: scaleX(1);
            }

            50% {
                opacity: 1;
                transform: scaleX(1.08);
            }
        }

        /* =====================================================
           HEADLIGHT BEAMS
           ===================================================== */

        .sf-v2-beam {
            position: absolute;

            z-index: 10;

            bottom: 25%;

            width: 300px;
            height: 230px;

            opacity: .13;

            filter: blur(12px);

            background:
                linear-gradient(
                    180deg,
                    rgba(255,255,255,.8),
                    rgba(167,139,250,.35),
                    transparent
                );

            clip-path:
                polygon(
                    45% 0,
                    55% 0,
                    100% 100%,
                    0 100%
                );
        }

        .sf-v2-beam.left {
            left: calc(50% - 270px);
            transform: rotate(-8deg);
        }

        .sf-v2-beam.right {
            left: calc(50% - 30px);
            transform: rotate(8deg);
        }

        /* =====================================================
           BOTTOM NAV
           ===================================================== */

        .sf-v2-nav {
            position: absolute;

            z-index: 40;

            left: 50%;
            bottom: 22px;

            transform:
                translateX(-50%);

            width:
                min(
                    820px,
                    calc(100% - 40px)
                );

            display: grid;

            grid-template-columns:
                1.5fr
                1fr
                1fr
                1fr;

            gap: 10px;
        }

        .sf-v2-nav button {
            appearance: none;

            width: 100%;
            min-width: 0;

            height: 58px;

            border-radius: 9px;

            border:
                1px solid
                rgba(255,255,255,.14);

            background:
                rgba(7,9,17,.88);

            color: #ffffff;

            font-family:
                "Orbitron",
                sans-serif;

            font-size: 10px;

            font-weight: 700;

            letter-spacing: 1.5px;

            cursor: pointer;

            white-space: nowrap;

            backdrop-filter:
                blur(15px);

            transition:
                transform .2s ease,
                background .2s ease,
                border-color .2s ease,
                box-shadow .2s ease;
        }

        .sf-v2-nav button:hover {
            transform:
                translateY(-4px);

            border-color:
                rgba(167,139,250,.7);

            background:
                rgba(45,35,75,.92);

            box-shadow:
                0 10px 30px
                rgba(0,0,0,.35),
                0 0 25px
                rgba(139,92,246,.2);
        }

        .sf-v2-nav .sf-v2-start {
            background:
                linear-gradient(
                    135deg,
                    #8b5cf6,
                    #5b4bd8
                );

            border-color:
                rgba(196,181,253,.7);

            font-size: 12px;

            box-shadow:
                0 0 25px
                rgba(139,92,246,.25);
        }

        .sf-v2-nav .sf-v2-start:hover {
            background:
                linear-gradient(
                    135deg,
                    #a78bfa,
                    #6366f1
                );

            box-shadow:
                0 0 40px
                rgba(139,92,246,.4);
        }

        /* =====================================================
           HUD SAFETY
           ===================================================== */

        #sfMenu .sf-header,
        #sfMenu .sf-hud,
        #sfMenu .sf-topbar {
            position: relative;
            z-index: 100;
        }

        /* =====================================================
           VIGNETTE
           ===================================================== */

        .sf-v2-vignette {
            position: absolute;

            z-index: 50;

            inset: 0;

            pointer-events: none;

            background:
                radial-gradient(
                    ellipse at center,
                    transparent 45%,
                    rgba(0,0,0,.15) 65%,
                    rgba(0,0,0,.5) 100%
                );
        }

        /* =====================================================
           RESPONSIVE
           ===================================================== */

        @media (max-width: 800px) {

            .sf-v2-title {
                top: 7%;
            }

            .sf-v2-car-wrap {
                width: 600px;
                max-width: 90vw;
                height: 300px;
                bottom: 19%;
            }

            .sf-v2-nav {
                grid-template-columns:
                    1fr
                    1fr;

                bottom: 12px;
            }

            .sf-v2-nav .sf-v2-start {
                grid-column:
                    span 2;
            }

            .sf-v2-moon {
                width: 75px;
                height: 75px;
                right: 7%;
            }
        }

        @media (max-width: 500px) {

            .sf-v2-title h1 {
                font-size: 47px;
                letter-spacing: 2px;
            }

            .sf-v2-car-wrap {
                bottom: 25%;
                height: 230px;
            }

            .sf-v2-nav {
                width:
                    calc(100% - 20px);

                gap: 6px;
            }

            .sf-v2-nav button {
                height: 48px;
                font-size: 8px;
            }
        }

        `;

        document.head.appendChild(style);
    }

    /* =========================================================
       MODEL VIEWER
       ========================================================= */

    if (!document.getElementById("sfModelViewerScript")) {

        const script = document.createElement("script");

        script.id = "sfModelViewerScript";

        script.type = "module";

        script.src =
            "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";

        document.head.appendChild(script);
    }

    /* =========================================================
       CURRENT VEHICLE
       ========================================================= */

    function getVehicleName() {

        try {

            if (
                typeof streetforgeGetSelectedVehicle ===
                "function"
            ) {

                const vehicle =
                    streetforgeGetSelectedVehicle();

                if (vehicle) {

                    if (
                        typeof vehicle ===
                        "string"
                    ) {
                        return vehicle;
                    }

                    return (
                        vehicle.name ||
                        vehicle.title ||
                        vehicle.id ||
                        "NIGHTFALL"
                    );
                }
            }

        } catch (error) {}

        return "NIGHTFALL";
    }

    /* =========================================================
       BUILD HOME
       ========================================================= */

    function buildHome() {

        const menu =
            document.getElementById("sfMenu");

        if (!menu) return;

        /* Remove only our previous version */

        const old =
            menu.querySelector(".sf-v2-home");

        if (old) {
            old.remove();
        }

        const home =
            document.createElement("div");

        home.className =
            "sf-v2-home";

        home.innerHTML = `

            <div class="sf-v2-sky"></div>

            <div class="sf-v2-stars"></div>

            <div class="sf-v2-moon"></div>

            <!-- FOREST -->

            <div class="sf-v2-forest">

                ${Array(10)
                    .fill(
                        '<div class="sf-v2-tree"></div>'
                    )
                    .join("")}

            </div>

            <div class="sf-v2-forest-light"></div>

            <!-- ROAD -->

            <div class="sf-v2-road"></div>

            <!-- LIGHT STREAKS -->

            <div class="sf-v2-streaks">

                ${Array(6)
                    .fill(
                        '<span class="sf-v2-streak"></span>'
                    )
                    .join("")}

            </div>

            <!-- FOG -->

            <div class="sf-v2-fog"></div>

            <!-- HEADLIGHT BEAMS -->

            <div
                class="sf-v2-beam left"
            ></div>

            <div
                class="sf-v2-beam right"
            ></div>

            <!-- TITLE -->

            <div class="sf-v2-title">

                <h1>
                    STREET<span>FORGE</span>
                </h1>

            </div>

            <!-- REAL 3D CAR -->

            <div class="sf-v2-car-wrap">

                <div
                    class="sf-v2-car-glow"
                ></div>

                <model-viewer
                    class="sf-v2-car"
                    src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CarConcept/glTF-Binary/CarConcept.glb"
                    camera-controls="false"
                    disable-zoom
                    disable-pan
                    interaction-prompt="none"
                    auto-rotate
                    rotation-per-second="12deg"
                    camera-orbit="0deg 72deg 4.5m"
                    field-of-view="30deg"
                    shadow-intensity="1"
                    exposure="1.25"
                    environment-image="neutral"
                    loading="eager"
                    alt="Streetforge sports car"
                ></model-viewer>

            </div>

            <!-- CLEAN NAV -->

            <div class="sf-v2-nav">

                <button
                    class="sf-v2-start"
                    onclick="sfOpenLevels()"
                >
                    🏁 START RACING
                </button>

                <button
                    onclick="sfOpenGarage()"
                >
                    GARAGE
                </button>

                <button
                    onclick="sfOpenLevels()"
                >
                    LEVELS
                </button>

                <button
                    onclick="sfOpenHighScores()"
                >
                    SCORES
                </button>

            </div>

            <div
                class="sf-v2-vignette"
            ></div>

        `;

        /*
         * Append instead of replacing the entire menu.
         * This is what prevents the existing HUD and
         * other Streetforge elements from getting destroyed.
         */

        menu.appendChild(home);
    }

    /* =========================================================
       KEEP HUD ABOVE HOME
       ========================================================= */

    function fixHudLayer() {

        const menu =
            document.getElementById("sfMenu");

        if (!menu) return;

        const candidates = [
            ".sf-header",
            ".sf-hud",
            ".sf-topbar",
            ".sf-game-header",
            "header"
        ];

        candidates.forEach(selector => {

            menu
                .querySelectorAll(selector)
                .forEach(element => {

                    element.style.position =
                        "relative";

                    element.style.zIndex =
                        "200";

                });

        });
    }

    /* =========================================================
       INITIALISE
       ========================================================= */

    function init() {

        buildHome();

        setTimeout(
            fixHudLayer,
            100
        );

    }

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }

})();
