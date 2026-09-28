const photoData = sessionStorage.getItem("jankboxPhotos");

const selectedFilter =
    sessionStorage.getItem("jankboxFilter") || "normal";

const selectedFrame =
    sessionStorage.getItem("jankboxFrame") || "classic";

const finalPhotos =
    document.getElementById("finalPhotos");

const photostripFinal =
    document.getElementById("photostripFinal");

const downloadButton =
    document.getElementById("downloadButton");

const newSessionButton =
    document.getElementById("newSessionButton");


/* =========================
   LOAD PHOTOS
========================= */

if (!photoData) {

    finalPhotos.innerHTML = `
        <p style="
            padding: 30px;
            font-family: monospace;
            font-size: 10px;
        ">
            NO PHOTOS FOUND.
        </p>
    `;

} else {

    const photos = JSON.parse(photoData);

    photos.forEach((photo, index) => {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "final-photo";

        const image =
            document.createElement("img");

        image.src = photo;

        image.alt =
            `Jankbox final photo ${index + 1}`;

        wrapper.appendChild(image);

        finalPhotos.appendChild(wrapper);

    });

}


/* =========================
   APPLY FILTER
========================= */

const images =
    document.querySelectorAll(".final-photo img");


images.forEach(image => {

    if (selectedFilter === "film") {

        image.style.filter =
            "contrast(1.05) saturate(.85) sepia(.12)";

    } else if (selectedFilter === "bw") {

        image.style.filter =
            "grayscale(1) contrast(1.08)";

    } else if (selectedFilter === "warm") {

        image.style.filter =
            "sepia(.18) saturate(1.2) contrast(1.02)";

    } else {

        image.style.filter = "none";

    }

});


/* =========================
   APPLY FRAME
========================= */

if (selectedFrame === "y2k") {

    photostripFinal.style.background =
        "#e8dff5";

    photostripFinal.style.boxShadow =
        "8px 8px 0 #111111";

} else if (selectedFrame === "minimal") {

    photostripFinal.style.background =
        "#ffffff";

    photostripFinal.style.boxShadow =
        "0 15px 35px rgba(17,17,17,.08)";

} else {

    photostripFinal.style.background =
        "#ffffff";

}


/* =========================
   DOWNLOAD
========================= */

downloadButton.addEventListener(
    "click",
    () => {

        const canvas =
            document.createElement("canvas");

        const ctx =
            canvas.getContext("2d");


        const stripWidth = 900;
        const photoWidth = 852;

        const photoHeight = 639;

        const gap = 14;

        const topPadding = 45;

        const bottomPadding = 100;

        const totalHeight =
            topPadding +
            (photoHeight * 4) +
            (gap * 3) +
            bottomPadding;


        canvas.width =
            stripWidth;

        canvas.height =
            totalHeight;


        /* BACKGROUND */

        if (selectedFrame === "y2k") {

            ctx.fillStyle = "#e8dff5";

        } else {

            ctx.fillStyle = "#ffffff";

        }

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        /* LOAD PHOTOS */

        const photos =
            JSON.parse(photoData);


        let loaded =
            0;


        photos.forEach(
            (photo, index) => {

                const image =
                    new Image();

                image.onload = () => {

                    const y =
                        topPadding +
                        index *
                        (photoHeight + gap);


                    /* FILTER */

                    ctx.save();

                    if (selectedFilter === "bw") {

                        ctx.filter =
                            "grayscale(1) contrast(1.08)";

                    } else if (
                        selectedFilter === "film"
                    ) {

                        ctx.filter =
                            "contrast(1.05) saturate(.85) sepia(.12)";

                    } else if (
                        selectedFilter === "warm"
                    ) {

                        ctx.filter =
                            "sepia(.18) saturate(1.2) contrast(1.02)";

                    } else {

                        ctx.filter = "none";

                    }


                    ctx.drawImage(
                        image,
                        24,
                        y,
                        photoWidth,
                        photoHeight
                    );

                    ctx.restore();


                    loaded++;


                    if (
                        loaded === photos.length
                    ) {

                        /* BRAND */

                        ctx.fillStyle =
                            "#111111";

                        ctx.font =
                            "700 34px 'Space Grotesk'";

                        ctx.fillText(
                            "JANKBOX",
                            24,
                            totalHeight - 55
                        );


                        /* DATE */

                        ctx.fillStyle =
                            "#77736b";

                        ctx.font =
                            "14px 'DM Mono'";

                        ctx.fillText(
                            "09.25.26",
                            24,
                            totalHeight - 30
                        );


                        /* DOWNLOAD */

                        const link =
                            document.createElement("a");

                        link.download =
                            "jankbox-photostrip.jpg";

                        link.href =
                            canvas.toDataURL(
                                "image/jpeg",
                                0.95
                            );

                        link.click();

                    }

                };


                image.src = photo;

            }
        );

    }
);


/* =========================
   NEW SESSION
========================= */

newSessionButton.addEventListener(
    "click",
    () => {

        sessionStorage.removeItem(
            "jankboxPhotos"
        );

        sessionStorage.removeItem(
            "jankboxFilter"
        );

        sessionStorage.removeItem(
            "jankboxFrame"
        );

        window.location.href =
            "../booth/booth.html";

    }
);