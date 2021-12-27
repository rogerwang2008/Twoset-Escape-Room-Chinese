(() => {
    "use strict";
    const t = 1334 / 750;

    function e(t) {
        t.classList.add("animate-close-dialogue"), setTimeout((() => {
            t.classList.remove("animate-close-dialogue"), t.style.display = "none"
        }), 800)
    }

    const s = t => new Promise((e => setTimeout(e, t)));

    class i {
        constructor(t) {
            this.element = t, this.dialogueModal = document.getElementById("dialogue"), this.triangle = document.getElementById("dialogueTriangle"), this.paganiniTriangle = document.getElementById("paganiniTriangle")
        }

        show = () => {
            this.dialogueModal.style.display = "block", this.element.style.display = "block"
        };
        next = () => {
            this.element.style.display = "block"
        };
        hide = () => {
            this.element.style.display = "none"
        };
        close = async () => {
            e(this.element), await s(800), this.dialogueModal.style.display = "none"
        };
        addClickListener = t => {
            this.triangle.style.display = "block", window.addEventListener("click", (() => {
                t(), this.triangle.style.display = "none"
            }), {once: !0})
        };
        showAndClickClose = async () => {
            this.show(), await s(1e3), this.triangle.style.display = "block", window.addEventListener("click", (t => {
                this.close(), this.triangle.style.display = "none"
            }), {once: !0})
        };
        paganiniDialogue = async () => {
            this.show(), await s(2e3), this.paganiniTriangle.style.display = "block", window.addEventListener("click", (() => {
                this.close(), this.paganiniTriangle.style.display = "none"
            }), {once: !0})
        }
    }

    function n(t, e) {
        for (; t.childNodes[0];) t.removeChild(t.childNodes[0]);
        e && t.appendChild(document.createTextNode(e))
    }

    const o = 441.4, a = 1.05946309436, l = {
        c: Math.round(o / Math.pow(a, 9) * 10) / 10,
        cSharp: Math.round(o / Math.pow(a, 8) * 10) / 10,
        d: Math.round(o / Math.pow(a, 7) * 10) / 10,
        dSharp: Math.round(o / Math.pow(a, 6) * 10) / 10,
        e: Math.round(o / Math.pow(a, 5) * 10) / 10,
        f: Math.round(o / Math.pow(a, 4) * 10) / 10,
        fSharp: Math.round(o / Math.pow(a, 3) * 10) / 10,
        g: Math.round(o / Math.pow(a, 2) * 10) / 10,
        gSharp: Math.round(4166.261216174224) / 10,
        a: o,
        aSharp: Math.round(4676.47009850504) / 10,
        b: Math.round(o * Math.pow(a, 2) * 10) / 10,
        // c: Math.round(o * Math.pow(a, 3) * 10) / 10
    }, h = {
        c: document.getElementById("audio-c"),
        cSharp: document.getElementById("audio-cSharp"),
        d: document.getElementById("audio-d"),
        dSharp: document.getElementById("audio-dSharp"),
        e: document.getElementById("audio-e"),
        f: document.getElementById("audio-f"),
        fSharp: document.getElementById("audio-fSharp"),
        g: document.getElementById("audio-g"),
        gSharp: document.getElementById("audio-gSharp"),
        a: document.getElementById("audio-a"),
        aSharp: document.getElementById("audio-aSharp"),
        b: document.getElementById("audio-b")
    };

    class d {
        constructor(t, e, s, i, n, o, a) {
            this.element = document.getElementById("manuscript" + t), this.topPercentage, this.leftPercentage, this.finalX = s, this.finalY = i, this.locked = n, this.stage = e, this.errorMargin = 4, this.manuscripts = o, this.perform = a, this.num = t, this.init()
        }

        show() {
            this.element.style.display = "block"
        }

        init() {
            this.draggableElement(this.element)
        }

        calculatePosPercentage(t, e) {
            this.topPercentage = e / this.stage.height * 100, this.leftPercentage = t / this.stage.width * 100
        }

        draggableElement = t => {
            let e, s;

            function i(t) {
                e = t.pageX, s = t.pageY, document.onmouseup = o, document.ontouchend = o, document.onmousemove = n, document.ontouchmove = n
            }

            t.onmousedown = i, t.ontouchstart = i;
            const n = t => {
                if (this.locked) return;
                const i = e - t.pageX, n = s - t.pageY;
                e = t.pageX, s = t.pageY;
                const o = this.element.offsetLeft - i, a = this.element.offsetTop - n;
                this.calculatePosPercentage(o, a), this.element.style.top = this.topPercentage + "%", this.element.style.left = this.leftPercentage + "%"
            }, o = () => {
                Math.abs(this.topPercentage - this.finalY) < this.errorMargin && Math.abs(this.leftPercentage - this.finalX) < this.errorMargin && this.snapElement(this.element), document.onmouseup = null, document.ontouchend = null, document.onmousemove = null, document.ontouchmove = null
            }
        };
        snapElement = t => {
            this.manuscripts.collected[0] && (this.element.style.top = `${this.finalY}%`, this.element.style.left = `${this.finalX}%`, this.locked = !0, this.perform.updateManuscriptsLocked(this.num), this.perform.checkPuzzleSolved())
        }
    }

    class r {
        constructor(t) {
            this.element = document.getElementById("endScreen"), this.endMessage = document.getElementById("endMessage"), this.video = document.getElementById("videoView"), this.frame = document.getElementById("photoFrame"), this.takePhotoBtn = document.getElementById("takePhoto"), this.retakePhotoBtn = document.getElementById("retakePhoto"), this.downloadPhotoBtn = document.getElementById("downloadPhoto"), this.shareTwitterBtn = document.getElementById("shareTwitter"), this.shareFacebookBtn = document.getElementById("shareFacebook"), this.doneBtn = document.getElementById("done"), this.canvas = document.getElementById("canvas"), this.photoOutput = document.getElementById("photoOutput"), this.canvas.width = 633, this.canvas.height = 750, this.context = canvas.getContext("2d"), this.context.translate(633, 0), this.context.scale(-1, 1), this.countdownText = document.getElementById("countdown"), this.completionTime = t, this.init(), this.initWebcam(), this.takePhotoBtn.onclick = t => this.takePhotoButtonClick(t), this.retakePhotoBtn.onclick = t => this.retakePhotoButtonClick(t), this.downloadPhotoBtn.onclick = () => this.downloadPhotoClick(), this.shareTwitterBtn.onclick = () => this.shareTwitter(), this.shareFacebookBtn.onclick = () => this.shareFacebook()
        }

        init() {
            this.element.classList.add("animate-show-dialogue"), this.endMessage.classList.add("animate-show-dialogue"), setTimeout((() => {
                this.element.style.display = "block", this.endMessage.style.display = "block", this.initWebcam()
            }), 800), this.renderEndMessage()
        }

        initWebcam() {
            navigator.mediaDevices.getUserMedia && navigator.mediaDevices.getUserMedia({
                video: !0,
                audio: !1
            }).then((t => {
                this.video.srcObject = t, this.video.play()
            })).catch((function (t) {
                console.log(t)
            }))
        }

        takePhotoButtonClick = t => {
            this.startTimer(), t.preventDefault(), this.takePhotoBtn.style.display = "none", this.retakePhotoBtn.style.display = "block"
        };
        retakePhotoButtonClick = t => {
            this.clearPhoto(), t.preventDefault(), this.takePhotoBtn.style.display = "block", this.retakePhotoBtn.style.display = "none"
        };
        downloadPhotoClick = () => {
            this.downloadPhotoBtn.href = this.photoOutput.firstChild.src.replace("image/png", "image/octet-stream")
        };
        shareTwitter = () => {
            var t = "https://twitter.com/intent/tweet?text=I%20completed%20the%20TwoSet%20Escape%20Room%20in%20" + this.endMessage.innerHTML.replaceAll(" ", "+").replace(",", "%2C") + "%21%20Can%20you%20beat%20my%20time%3F%20twosetescaperoom.com%20@twosetviolin%20%23twosetescaperoom";
            this.shareTwitterBtn.href = t
        };
        shareFacebook = () => {
            var t = "https://facebook.com/sharer/sharer.php?u=twosetescaperoom.com&quote=I%20completed%20the%20TwoSet%20Escape%20Room%20in%20" + this.endMessage.innerHTML.replaceAll(" ", "+").replace(",", "%2C") + "%21%20Can%20you%20beat%20my%20time%3F%20@twosetviolin%20%23twosetescaperoom";
            this.shareFacebookBtn.href = t
        };

        renderEndMessage() {
            const t = Math.round(this.completionTime / 1e3), e = t % 60, s = t - e, i = Math.floor(s / 3600),
                n = `${i > 0 ? i + " hours, " : ""}${s / 60 % 60} minutes and ${e} seconds`;
            this.endMessage.innerHTML = n
        }

        startTimer = () => {
            let t = 3;
            this.countdownText.innerHTML = t, this.countdownText.style.display = "block";
            let e = setInterval((() => {
                this.countdownText.style.display = "none", t--, this.countdownText.innerHTML = t, this.countdownText.style.display = "block", 0 === t && (this.countdownText.style.display = "none", clearInterval(e), this.takepicture())
            }), 1e3)
        };

        takepicture() {
            this.context.drawImage(this.video, -90, 78, 789, 590), this.context.scale(-1, 1), this.context.drawImage(this.frame, 0, 0, -633, 750);
            var t = canvas.toDataURL("image/png");
            const e = new Image;
            e.crossOrigin = "anonymous", e.setAttribute("src", t), photoOutput.appendChild(e), this.photoOutput.firstChild.style.height = "100%"
        }

        clearPhoto() {
            this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, canvas.width, canvas.height), this.context.setTransform(-1, 0, 0, 1, 633, 0), photoOutput.innerHTML = ""
        }
    }

    const c = new class {
            constructor() {
                this.elemsWithBackgrounds, this.imageUrls, this.imagesLoaded = 0, this.preloadedImages = [], this.totalImages, this.getAllElementsWithImages(), this.getImageUrls(), this.preloadImages(), this.backgroundSizes
            }

            getImagesLoaded = () => this.imagesLoaded;

            getAllElementsWithImages() {
                const t = document.querySelectorAll("*");
                this.elemsWithBackgrounds = Array.from(t).filter((t => window.getComputedStyle(t).backgroundImage.indexOf("url") > -1))
            }

            getImageUrls() {
                const t = location.protocol, e = location.hostname, s = location.port;
                console.log(t,e,s)
                if (this.imageUrls = this.elemsWithBackgrounds.map((i => window.getComputedStyle(i).backgroundImage.slice(5, -2).replace(`${t}//${e}:${s}`, ""))), this.backgroundSizes = this.elemsWithBackgrounds.map((t => window.getComputedStyle(t).backgroundSize)), this.totalImages = this.imageUrls.length, 0 === this.totalImages) return this.preloadImages()
            }

            preloadImages() {
                for (let t = 0; t < this.totalImages; t++) this.preloadedImages[t] = new Image, this.preloadedImages[t].addEventListener("load", (() => {
                    this.imagesLoaded++, this.elemsWithBackgrounds[t].style.background = `transparent url(${this.preloadedImages[t].src}) 50% 50% no-repeat`, this.elemsWithBackgrounds[t].style.backgroundSize = this.backgroundSizes[t]
                })), this.preloadedImages[t].src = this.imageUrls[t]
            }
        }, m = (new class {
            constructor(t) {
                this.progressBar = document.getElementById("progressBar"), this.element = document.getElementById("loader"), this.updateProgressBarId, this.init(), this.totalImages = t.totalImages, this.getImagesLoaded = t.getImagesLoaded
            }

            updateProgressBar = () => {
                const t = this.getImagesLoaded(), s = Math.round(t / this.totalImages * 100);
                s < 100 ? this.progressBar.style.width = s + "%" : (clearInterval(this.updateProgressBarId), e(this.element))
            };

            init() {
                "complete" === document.readyState && "loaded" === document.fonts.status ? this.element.style.display = "none" : (this.element.style.display = "block", window.addEventListener("DOMContentLoaded", (() => {
                    this.updateProgressBarId = setInterval((() => this.updateProgressBar()), 100)
                })))
            }
        }(c), new class {
            constructor() {
                this.element = document.getElementById("stage"), this.height, this.width, this.setStageDimensions(window.innerWidth, window.innerHeight), this.resizeListener(), this.fontDisplayElems = document.querySelectorAll(".fontResize"), this.initialFontSizes, this.getInitialFontSizes(), this.fontSizes, this.setFontSizes()
            }

            getInitialFontSizes() {
                this.initialFontSizes = Array.from(this.fontDisplayElems).map((t => window.getComputedStyle(t, null).getPropertyValue("font-size")))
            }

            setFontSizes() {
                this.fontSizes = this.initialFontSizes.map((t => parseInt(t.replace("px", "")) / 1334 * this.width));
                for (let t = 0; t < this.fontSizes.length; t++) this.fontDisplayElems[t].style.fontSize = this.fontSizes[t] + "px"
            }

            resizeListener = () => {
                window.addEventListener("resize", (() => {
                    this.setStageDimensions(window.innerWidth, window.innerHeight), this.setFontSizes()
                }))
            };
            setStageDimensions = (e, s) => {
                e / s > t ? (this.height = s < 750 ? s : 750, this.width = this.height * t) : (this.width = e < 1334 ? e : 1334, this.height = this.width / t), this.element.style.width = this.width + "px", this.element.style.height = this.height + "px"
            }
        }), u = new class {
            constructor() {
                this.startTime, this.endTime, this.countdownMinutes = 60, this.countdownSeconds = 0, this.updateCountDownId, this.clock = document.getElementById("clock")
            }

            start() {
                this.startTime = Date.now(), this.updateCountDownId = setInterval(this.updateCountDown, 1e3)
            }

            stop() {
                this.endTime = Date.now()
            }

            updateCountDown = () => {
                if (0 === this.countdownMinutes && 0 === this.countdownSeconds) return clearInterval(this.updateCountDownId);
                0 === this.countdownSeconds ? (this.countdownSeconds = 59, this.countdownMinutes--) : this.countdownSeconds--, this.updateClockDisplay()
            };
            updateClockDisplay = () => {
                const t = this.countdownSeconds < 10 ? "0" + this.countdownSeconds : this.countdownSeconds.toString(),
                    e = this.countdownMinutes < 10 ? "0" + this.countdownMinutes : this.countdownMinutes.toString();
                n(clock, `${e}:${t}`)
            };

            getCompletionTime() {
                return this.endTime - this.startTime
            }
        }, p = (new class {
            constructor(t) {
                this.element = document.getElementById("intro"), this.start = document.getElementById("start"), this.startSound = document.getElementById("startSound"), this.intialize(), this.startTimer = () => t.start()
            }

            intialize = () => {
                this.start.addEventListener("click", (() => {
                    e(this.element), this.startSound.play(), this.startTimer()
                }))
            }
        }(u), new class {
            constructor() {
                this.elements, this.collected = [!1, !1, !1, !1], this.getElements()
            }

            getElements() {
                const t = document.getElementById("perform"), e = [].filter.call(t.childNodes, (function (t) {
                    return t.id && -1 !== t.id.indexOf("manuscript")
                }));
                this.elements = e
            }

            getNumberCollected = () => this.collected.filter(Boolean).length;

            obtainNew(t) {
                return this.collected[t] = !0
            }
        }), g = new class {
            constructor(t, e) {
                this.element = document.getElementById("perform"), this.message = document.getElementById("nothing"), this.getNumberCollected = () => t.getNumberCollected(), this.collected = t.collected, this.manuscripts = t.elements, this.solved = !1, this.paganiniDialogue = new i(document.getElementById("paganiniDialogue")), this.paganiniDialogueTransparent = document.getElementById("paganiniDialogueTransparent"), this.performPlayButton = document.getElementById("performPlay"), this.finalAudio = document.getElementById("finalPerformanceAudio"), this.modal = document.getElementById("modal"), this.closeModal = document.getElementById("closeModal"), this.performPlayButton.onclick = () => this.perform(), this.manuscriptsLocked = [!0, !1, !1, !1]
            }

            perform = async () => {
                this.closeModal.style.display = "none", this.finalAudio.play(), this.solved = !0, e(this.performPlayButton), await s(1e3 * this.finalAudio.duration), await s(500);
                for (let t = 0; t < this.manuscripts.length; t++) e(this.manuscripts[t]);
                this.hide(), this.modal.style.display = "none", this.paganiniDialogue.paganiniDialogue(), this.closeModal.style.display = "flex"
            };

            updateManuscriptsLocked(t) {
                this.manuscriptsLocked[t - 1] = !0
            }

            show = () => {
                if (this.solved) return this.element.style.display = "flex", this.paganiniDialogueTransparent.style.display = "block";
                if (this.element.style.display = "flex", 0 === this.getNumberCollected()) return this.message.style.display = "block";
                this.message.style.display = "none";
                for (let t = 0; t < 4; t++) this.collected[t] && (this.manuscripts[t].style.display = "block")
            };
            hide = () => {
                this.element.style.display = "none"
            };
            checkPuzzleSolved = () => {
                this.manuscriptsLocked.every((t => t)) && !this.solved && (this.performPlayButton.style.display = "block")
            }
        }(p, u),
        y = (new d(1, m, -10, 10, !0, p, g), new d(2, m, 8.34575712143928, 7.119, !1, p, g), new d(3, m, 6.705397301349326, 67.15882352941175, !1, p, g), new d(4, m, 7.136431784107945, 15.333333333333332, !1, p, g), new class {
            constructor(t, e) {
                this.numpad = document.getElementById("escapeNumpad"), this.display = document.getElementById("escapeDisplay"), this.wrongAudio = document.getElementById("wrongCode"), this.safeBeep = document.getElementById("safeBeep"), this.userInput = "", this.answer = "2440", this.init(), this.performance = t, this.gameTimer = e
            }

            init() {
                Array.from(this.numpad.children).flatMap((t => Array.from(t.children))).forEach((t => t.addEventListener("click", (t => this.handleUserInput(t)))))
            }

            handleUserInput = t => {
                const e = t.target.id.replace("escapeNumpad", "");
                return "Ok" === e ? this.checkCode() : "C" === e ? (this.userInput = this.userInput.slice(0, -1), void n(this.display, this.userInput)) : void (this.userInput.length > 3 || (this.userInput = this.userInput + e, this.safeBeep.play(), n(this.display, this.userInput)))
            };
            clearInput = () => {
                this.userInput = "", n(this.display, this.userInput)
            };

            checkCode() {
                const t = this.performance.solved;
                if (this.userInput !== this.answer || !t) return this.wrongAudio.play(), n(this.display, "RETRY"), void setTimeout((() => {
                    this.clearInput()
                }), 1e3);
                this.finishGame()
            }

            finishGame() {
                this.gameTimer.stop();
                const t = this.gameTimer.getCompletionTime();
                new r(t)
            }
        }(g, u)), I = (new class {
            constructor() {
                this.hiddenButton = document.getElementById("hiddenButton"), this.foundEnvelopeDialogue = new i(document.getElementById("foundEnvelopeDialogue")), this.hiddenEnvelope = document.getElementById("hiddenEnvelope"), this.modal = document.getElementById("modal"), this.letterModal = document.getElementById("letterModal"), this.choice = document.getElementById("choice"), this.init()
            }

            init() {
                this.hiddenButton.addEventListener("click", (() => {
                    this.foundEnvelope()
                }))
            }

            foundEnvelope = () => {
                this.foundEnvelopeDialogue.showAndClickClose(), this.hiddenEnvelope.style.display = "block", this.hiddenButton.style.display = "none", this.hiddenEnvelope.addEventListener("click", (() => {
                    this.openEnvelope()
                }))
            };

            openEnvelope() {
                this.modal.style.display = "block", this.choice.style.display = "none", this.letterModal.style.display = "block"
            }
        }, new class {
            constructor(t) {
                this.element = document.getElementById("ipad"), this.ipadPuzzle = document.getElementById("ipadPuzzle"), this.ipadHint = document.getElementById("ipadHint"), this.buttons = document.getElementById("ipadButtons"), this.compose = document.getElementById("composeButton"), this.buttons.onclick = t => this[t.target.id](), this.compose.onclick = () => this.puzzleCheck(), this.manuscripts = t, this.manuscriptObtained = new i(document.getElementById("foundManuscript")), this.timeSignatures = ["twoFour", "threeFour", "fourFour", "sixEight"], this.currentTimeSig = "twoFour", this.keySignatures = ["flat7", "flat6", "flat5", "flat4", "flat3", "flat2", "flat1", "natural", "sharp1", "sharp2", "sharp3", "sharp4", "sharp5", "sharp6", "sharp7"], this.currentKeySig = "natural"
            }

            show() {
                this.element.style.display = "block", this.ipadPuzzle.style.display = "block"
            }

            clickHandler = t => {
                this[t.target.id]()
            };

            timeSigUp() {
                document.getElementById(this.currentTimeSig).style.display = "none";
                const t = this.timeSignatures.indexOf(this.currentTimeSig);
                t === this.timeSignatures.length - 1 ? this.currentTimeSig = this.timeSignatures[0] : this.currentTimeSig = this.timeSignatures[t + 1], document.getElementById(this.currentTimeSig).style.display = "block"
            }

            timeSigDown() {
                document.getElementById(this.currentTimeSig).style.display = "none";
                const t = this.timeSignatures.indexOf(this.currentTimeSig);
                this.currentTimeSig = 0 === t ? this.timeSignatures[this.timeSignatures.length - 1] : this.timeSignatures[t - 1], document.getElementById(this.currentTimeSig).style.display = "block"
            }

            keySigUp() {
                const t = this.keySignatures.indexOf(this.currentKeySig);
                t !== this.keySignatures.length - 1 && ("natural" !== this.currentKeySig && (document.getElementById(this.currentKeySig).style.display = "none"), this.currentKeySig = this.keySignatures[t + 1], document.getElementById(this.currentKeySig).style.display = "block")
            }

            keySigDown() {
                const t = this.keySignatures.indexOf(this.currentKeySig);
                if (0 === t) return;
                const e = this.keySignatures[t - 1];
                "natural" !== e && (document.getElementById(e).style.display = "block"), "natural" !== this.currentKeySig && (document.getElementById(this.currentKeySig).style.display = "none"), this.currentKeySig = e
            }

            keySigUp() {
                const t = this.keySignatures.indexOf(this.currentKeySig);
                if (t === this.keySignatures.length - 1) return;
                const e = this.keySignatures[t + 1];
                "natural" !== e && (document.getElementById(e).style.display = "block"), "natural" !== this.currentKeySig && (document.getElementById(this.currentKeySig).style.display = "none"), this.currentKeySig = this.keySignatures[t + 1]
            }

            puzzleCheck() {
                if ("sharp4" !== this.currentKeySig || "fourFour" !== this.currentTimeSig) return console.log("fail");
                this.manuscriptObtained.showAndClickClose(), this.manuscripts.obtainNew(0), this.ipadPuzzle.style.display = "none", this.ipadHint.style.display = "block"
            }
        }(p)), w = new class {
            constructor(t, e) {
                this.element = document.getElementById("pokerScreen"), this.scrollButtons = document.getElementById("pokerScrollButtons").children, this.instruments = document.querySelectorAll(".instruments"), this.pokerPanels = document.querySelectorAll(".pokerPanel"), this.panelArray = [1, 1, 1, 1, 1], this.sliding = [!1, !1, !1, !1, !1], this.tick = document.getElementById("tick"), this.cross = document.getElementById("cross"), this.rhythmFlash = document.getElementById("rhythmFlash"), this.pressMeButton = document.getElementById("pokerPressButton"), this.pokerDisplayTimeout, this.rhythmClues = document.querySelectorAll(".rhythmClue"), this.pokerWinSound = document.getElementById("pokerWinningSound"), this.wrongBuzzerSound = document.getElementById("pokerWrongSound"), this.initIpad = () => e.show(), this.manuscriptObtained = new i(document.getElementById("foundManuscript")), this.manuscripts = t
            }

            init() {
                this.element.style.display = "block", this.pressMeButton.onclick = () => this.pokerPress();
                for (let t = 0; t < this.scrollButtons.length; t++) this.scrollButtons[t].addEventListener("click", (() => {
                    this.sliding[t] || (this.sliding[t] = !0, this.panelArray[t] = this.panelArray[t] + 1, this.slideDisplay(t))
                }))
            }

            slideDisplay(t) {
                let e = 100 * -(this.panelArray[t] - 2), s = 100 * -(this.panelArray[t] - 1);
                const i = setInterval((() => {
                    if (e <= s) return clearInterval(i), this.sliding[t] = !1, 10 !== this.panelArray[t] ? void 0 : (this.panelArray[t] = 1, this.instruments[t].style.top = "0%");
                    e--, this.instruments[t].style.top = e + "%"
                }), 5)
            }

            pokerPress() {
                this.solved || this.checkPokerPuzzle()
            }

            checkPokerPuzzle = async () => {
                if (clearTimeout(this.pokerDisplayTimeout), !function (t, e) {
                    if (t === e) return !0;
                    if (null == t || null == e) return !1;
                    if (t.length !== e.length) return !1;
                    for (var s = 0; s < t.length; ++s) if (t[s] !== e[s]) return !1;
                    return !0
                }(this.panelArray, [3, 9, 1, 6, 4])) return this.wrongBuzzerSound.play(), this.cross.style.display = "block", this.pokerDisplayTimeout = setTimeout((() => this.cross.style.display = "none"), 1e3), console.log("fail");
                this.pokerWinSound.play(), this.tick.style.display = "block", this.pokerDisplayTimeout = setTimeout((() => this.tick.style.display = "none"), 1e3), this.initIpad(), this.solved = !0, this.manuscripts.obtainNew(3);
                for (let t = 0; t < this.instruments.length; t++) this.instruments[t].classList.add("animate-close-dialogue"), setTimeout((() => {
                    this.instruments[t].style.display = "none", this.rhythmClues[t].style.display = "block", this.rhythmFlash.style.display = "block"
                }), 2e3);
                await s(500), this.manuscriptObtained.show(), await s(1e3), this.manuscriptObtained.addClickListener((() => {
                    this.manuscriptObtained.close()
                }))
            }
        }(p, I), k = (new class {
            constructor(t, e) {
                this.metronomeLight = document.getElementById("metronomeLight"), this.metronomeDisplay = document.getElementById("metronomeDisplay"), this.metronomeButtons = document.getElementById("metronomeButtons").children, this.tempo = 140, this.intervalId, this.timeoutId, this.metronomeFlashId, this.metronomePlaying = !1, this.metronomeClick = document.getElementById("metronomeClick"), this.manuscriptObtained = new i(document.getElementById("foundManuscript")), this.manuscripts = t, this.ding = document.getElementById("ding"), this.initPokerMachine = () => e.init(), this.init()
            }

            init() {
                n(this.metronomeDisplay, this.tempo);
                for (let t = 0; t < this.metronomeButtons.length; t++) ["mousedown", "touchstart"].forEach((e => this.metronomeButtons[t].addEventListener(e, (t => {
                    "touchstart" === e && t.preventDefault(), clearInterval(this.metronomeFlashId);
                    const s = t.target.id;
                    switch (s) {
                        case"metronomeStart":
                            this.metronomePlaying ? this.metronomePlaying = !1 : this.metronomeStart();
                            break;
                        case"metronomeUp":
                            this.tempo < 300 && this.tempo++, n(this.metronomeDisplay, this.tempo);
                            break;
                        case"metronomeDown":
                            this.tempo > 30 && this.tempo--, n(this.metronomeDisplay, this.tempo)
                    }
                    this.timeoutId = setTimeout((() => this.handleLongPress(s)), 1e3), window.addEventListener("touchend", (() => {
                        t.preventDefault(), (this.timeoutId || this.intervalId) && (clearTimeout(this.timeoutId), clearInterval(this.intervalId))
                    }), {once: !0}), window.addEventListener("mouseup", (() => {
                        (this.timeoutId || this.intervalId) && (clearTimeout(this.timeoutId), clearInterval(this.intervalId))
                    }), {once: !0})
                }))))
            }

            handleLongPress(t) {
                this.intervalId = setInterval((() => {
                    "metronomeUp" === t && this.tempo < 300 ? this.tempo++ : "metronomeDown" === t && this.tempo > 40 && this.tempo--, n(metronomeDisplay, this.tempo)
                }), 50)
            }

            flashLight() {
                metronomeClick.paused || (metronomeClick.currentTime = 0), metronomeClick.play(), metronomeLight.style.display = "block", setTimeout((() => metronomeLight.style.display = "none"), 50)
            }

            metronomeStart = async () => {
                this.metronomePlaying = !0, this.flashLight(), this.metronomeFlashId = setInterval((() => this.flashLight()), 6e4 / this.tempo), setTimeout((() => {
                    clearInterval(this.metronomeFlashId), this.metronomePlaying = !1
                }), 2500), 225 !== this.tempo || this.solved || (this.solved = !0, this.manuscripts.obtainNew(2), this.initPokerMachine(), ding.play(), this.manuscriptObtained.show(), await s(1e3), this.manuscriptObtained.addClickListener((() => {
                    this.manuscriptObtained.close()
                })))
            }
        }(p, w), new class {
            constructor(t) {
                this.element = document.getElementById("practice"), this.pianoKeys = document.getElementById("pianoKeys"), this.tunerDisplay = document.getElementById("tunerDisplay"), this.tunerLight = document.getElementById("tunerLight"), this.tunerTimeout, this.pianoKeysPressed = [], this.pianoPuzzleSolved = !1, this.solved = !1, this.manuscripts = t, this.manuscriptObtained = new i(document.getElementById("foundManuscript")), this.init()
            }

            init() {
                this.pianoKeys.childNodes.forEach((t => t.addEventListener("mousedown", (t => {
                    clearTimeout(this.tunerTimeout);
                    const e = t.target.id;
                    h[e].currentTime = 0, h[e].play(), this.tunerLight.style.display = "block", n(this.tunerDisplay, l[e]), this.tunerTimeout = setTimeout((() => {
                        n(this.tunerDisplay, ""), this.tunerLight.style.display = "none"
                    }), 1500), this.solved || this.pianoPuzzle(e)
                }))))
            }

            show() {
                this.element.style.display = "block", document.getElementById("c")
            }

            pianoPuzzle = async t => {
                this.solved || (this.pianoKeysPressed.length > 9 && this.pianoKeysPressed.shift(), this.pianoKeysPressed.push(t), "eggcabbage" === this.pianoKeysPressed.join("") && (console.log("success"), this.solved = !0, this.manuscripts.obtainNew(1), this.manuscriptObtained.show(), await s(1e3), this.manuscriptObtained.addClickListener((() => {
                    this.manuscriptObtained.close()
                }))))
            }
        }(p)), B = new class {
            constructor(t, e) {
                this.element = document.getElementById("choice"), this.performButton = document.getElementById("performButton"), this.practiceButton = document.getElementById("practiceButton"), this.escapeButton = document.getElementById("escapeButton"), this.escape = document.getElementById("escape"), this.performButton.onclick = () => {
                    this.element.style.display = "none", e.show()
                }, this.practiceButton.onclick = () => {
                    this.element.style.display = "none", t.show()
                }, this.escapeButton.onclick = () => {
                    this.element.style.display = "none", this.escape.style.display = "block"
                }
            }
        }(k, g), f = new class {
            constructor(t) {
                this.element = document.getElementById("modal"), this.closeModalButton = document.getElementById("closeModal"), this.closeModalButton.onclick = this.closeModal, this.escape = t
            }

            closeModal = () => {
                const t = this.element.children;
                for (let e = 0; e < t.length; e++) "closeModal" !== t[e].id && (t[e].style.display = "none");
                this.element.style.display = "none", this.escape.clearInput()
            };
            openModal = t => {
                this.element.style.display = "block", t.style.display = "block"
            }
        }(y);
    piano.addEventListener("click", (() => {
        f.openModal(B.element)
    })), document.getElementById("pianoKeys"), document.getElementById("perform")
})();
