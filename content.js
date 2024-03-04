const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function nodesMounted() {
    const adTimerNode = document.getElementsByClassName('atvwebplayersdk-ad-timer')[0];
    const webPlayerNode = document.getElementById('dv-web-player');

    if (!adTimerNode || !webPlayerNode) {
        await sleep(250);
        return await nodesMounted();
    }

    return [adTimerNode, webPlayerNode];
}

function getAdTimeLeftInMs(adTimerNode) {
    const [minutesText, secondsText] = adTimerNode.getAttribute('aria-label').split('resumes in')[1].split('and');
    const minutes = parseInt(minutesText.split('minutes')[0]);
    const seconds = parseInt(secondsText.split('seconds')[0]);

    return (((minutes * 60) + seconds) * 1000)-500;
}

function getOverlay() {
    const overlay = document.createElement('div');
    overlay.style.zIndex = 9999;
    overlay.style.position = 'absolute';
    overlay.style.top = '0px';
    overlay.style.left = '0px';
    overlay.style.minWidth = '100%';
    overlay.style.minHeight = '100%';
    overlay.style.backgroundColor = 'black';
    overlay.style.color = 'white';
    overlay.style.textAlign = 'center';
    overlay.style.fontSize = '44px';
    overlay.style.paddingTop = '300px';
    return overlay;
}

async function replaceAd(time, webPlayerNode) {
    // Mute ad
    document.querySelectorAll('audio, video').forEach(i => {i.muted = true; });

    // Mount overlay and remove player so it cant be interacted with 
    const overlay = getOverlay();
    document.body.appendChild(overlay);
    overlay.scrollIntoView();
    webPlayerNode.id = 'amazon-ads-suck';

    // Leave fullscreen
    if (document.fullscreenElement) { document.exitFullscreen(); }

    let overlayTime = time;
    const updateOverlayText = setInterval(() => {
        overlay.innerText = `Enjoy the break, Back in: ${(overlayTime / 1000).toFixed(0)}s`;
        overlayTime = overlayTime-1000;
    }, 1000);

    await sleep(time);
    clearInterval(updateOverlayText);

    // Return to normal
    document.querySelectorAll('audio, video').forEach(i => { i.muted = false; });
    webPlayerNode.id = 'dv-web-player';
    document.body.removeChild(overlay);
}

(async () => {
    while (true) {
        const [adTimerNode, webPlayerNode] = await nodesMounted();
        const adTimeMs = getAdTimeLeftInMs(adTimerNode);
        await replaceAd(adTimeMs, webPlayerNode);
        await sleep(1000);
    }
})();

async function mockPlayEvent() {
    let response = await fetch(
        `https://atv-ps.amazon.com/cdp/usage/UpdateStream
         ?deviceID=${deviceID}
         &deviceTypeID=${deviceTypeID}
         &gascEnabled=${false}
         &marketplaceID=${marketplaceID}
         &uxLocale=en_US
         &firmware=1
         &version=1
         &titleId=${titleId}
         &event=PLAY
         &userWatchSessionId=${userWatchSessionId}
         &timecode=${timecode}
         &tuneInTimeEpoch=${tuneInTimeEpoch}`,
        {
            method: 'POST',
        }
    );
    response = await response.json();
    console.log(response);
}

(async () => {
  const rawResponse = await fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({a: 1, b: 'Textual content'})
  });
  const content = await rawResponse.json();

  console.log(content);
})();
