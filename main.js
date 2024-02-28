/* Amazon Ads Suck - V1
 * Just replaces the ad with something more pleasent.
 * hopefully we can find a way to circumvent the ad entirely
 */

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

    return (((minutes * 60) + seconds) * 1000);
}

async function replaceAd(time, webPlayerNode) {
    console.log(time);
    webPlayerNode.id = 'amazon-ads-suck';
    await sleep(time-500);
    webPlayerNode.id = 'dv-web-player';
}

(async () => {
    const [adTimerNode, webPlayerNode] = await mount();
    const adTimeMs = getAdTimeLeftInMs(adTimerNode);
    await replaceAd(adTimeMs, webPlayerNode);
})();
