// Get reference to Canvas
var canvas = document.getElementById('canvas');

// get reference to canvas context
var context  = canvas.getContext('2d');

// Initialize loading variables
var load_counter = 0;

// Initialize images for layers
var background = new Image();
var layer1 = new Image();
var layer2 = new Image();
var layer3 = new Image();
var layer4 = new Image(); 
var layer5 = new Image();
var layer6 = new Image();
var mask = new Image();
var maskShadow = new Image();


// Create a list of layer objects
// Each object contains the following:
// image: a reference to the image created above
// src: the path to the actual image in your project
// z_index: how close the object should appear in 3d space (0 is neutral)
// position: a place to keep track of the layer's current position
// blend: what blend mode you'd like the layer to use—default is null
// opacity: how transparent you'd like the layer to appear (0 is completely transparent, 1 is completely opaque)
var layer_list = [
    {
        'image': background,
        'src' : './images/layer_0_1.jpg',
        'z_index': -1,
        'position': {x: 0, y:0 },
        'blend': null,
        'opacity': 1
    }, 
    {
        //shrine
        'image': layer2,
        'src' : './images/layer_2_1.png',
        'z_index': -2.5,
        'position': {x: 0, y:0 },
        'blend': null,
        'opacity': 0.8
    }, 
    {
        'image': layer1,
        'src' : './images/layer_1_1.png',
        'z_index': -2.2,
        'position': {x: 0, y:0 },
        'blend': null,
        'opacity': 1
    }, 
    {
        'image': layer3,
        'src' : './images/layer_3_1.png',
        'z_index': -1.5,
        'position': {x: 0, y:0 },
        'blend': null,
        'opacity': 1
    }, 
    {
        //sword
        'image': layer4,
        'src' : './images/layer_4_1.png',
        'z_index': -1 ,
        'position': {x: 0, y:0 },
        'blend': null,
        'opacity': 1
    },
    {
        'image': layer5,
        'src' : './images/layer_5_1.png',
        'z_index': -0.9,
        'position': {x: 0, y:0 },
        'blend': null,
        'opacity': 1
    },
    {
        'image': maskShadow,
        'src' : './images/layer_7_1.png',
        'z_index': -0.15 ,
        'position': {x: 0, y:0 },
        'blend': 'multiply',
        'opacity': 0.8
    },
    {
        'image': mask,
        'src' : './images/layer_8_1.png',
        'z_index': 0 ,
        'position': {x: 0, y:0 },
        'blend': null,
        'opacity': 1
    },
    {
        //floaties
        'image': layer6,
        'src' : './images/layer_6_1.png',
        'z_index': 1 ,
        'position': {x: 0, y:0 },
        'blend': null,
        'opacity': 1
    }
];

// Go through the list of layer objects and load images from source
layer_list.forEach(function(layer, index) {
    layer.image.onload = function() {
        // Add 1 to the load counter
        load_counter += 1;
        // Checks if all the images are loaded
        if (load_counter >= layer_list.length) {
            // Start the render Loop!
            requestAnimationFrame(drawCanvas);
        }
    }
    layer.image.src = layer.src;
});


// Draw layers in Canvas
function drawCanvas(){
    // Erase everything currently on the canvas
    context.clearRect(0,0, canvas.width, canvas.height);

    // Loop through each layer in the list and draw it to the canvas
    layer_list.forEach(function(layer, index) {

        // Calculate what the position of the layer should be (getOffset function is below)
        layer.position = getOffset(layer);


        // If the layer has a blend mode set, use that blend mode, otherwise use normal
        if (layer.blend) {
            context.globalCompositeOperation = layer.blend;
        } else {
            context.globalCompositeOperation = 'normal';
        }

        // Set the opacity of the layer
        context.globalAlpha = layer.opacity;

        // Draw the layer into the canvas context
        // NOTE: do not call drawCanvas() without using requestAnimationFrame here—things will crash!
        context.drawImage(layer.image, layer.position.x, layer.position.y);
    });

    requestAnimationFrame(drawCanvas);
}


// Function to calculate layer offset
function getOffset(layer) {

	// Calculate the amount you want the layers to move based on touch or mouse input.
   	// You can play with the touch_multiplier variable here. Depending on the size of your canvas you may want to turn it up or down.
    var touch_multiplier = 0.2;
    var touch_offset_x = pointer.x * layer.z_index * touch_multiplier;
	var touch_offset_y = pointer.y * layer.z_index * touch_multiplier;

    // Calculate the total offset for both X and Y
    var offset = {
		x: touch_offset_x,
		y: touch_offset_y
	};

    return offset;
}


//// TOUCH AND MOUSE CONTROLS ////

// Initialize variables for touch and mouse-based parallax
var moving = false;

// Initialize touch and mouse position
var pointer_initial = {
	x: 0,
	y: 0
};
var pointer = {
	x: 0,
	y: 0
};

canvas.addEventListener('touchstart', pointerStart);
canvas.addEventListener('mousedown', pointerStart);

// Runs when touch or mouse click starts
function pointerStart(event) {
    moving = true;
    
    // where mouse/touch is
    if(event.type === 'touchstart') {
        // alert('touch');
        pointer_initial.x = event.touches[0].clientX;
        pointer_initial.y = event.touches[0].clientY;

    } else if (event.type === 'mousedown') {
        // alert('mousedown');
        pointer_initial.x = event.clientX;
		pointer_initial.y = event.clientY;
    }
}


// This runs whenever your finger moves anywhere in the browser window
window.addEventListener('touchmove', pointerMove);
// This runs whenever your mouse moves anywhere in the browser window
window.addEventListener('mousemove', pointerMove);


// Runs when touch or mouse is moved
function pointerMove(event) {
    
    // Prevent scrolling the page instead of moving layers around
    event.preventDefault();

    // Run if touch/ mouse click has started
    if(moving === true ){
        var current_x = 0;
        var current_y = 0;

        if(event.type === 'touchmove') {
            current_x = event.touches[0].clientX;
            current_y = event.touches[0].clientY;
        } else if (event.type === 'mousemove'){
            current_x = event.clientX;
            current_y = event.clientY;
        }
        
        // Set pointer position to the difference between current position and initial position
        pointer.x = current_x - pointer_initial.x;
		pointer.y = current_y - pointer_initial.y; 
    }
}

// Disabling screen scrolling
// Listen to any time you move your finger in the canvas element
canvas.addEventListener('touchmove', function(event) {
    event.preventDefault();
});
// Listen to any time you move your mouse in the canvas element
canvas.addEventListener('mousedown', function(event) {
    event.preventDefault();
});

// return to default of release

// Listen for when you stop touching the screen
window.addEventListener('touchend', function(event) {
    endGesture();
});

// Listen for when you release the mouse button anywhere on the screen
window.addEventListener('mouseup', function(event) {
    endGesture();
})

function endGesture() {
    moving = false;

    pointer.x = 0;
    pointer.y = 0;
}

