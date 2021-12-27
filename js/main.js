(() => {
    "use strict";
    const e = new class {
        constructor() {
            this.elemsWithBackgrounds, this.imageUrls, this.imagesLoaded = 0, this.preloadedImages = [], this.totalImages, this.getAllElementsWithImages(), this.getImageUrls(), this.preloadImages(), this.backgroundSizes
        }

        getImagesLoaded = () => this.imagesLoaded;

        getAllElementsWithImages() {
            const e = document.querySelectorAll("*");
            this.elemsWithBackgrounds = Array.from(e).filter((e => window.getComputedStyle(e).backgroundImage.indexOf("url") > -1))
        }

        getImageUrls() {
            const e = location.protocol, t = location.hostname, s = location.port;
            if (this.imageUrls = this.elemsWithBackgrounds.map((a => window.getComputedStyle(a).backgroundImage.slice(5, -2).replace(`${e}//${t}:${s}`, ""))), this.backgroundSizes = this.elemsWithBackgrounds.map((e => window.getComputedStyle(e).backgroundSize)), this.totalImages = this.imageUrls.length, 0 === this.totalImages) {
                return this.preloadImages()
            }
        }

        preloadImages() {
            for (let e = 0; e < this.totalImages; e++) this.preloadedImages[e] = new Image, this.preloadedImages[e].addEventListener("load", () => {
                this.imagesLoaded++, this.elemsWithBackgrounds[e].style.background = `transparent url(${this.preloadedImages[e].src}) 50% 50% no-repeat`, this.elemsWithBackgrounds[e].style.backgroundSize = this.backgroundSizes[e]
            }), this.preloadedImages[e].src = this.imageUrls[e]
        }
    };
    new class {
        constructor(e) {
            this.progressBar = document.getElementById("progressBar"), this.element = document.getElementById("loader"), this.updateProgressBarId, this.init(), this.totalImages = e.totalImages, this.getImagesLoaded = e.getImagesLoaded
        }

        updateProgressBar = () => {
            const e = this.getImagesLoaded(), t = Math.round(e / this.totalImages * 100);
            var s;
            t < 100 ? this.progressBar.style.width = t + "%" : (clearInterval(this.updateProgressBarId), (s = this.element).classList.add("animate-close-dialogue"), setTimeout((() => {
                s.classList.remove("animate-close-dialogue"), s.style.display = "none"
            }), 800))
        };

        init() {
            "complete" === document.readyState && "loaded" === document.fonts.status ? this.element.style.display = "none" : (this.element.style.display = "block", window.addEventListener("DOMContentLoaded", (() => {
                this.updateProgressBarId = setInterval((() => this.updateProgressBar()), 100)
            })))
        }
    }(e)
})();
//# sourceMappingURL=main.js.map;
