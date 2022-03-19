# Overview
Kairos is a Face Recognition platform that allows their user to extract data from images.

This repo implements a simple system to have face recognition using Kairos API in real time. A `<video>` tag will contain the webcam video data, after click the `Start Recognition` button a frame will be extracted from the video and it will be passed to Kairos for face detection, the function that performs this action will be called **recursively** until the button is pressed **again**.
Therefore creating an _almost_ real-time face recognition system

# Installation
Clone the repo, extract the files and access index.html in a Web Server like nginx or apache.

# Examples
An example of face recognition on a stock photo I got from unsplash.

![If you're reading this, the image didn't load... oops...](https://i.imgur.com/DsOuaz0.png "https://unsplash.com/photos/b5zPZ8_7vhw")
_[Original picture here](https://unsplash.com/photos/b5zPZ8_7vhw)_

An example of face recognition on a stock video.

![If you're reading this, the gif didn't load... oops...](https://media1.giphy.com/media/NFnIRVkxRQjDNwrwAq/giphy.gif)

_[Original video here](https://youtu.be/2sikJPJzgaA)_

# Documentation
The comments in the code **are** the documentation, everything you need is in the code itself.
This will just be a quick preview of the scripts.
Please check out Kairos API docs [here](https://www.kairos.com/docs/api/)
## The KairosEnrollRequest Class
It is located under `scripts/kairos-interface.js`.

It's the class used to manage requests to Kairos' Servers.
Here's how the main functions of the class should be used:
 - The `getRequestURL()` function will return the complete request URL.
 - The `setCredentials` function is used to set Kairos **App ID** and **App Key**
 - The `performRequest` function will initialize a connection to Kairos' Servers using an `XMLHttpRequest` object, and will call a user-defined callback function when the connection is finished
 - The `connectionCallback` function allows to set the callback function for the `onloadend` event of the `XMLHttpRequest` object, the parameters for the callback function must be only one: an `Event` type that will represent the event
 
 ## The Media Devices library
 It is located under `scripts/media-devices.js`.
 
 It's a simple script to get all the video input devices and show the video feed to a `<video>` HTML element.
 
 ## The Canvas Draw library
 It is located under `scripts/canvas-draw.js`
 
 It's a library that parses the Kairos' Response and draws the data to the screen.
 
 ## main.js
 It's the main script located under `scripts/main.js`.
 
 It binds the HTML elements of `index.html` to the Javascript components of the other libraries, nothing fancy really.