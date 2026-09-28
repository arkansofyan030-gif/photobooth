``
`javascript
/* ==========================================
   JANKBOX
   LANDING PAGE
========================================== */


/* ==========================================
   PHOTO STRIP FLOAT
========================================== */

const photostrip = document.querySelector(".photostrip");

let rotation = 3;
let direction = 1;

function floatStrip() {

    rotation += 0.015 * direction;

    if (rotation > 3.4) {
        direction = -1;
    }

    if (rotation < 2.6) {
        direction = 1;
    }

    if (photostrip) {
        photostrip.style.transform =
            
rotate($ { rotation }
    deg)
;
}

requestAnimationFrame(floatStrip);
}

floatStrip();


/* ==========================================
   ENTER BUTTON
========================================== */

const enterButton = document.querySelector(".enter-button");

enterButton.addEventListener("click", () => {

    enterButton.classList.add("clicked");

});
`
`
`