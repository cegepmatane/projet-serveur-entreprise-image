let selectedFile = null;
let selectedModuleKey = null;
let lastRandomIndex = null;

const moduleMap = {
    yolov:           { label: 'YOLOv Detection',  btnLabel: 'Détecter les objets',     fn: detectSceneModuleYolov },
    cartoonizer:     { label: 'Cartoonizer',      btnLabel: 'Cartooniser la photo',    fn: detectSceneModuleCartoonizer,     base64ResultImage: null },
    superresolution: { label: 'Super Resolution', btnLabel: 'Améliorer la résolution', fn: detectSceneModuleSuperResolution, base64ResultImage: null }
};

function selectModule(event, key) {
    selectedModuleKey = key;
    document.getElementById('selectedModuleLabel').textContent = moduleMap[key].label;
    document.getElementById('detectBtnLabel').textContent = moduleMap[key].btnLabel;
    document.querySelectorAll('.dropdown-item').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

function handleFile(input) {
    selectedFile = input.files[0];
    if (!selectedFile) return;

    const preview = document.getElementById('preview');
    preview.src = URL.createObjectURL(selectedFile);
    preview.style.display = 'block';
    document.querySelector('#downloadImageBttn').style.display = 'none';
    document.getElementById('previewEmpty').style.display = 'none';
    document.getElementById('detectBtn').style.display = 'inline-flex';
    document.getElementById('resultCard').style.display = 'none';
    document.querySelector('#btnModuleChoice').disabled = false;
    document.querySelector('#detectBtn').disabled = false;
    setStatus('');
}

function selectRandomImage() {
    console.debug(`--VERBOSE-- selectRandomImage()`);

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * 3) + 1;
    } while (randomIndex === lastRandomIndex);
    lastRandomIndex = randomIndex;

    const imageUrl = `./images/test-image${randomIndex}.png`;

    fetch(imageUrl)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], `test-image${randomIndex}.png`, { type: 'image/png' });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);

            const input = document.querySelector('input[type="file"]');
            input.files = dataTransfer.files;

            handleFile(input);
        })
        .catch(err => console.error('Failed to load random image:', err));
}

function detectScene() {
    if (!selectedModuleKey) { setStatus('Veuillez choisir un module.'); return; }
    moduleMap[selectedModuleKey].fn();
}

function downloadResultImage() {
    const base64Image = moduleMap[selectedModuleKey].base64ResultImage;
    const a = document.createElement('a');
    a.href = "data:image/png;base64," + base64Image;
    a.download = `image-resultat`;
    a.click();
}

function setStatus(msg) {
    const el = document.getElementById('status');
    el.textContent = msg;
    el.style.display = msg ? 'block' : 'none';
}

function detectSceneModuleYolov() {
    console.debug(`--VERBOSE-- : detectSceneModuelYolov()`);
    if (!selectedFile) { setStatus('Please select a file first.'); return; }

    setStatus('Detecting…');
    document.getElementById('detectBtn').disabled = true;

    const formData = new FormData();
    formData.append('image', selectedFile);

    fetch('http://172.105.24.70/codeproject/v1/vision/detection', {
        method: 'POST',
        body: formData
    })
        .then(r => r.json())
        .then(data => {
            document.getElementById('detectBtn').disabled = false;
            const pred = data.predictions?.[0];
            const card = document.getElementById('resultCard');

            if (pred) {
                document.getElementById('resultLabel').textContent = pred.label;
                document.getElementById('resultConf').textContent =
                    'Confidence: ' + (pred.confidence * 100).toFixed(1) + '%';
                card.style.display = 'flex';
                setStatus('');

            document.querySelector('#btnModuleChoice').disabled = true;
            document.querySelector('#detectBtn').disabled = true;
            document.querySelector('#detectBtn').style.display = 'none';
            } else {
                setStatus('No objects detected.');
            }
        })
        .catch(err => {
            document.getElementById('detectBtn').disabled = false;
            setStatus('Error: ' + err.message);
        });
}

function detectSceneModuleCartoonizer() {
    console.debug(`--VERBOSE-- : detectSceneModuleCartoonizer()`);
    if (!selectedFile) { setStatus('Please select a file first.'); return; }

    setStatus('Detecting…');
    document.getElementById('detectBtn').disabled = true;

    previewImage = document.querySelector('#preview');
    const formData = new FormData();
    formData.append('image', selectedFile);

    fetch('http://172.105.24.70/codeproject/v1/image/cartoonize', {
        method: 'POST',
        body: formData
    })
        .then(r => r.json())
        .then(data => {
            setStatus("success: " + data.success);
            previewImage.src = "data:image/png;base64," + data.imageBase64;
            document.getElementById('detectBtn').style.display = 'none';
            moduleMap[selectedModuleKey].base64ResultImage = data.imageBase64;

            document.querySelector('#downloadImageBttn').style.display = 'inline-flex';
            document.querySelector('#btnModuleChoice').disabled = true;
            document.querySelector('#detectBtn').disabled = true;
            document.querySelector('#detectBtn').style.display = 'none';
        })
        .catch(err => {
            document.getElementById('detectBtn').disabled = false;
            setStatus('Error: ' + err.message);
        });
}

function detectSceneModuleSuperResolution() {
    console.debug(`--VERBOSE-- : detectSceneModuleSuperResolution()`);
    if (!selectedFile) { setStatus('Please select a file first.'); return; }

    setStatus('Detecting…');
    document.getElementById('detectBtn').disabled = true;

    previewImage = document.querySelector('#preview');
    const formData = new FormData();
    formData.append('image', selectedFile);

    fetch('http://172.105.24.70/codeproject/v1/image/superresolution', {
        method: 'POST',
        body: formData
    })
        .then(r => r.json())
        .then(data => {
            setStatus("success: " + data.success);
            previewImage.src = "data:image/png;base64," + data.imageBase64;
            moduleMap[selectedModuleKey].base64ResultImage = data.imageBase64;
            
            document.querySelector('#downloadImageBttn').style.display = 'inline-flex';
            document.querySelector('#btnModuleChoice').disabled = true;
            document.querySelector('#detectBtn').disabled = true;
            document.querySelector('#detectBtn').style.display = 'none';
        })
        .catch(err => {
            document.getElementById('detectBtn').disabled = false;
            setStatus('Error: ' + err.message);
        });
}