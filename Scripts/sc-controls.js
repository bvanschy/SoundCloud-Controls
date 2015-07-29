(function () {
    $.fn.soundCloudControls = function (iFrameElementId, color) {
        if (color === undefined) {
            color = "#FF4800";
        }

        var player = SC.Widget(iFrameElementId);
        return this.each(function (index, element) {
            var soundCloudControls = new SoundCloudControls(player, $(this));
            player.bind(SC.Widget.Events.READY, function () {
                soundCloudControls.init(color);
            });
        });
    };

    function SoundCloudControls(player, controlsElement) {
        this.player = player;
        this.controls = controlsElement;
        this.controls.addClass("playControls__wrapper");
    }
    SoundCloudControls.prototype.init = function (color) {
        var soundCloudControls = this;

        var playControls__controls = $("<div>").addClass("playControls__controls");
        this.prevControl = $("<button>").addClass("skipControl").addClass("playControls__icon").addClass("sc-ir").addClass("skipControl__previous").text("Skip to previous");
        this.playControl = $("<button>").addClass("playControl").addClass("playControls__icon").addClass("sc-ir").text("Play current");
        this.nextControl = $("<button>").addClass("skipControl").addClass("playControls__icon").addClass("sc-ir").addClass("skipControl__next").text("Skip to next");
        this.volumeControl = $("<button>").addClass("volume__button").addClass("volume__speakerIcon").addClass("sc-ir").text("Toggle mute");
        this.slider = $("<div>").addClass("slider");
        playControls__controls.append(this.prevControl);
        playControls__controls.append(this.playControl);
        playControls__controls.append(this.nextControl);
        playControls__controls.append(this.volumeControl);
        playControls__controls.append(this.slider);
        this.controls.append(playControls__controls);

        this.unmutedVolume = 0.5;
        if (window.localStorage) {
            var savedVolume = window.localStorage.getItem("SCControlsVol");
            if (savedVolume !== null) {
                this.unmutedVolume = Number(savedVolume) / 100;
            }
        }
        this.setVolume(this.unmutedVolume);

        this.player.bind(SC.Widget.Events.PLAY, function () {
            soundCloudControls.playControl.addClass("playing").text("Pause current");
        });
        this.player.bind(SC.Widget.Events.PAUSE, function () {
            soundCloudControls.playControl.removeClass("playing").text("Play current");
        });

        this.prevControl.click(function () {
            soundCloudControls.goBack();
        });

        this.playControl.click(function () {
            soundCloudControls.togglePlay();
        });

        this.nextControl.click(function () {
            soundCloudControls.goForward();
        });

        this.volumeControl.click(function () {
            soundCloudControls.toggleMute();
        });

        this.slider.slider({
            range: "min",
            value: this.unmutedVolume * 100,
            min: 0,
            max: 100,
            create: function (event, ui) {
                $(this).find(".ui-slider-range").css("background", color);
            },
            slide: function (event, ui) {
                soundCloudControls.setVolume(ui.value / 100);
            },
            change: function (event, ui) {
                if (window.localStorage) {
                    window.localStorage.setItem("SCControlsVol", ui.value);
                }
            }
        });
    };
    SoundCloudControls.prototype.setVolume = function (volume) {
        this.player.setVolume(volume);
        if (volume === 0) {
            this.volumeControl.addClass("muted");
        }
        else {
            this.volumeControl.removeClass("muted");
        }
        this.volumeControl.attr("data-level", Math.ceil(volume * 10));
    };
    SoundCloudControls.prototype.togglePlay = function () {
        this.player.toggle();
    };
    SoundCloudControls.prototype.goBack = function () {
        var soundCloudControls = this;
        this.player.getPosition(function (position) {
            soundCloudControls.player.seekTo(0);
            if (position < 3000) {
                soundCloudControls.player.prev();
            }
        });
    };
    SoundCloudControls.prototype.goForward = function () {
        this.player.next();
    };
    SoundCloudControls.prototype.toggleMute = function () {
        var soundCloudControls = this;
        this.player.getVolume(function (currentVolume) {
            if (currentVolume === 0) {
                soundCloudControls.setVolume(soundCloudControls.unmutedVolume);
                soundCloudControls.slider.slider("value", soundCloudControls.unmutedVolume * 100);
            }
            else {
                soundCloudControls.unmutedVolume = currentVolume;
                soundCloudControls.setVolume(0);
                soundCloudControls.slider.slider("value", 0);
            }
        });
    };

})();
