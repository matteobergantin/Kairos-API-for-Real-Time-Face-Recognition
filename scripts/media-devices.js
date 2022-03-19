var currentStream = null;           // Global variable that stores the current video stream

function setVideoOutput(id) {
    // With this function we can set the video device to play based on the deviceId
    // Get the video stream of the specific device
    navigator.mediaDevices.getUserMedia({video: {deviceId: id}}).then(stream => {
        if (currentStream)
            currentStream.getTracks().forEach(function(track) {
                track.stop();
            });
        currentStream = stream;
        $('#video-output')[0].srcObject = currentStream;
        $('#video-output')[0].play();
    }).catch(console.error)
}

function setMediaDevices(devices) {
    // Sorting the devices (there isn't a specific reason, I just liked them to be sorted from Z-A)
    devices.sort((a, b) => {
        if (a == b)
            return 0;
        if (a > b)
            return 1;
        return -1;
    })

    // Check if the device is a video input device and create the <option> tag
    for (let i = 0; i < devices.length; i++)
        if (devices[i].kind == "videoinput")
            $('#media-list').append(`<option class="media-option" deviceId=${devices[i].deviceId}>${devices[i].label}</option>`)
    
    // Playing the first video device
    setVideoOutput($('.media-option').attr('deviceId'));
    
    // Setting the trigger to change video device
    $('#media-list').on('change', function() {
        let value = this.value;
        $('.media-option').each(function() {
            if (this.value == value)
                setVideoOutput($(this).attr('deviceId'));
        });
    });
}

function gotDevices(default_stream) {
    // Got all the media devices, stopping the default media device from playing
    // And creating the webcam list
    if (default_stream)
        default_stream.getTracks().forEach(track => {
            track.stop();
        })
    navigator.mediaDevices.enumerateDevices().then(setMediaDevices);
}

// Asking the user permission to get the camera
navigator.mediaDevices.getUserMedia({video: {width: 1, height: 1}}).then(gotDevices).catch(console.error);
