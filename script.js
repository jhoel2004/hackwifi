// Matrix Effect
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const matrixBg = document.getElementById('matrix-bg');
matrixBg.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

setInterval(draw, 30);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// App Logic
function nextStep(step) {
    document.querySelectorAll('.step-section').forEach(el => el.classList.add('hidden'));
    document.getElementById(`step-${step}`).classList.remove('hidden');
}

function startHack(event) {
    event.preventDefault();
    const ssid = document.getElementById('ssid').value;
    const mac = document.getElementById('mac').value;
    const securityOptions = document.querySelectorAll('input[name="security"]:checked');

    if (!ssid || !mac || securityOptions.length === 0) {
        alert('Por favor ingresa todos los datos y selecciona al menos un tipo de seguridad.');
        return;
    }

    nextStep(3);
    runTerminal(ssid);
}

function runTerminal(ssid) {
    const output = document.getElementById('console-output');
    const progressBar = document.getElementById('hack-progress');
    const statusText = document.getElementById('status-text');

    const logs = [
        "Iniciando módulos de red...",
        "Escaneando frecuencias 2.4GHz / 5GHz...",
        `Objetivo detectado: ${ssid}`,
        "Iniciando ataque de desautenticación...",
        "Capturando WPA Handshake...",
        "Handshake capturado [OK]",
        "Iniciando ataque de fuerza bruta...",
        "Cargando diccionario: rockyou.txt...",
        "Probando claves...",
        "Inyectando paquetes SQL...",
        "Bypassing firewall...",
        "Acceso root concedido...",
        "Descifrando hash...",
        "ÉXITO: Clave encontrada."
    ];

    let i = 0;
    let progress = 0;

    const interval = setInterval(() => {
        if (i < logs.length) {
            const p = document.createElement('p');
            p.className = 'log-line';
            p.innerText = `> ${logs[i]}`;
            output.appendChild(p);
            output.scrollTop = output.scrollHeight;
            i++;

            progress += 100 / logs.length;
            progressBar.style.width = `${progress}%`;

            // Random status updates
            const statuses = ["INYECTANDO...", "DESCIFRANDO...", "ANALIZANDO...", "HACKING..."];
            statusText.innerText = statuses[Math.floor(Math.random() * statuses.length)];

        } else {
            clearInterval(interval);
            setTimeout(() => {
                showResult(ssid);
            }, 1000);
        }
    }, 800); // Speed of logs
}

function showResult(ssid) {
    nextStep(4);
    document.getElementById('result-ssid').innerText = ssid;

    // Generate random partial password
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let partial = "";
    for (let i = 0; i < 3; i++) {
        partial += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('result-pass').innerText = partial + "******";
}

// Random IP
document.getElementById('user-ip').innerText = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
