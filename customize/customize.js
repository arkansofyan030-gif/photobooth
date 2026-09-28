const photoData =
    sessionStorage.getItem(
        "jankboxPhotos"
    );


const photostrip =
    document.getElementById(
        "photostrip"
    );


const finishButton =
    document.getElementById(
        "finishButton"
    );


/* =========================
   LOAD PHOTOS
========================= */

if (!photoData) {

    photostrip.innerHTML = `
        <p style="
            padding: 30px;
            font-family: monospace;
            font-size: 12px;
        ">
            NO PHOTOS FOUND.
        </p>
    `;

} else {

    const photos =
        JSON.parse(photoData);


    photos.forEach(
        (photo, index) => {

            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.className =
                "strip-photo";


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                photo;


            image.alt =
                `Photo ${index + 1}`;


            wrapper.appendChild(
                image
            );


            /*
                Insert photos before
                the Jankbox footer.
            */

            photostrip.insertBefore(
                wrapper,
                photostrip.querySelector(
                    ".strip-brand"
                )
            );

        }
    );

}


/* =========================
   FILTER
========================= */

const filterButtons =
    document.querySelectorAll(
        "[data-filter]"
    );


filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    item =>
                    item.classList.remove(
                        "active"
                    )
                );


                button.classList.add(
                    "active"
                );


                const filter =
                    button.dataset.filter;


                photostrip.classList.remove(
                    "filter-film",
                    "filter-bw",
                    "filter-warm"
                );


                if (
                    filter !== "normal"
                ) {

                    photostrip.classList.add(
                        `filter-${filter}`
                    );

                }

            }
        );

    }
);


/* =========================
   FRAME
========================= */

const frameButtons =
    document.querySelectorAll(
        "[data-frame]"
    );


frameButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                frameButtons.forEach(
                    item =>
                    item.classList.remove(
                        "active"
                    )
                );


                button.classList.add(
                    "active"
                );


                const frame =
                    button.dataset.frame;


                photostrip.classList.remove(
                    "frame-y2k",
                    "frame-minimal"
                );


                if (
                    frame !== "classic"
                ) {

                    photostrip.classList.add(
                        `frame-${frame}`
                    );

                }

            }
        );

    }
);


/* =========================
   FINISH
========================= */

finishButton.addEventListener(
    "click",
    () => {

        const activeFilter =
            document.querySelector(
                "[data-filter].active"
            );

        const activeFrame =
            document.querySelector(
                "[data-frame].active"
            );

        const filter =
            activeFilter ?
            activeFilter.dataset.filter :
            "normal";

        const frame =
            activeFrame ?
            activeFrame.dataset.frame :
            "classic";

        sessionStorage.setItem(
            "jankboxFilter",
            filter
        );

        sessionStorage.setItem(
            "jankboxFrame",
            frame
        );

        window.location.href =
            "../final/final.html";
    }
);