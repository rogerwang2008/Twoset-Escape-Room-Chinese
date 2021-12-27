(() => {
    "use strict";
    const t = 1334 / 750;

    function e(t) {
        t.classList.add("animate-close-dialogue"), setTimeout((() => {
            t.classList.remove("animate-close-dialogue"), t.style.display = "none"
        }), 800)
    }

    const i = t => new Promise((e => setTimeout(e, t)));

    class s {
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
            e(this.element), await i(800), this.dialogueModal.style.display = "none"
        };
        addClickListener = t => {
            this.triangle.style.display = "block", window.addEventListener("click", (() => {
                t(), this.triangle.style.display = "none"
            }), {once: !0})
        };
        showAndClickClose = async () => {
            this.show(), await i(1e3), this.triangle.style.display = "block", window.addEventListener("click", (t => {
                this.close(), this.triangle.style.display = "none"
            }), {once: !0})
        };
        paganiniDialogue = async () => {
            this.show(), await i(2e3), this.paganiniTriangle.style.display = "block", window.addEventListener("click", (() => {
                this.close(), this.paganiniTriangle.style.display = "none"
            }), {once: !0})
        }
    }

    function n(t, e) {
        for (; t.childNodes[0];) t.removeChild(t.childNodes[0]);
        e && t.appendChild(document.createTextNode(e))
    }

    const o = [fluteAudio, harpAudio, violinAudio, trumpetAudio, clarinetAudio];

    class a {
        constructor() {
            this.audioPlayerButtons = document.getElementById("audio-player-buttons"), this.audioPlayerDisplay = document.getElementById("audio-player-display"), this.fluteAudio = document.getElementById("fluteAudio"), this.harpAudio = document.getElementById("harpAudio"), this.violinAudio = document.getElementById("violinAudio"), this.trumpetAudio = document.getElementById("trumpetAudio"), this.clarinetAudio = document.getElementById("clarinetAudio"), this.currentTrackNumber = 0, this.audioPlaying, this.initializeDisplay = () => {
                this.audioPlayerDisplay.style.display = "flex";
                for (let t = 0; t < this.audioPlayerButtons.children.length; t++) this.audioPlayerButtons.children[t].style.display = "block", n(this.audioPlayerDisplay, "曲目 01")
            }, this.initializeButtons = () => {
                this.audioPlayerButtons.childNodes.forEach((t => {
                    t.addEventListener("click", this.handleButtonPress)
                }))
            }, this.initializeDisplay(), this.initializeButtons()
        }

        handleButtonPress = t => {
            switch (t.target.id) {
                case"play-button":
                    o[this.currentTrackNumber].play(), this.audioPlaying = !0;
                    break;
                case"stop-button":
                    if (!this.audioPlaying) return;
                    this.stopAudio(o[this.currentTrackNumber]), this.audioPlaying = !1;
                    break;
                case"next-button":
                    this.audioPlaying && this.stopAudio(o[this.currentTrackNumber]), this.currentTrackNumber += 1, this.currentTrackNumber > o.length - 1 && (this.currentTrackNumber = 0), this.audioPlaying && o[this.currentTrackNumber].play();
                    break;
                case"back-button":
                    this.audioPlaying && this.stopAudio(o[this.currentTrackNumber]), this.currentTrackNumber -= 1, this.currentTrackNumber < 0 && (this.currentTrackNumber = o.length - 1), this.audioPlaying && o[this.currentTrackNumber].play()
            }
            this.trackDisplay = `曲目 0${this.currentTrackNumber + 1}`, n(this.audioPlayerDisplay, this.trackDisplay)
        };
        stopAudio = t => {
            t.pause(), t.currentTime = 0
        }
    }

    const l = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], h = {
        f5: document.getElementById("violin-f5"),
        aSharp4: document.getElementById("violin-aSharp4"),
        dSharp4: document.getElementById("violin-dSharp4"),
        gSharp3: document.getElementById("violin-gSharp3"),
        fSharp5: document.getElementById("violin-fSharp5"),
        b4: document.getElementById("violin-b4"),
        e4: document.getElementById("violin-e4"),
        a3: document.getElementById("violin-a3"),
        g5: document.getElementById("violin-g5"),
        c5: document.getElementById("violin-c5"),
        f4: document.getElementById("violin-f4"),
        aSharp3: document.getElementById("violin-aSharp3"),
        gSharp5: document.getElementById("violin-gSharp5"),
        cSharp5: document.getElementById("violin-cSharp5"),
        fSharp4: document.getElementById("violin-fSharp4"),
        b3: document.getElementById("violin-b3"),
        a5: document.getElementById("violin-a5"),
        d5: document.getElementById("violin-d5"),
        g4: document.getElementById("violin-g4"),
        c4: document.getElementById("violin-c4"),
        aSharp5: document.getElementById("violin-aSharp5"),
        dSharp5: document.getElementById("violin-dSharp5"),
        gSharp4: document.getElementById("violin-gSharp4"),
        cSharp4: document.getElementById("violin-cSharp4"),
        b5: document.getElementById("violin-b5"),
        e5: document.getElementById("violin-e5"),
        a4: document.getElementById("violin-a4"),
        d4: document.getElementById("violin-d4")
    }, r = ["e5", "gSharp5", "gSharp5", "gSharp5", "fSharp5", "e5", "b5"];

    class d {
        constructor(t, e, i, s, n, o, a) {
            this.element = document.getElementById("manuscript" + t), this.topPercentage, this.leftPercentage, this.finalX = i, this.finalY = s, this.locked = n, this.stage = e, this.errorMargin = 4, this.manuscripts = o, this.perform = a, this.num = t, this.init()
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
            let e, i;

            function s(t) {
                e = t.pageX, i = t.pageY, document.onmouseup = o, document.ontouchend = o, document.onmousemove = n, document.ontouchmove = n
            }

            t.onmousedown = s, t.ontouchstart = s;
            const n = t => {
                if (this.locked) return;
                const s = e - t.pageX, n = i - t.pageY;
                e = t.pageX, i = t.pageY;
                const o = this.element.offsetLeft - s, a = this.element.offsetTop - n;
                this.calculatePosPercentage(o, a), this.element.style.top = this.topPercentage + "%", this.element.style.left = this.leftPercentage + "%"
            }, o = () => {
                Math.abs(this.topPercentage - this.finalY) < this.errorMargin && Math.abs(this.leftPercentage - this.finalX) < this.errorMargin && this.snapElement(this.element), document.onmouseup = null, document.ontouchend = null, document.onmousemove = null, document.ontouchmove = null
            }
        };
        snapElement = t => {
            this.manuscripts.collected[0] && (this.element.style.top = `${this.finalY}%`, this.element.style.left = `${this.finalX}%`, this.locked = !0, this.perform.updateManuscriptsLocked(this.num), this.perform.checkPuzzleSolved())
        }
    }

    class c {
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
            const t = Math.round(this.completionTime / 1e3), e = t % 60, i = t - e, s = Math.floor(i / 3600),
                n = `${s > 0 ? s + " hours, " : ""}${i / 60 % 60} minutes and ${e} seconds`;
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

    const u = new class {
            constructor() {
                this.elemsWithBackgrounds, this.imageUrls, this.imagesLoaded = 0, this.preloadedImages = [], this.totalImages, this.getAllElementsWithImages(), this.getImageUrls(), this.preloadImages(), this.backgroundSizes
            }

            getImagesLoaded = () => this.imagesLoaded;

            getAllElementsWithImages() {
                const t = document.querySelectorAll("*");
                this.elemsWithBackgrounds = Array.from(t).filter((t => window.getComputedStyle(t).backgroundImage.indexOf("url") > -1))
            }

            getImageUrls() {
                const t = location.protocol, e = location.hostname, i = location.port;
                console.log(t, e, i)
                if (this.imageUrls = this.elemsWithBackgrounds.map((s => window.getComputedStyle(s).backgroundImage.slice(5, -2).replace(`${t}//${e}:${i}`, ""))), this.backgroundSizes = this.elemsWithBackgrounds.map((t => window.getComputedStyle(t).backgroundSize)), this.totalImages = this.imageUrls.length, 0 === this.totalImages) return this.preloadImages();
                // if (this.imageUrls = this.elemsWithBackgrounds.map((s => window.getComputedStyle(s).backgroundImage.slice(5, -2).replace(`${t}//${e}:${i}`, "."))), this.backgroundSizes = this.elemsWithBackgrounds.map((t => window.getComputedStyle(t).backgroundSize)), this.totalImages = this.imageUrls.length, 0 === this.totalImages) return this.preloadImages()
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
                const t = this.getImagesLoaded(), i = Math.round(t / this.totalImages * 100);
                i < 100 ? this.progressBar.style.width = i + "%" : (clearInterval(this.updateProgressBarId), e(this.element))
            };

            init() {
                "complete" === document.readyState && "loaded" === document.fonts.status ? this.element.style.display = "none" : (this.element.style.display = "block", window.addEventListener("DOMContentLoaded", (() => {
                    this.updateProgressBarId = setInterval((() => this.updateProgressBar()), 100)
                })))
            }
        }(u), new class {
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
            setStageDimensions = (e, i) => {
                e / i > t ? (this.height = i < 750 ? i : 750, this.width = this.height * t) : (this.width = e < 1334 ? e : 1334, this.height = this.width / t), this.element.style.width = this.width + "px", this.element.style.height = this.height + "px"
            }
        }), p = new class {
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
        }, g = (new class {
            constructor(t) {
                this.element = document.getElementById("intro"), this.start = document.getElementById("start"), this.startSound = document.getElementById("startSound"), this.intialize(), this.startTimer = () => t.start()
            }

            intialize = () => {
                this.start.addEventListener("click", (() => {
                    e(this.element), this.startSound.play(), this.startTimer()
                }))
            }
        }(p), new class {
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
        }), y = new class {
            constructor(t, e) {
                this.element = document.getElementById("perform"), this.message = document.getElementById("nothing"), this.getNumberCollected = () => t.getNumberCollected(), this.collected = t.collected, this.manuscripts = t.elements, this.solved = !1, this.paganiniDialogue = new s(document.getElementById("paganiniDialogue")), this.paganiniDialogueTransparent = document.getElementById("paganiniDialogueTransparent"), this.performPlayButton = document.getElementById("performPlay"), this.finalAudio = document.getElementById("finalPerformanceAudio"), this.modal = document.getElementById("modal"), this.closeModal = document.getElementById("closeModal"), this.performPlayButton.onclick = () => this.perform(), this.manuscriptsLocked = [!0, !1, !1, !1]
            }

            perform = async () => {
                this.closeModal.style.display = "none", this.finalAudio.play(), this.solved = !0, e(this.performPlayButton), await i(1e3 * this.finalAudio.duration), await i(500);
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
        }(g, p), B = new class {
            constructor(t) {
                this.element = document.getElementById("practice"), this.violinNotes = document.querySelectorAll(".violinNote"), this.init(), this.inputArray = [], this.obtainedManuscript = new s(document.getElementById("foundManuscript")), this.manuscripts = t
            }

            show() {
                this.element.style.display = "block"
            }

            hide() {
                this.element.style.display = "none"
            }

            init() {
                this.violinNotes.forEach((t => t.addEventListener("mousedown", (t => {
                    const e = t.target.id;
                    h[e].paused || (h[e].currentTime = 0), h[e].play(), this.playNote(t.target.id)
                }))))
            }

            playNote(t) {
                7 === this.inputArray.length && this.inputArray.shift(), this.inputArray.push(t), function (t, e) {
                    if (t === e) return !0;
                    if (null == t || null == e) return !1;
                    if (t.length !== e.length) return !1;
                    for (var i = 0; i < t.length; ++i) if (t[i] !== e[i]) return !1;
                    return !0
                }(this.inputArray, r) && (this.obtainedManuscript.showAndClickClose(), this.manuscripts.obtainNew(0))
            }
        }(g),
        f = (new d(1, m, 10, 10, !0, g, y), new d(2, m, 46.9861, 15.9, !1, g, y), new d(3, m, 9.196, 27.755, !1, g, y), new d(4, m, 46.1360123, 31.88954, !1, g, y), new class {
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
                new c(t)
            }
        }(y, p)), I = new class {
            constructor(t, e) {
                this.element = document.getElementById("choice"), this.performButton = document.getElementById("performButton"), this.practiceButton = document.getElementById("practiceButton"), this.escapeButton = document.getElementById("escapeButton"), this.escape = document.getElementById("escape"), this.performButton.onclick = () => {
                    this.element.style.display = "none", e.show()
                }, this.practiceButton.onclick = () => {
                    this.element.style.display = "none", t.show()
                }, this.escapeButton.onclick = () => {
                    this.element.style.display = "none", this.escape.style.display = "block"
                }
            }
        }(B, y), w = new class {
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
        }(f), k = new class {
            constructor() {
                this.element = document.getElementById("tvScreen"), this.conductor = document.getElementById("conductor"), this.scale = document.getElementById("scale"), this.circleOfFifths = document.getElementById("circleOfFifths"), this.channelUpButton = document.getElementById("channelUpButton"), this.channelDownButton = document.getElementById("channelDownButton"), this.buttons = [this.channelUpButton, this.channelDownButton], this.currentChannel = 1, this.channels = [this.conductor, this.circleOfFifths]
            }

            initializeButtons() {
                this.buttons.forEach((t => {
                    t.style.display = "block", t.style.cursor = "pointer", t.addEventListener("click", (t => "channelUpButton" === t.target.id ? this.channelUp() : "channelDownButton" === t.target.id ? this.channelDown() : void 0))
                }))
            }

            show() {
                this.element.style.display = "block", this.conductor.style.display = "block", this.initializeButtons()
            }

            channelUp() {
                2 != this.currentChannel && (this.currentChannel++, this.channels[this.currentChannel - 1].style.display = "block", this.channels[this.currentChannel - 2].style.display = "none")
            }

            channelDown() {
                1 !== this.chcurrentChannelannel && (this.currentChannel--, this.channels[this.currentChannel - 1].style.display = "block", this.channels[this.currentChannel].style.display = "none")
            }
        }, E = (new class {
            constructor(t, e) {
                this.snareDrum = document.getElementById("drumHitArea"), this.audio = document.getElementById("snareHit"), this.recordingLightOff = document.getElementById("rec-off"), this.recordingLightOn = document.getElementById("rec-on"), this.onAirLightOff = document.getElementById("on-air-off"), this.onAirLightOn = document.getElementById("on-air-on"), this.conductor = document.getElementById("conductor"), this.ding = document.getElementById("ding"), this.manuscriptObtained = new s(document.getElementById("foundManuscript")), this.tv = e, this.recTimeout, this.timeClicked, this.clickTimesArray = [], this.lastClicked = 0, this.solved = !1, this.manuscripts = t, this.snareDrum.onmousedown = () => {
                    this.snareHit()
                }
            }

            snareHit() {
                this.timeClicked = (new Date).getTime(), this.audio.paused ? this.audio.play() : this.audio.currentTime = 0, this.recordingLights(), this.puzzleLogic()
            }

            recordingLights() {
                this.recordingLightOn.style.display = "block", this.recordingLightOff.style.display = "none", clearTimeout(this.recTimeout), this.recTimeout = setTimeout((() => {
                    this.recordingLightOn.style.display = "none", this.recordingLightOff.style.display = "block"
                }), 2e3)
            }

            onAirLights() {
                this.onAirLightOff.style.display = "none", this.onAirLightOn.style.display = "block"
            }

            async puzzleLogic() {
                if (!this.solved && (this.timeClicked - this.lastClicked > 2e3 && (this.clickTimesArray = []), this.clickTimesArray.push(this.timeClicked), this.lastClicked = this.timeClicked, 8 === this.clickTimesArray.length)) {
                    const t = this.clickTimesArray[1] - this.clickTimesArray[0],
                        e = this.clickTimesArray[2] - this.clickTimesArray[1],
                        s = this.clickTimesArray[3] - this.clickTimesArray[2],
                        n = this.clickTimesArray[4] - this.clickTimesArray[3],
                        o = this.clickTimesArray[5] - this.clickTimesArray[4],
                        a = this.clickTimesArray[6] - this.clickTimesArray[5],
                        l = this.clickTimesArray[7] - this.clickTimesArray[6],
                        h = (t + e + s) / 3, // 三连音音符长 - 基准
                        r = 3 * h, // 四分音符
                        d = r / 2, // 八分音符
                        c = .25; // 容错
                    Math.abs(t / h - 1) < c && Math.abs(e / h - 1) < c && Math.abs(s / h - 1) < c && Math.abs(n / r - 1) < c && Math.abs(o / r - 1) < c && Math.abs(a / d - 1) < c && Math.abs(l / d - 1) < c && (this.solved = !0, await i(600), ding.play(), this.onAirLights(), this.tv.show(), this.manuscriptObtained.show(), await i(1e3), this.manuscriptObtained.addClickListener((() => {
                        this.manuscriptObtained.close()
                    })), this.manuscripts.obtainNew(2))
                }
            }
        }(g, k), new class {
            constructor(t) {
                this.mirrorQuestion = document.getElementById("mirrorQuestion"), this.strangeSoundDialogue = new s(document.getElementById("strange-sound-dialogue")), this.tunerDisplay = document.getElementById("tunerDisplay"), this.tunerFreq = 440, this.beethoven5MirrorSound = document.getElementById("beethoven5"), this.tuningAudio = document.getElementById("tuningAudio"), this.solved = !1, this.tunerButtons = document.getElementById("tunerButtons").children, this.beep = document.getElementById("beep"), this.tuningDialogue = new s(document.getElementById("tuning-dialogue")), this.manuscriptObtained = new s(document.getElementById("foundManuscript")), this.alreadyInTune = new s(document.getElementById("alreadyInTune")), this.manuscripts = t, this.timeoutId, this.intervalId, this.initializeButtons = function () {
                    for (let t = 0; t < this.tunerButtons.length; t++) {
                        this.tunerButtons[t].addEventListener("mousedown", this.handleButtonPress)
                    }
                }, this.initializeButtons()
            }

            handleButtonPress = t => {
                const e = t.target.id;
                if ("tune" === e) return this.tune();
                this.beep.paused ? this.beep.play() : this.beep.currentTime = 0, "tune-up" === e ? this.tunerFreq = Math.round(10 * (this.tunerFreq + .1)) / 10 : "tune-down" === e && (this.tunerFreq = Math.round(10 * (this.tunerFreq - .1)) / 10), n(this.tunerDisplay, `A=${this.tunerFreq.toFixed(1)}Hz`), this.timeoutId = setTimeout((() => this.handleLongPress(e)), 5e2), window.addEventListener("mouseup", (() => {
                    clearTimeout(this.timeoutId), clearInterval(this.intervalId)
                }), {once: !0})
            };
            handleLongPress = t => {
                this.intervalId = setInterval((() => {
                    "tune-up" === t && this.tunerFreq < 470 ? this.tunerFreq = (10 * this.tunerFreq + 1) / 10 : "tune-down" === t && this.tunerFreq > 410 && (this.tunerFreq = (10 * this.tunerFreq - 1) / 10), n(this.tunerDisplay, `A=${this.tunerFreq.toFixed(1)}Hz`)
                }), 100)
            };

            async tune() {
                // return this.solved ? this.alreadyInTune.showAndClickClose() : (this.tuningDialogue.show(), this.tuningAudio.play(), this.beethoven5MirrorSound.play(), await i(5e3), 441.4 !== this.tunerFreq ? this.tuningDialogue.close() : (location.protocol, location.hostname, location.port, this.beethoven5MirrorSound.src = "../audios/tracks/beethoven5.mp3", this.solved = !0, this.strangeSoundDialogue.next(), this.beethoven5MirrorSound.play(), this.mirrorQuestion.style.display = "block", await i(50), this.tuningDialogue.hide(), await i(1500), this.strangeSoundDialogue.addClickListener((async () => {
                //     this.manuscriptObtained.show(), await i(50), this.strangeSoundDialogue.hide(), await i(1e3), this.manuscriptObtained.addClickListener((async () => {
                //         this.manuscriptObtained.close()
                //     }))
                // })), void this.manuscripts.obtainNew(3)));
                if (this.solved) {
                    return this.alreadyInTune.showAndClickClose();
                } else {
                    this.tuningDialogue.show();
                    this.tuningAudio.pause();
                    this.tuningAudio.currentTime = 0;
                    // console.log("play tune audio");
                    this.tuningAudio.play();
                    await i(5e3);
                    if (441.4 !== this.tunerFreq) {
                        this.tuningDialogue.close();
                        return 0;
                    }
                    this.solved = !0;
                    this.strangeSoundDialogue.next();
                    this.beethoven5MirrorSound.play();
                    this.mirrorQuestion.style.display = "block";
                    await i(50);
                    this.tuningDialogue.hide();
                    await i(1500);
                    this.strangeSoundDialogue.addClickListener((async () => {
                        this.manuscriptObtained.show();
                        await i(50);
                        this.strangeSoundDialogue.hide();
                        await i(1e3);
                        this.manuscriptObtained.addClickListener((async () => {
                            this.manuscriptObtained.close();
                        }))
                    }));
                    void this.manuscripts.obtainNew(3);

                }
                return 0;
            }
        }(g), new class {
            constructor(t) {
                this.safeNumpad = document.getElementById("safeNumpad"), this.safeDisplay = document.getElementById("safeDisplay"), this.closedSafe = document.getElementById("closedSafe"), this.openSafe = document.getElementById("openSafe"), this.wrongAudio = document.getElementById("wrongCode"), this.displayNumbersArray = [], this.safeButtonRows = this.safeNumpad.childNodes, this.safeBeep = document.getElementById("safeBeep"), this.safeOpenAudio = document.getElementById("safeOpen"), this.foundJournal = new s(document.getElementById("foundJournal")), this.journal = document.getElementById("journal"), this.journalClickable = document.getElementById("notebook"), this.manuscriptObtained = new s(document.getElementById("foundManuscript")), this.manuscripts = t, this.initializeButtons = () => {
                    this.safeButtonRows.forEach((t => {
                        t.childNodes.forEach((t => {
                            t.addEventListener("click", this.handleButtonPress)
                        }))
                    }))
                }, this.initializeButtons()
            }

            handleButtonPress = t => {
                this.safeBeep.paused ? this.safeBeep.play() : this.safeBeep.currentTime = 0;
                const e = t.target.id.replace("safeButton", "");
                l.indexOf(e) > -1 && this.displayNumbersArray.length < 4 ? (this.displayNumbersArray.push(e), this.updateNumberDisplay()) : "C" === e ? this.clearNumberDisplay() : "Ok" === e && (this.handleCodeEnter(), this.displayNumbersArray = []);
            };
            clearNumberDisplay = () => {
                n(this.safeDisplay, null), this.displayNumbersArray = []
            };
            updateNumberDisplay = () => {
                const t = this.displayNumbersArray.join("");
                n(this.safeDisplay, t)
            };
            handleCodeEnter = async () => {
                if ("7042" !== this.displayNumbersArray.join("")) return this.wrongAudio.play(), n(this.safeDisplay, "RETRY"), void setTimeout((() => this.clearNumberDisplay()), 800);
                this.safeOpenAudio.play(), this.openSafe.style.display = "block", this.closedSafe.style.display = "none", this.journal.style.display = "block", this.journalClickable.style.display = "block", this.foundJournal.show(), await i(1e3), this.foundJournal.addClickListener((async () => {
                    this.manuscriptObtained.showAndClickClose(), await i(50), this.foundJournal.hide()
                })), new a, this.clearNumberDisplay(), this.manuscripts.obtainNew(1)
            }
        }(g), document.getElementById("violin")), b = document.getElementById("notebook"),
        v = document.getElementById("notebookModal");
    E.addEventListener("click", (() => {
        w.openModal(I.element)
    })), b.addEventListener("click", (() => {
        w.openModal(v)
    }))
})();
