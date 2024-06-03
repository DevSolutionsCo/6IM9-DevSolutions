const video = document.createElement("video");

const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;
let scanTimeout; // Variable para almacenar el temporizador de escaneo

const encenderCamara = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      scanning = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true);
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

const cerrarCamara = () => {
  video.srcObject.getTracks().forEach((track) => {
    track.stop();
  });
  canvasElement.hidden = true;
  btnScanQR.hidden = false;
};

qrcode.callback = (respuesta) => {
  if (respuesta) {
    Swal.fire({
      text: respuesta,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        cerrarCamara();
    
          window.location.href = "boleto.html?boleto=" + encodeURIComponent(respuesta);
      }
    });
  }
};

// Evento para mostrar la cámara sin el botón al cargar la página
window.addEventListener('load', (e) => {
  encenderCamara();
});

// Detener el escaneo si el usuario da click en el botón de escanear
btnScanQR.addEventListener('click', () => {
  clearTimeout(scanTimeout); // Limpiar el temporizador de escaneo
  scanning = false; // Detener el escaneo
});
