/* =========================================================
   STREETFORGE — HOME SCREEN
   Cyberpunk Redwood Night Drive
   ========================================================= */

(function () {
    "use strict";

    const homeCSS = `
    /* =====================================================
       STREETFORGE HOME — CYBERPUNK REDWOOD
       ===================================================== */

    #sfMenu {
        position: relative;
        min-height: calc(100vh - 90px);
        padding: 0 !important;
        overflow: hidden;
        background: #03040a;
        isolation: isolate;
    }

    /* ---------- BACKGROUND ---------- */

    .sf-home-world {
        position: absolute;
        inset: 0;
        overflow: hidden;
        background:
            radial-gradient(
                ellipse at 50% 35%,
                rgba(91, 65, 150, .28) 0%,
                rgba(17, 24, 39, .12) 35%,
                rgba(2, 4, 10, 1) 78%
            );
    }

    .sf-home-sky {
        position: absolute;
        inset: 0;
        background:
            radial-gradient(circle at 20% 25%, rgba(119, 68, 180, .13), transparent 22%),
            radial-gradient(circle at 80% 20%, rgba(0, 212, 255, .09), transparent 25%),
            linear-gradient(
                180deg,
                #070913 0%,
                #0a0b18 34%,
                #111020 57%,
                #05060b 100%
            );
    }

    /* ---------- MOON ---------- */

    .sf-moon {
        position: absolute;
        width: 125px;
        height: 125px;
        top: 9%;
        right: 15%;
        border-radius: 50%;
        background:
            radial-gradient(
                circle at 35% 30%,
                rgba(255,255,255,.95),
                rgba(202,212,255,.75) 38%,
                rgba(139,92,246,.3) 65%,
                transparent 72%
            );
        box-shadow:
            0 0 35px rgba(167,139,250,.35),
            0 0 100px rgba(139,92,246,.18);
        opacity: .65;
        animation: sfMoonPulse 6s ease-in-out infinite;
    }

    @keyframes sfMoonPulse {
        0%,100% { transform: scale(1); opacity:.58; }
        50% { transform: scale(1.035); opacity:.72; }
    }

    /* ---------- STARS ---------- */

    .sf-stars {
        position: absolute;
        inset: 0;
        background-image:
            radial-gradient(circle, rgba(255,255,255,.8) 1px, transparent 1.5px),
            radial-gradient(circle, rgba(167,139,250,.5) 1px, transparent 1.5px);
        background-size: 125px 125px, 205px 205px;
        background-position: 20px 10px, 80px 60px;
        opacity: .3;
        animation: sfStarsMove 35s linear infinite;
    }

    @keyframes sfStarsMove {
        from { transform: translateY(0); }
        to { transform: translateY(125px); }
    }

    /* ---------- REDWOOD SILHOUETTES ---------- */

    .sf-forest {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 24%;
        height: 55%;
        overflow: hidden;
        opacity: .92;
    }

    .sf-tree {
        position: absolute;
        bottom: 0;
        width: 45px;
        height: 100%;
        background:
            linear-gradient(
                90deg,
                transparent 0 20%,
                #090b12 20% 80%,
                transparent 80%
            );
        filter: drop-shadow(0 0 8px rgba(0,0,0,.8));
    }

    .sf-tree::before {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 15%;
        width: 170px;
        height: 170px;
        transform: translateX(-50%);
        background:
            linear-gradient(
                145deg,
                transparent 42%,
                #070910 43% 63%,
                transparent 64%
            );
        clip-path: polygon(
            50% 0,
            76% 27%,
            61% 26%,
            88% 53%,
            68% 51%,
            100% 82%,
            69% 77%,
            78% 100%,
            22% 100%,
            31% 77%,
            0 82%,
            32% 51%,
            12% 53%,
            39% 26%,
            24% 27%
        );
    }

    .sf-tree.t1 { left: 2%; transform: scale(1.35); }
    .sf-tree.t2 { left: 10%; transform: scale(.85); }
    .sf-tree.t3 { left: 18%; transform: scale(1.6); }
    .sf-tree.t4 { left: 28%; transform: scale(.72); }
    .sf-tree.t5 { left: 38%; transform: scale(1.2); }
    .sf-tree.t6 { left: 48%; transform: scale(.8); }
    .sf-tree.t7 { left: 58%; transform: scale(1.45); }
    .sf-tree.t8 { left: 68%; transform: scale(.75); }
    .sf-tree.t9 { left: 77%; transform: scale(1.35); }
    .sf-tree.t10 { left: 88%; transform: scale(1.05); }

    /* ---------- NEON FOREST LIGHT ---------- */

    .sf-forest-glow {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 25%;
        height: 25%;
        background:
            radial-gradient(
                ellipse at center,
                rgba(139,92,246,.2),
                rgba(6,182,212,.05) 35%,
                transparent 72%
            );
        filter: blur(18px);
        animation: sfForestGlow 5s ease-in-out infinite;
    }

    @keyframes sfForestGlow {
        0%,100% { opacity:.6; }
        50% { opacity:1; }
    }

    /* ---------- ROAD ---------- */

    .sf-road {
        position: absolute;
        left: 50%;
        bottom: -10%;
        width: 125%;
        height: 58%;
        transform: translateX(-50%);
        background:
            linear-gradient(
                90deg,
                transparent 0%,
                #080910 16%,
                #121522 32%,
                #191b27 50%,
                #121522 68%,
                #080910 84%,
                transparent 100%
            );
        clip-path: polygon(
            40% 0,
            60% 0,
            100% 100%,
            0 100%
        );
        box-shadow:
            0 -20px 80px rgba(0,0,0,.8);
    }

    .sf-road::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 0;
        width: 8px;
        height: 100%;
        transform: translateX(-50%);
        background:
            repeating-linear-gradient(
                to bottom,
                rgba(255,255,255,.7) 0 25px,
                transparent 25px 65px
            );
        opacity: .22;
        animation: sfRoadLines .55s linear infinite;
    }

    @keyframes sfRoadLines {
        from { background-position-y: 0; }
        to { background-position-y: 90px; }
    }

    .sf-road::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
            linear-gradient(
                90deg,
                rgba(139,92,246,.15),
                transparent 25%,
                transparent 75%,
                rgba(6,182,212,.12)
            );
        pointer-events: none;
    }

    /* ---------- ROAD LIGHTS ---------- */

    .sf-road-lights {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }

    .sf-road-light {
        position: absolute;
        width: 4px;
        height: 70px;
        border-radius: 999px;
        background: rgba(167,139,250,.8);
        box-shadow:
            0 0 10px rgba(167,139,250,.8),
            0 0 30px rgba(139,92,246,.55);
        transform-origin: top center;
        animation: sfRoadLightMove 1.4s linear infinite;
    }

    .sf-road-light:nth-child(1) {
        left: 30%;
        top: 34%;
        animation-delay: -.2s;
    }

    .sf-road-light:nth-child(2) {
        left: 68%;
        top: 32%;
        animation-delay: -.8s;
    }

    .sf-road-light:nth-child(3) {
        left: 38%;
        top: 48%;
        animation-delay: -.55s;
    }

    .sf-road-light:nth-child(4) {
        left: 62%;
        top: 50%;
        animation-delay: -1.1s;
    }

    @keyframes sfRoadLightMove {
        0% {
            transform: scale(.25) translateY(-20px);
            opacity:0;
        }
        15% { opacity:1; }
        100% {
            transform: scale(2.7) translateY(230px);
            opacity:0;
        }
    }

    /* ---------- FOG ---------- */

    .sf-fog {
        position: absolute;
        left: -10%;
        right: -10%;
        bottom: 18%;
        height: 32%;
        background:
            linear-gradient(
                180deg,
                transparent,
                rgba(142,132,185,.08),
                rgba(255,255,255,.035),
                transparent
            );
        filter: blur(22px);
        animation: sfFog 11s ease-in-out infinite alternate;
    }

    @keyframes sfFog {
        from { transform: translateX(-5%); }
        to { transform: translateX(5%); }
    }

    /* ---------- SPEED PARTICLES ---------- */

    .sf-speed {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
    }

    .sf-speed span {
        position: absolute;
        width: 2px;
        height: 50px;
        border-radius: 99px;
        background: linear-gradient(
            transparent,
            rgba(167,139,250,.8)
        );
        animation: sfSpeed 1.2s linear infinite;
        opacity: 0;
    }

    .sf-speed span:nth-child(1) { left:12%; animation-delay:-.2s; }
    .sf-speed span:nth-child(2) { left:23%; animation-delay:-.7s; }
    .sf-speed span:nth-child(3) { left:35%; animation-delay:-1s; }
    .sf-speed span:nth-child(4) { left:67%; animation-delay:-.4s; }
    .sf-speed span:nth-child(5) { left:78%; animation-delay:-.9s; }
    .sf-speed span:nth-child(6) { left:91%; animation-delay:-.15s; }

    @keyframes sfSpeed {
        0% {
            top: 20%;
            transform: scaleY(.2);
            opacity:0;
        }
        20% { opacity:.4; }
        100% {
            top: 95%;
            transform: scaleY(2);
            opacity:0;
        }
    }

    /* ---------- HERO CONTENT ---------- */

    .sf-home-content {
        position: absolute;
        z-index: 20;
        left: 50%;
        top: 8%;
        width: min(900px, 92%);
        transform: translateX(-50%);
        text-align: center;
        pointer-events: none;
    }

    .sf-home-kicker {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 14px;
        color: rgba(255,255,255,.65);
        font-family: "Orbitron", "Rajdhani", "Arial Black", sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 5px;
        text-transform: uppercase;
    }

    .sf-home-kicker::before,
    .sf-home-kicker::after {
        content: "";
        width: 42px;
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(167,139,250,.8)
        );
    }

    .sf-home-kicker::after {
        transform: rotate(180deg);
    }

    .sf-home-title {
        margin: 0;
        position: relative;
        font-family:
            "Orbitron",
            "Audiowide",
            "Rajdhani",
            "Arial Black",
            sans-serif;
        font-size: clamp(55px, 10vw, 125px);
        line-height: .82;
        font-weight: 900;
        letter-spacing: clamp(2px, .5vw, 8px);
        text-transform: uppercase;
        color: #f5f3ff;
        text-shadow:
            0 0 8px rgba(255,255,255,.7),
            0 0 25px rgba(167,139,250,.75),
            0 0 60px rgba(139,92,246,.45);
        animation: sfTitleFloat 5s ease-in-out infinite;
    }

    .sf-home-title span {
        display: inline-block;
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
        animation: sfTitleGradient 5s linear infinite;
        filter:
            drop-shadow(0 0 12px rgba(139,92,246,.8))
            drop-shadow(0 0 35px rgba(34,211,238,.25));
    }

    @keyframes sfTitleGradient {
        from { background-position: 0% center; }
        to { background-position: 250% center; }
    }

    @keyframes sfTitleFloat {
        0%,100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
    }

    .sf-home-subtitle {
        margin: 20px auto 0;
        max-width: 600px;
        color: rgba(255,255,255,.58);
        font-family: "Rajdhani", "Arial", sans-serif;
        font-size: 17px;
        font-weight: 500;
        letter-spacing: 3px;
        text-transform: uppercase;
    }

    /* ---------- CAR ---------- */

    .sf-hero-car {
        position: absolute;
        z-index: 15;
        left: 50%;
        bottom: 15%;
        width: min(570px, 62vw);
        height: 170px;
        transform: translateX(-50%);
        filter:
            drop-shadow(0 25px 25px rgba(0,0,0,.8))
            drop-shadow(0 0 18px rgba(139,92,246,.3));
        animation: sfCarFloat 3s ease-in-out infinite;
    }

    @keyframes sfCarFloat {
        0%,100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-5px); }
    }

    .sf-car-shadow {
        position: absolute;
        left: 7%;
        right: 7%;
        bottom: -18px;
        height: 35px;
        border-radius: 50%;
        background: rgba(0,0,0,.9);
        filter: blur(13px);
    }

    .sf-car-body {
        position: absolute;
        left: 3%;
        right: 3%;
        bottom: 25px;
        height: 90px;
        border-radius:
            55px
            80px
            18px
            22px;
        background:
            linear-gradient(
                180deg,
                #24253a 0%,
                #11121d 48%,
                #08090e 100%
            );
        border: 1px solid rgba(167,139,250,.45);
        box-shadow:
            inset 0 1px rgba(255,255,255,.18),
            inset 0 -10px 20px rgba(0,0,0,.5),
            0 0 25px rgba(139,92,246,.18);
    }

    .sf-car-roof {
        position: absolute;
        left: 23%;
        top: -47px;
        width: 54%;
        height: 68px;
        border-radius: 90px 100px 0 0;
        background:
            linear-gradient(
                135deg,
                #171925,
                #313249 48%,
                #11121c
            );
        border:
            1px solid rgba(167,139,250,.4);
        clip-path: polygon(
            14% 100%,
            28% 12%,
            42% 0,
            78% 12%,
            93% 100%
        );
    }

    .sf-car-window {
        position: absolute;
        left: 30%;
        top: -38px;
        width: 40%;
        height: 45px;
        background:
            linear-gradient(
                135deg,
                rgba(34,211,238,.18),
                rgba(139,92,246,.3),
                rgba(0,0,0,.7)
            );
        clip-path: polygon(
            13% 100%,
            26% 12%,
            48% 3%,
            77% 15%,
            88% 100%
        );
        border-bottom: 1px solid rgba(34,211,238,.5);
    }

    .sf-car-line {
        position: absolute;
        left: 8%;
        right: 8%;
        top: 43px;
        height: 2px;
        background:
            linear-gradient(
                90deg,
                transparent,
                rgba(139,92,246,.9) 15%,
                rgba(34,211,238,.8) 50%,
                rgba(139,92,246,.9) 85%,
                transparent
            );
        box-shadow:
            0 0 8px rgba(139,92,246,.9),
            0 0 18px rgba(34,211,238,.35);
    }

    .sf-headlight {
        position: absolute;
        top: 46px;
        width: 85px;
        height: 24px;
        border-radius: 50%;
        background:
            radial-gradient(
                ellipse,
                white 0%,
                #d9d5ff 18%,
                rgba(167,139,250,.8) 38%,
                transparent 72%
            );
        filter: blur(1px);
        box-shadow:
            0 0 15px rgba(255,255,255,.9),
            0 0 35px rgba(167,139,250,.8),
            0 0 75px rgba(139,92,246,.45);
        animation: sfHeadlight 1.5s ease-in-out infinite;
    }

    .sf-headlight.left { left: 8%; }
    .sf-headlight.right { right: 8%; }

    @keyframes sfHeadlight {
        0%,100% { opacity:.8; }
        50% { opacity:1; }
    }

    .sf-tail-light {
        position: absolute;
        bottom: 15px;
        width: 90px;
        height: 8px;
        border-radius: 50%;
        background: #ec4899;
        box-shadow:
            0 0 12px #ec4899,
            0 0 30px rgba(236,72,153,.7);
    }

    .sf-tail-light.left { left: 9%; }
    .sf-tail-light.right { right: 9%; }

    .sf-wheel {
        position: absolute;
        bottom: -7px;
        width: 67px;
        height: 67px;
        border-radius: 50%;
        background:
            radial-gradient(
                circle,
                #111 0 27%,
                #777 28% 33%,
                #15151d 34% 56%,
                #050509 57%
            );
        border: 3px solid #07080c;
        box-shadow:
            inset 0 0 12px rgba(255,255,255,.15),
            0 5px 8px rgba(0,0,0,.8);
    }

    .sf-wheel.left { left: 12%; }
    .sf-wheel.right { right: 12%; }

    /* ---------- HEADLIGHT BEAMS ---------- */

    .sf-light-beam {
        position: absolute;
        z-index: 8;
        bottom: 27%;
        width: 300px;
        height: 260px;
        opacity: .15;
        filter: blur(8px);
        background:
            linear-gradient(
                180deg,
                rgba(167,139,250,.9),
                transparent
            );
        clip-path: polygon(45% 0,55% 0,100% 100%,0 100%);
        transform-origin: top;
        animation: sfBeam 2s ease-in-out infinite alternate;
    }

    .sf-light-beam.left {
        left: calc(50% - 250px);
        transform: rotate(-10deg);
    }

    .sf-light-beam.right {
        left: calc(50% - 50px);
        transform: rotate(10deg);
    }

    @keyframes sfBeam {
        from { opacity:.08; }
        to { opacity:.2; }
    }

    /* ---------- MENU ---------- */

    .sf-home-menu {
        position: absolute;
        z-index: 30;
        left: 50%;
        bottom: 3.5%;
        transform: translateX(-50%);
        width: min(760px, 92%);
        display: grid;
        grid-template-columns: 1.35fr repeat(3, 1fr);
        gap: 9px;
    }

    .sf-home-menu button {
        min-height: 58px;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 10px;
        background:
            linear-gradient(
                180deg,
                rgba(15,17,30,.88),
                rgba(7,8,14,.94)
            );
        color: white;
        cursor: pointer;
        font-family:
            "Orbitron",
            "Rajdhani",
            Arial,
            sans-serif;
        text-transform: uppercase;
        transition:
            transform .2s ease,
            border-color .2s ease,
            box-shadow .2s ease,
            background .2s ease;
        backdrop-filter: blur(14px);
    }

    .sf-home-menu button:hover {
        transform: translateY(-4px);
        border-color: rgba(167,139,250,.55);
        background:
            linear-gradient(
                180deg,
                rgba(50,39,82,.8),
                rgba(11,12,22,.95)
            );
        box-shadow:
            0 10px 30px rgba(0,0,0,.35),
            0 0 22px rgba(139,92,246,.18);
    }

    .sf-home-menu .sf-start {
        border-color: rgba(167,139,250,.55);
        background:
            linear-gradient(
                135deg,
                rgba(124,58,237,.9),
                rgba(67,56,202,.85)
            );
        box-shadow:
            0 0 25px rgba(139,92,246,.2);
        font-size: 14px;
        font-weight: 900;
        letter-spacing: 2px;
    }

    .sf-home-menu .sf-start:hover {
        background:
            linear-gradient(
                135deg,
                #8b5cf6,
                #6366f1
            );
        box-shadow:
            0 0 35px rgba(139,92,246,.4);
    }

    .sf-home-menu .sf-menu-small {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 1.5px;
        color: rgba(255,255,255,.72);
    }

    /* ---------- CURRENT RIDE ---------- */

    .sf-current-ride {
        position: absolute;
        z-index: 25;
        left: 4%;
        bottom: 5%;
        padding: 13px 16px;
        min-width: 190px;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 10px;
        background: rgba(5,6,12,.68);
        backdrop-filter: blur(16px);
        box-shadow: 0 15px 40px rgba(0,0,0,.25);
    }

    .sf-current-label {
        font-family: "Orbitron", Arial, sans-serif;
        color: rgba(255,255,255,.4);
        font-size: 8px;
        letter-spacing: 2px;
        text-transform: uppercase;
    }

    .sf-current-name {
        margin-top: 4px;
        color: #fff;
        font-family: "Orbitron", Arial, sans-serif;
        font-size: 14px;
        font-weight: 800;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    .sf-current-line {
        width: 100%;
        height: 2px;
        margin-top: 8px;
        background:
            linear-gradient(
                90deg,
                #8b5cf6,
                #22d3ee,
                transparent
            );
    }

    /* ---------- SCANLINES ---------- */

    .sf-scanlines {
        position: absolute;
        z-index: 50;
        inset: 0;
        pointer-events: none;
        opacity: .06;
        background:
            repeating-linear-gradient(
                0deg,
                transparent 0 3px,
                rgba(255,255,255,.5) 4px
            );
        mix-blend-mode: screen;
    }

    /* ---------- VIGNETTE ---------- */

    .sf-vignette {
        position: absolute;
        z-index: 45;
        inset: 0;
        pointer-events: none;
        background:
            radial-gradient(
                ellipse at center,
                transparent 38%,
                rgba(0,0,0,.2) 65%,
                rgba(0,0,0,.78) 100%
            );
    }

    /* ---------- RESPONSIVE ---------- */

    @media (max-width: 800px) {

        .sf-home-content {
            top: 10%;
        }

        .sf-home-title {
            font-size: clamp(48px, 12vw, 85px);
        }

        .sf-home-subtitle {
            font-size: 12px;
            letter-spacing: 2px;
        }

        .sf-hero-car {
            width: 520px;
            max-width: 90vw;
            bottom: 18%;
        }

        .sf-home-menu {
            grid-template-columns: 1fr 1fr;
        }

        .sf-home-menu .sf-start {
            grid-column: span 2;
        }

        .sf-current-ride {
            display: none;
        }

        .sf-moon {
            right: 5%;
            width: 80px;
            height: 80px;
        }
    }

    @media (max-width: 500px) {

        .sf-home-kicker {
            font-size: 8px;
            letter-spacing: 3px;
        }

        .sf-home-kicker::before,
        .sf-home-kicker::after {
            width: 20px;
        }

        .sf-home-title {
            font-size: 47px;
            letter-spacing: 2px;
        }

        .sf-home-subtitle {
            display: none;
        }

        .sf-hero-car {
            bottom: 22%;
            transform: translateX(-50%) scale(.82);
        }

        .sf-home-menu {
            bottom: 2%;
            gap: 6px;
        }

        .sf-home-menu button {
            min-height: 48px;
        }

        .sf-home-menu .sf-menu-small {
            font-size: 8px;
        }

        .sf-tree {
            transform: scale(.7) !important;
        }
    }
    `;

    const style = document.createElement("style");
    style.id = "streetforge-home-style";
    style.textContent = homeCSS;
    document.head.appendChild(style);

    function getCurrentVehicleName() {
        try {
            if (typeof streetforgeGetSelectedVehicle === "function") {
                const vehicle = streetforgeGetSelectedVehicle();

                if (vehicle) {
                    if (typeof vehicle === "string") {
                        return vehicle;
                    }

                    return (
                        vehicle.name ||
                        vehicle.title ||
                        vehicle.id ||
                        "Nightfall"
                    );
                }
            }

            if (typeof streetforgeGetGameData === "function") {
                const data = streetforgeGetGameData();

                if (data && data.selectedVehicle) {
                    return data.selectedVehicle;
                }
            }
        } catch (e) {}

        return "Nightfall";
    }

    function buildHome() {
        const menu = document.getElementById("sfMenu");

        if (!menu) return;

        menu.innerHTML = `
            <div class="sf-home-world">

                <div class="sf-home-sky"></div>

                <div class="sf-stars"></div>

                <div class="sf-moon"></div>

                <div class="sf-forest">
                    <div class="sf-tree t1"></div>
                    <div class="sf-tree t2"></div>
                    <div class="sf-tree t3"></div>
                    <div class="sf-tree t4"></div>
                    <div class="sf-tree t5"></div>
                    <div class="sf-tree t6"></div>
                    <div class="sf-tree t7"></div>
                    <div class="sf-tree t8"></div>
                    <div class="sf-tree t9"></div>
                    <div class="sf-tree t10"></div>
                </div>

                <div class="sf-forest-glow"></div>

                <div class="sf-road"></div>

                <div class="sf-road-lights">
                    <span class="sf-road-light"></span>
                    <span class="sf-road-light"></span>
                    <span class="sf-road-light"></span>
                    <span class="sf-road-light"></span>
                </div>

                <div class="sf-speed">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div class="sf-fog"></div>

                <div class="sf-light-beam left"></div>
                <div class="sf-light-beam right"></div>

                <!-- HERO -->
                <div class="sf-home-content">

                    <div class="sf-home-kicker">
                        NIGHT RUNS // REDWOOD DISTRICT
                    </div>

                    <h1 class="sf-home-title">
                        STREET<span>FORGE</span>
                    </h1>

                    <div class="sf-home-subtitle">
                        BUILD YOUR RIDE &nbsp;•&nbsp;
                        OWN THE NIGHT &nbsp;•&nbsp;
                        FORGE YOUR LEGEND
                    </div>

                </div>

                <!-- CAR -->
                <div class="sf-hero-car">

                    <div class="sf-car-shadow"></div>

                    <div class="sf-car-body">

                        <div class="sf-car-roof"></div>
                        <div class="sf-car-window"></div>

                        <div class="sf-car-line"></div>

                        <div class="sf-headlight left"></div>
                        <div class="sf-headlight right"></div>

                        <div class="sf-tail-light left"></div>
                        <div class="sf-tail-light right"></div>

                        <div class="sf-wheel left"></div>
                        <div class="sf-wheel right"></div>

                    </div>

                </div>

                <!-- CURRENT RIDE -->
                <div class="sf-current-ride">

                    <div class="sf-current-label">
                        Current Ride
                    </div>

                    <div class="sf-current-name" id="sfHomeCurrentRide">
                        ${getCurrentVehicleName()}
                    </div>

                    <div class="sf-current-line"></div>

                </div>

                <!-- MENU -->
                <div class="sf-home-menu">

                    <button
                        class="sf-start"
                        onclick="sfOpenLevels()"
                    >
                        🏁 &nbsp; START RACING
                    </button>

                    <button
                        class="sf-menu-small"
                        onclick="sfOpenGarage()"
                    >
                        GARAGE
                    </button>

                    <button
                        class="sf-menu-small"
                        onclick="sfOpenLevels()"
                    >
                        LEVELS
                    </button>

                    <button
                        class="sf-menu-small"
                        onclick="sfOpenHighScores()"
                    >
                        SCORES
                    </button>

                </div>

                <div class="sf-scanlines"></div>
                <div class="sf-vignette"></div>

            </div>
        `;

        refreshCurrentRide();
    }

    function refreshCurrentRide() {
        const element = document.getElementById("sfHomeCurrentRide");

        if (!element) return;

        element.textContent = getCurrentVehicleName();
    }

    function refreshWhenVisible() {
        if (
            typeof streetforgeGetSelectedVehicle === "function" ||
            typeof streetforgeGetGameData === "function"
        ) {
            refreshCurrentRide();
        }
    }

    /* Load cyberpunk font */
    if (!document.querySelector("#streetforge-cyber-font")) {
        const font = document.createElement("link");
        font.id = "streetforge-cyber-font";
        font.rel = "stylesheet";
        font.href =
            "https://fonts.googleapis.com/css2?family=Audiowide&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@400;500;600;700&display=swap";

        document.head.appendChild(font);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildHome);
    } else {
        buildHome();
    }

    window.addEventListener("streetforge:refresh", refreshWhenVisible);
    window.addEventListener("streetforgeRefresh", refreshWhenVisible);

})();
