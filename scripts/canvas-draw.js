const YOffset = 40;
const XOffset = 15;

// Will just draw a rectangle over the guy's face
function drawFace(ctx, x, y, w, h) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.rect(x, y, w, h);
    ctx.stroke();
}

// We'll initialize the canvas element to be right on top of the video element
function initCanvas(canv, video) {
    canv.style.display = "block";
    canv.style.position = "fixed";
    canv.style.top = $(video).position()['top'];
    canv.style.left = $(video).position()['left'];
    canv.width = $(video).width();
    canv.height = $(video).height();
}

function printText(ctx, msg, x, y) {
    // Filling the text
    ctx.font = "40px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(msg, x, y);
    // Stroking the same text but in black
    // This is basically the text outline
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeText(msg, x, y);
}

function findEthnicity(attr) {
    // Declare all the possible ethnicities
    let ethnicities = ["asian", "black", "hispanic", "white"];
    // Sort them by the attribute value
    ethnicities.sort(function(a, b) {
        if (attr[a] == attr[b])
            return 0;
        if (attr[a] > attr[b])
            return -1;
        return 1;
    })
    // Return the first ethnicity, aka the predominant one
    return ethnicities[0];
}

function parseKairosResponseAndDrawToScreen(data, video, canv) {
    // We extract the attributes and the transactions from Kairos
    const attr = data['attributes'];
    const tran = data['transaction'];
    
    // Initialize the canvas element
    initCanvas(canv, video);
    const ctx = canv.getContext("2d");
    drawFace(ctx, tran['topLeftX'], tran['topLeftY'], tran['width'], tran['height']);

    // Extracting data from Kairos
    let ethnicity = findEthnicity(attr);
    printText(ctx, "Ethnicity: " + ethnicity, XOffset, YOffset);
    // O.O kairos assuming genders
    let sex = (attr['gender']['femaleConfidence'] > attr['gender']['maleConfidence'] ? "female" : "male");
    printText(ctx, "Sex: " + sex, XOffset, YOffset*2);
    
    printText(ctx, "Age: " + attr['age'], XOffset, YOffset*3);
}

function clearCanvas(canv) {
    const ctx = canv.getContext("2d");
    ctx.clearRect(0, 0, canv.width, canv.height);
}