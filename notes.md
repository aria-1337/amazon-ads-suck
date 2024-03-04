# Request events for integrated ads

Possible ad related event:

I may be wrong but it seems like if we could spoof a PLAY event with the proper time codes that it may work

let see if we can mock that
```
https://atv-ps.amazon.com/cdp/usage/UpdateStream
?deviceID=3be10d21-dd38-4bc3-9d35-bbaab53e5626
&deviceTypeID=AOAGZA014O5RE
&gascEnabled=false
&marketplaceID=ATVPDKIKX0DER
&uxLocale=en_US
&firmware=1&version=1
&titleId=amzn1.dv.gti.41f71162-2344-4089-accf-5ce0e9c12535
&event=PLAY
&userWatchSessionId=d794172f-e8f8-430e-8e0e-7851560803d4
&timecode=2824.470
&tuneInTimeEpoch=2786
```

payload example:
```
deviceID: 3be10d21-dd38-4bc3-9d35-bbaab53e5626
deviceTypeID: AOAGZA014O5RE
gascEnabled: false
marketplaceID: ATVPDKIKX0DER
uxLocale: en_US
firmware: 1
version: 1
titleId: amzn1.dv.gti.41f71162-2344-4089-accf-5ce0e9c12535
event: PLAY
userWatchSessionId: d794172f-e8f8-430e-8e0e-7851560803d4
timecode: 2824.470
tuneInTimeEpoch: 2786
```

response example:
```
{
    "message": {
        "statusCode": "SUCCESS",
        "timestamp": 1709531785,
        "body": {
            "statusCallbackIntervalSeconds": 180,
            "canStream": true
        }
    },
    "signature": "NotAvailable"
}
```
