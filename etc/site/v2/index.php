<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Détection d'image</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style/main.css">
    <script src="script/detection.js" defer></script>
</head>

<body class="no-scroll">

    <header>
        <span class="header-dot"></span>
        <div class="header-right">
            <a href="fonctionnement.html">Fonctionnement du service</a>
            <a href="galerie.html">Galerie de détections</a>
        </div>
        <h1 class="titre"><a href="index.html">Détection d'image</a></h1>
    </header>

    <main>
        <div class="glass-panel">

            <div class="actions">
                <label for="photo" class="btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                    Prendre une photo
                </label>
                <input type="file" id="photo" capture="environment" accept="image/*,video/*" onchange="handleFile(this)" />

                <label for="upload" class="btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    Choisir un fichier
                </label>
                <input type="file" id="upload" accept="image/*" style="display:none;" onchange="handleFile(this)" />

                <div class="dropdown">
                    <button class="btn dropdown-trigger">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
                        Modules IA
                        <svg class="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                    <div class="dropdown-menu">
                        <button class="dropdown-item" onclick="detectSceneModuleYolov()">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 12h10M12 7v10"/></svg>
                            YOLOv Detection
                        </button>
                        <button class="dropdown-item" onclick="detectSceneModuleCartoonizer()">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                            Cartoonizer
                        </button>
                        <button class="dropdown-item" onclick="detectSceneModuleSuperResolution()">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                            Super Resolution
                        </button>
                    </div>
                </div>
            </div>

            <div class="preview-wrap" id="previewWrap">
                <img id="preview" alt="Aperçu" />
                <div class="preview-empty" id="previewEmpty">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <span>Aucune image sélectionnée</span>
                </div>
            </div>

            <button class="btn btn-primary" id="detectBtn" onclick="detectScene()" style="display:none; width:100%;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                Analyser la photo
            </button>

            <p class="status" id="status"></p>

            <div class="result-card" id="resultCard">
                <p class="result-label">Objet détecté</p>
                <p class="result-value" id="resultLabel">—</p>
                <div class="conf-bar-wrap">
                    <div class="conf-bar" id="confBar"></div>
                </div>
                <p class="confidence" id="resultConf"></p>
            </div>

        </div>
    </main>

    <footer>
        <h3>Crédit</h3>
        <div>
            <a href="https://github.com/codeproject/CodeProject.AI-Server">Github CodeProject.AI</a>
            <span>Emmanuel PB., Jérôme B., Alexandre L., Cédric S., Victor D.</span>
        </div>
    </footer>
</body>

</html>
