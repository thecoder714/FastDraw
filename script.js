k = 0;
sketch = "";
var timer = 0;
var timerCheck = "";
drawnSketch = "";
answer = "";
score = "";
startTime = 0;
elapsedTime = 0;

var dataset = ["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant","envelope","eraser","eye","eyeglasses","face","fan","feather","fence","finger","fire hydrant","fireplace","firetruck","fish","flamingo","flashlight","flip flops","floor lamp","flower","flying saucer","foot","fork","frog","frying pan","garden","garden hose","giraffe","goatee","golf club","grapes","grass","guitar","hamburger","hammer","hand","harp","hat","headphones","hedgehog","helicopter","helmet","hexagon","hockey puck","hockey stick","horse","hospital","hot air balloon","hot dog","hot tub","hourglass","house","house plant","hurricane","ice cream","jacket","jail","kangaroo","key","keyboard","knee","knife","ladder","lantern","laptop","leaf","leg","light bulb","lighter","lighthouse","lightning","line","lion","lipstick","lobster","lollipop","mailbox","map","marker","matches","megaphone","mermaid","microphone","microwave","monkey","moon","mosquito","motorbike","mountain","mouse","moustache","mouth","mug","mushroom","nail","necklace","nose","ocean","octagon","octopus","onion","oven","owl","paintbrush","paint can","palm tree","panda","pants","paper clip","parachute","parrot","passport","peanut","pear","peas","pencil","penguin","piano","pickup truck","picture frame","pig","pillow","pineapple","pizza","pliers","police car","pond","pool","popsicle","postcard","potato","power outlet","purse","rabbit","raccoon","radio","rain","rainbow","rake","remote control","rhinoceros","rifle","river","roller coaster","rollerskates","sailboat","sandwich","saw","saxophone","school bus","scissors","scorpion","screwdriver","sea turtle","see saw","shark","sheep","shoe","shorts","shovel","sink","skateboard","skull","skyscraper","sleeping bag","smiley face","snail","snake","snorkel","snowflake","snowman","soccer ball","sock","speedboat","spider","spoon","spreadsheet","square","squiggle","squirrel","stairs","star","steak","stereo","stethoscope","stitches","stop sign","stove","strawberry","streetlight","string bean","submarine","suitcase","sun","swan","sweater","swingset","sword","syringe","table","teapot","teddy-bear","telephone","television","tennis racquet","tent","The Eiffel Tower","The Great Wall of China","The Mona Lisa","tiger","toaster","toe","toilet","tooth","toothbrush","toothpaste","tornado","tractor","traffic light","train","tree","triangle","trombone","truck","trumpet","tshirt","umbrella","underwear","van","vase","violin","washing machine","watermelon","waterslide","whale","wheel","windmill","wine bottle","wine glass","wristwatch","yoga","zebra","zigzag"];

function updateCanvas() {
	background("white");
	k = Math.floor(Math.random() * dataset.length);
	sketch = dataset[k];
	document.getElementById("drawthis").innerHTML =
		"Draw this sketch:" + sketch;
}

function preload() {
	classifier = ml5.imageClassifier("DoodleNet");
}

function classifyCanvas() {
	classifier.classify(canvas, gotResult);
}

function setup() {
	canvas = createCanvas(500, 300);
	canvas.center();
	background("white");
	updateCanvas();
	canvas.mouseReleased(classifyCanvas);
	startTime = performance.now();
}

function gotResult(error, results) {
	if (error) {
		console.error(error);
	} else {
		console.log(results);
		// Get the sketch drawn and confidence of the model that the sketch is indeed what it suggests
			drawnSketch = results[0].label;
			confidence = Math.round(results[0].confidence * 100) + "%";
		// Put the confidence and drawnSketch in the corresponding HTML elements
		if (results[0].confidence > 0.30) {
			document.getElementById("sketchguess").innerHTML =
				"Your Sketch: " + drawnSketch;

			document.getElementById("confidence").innerHTML =
				"Confidence: " + confidence;
		}
	}
}

function draw() {
	// Code for sketch drawing
	strokeWeight(7);
	stroke(0);

	if (mouseIsPressed) {
		line(pmouseX, pmouseY, mouseX, mouseY);
	}
	// Check the sketch against the given sketch
	check();

	if (drawnSketch == sketch) {
		score++;
		answer = "set";
		document.getElementById("score").innerHTML += score;
	}
}

function check() {
	timer++;
	timerToSeconds();
	document.getElementById("timer2").innerHTML = "Timer: " + timer;

	// 3000 is about 1 minute
	if (timer >= 3000) {
		timer = 0;
		timerCheck = "completed";
	}

	if (timerCheck == "completed" || answer == "set") {
		updateCanvas();
		startTime = performance.now();
		elapsedTime = 0;
		timerCheck = "";
	}
}

function timerToSeconds() {
	elapsedTime = performance.now() - startTime;
	document.getElementById("timer").innerHTML = "Timer: " + Math.round(elapsedTime / 1000);
}

