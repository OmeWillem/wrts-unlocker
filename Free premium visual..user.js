// ==UserScript==
// @name         Free premium.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  wrts devs are real shit coders
// @author       You
// @match        https://studygo.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wrts.nl
// @grant        none
// ==/UserScript==

let oldXHROpen = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function(method, url, async, user, password) {

// this unlocks the two paid learning-methods.
    if (url.includes("/lists")) {
        this.addEventListener('load', function() {
            const old = JSON.parse(this.responseText);
            old.exercise_types[4].available = true;
            old.exercise_types[4].unavailability_label = null;
            old.exercise_types[5].available = true;
            old.exercise_types[5].unavailability_label = null;
            Object.defineProperty(this, "responseText", {value: JSON.stringify(old)});

            console.log(old)
        });
    }

// this unlocks the videos because the video identifier is sent even though I don't have a premium package LOL
    if (url.includes("/api/v3/public/topics/")) {
        this.addEventListener('load', function() {
            const old = JSON.parse(this.responseText);
            old.topic.summary.video_allowed=true;
            old.topic.summary.limited_video_duration_in_seconds=null;
            Object.defineProperty(this, "responseText", {value: JSON.stringify(old)});
        });
    }

// this exploits the free two questions and allows all questions LOL XD SHIT CODERS
    if (url.includes("/api/v3/stage_exercises")) {
        this.addEventListener('load', function() {
            const old = JSON.parse(this.responseText);
            for (var v in old.exercise.questions) {
                old.exercise.questions[v].blocked = false;
            }
            Object.defineProperty(this, "responseText", {value: JSON.stringify(old)});
        });
    }
    return oldXHROpen.apply(this, arguments);
}