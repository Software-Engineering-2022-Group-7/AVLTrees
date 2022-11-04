/*
make the circle a variable that takes in the objectID and object Label
Each node will know its id, label, radius, thickness, x&y coordinates, color

*/
/*
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
class Circle {
	constructor(x, y, radius,color){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	}
	draw(ctx){
		ctx.beginPath();
		ctx.linewidth = 4;
		ctx.arc(this.x, this.y, this.radius,0, Math.PI*2, false);
		ctx.stroke();
		ctx.closePath();
	}
}


let all_circles = [];

let createCircle = function(circle){
	my_circle.draw(ctx);
}

for(var num = 0; num < 10; num++){
	let my_circle = new Circle(100, 75, 50, "black");
	all_circles.push(my_circle);
}
*/

function node(){
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
ctx.stroke();

}

/*
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let x = 200;
let y = 200;
const animate = () => {
requestAnimationFrame(animate);
c.clearRect(0, 0, innerWidth, innerHeight)
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false );
    c.strokeStyle = "pink";
    c.stroke();
    x += 1
    y += 1
}
animate()


/*
// Single Animated Circle - Get Canvas element by Id
var canvas3 = document.getElementById("canvas3");

// Set Canvas dimensions
canvas3.width   = 200;
canvas3.height  = 200;

// Get drawing context
var c3 = canvas3.getContext( '2d' );

// Radius
var radius = 50;

// Starting Position
var x 	= radius + Math.random() * ( 200 - radius * 2 );
var y 	= radius + Math.random() * ( 200 - radius * 2 );

// Speed in x and y direction
var dx 	= (Math.random() - 0.5) * 2;
var dy 	= (Math.random() - 0.5) * 2;

function animate3() {

  	requestAnimationFrame( animate3 );

  	c3.clearRect( 0, 0 , 200, 200 );
 
  	if( x + radius > 200 || x - radius < 0  ) {

    		dx = -dx;
  	}

  	if(  y + radius > 200 || y - radius < 0 ) {

    		dy = -dy;
  	}
    x += dx;
  	y += dy;

  	c3.beginPath();
  	c3.arc( x, y,  50, 0, Math.PI * 2, false  );
  	c3.stroke();
}

// Animate the Circle
animate3();



*/