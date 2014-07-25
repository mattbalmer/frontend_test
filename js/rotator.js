// Create a class for handling the progress bar.
Nanobar = (function() {
    var Nanobar = function(selector) {
        this.element = document.querySelector(selector);
        this.restart();
    };

    // Removing, then re-attaching, the .sliding class
    // will ensure that even if setInterval() gets out-of-sync
    // with real time - the animation will not be out-of-sync
    // with the rotator.
    Nanobar.prototype.restart = function() {
        this.element.classList.remove('sliding');
        this.element.classList.add('sliding');
    };

    return Nanobar;
}());

rotator = (function(Nanobar) {
    var rotator = {};

    // Save the index and progress bar.
    rotator.index = 0;
    rotator.nanobar = null;

    rotator.init = function(selector, width) {
        this.element = document.querySelector(selector);
        this.frames = this.element.querySelectorAll('.frame');
        this.container = this.element.querySelector('.rotator-inner-container');
        this.width = width;

        this.nanobar = new Nanobar('.nanobar');

        // Scale the inner-containers width the match the # of frames
        this.container.style.width = this.frames.length * this.width + 'px';

        // Every 3 seconds, slide the rotator
        // and restart the progress bar
        setInterval(function() {
            rotator.slide();
            rotator.nanobar.restart();
        }, 3000);
    };

    rotator.slide = function() {
        rotator.index++;

        // If index is more than # of frames, restart at 0
        if(rotator.index >= this.frames.length) {
            rotator.index = 0;
        }

        // Set the margin left to an appropriate negative values
        // so that the images will appear to slide to the left
        this.frames[0].style.marginLeft = -rotator.index * (this.width * 2) + 'px';
    };

    return rotator;
}(Nanobar));

// On load - initialize the rotator
document.addEventListener('DOMContentLoaded', function() {
    rotator.init('#rotator', 450);
});