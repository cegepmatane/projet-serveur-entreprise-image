let selectedFile = null;

function handleFile(input) {
    selectedFile = input.files[0];
    if (!selectedFile) return;

    const preview = document.getElementById('preview');
    preview.src = URL.createObjectURL(selectedFile);
    preview.style.display = 'block';
    document.getElementById('previewEmpty').style.display = 'none';
    document.getElementById('detectBtn').style.display = 'inline-flex';
    document.getElementById('resultCard').style.display = 'none';
    setStatus('');
}

function setStatus(msg) {
    const el = document.getElementById('status');
    el.textContent = msg;
    el.style.display = msg ? 'block' : 'none';
}

function detectScene() {
    if (!selectedFile) { setStatus('Please select a file first.'); return; }

    setStatus('Detecting…');
    document.getElementById('detectBtn').disabled = true;

    const formData = new FormData();
    formData.append('image', selectedFile);

    fetch('http://192.46.223.66/codeproject/v1/vision/detection', {
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
            } else {
                setStatus('No objects detected.');
            }
        })
        .catch(err => {
            document.getElementById('detectBtn').disabled = false;
            setStatus('Error: ' + err.message);
        });
}