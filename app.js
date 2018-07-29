function createRandomTextNode(array) {
	random_element = array[Math.floor(Math.random() * array.length)]
	text_node = document.createTextNode(random_element)
	return text_node
}

function chooseRandom(array, count_limit, type) {
	if (type == "counts") {
		new_array = array.filter(function(x) {
    		return x <= count_limit;
    	});
    	return new_array[Math.floor(Math.random() * new_array.length)];
	}

	else {
		return array[Math.floor(Math.random() * array.length)];
	}
}

function isSameMove(a, b) { // Checks if two steps are equivalent
	if (a["Move"] != b["Move"]) {
		return false;
	} 

	else {
		console.log("They are equal");
		return true;
	}  
}

function returnStep(dance_moves, counts, counts_left, first, i, all_steps) {
	var chosen_step = {
		Move: chooseRandom(dance_moves, 0, "none"),
		Count: chooseRandom(counts, counts_left, "counts")
	};

	console.log("New step! " + chosen_step["Move"] + chosen_step["Count"]);

	if (!first) {
		// If the same as last step, create a new step
		var same_move = isSameMove(chosen_step, all_steps[i-1])
		if (!same_move) {
			return chosen_step;
		}
		else {
			console.log("They are equal, so we'll find another step");
			return returnStep(dance_moves, counts, counts_left, false, i, all_steps);
		}
	}

	else {
		return chosen_step;
	}
}

function myFunction() {
	var total_counts = 0;
	var max_counts = 16;
	var i = 0;
	var all_steps = [];
	var counts_done = 0;

	for (i=0; total_counts < max_counts; i++) {
		var dance_moves = [];
		var tendu_moves = ["Tendus to the front", "Tendus to the side", "Tendus to the back", "Passe", "Plies"];
		var frappe_moves = ["Frappes to the front", "Frappes to the side", 
		"Frappes to the back", "Passe", "Petit battement", "Plies"];
		var counts = [2, 4, 8, 16];
		var counts_left = max_counts;
		var step = {};

		// Check for routine preferences
		if (document.getElementById("tendus-option").checked) {
			dance_moves = tendu_moves;
		}
		else if (document.getElementById("frappes-option").checked) {
			dance_moves = frappe_moves;
		}


		// Update counts left to fit the rest of the 8-count 
		if (total_counts > 0) {
			counts_left = 8 - total_counts % 8; 
			step = returnStep(dance_moves, counts, counts_left, false, i, all_steps);
			all_steps.push(step);
			total_counts += all_steps[i]["Count"]
		}

		else {
			step = returnStep(dance_moves, counts, counts_left, true, i, all_steps);
			all_steps.push(step);
			total_counts += step["Count"];
		}

		// Print the routine
		var li = document.createElement("li");
		var for_text = document.createTextNode(" for ")
		var counts_text = document.createTextNode(" counts")

		li.appendChild(document.createTextNode(step['Move']))
		li.appendChild(for_text)
		li.appendChild(document.createTextNode(step['Count']))
		li.appendChild(counts_text)

		document.getElementById("routine-list").appendChild(li);

	}
	var last_li = document.createElement("li");
	var soutenu_text = document.createTextNode("Soutenu turn to other side");
	last_li.appendChild(soutenu_text);
	document.getElementById("routine-list").appendChild(last_li);
	
}