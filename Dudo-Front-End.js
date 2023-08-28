console.log("Glenn's external .js file connected");

window.onload = function() {

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    //************************************************************/
    // dropdown list example
    //************************************************************/
    //Create and append select list to body
    var myParent = document.body;
    var selectList = document.createElement("select");
    selectList.id = "mySelect";
    myParent.appendChild(selectList);
    
    //Create and populate a sample bid array
    var myArray = new Array(10);
    for (let i = 0; i < myArray.length; i++) {
        myArray[i] = "Bid #" + (i + 1);
    }

    //Populate dropdown with options from array
    for (var i = 0; i < myArray.length; i++) {
        var option = document.createElement("option");
        option.value = myArray[i];
        option.text = myArray[i];
        selectList.appendChild(option);
    }

    // Event handler for capturing dropdown and checkbox
    function handleSelection() {
        var selectElement = document.getElementById("mySelect");
        var selectedValue = selectElement.value;
        console.log("Selected value: " + selectedValue);

        var checkbox = document.getElementById("shakeShowCheckbox");
        if (checkbox.checked) {
            console.log("Shake and Show YES");
        } else {
            console.log("Shake and Show NO");
        }
    }

    // Example: Adding a button with a click event to capture the selection
    var button = document.createElement("button");
    button.textContent = "Submit bid";
    button.addEventListener("click", handleSelection);
    myParent.appendChild(button);

    //************************************************************/
    // Paint the screen
    //************************************************************/
    const canvas = document.getElementById("myCanvas");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    //var dividingLine = canvasHeight *.8;
    var dividingLine = canvasHeight;
    var playerBoxWidth = 180;
    var playerBoxHeight = 180;
    var directionBoxWidth = playerBoxWidth / 2;
    var directionBoxHeight = playerBoxHeight / 2;

    var xArray = [];
    var yArray = [];

    ctx.font = "24px Arial"; // 24px Arial font

    //------------------------------------------------------------
    // Set background color of whole canvas to light gray
    //------------------------------------------------------------
    ctx.rect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "rgb(240, 240, 240)";
    ctx.fill();

    //------------------------------------------------------------
    // Get coords of 6 player boxes
    //------------------------------------------------------------
    var marginX = (canvasWidth - playerBoxWidth) / 2;
    var marginY = (dividingLine - 3 * playerBoxHeight) / 4;
        xArray[0] = marginX;
        yArray[0] = marginY;

        xArray[3] = marginX;
        yArray[3] = 3 * marginY + 2 * playerBoxHeight;

        marginX = (canvasWidth - 3 *playerBoxWidth) / 4;
        marginY = (dividingLine - 2 * playerBoxHeight) / 3;
        xArray[5] = marginX;
        yArray[5] = marginY;
        
        xArray[4] = marginX;
        yArray[4] = 2 * marginY + playerBoxHeight;
        
        xArray[1] = 3 * marginX + 2 * playerBoxWidth;
        yArray[1] = marginY;

        xArray[2] = 3 * marginX + 2 * playerBoxWidth;
        yArray[2] = 2 * marginY + playerBoxHeight;

        directionBoxX = (canvasWidth - directionBoxWidth) / 2;
        directionBoxY = (dividingLine - directionBoxHeight) / 2;

    //------------------------------------------------------------
    // Draw player boxes
    //------------------------------------------------------------
        var numPlayers = 6;
        var thisPlayer = 0;
        var ptr = 0;
        for (var cc = 0; cc < numPlayers; cc++) {

            var x = xArray[ptr];
            var y = yArray[ptr];
            ptr++;
            
            // the box around the whole thing, filled white
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "black";
            ctx.rect(x, y, playerBoxWidth, playerBoxHeight);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.stroke();

            // the box around the player name
            var name = "Player " + (cc + 1);

            var metrics = ctx.measureText(name);
            var textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;                
            var width = metrics.width;

            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "black";
            ctx.rect(x, y, playerBoxWidth, textHeight + metrics.actualBoundingBoxDescent + 2);
            if (cc == thisPlayer) {
                ctx.fillStyle = "rgb(0, 102, 192)";
            } else {
                ctx.fillStyle = "white";
            }
            ctx.fill();
            ctx.stroke();

            // Draw player name inside the box
            var centeredX = x + (playerBoxWidth - width) / 2;
            if (cc == thisPlayer) {
                ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = "black";
            }

            ctx.fillText("Player " + (cc + 1), centeredX, y + textHeight);

            // draw the cup
            var img = document.getElementById("CupUp");
            var cupWidth = img.naturalWidth;
            var cupHeight = img.naturalHeight;
            xx = x + (playerBoxWidth - cupWidth) / 2;
            yy = y + textHeight + metrics.actualBoundingBoxDescent + 6;
            ctx.drawImage(img, xx, yy);

            // draw the dice
            for (var iDice = 0; iDice < 5; iDice++) {
                if (iDice == 0) {
                    img = document.getElementById("Dice1");
                }
                if (iDice == 1) {
                    img = document.getElementById("Dice2");
                }
                if (iDice == 2) {
                    img = document.getElementById("Dice3");
                }
                if (iDice == 3) {
                    img = document.getElementById("Dice4");
                }
                if (iDice == 4) {
                    img = document.getElementById("Dice5");
                }

                var diceWidth = img.naturalWidth;
                var diceHeight = img.naturalHeight;
                var iMargin = (playerBoxWidth - 5 * diceWidth) / 6;

                xx = x + (iDice + 1) * iMargin + iDice * diceWidth;
                var temp = playerBoxHeight - (textHeight + cupHeight);
                var more = (temp - diceHeight) / 2;
                yy = y + textHeight + cupHeight + more;
                ctx.drawImage(img, xx, yy);
            }
        }
    }

