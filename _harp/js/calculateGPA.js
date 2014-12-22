$(document).ready(function() {
	//Remove a class
	$('.form button').on('click', function(event) {
		$(this).parent().remove();
		event.preventDefault();
	});
	$template = $('.form').first().clone(true, true);

	$('.form button').css("visibility", "hidden");

	//Add a class
	$('#addClass').on('click', function() {
		$template.clone(true, true).appendTo($('.classes'));
		if ($('.form').size() > 1) {
			$('.form button').css('visibility', 'visible');
		}
	});

	$letterGrades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
	$APCredits = [5.0, 4.7, 4.3, 4.0, 3.7, 3.3, 3.0, 2.7, 2.3, 2.0, 1.7, 0];
	$HonorsCredits = [4.7, 4.4, 4.0, 3.7, 3.4, 3.0, 2.7, 2.4, 2.0, 1.7, 1.4, 0];
	$CPCredits = [4.0, 3.7, 3.3, 3.0, 2.7, 2.3, 2.0, 1.7, 1.3, 1.0, 0.7, 0];
	$FoundationsCredits = [3.0, 2.7, 2.3, 2.0, 1.7, 1.3, 1.0, 0.7, 0.3, 0, 0, 0];
	$unweightedScale = [4.0, 3.7, 3.3, 3.0, 2.7, 2.3, 2.0, 1.7, 1.3, 1.0, 0]

	//Calculate the weighted and unweighted GPA
	$('#findGPA').on('click', function() {
		$numClasses = $('.className').size();
		$weightedCredits = 0;
		$unweightedCredits = 0;

		//Count the total number of credits
		for (var count = 0; count < $numClasses; count++) {
			$grade = $('.grade').get(count).value.toUpperCase();
			$type = $('.selectForm').get(count).value;
			$weightedCredits += findWeightedCredits($type, $grade);
			$unweightedCredits += findCredits($unweightedScale, $grade);
		}

		$weightedgpa = ($weightedCredits/$numClasses).toFixed(2);
		$unweightedgpa = ($unweightedCredits/$numClasses).toFixed(2);

		$('.results').html("<h1>Your weighted GPA is: " + $weightedgpa + "<br>Your unweighted GPA is: " + $unweightedgpa + "</h1>");
		$('.results').scrollIntoView();
	});

	function findWeightedCredits($type, $grade) {
		//Determine which set of credits to use
		$array = null;
		if ($type == "AP") {
			$array = $APCredits;
		} else if ($type == "Honors") {
			$array = $HonorsCredits;
		} else if ($type == "CP") {
			$array = $CPCredits;
		} else {
			$array = $FoundationsCredits;
		}

		return findCredits($array, $grade);
	}

	//Finds the number of credits for one class
	function findCredits($array, $grade) {
		//Find credits according to grade
		$index = $letterGrades.indexOf($grade);
		$classCredit = 0;
		if ($index != -1) {
			$classCredit = $array[$index];
		} else {
			alert("Please enter in valid grades");
		}
		return $classCredit;
	}

});
