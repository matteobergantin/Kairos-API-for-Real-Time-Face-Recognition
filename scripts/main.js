var req = new KairosEnrollRequest();

req.connectionCallback(e => {
    // This will run as soon as the connection is over
    const xhr = e.target;
    // This is very unlikely because Kairos usually sends out 200 even if there have been errors
    if (xhr.status != 200) {
        // (Please don't look up how bs_alert is implemented)
        bs_alert(`Error: ${xhr.status}\nError message. ${xhr.responseText}`)
        return;
    }
    const response = JSON.parse(xhr.responseText);
    if (response["Errors"]) {
        for (let i = 0; i < response["Errors"].length; i++) {
            const error = response["Errors"][i];
            bs_alert(`Kairos error ${error["ErrCode"]}: ${error["Message"]}`, 'danger'); 
        }
        clearCanvas($('#canvas-draw')[0]);
        return;
    }
    // It can only handle one face for now
    parseKairosResponseAndDrawToScreen(response['images'][0], $('#video-output')[0], $('#canvas-draw')[0]);

    // WARNING:
    // With Kairos free plan you can only go up to 75 requests per minute
    // Run recursively
    if (kairosRunning)
        req.performRequest(getWebcamPic(), 'test', 'test');
    else
        clearCanvas($('#canvas-draw')[0]);
});


var kairosRunning = false;
$('#init-kairos').click(function() {
    if (!kairosRunning) {
        if ($('#kairos-app-id-input').val() == "" || $('#kairos-app-key-input').val() == "") {
            bs_alert("Error: must specify an App ID and an App Key");
            return;
        }
        req.app_id = $('#kairos-app-id-input').val();
        req.app_key = $('#kairos-app-key-input').val();
        $(this).text("Stop Recognition");
        req.performRequest(getWebcamPic(), 'test', 'test');
    } else {
        $(this).text("Start Recognition");
    }
    kairosRunning = !kairosRunning;
})

const getWebcamPic = () => {
    // I'm gathering a frame from the video output device using a canvas element
    // The frame will be encoded in base64
    const width = $('#video-output').width();
    const height = $('#video-output').height();
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage($('#video-output')[0], 0, 0, width, height);
    return canvas.toDataURL();
}