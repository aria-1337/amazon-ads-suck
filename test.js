fetch('https://global.telemetry.insights.video.a2z.com/Events/AV20180601',
{
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
        appInstanceId: "f715fb61-d9f2-11ee-ba69-c1c2c154a2cd",
        clientPublishRelativeTime: 63275,
        clientPublishTimestamp: 1709534864630,
        events: []
    })
}).then(r => r.json()).then(console.log).catch(console.log)

