let timesClicked = 0;

function openNav() {
    document.getElementById("sidebar").style.width = "330px";
    document.getElementById("main").style.marginLeft = "0";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "-330px";
}

function testButton() {
    if (timesClicked % 2 === 0) {
        closeNav();
    } else {
        openNav();
    }
    timesClicked++;
}