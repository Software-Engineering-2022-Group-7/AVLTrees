// Execute Input/Delete when users click Enter
document.getElementById("numInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("InputBtn").click();
    }
});

document.getElementById("numDelete").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("DeleteBtn").click();
    }
});

// Delete content after input
document.getElementById("InputBtn").addEventListener("click", function handleClick(event) {
    event.preventDefault();
    const numInput = document.getElementById("numInput");
    numInput.value = "";
    numInput.placeholder = "Enter Key";
});

document.getElementById("DeleteBtn").addEventListener("click", function handleClick(event) {
    event.preventDefault();
    const numDelete = document.getElementById("numDelete");
    numDelete.value = "";
    numDelete.placeholder = "Enter Key";
});

// Speed bar
document.getElementById("SpeedRange").oninput = function() {
    framePerMovement = framePerSecond - framePerSecond * this.value * 0.01;
    document.getElementById("SpeedIndication").innerHTML =
        parseFloat((framePerSecond - framePerMovement) / framePerSecond * 100).toFixed(0) + "%";
}

// update error in code box
function printError(e) {
    document.getElementById("code_display").innerHTML = e;
}