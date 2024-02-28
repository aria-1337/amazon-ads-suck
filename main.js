/* Amazon Ads Suck - V1
 * Just replaces the ad with something more pleasent.
 * hopefully we can find a way to circumvent the ad entirely
 */

// TODO: Clean this up and refactor
// This code is really hacky until I get a working MVP.

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Listens for ad popup and then returns relevant nodes
async function mount() {
    // Listen for ad timer
    const adTimerNode = document.getElementsByClassName('atvwebplayersdk-ad-timer')[0];

    if (!adTimerNode) {
        await sleep(500);
        return await mount();
    }

    const webPlayerNode = document.getElementById('dv-web-player');

    if (!webPlayerNode) {
        await sleep(500);
        return await mount();
    }

    return [adTimerNode, webPlayerNode];
}

function getAdTimeLeftInMs(adTimerNode) {
    const [minutesText, secondsText] = adTimerNode.getAttribute('aria-label').split('resumes in')[1].split('and');
    const minutes = parseInt(minutesText.split('minutes')[0]);
    const seconds = parseInt(secondsText.split('seconds')[0]);

    return (((minutes * 60) + seconds) * 1000)-500;
}

async function replaceAd(time, webPlayerNode) {
    // Mute
    document.querySelectorAll('audio, video').forEach(i => {
        i.muted = true;
    });

    // Create temporary overlay and style
    overlay = document.createElement('div');
    overlay.style.zIndex = 9999;
    overlay.style.position = 'absolute';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.minWidth = '100%';
    overlay.style.minHeight = '100%';
    overlay.style.backgroundColor = 'black';
    overlay.style.color = 'white';

    // Mount overlay and remove player so it cant be interacted with 
    document.body.appendChild(overlay);
    webPlayerNode.id = 'amazon-ads-suck';

    let overlayTime = time;
    const updateOverlayText = setInterval(() => {
        const seconds = (overlayTime / 1000).toFixed(0);
        overlay.innerText = `${seconds} seconds left.`;
        overlayTime = overlayTime-1000;
    }, 1000);

    await sleep(time);
    clearInterval(updateOverlayText);

    // Return to normal
    document.querySelectorAll('audio, video').forEach(i => {
        i.muted = false;
    });
    webPlayerNode.id = 'dv-web-player';
    document.body.removeChild(overlay);
}

(async () => {
    while (true) {
        const [adTimerNode, webPlayerNode] = await mount();
        const adTimeMs = getAdTimeLeftInMs(adTimerNode);
        await replaceAd(adTimeMs, webPlayerNode);
        await sleep(1000);
    }
})();
