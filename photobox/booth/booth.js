const video =
    document.getElementById("camera");

const startButton =
    document.getElementById("startButton");

const countdown =
    document.getElementById("countdown");

const currentShot =
    document.getElementById("currentShot");

const cameraMessage =
    document.getElementById("cameraMessage");

const flash =
    document.getElementById("flash");


const boothPage =
    document.querySelector(".booth-page");

const reviewSection =
    document.getElementById("reviewSection");

const photoGrid =
    document.getElementById("photoGrid");

const retakeButton =
    document.getElementById("retakeButton");

const continueButton =
    document.getElementById("continueButton");


let cameraStream = null;

let shotNumber = 0;

const TOTAL_SHOTS = 4;

let capturedPhotos = [];


/* =========================
   START CAMERA
========================= */

async function startCamera() {

    try {

        cameraStream =
            await navigator.mediaDevices.getUserMedia({

                video: {

                    facingMode: "user",

                    width: {
                        ideal: 1280
                    },

                    height: {
                        ideal: 720
                    }

                },

                audio: false

            });


        video.srcObject =
            cameraStream;


        cameraMessage.textContent =
            "CAMERA READY";


    } catch (error) {

        console.error(error);

        cameraMessage.textContent =
            "CAMERA ACCESS DENIED";

        startButton.disabled =
            true;

        alert(
            "Please allow camera access to use Jankbox."
        );

    }

}


/* =========================
   COUNTDOWN
========================= */

function countdownTimer() {

    return new Promise((resolve) => {

        let number = 3;

        countdown.textContent =
            number;


        const timer =
            setInterval(() => {

                number--;


                if (number > 0) {

                    countdown.textContent =
                        number;

                } else {

                    countdown.textContent =
                        "";

                    clearInterval(timer);

                    resolve();

                }

            }, 1000);

    });

}


/* =========================
   FLASH
========================= */

function takeFlash() {

    flash.classList.remove("active");

    void flash.offsetWidth;

    flash.classList.add("active");

}


/* =========================
   CAPTURE REAL PHOTO
========================= */

function capturePhoto() {

    const canvas =
        document.createElement("canvas");


    const width =
        video.videoWidth;

    const height =
        video.videoHeight;


    canvas.width =
        width;

    canvas.height =
        height;


    const context =
        canvas.getContext("2d");


    /*
        Karena video kita mirror,
        canvas juga kita mirror
        supaya hasil fotonya natural
    */

    context.translate(width, 0);

    context.scale(-1, 1);


    context.drawImage(
        video,
        0,
        0,
        width,
        height
    );


    const photo =
        canvas.toDataURL(
            "image/jpeg",
            0.92
        );


    capturedPhotos.push(photo);


    takeFlash();

}


/* =========================
   SHOW REVIEW
========================= */

function showReview() {

    photoGrid.innerHTML = "";


    capturedPhotos.forEach(
        (photo, index) => {

            const wrapper =
                document.createElement("div");

            wrapper.className =
                "captured-photo";


            const image =
                document.createElement("img");

            image.src =
                photo;


            image.alt =
                `Jankbox photo ${index + 1}`;


            const number =
                document.createElement("span");

            number.className =
                "photo-number";

            number.textContent =
                `0${index + 1}`;


            wrapper.appendChild(image);

            wrapper.appendChild(number);

            photoGrid.appendChild(wrapper);

        }
    );


    boothPage.classList.add(
        "reviewing"
    );


    reviewSection.classList.add(
        "active"
    );


    currentShot.textContent =
        "04";

}


/* =========================
   PHOTO SESSION
========================= */

async function startSession() {

    capturedPhotos = [];

    shotNumber = 0;

    startButton.disabled = true;


    for (
        shotNumber = 1; shotNumber <= TOTAL_SHOTS; shotNumber++
    ) {

        currentShot.textContent =
            String(shotNumber)
            .padStart(2, "0");


        cameraMessage.textContent =
            `SHOT ${shotNumber} OF ${TOTAL_SHOTS}`;


        await countdownTimer();


        capturePhoto();


        await new Promise(resolve => {

            setTimeout(
                resolve,
                1200
            );

        });

    }


    cameraMessage.textContent =
        "SESSION COMPLETE";


    startButton.disabled =
        false;


    showReview();

}


/* =========================
   RETAKE
========================= */

function retakeSession() {

    capturedPhotos = [];

    shotNumber = 0;


    boothPage.classList.remove(
        "reviewing"
    );


    reviewSection.classList.remove(
        "active"
    );


    currentShot.textContent =
        "00";


    cameraMessage.textContent =
        "CAMERA READY";


    startButton.disabled =
        false;


    startButton.querySelector("span")
        .textContent =
        "START SESSION";

}


/* =========================
   CONTINUE
========================= */

function continueToCustomize() {
    console.log("CONTINUE BERHASIL DIKLIK");

    sessionStorage.setItem(
        "jankboxPhotos",
        JSON.stringify(capturedPhotos)
    );

    window.location.href = "../customize/customize.html";
}





/* =========================
   EVENTS
========================= */

startButton.addEventListener(
    "click",
    startSession
);


retakeButton.addEventListener(
    "click",
    retakeSession
);


continueButton.addEventListener(
    "click",
    continueToCustomize
);


/* =========================
   INIT
========================= */

startCamera();