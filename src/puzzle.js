$(document).ready(function(){
	var initial = false;
	var img_index = 0;
	Array.prototype.shuffle = function() {
		var arr = this;
		var len = arr.length;
		var random_arr = [];
		for (var i = 0; i < len; ++i)
		{
			var random = Math.floor(Math.random() * arr.length);
			random_arr.push(arr[random]);
			arr.splice(random, 1);
		};
		return random_arr;
	}

	function random_arr() {
		var random_arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].shuffle();
		while(!can_recover(random_arr))
			random_arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].shuffle();
		return random_arr;
	}

	function can_recover(array) {
		var sum = 0;
		var max_index;
		var li = [0,1,0,1,1,0,1,0,0,1,0,1,1,0,1,0];
		for(var i = 0; i < array.length - 1; ++i) 
		{
			for (var j = i + 1; j < array.length; ++j)
			{
				if (array[j] < array[i])
					sum++;
			}
		}
		for (var i = 0; i < 15; ++i) 
		{
			if (array[i] == 15)
			{
				max_index = i;
				break;
			}
		}

		sum += li[max_index];
		return (sum % 2 == 0);
	}

	function is_over() {
		for (var i = 0; i < 15; ++i)
		{
			var class_of_puzzle_i = ("" + $(".puzzle_" + i).attr("class")).split(" ");
			if (parseInt(class_of_puzzle_i[1].slice("position_".length, class_of_puzzle_i[1].length)) != i)
				return false;
		}

		return true;
	}

	function is_adjacent(click_block, blank_block) {
		var x1 = click_block.left;
		var y1 = click_block.top;
		var x2 = blank_block.left;
		var y2 = blank_block.top;
		var x_diff = Math.abs(x1 - x2);
		var y_diff = Math.abs(y1 - y2);
		return (x_diff < 5 && y_diff > 75 && y_diff < 85) || 
		       (y_diff < 5 && x_diff > 75 && x_diff < 85);
	}

	$("#restart_field").click(function() {
		initial = true;
		var arr = random_arr();
		$("div .blocks").attr("class", function(i){ return "puzzle_" + i + " position_" + arr[i] + " blocks"});
	});

	$(".blocks").click(function(event){
		if(is_adjacent($(event.target).offset(), $(".puzzle_15").offset())) {
			var class_of_click_block = ("" + $(event.target).attr("class")).split(" ");
			var class_of_blank_block = ("" + $(".puzzle_15").attr("class")).split(" ");
			var temp = class_of_click_block[1];
			class_of_click_block[1] = class_of_blank_block[1];
			class_of_blank_block[1] = temp;
			$(event.target).attr("class",class_of_click_block.join(" "));
			$(".puzzle_15").attr("class",class_of_blank_block.join(" "));
		
			if (is_over() && initial)
			{
				initial = false;
				img_index = (img_index + 1) % 4;
				$(".blocks").css("background-image", "url(../image/puzzle" + img_index +".jpg)");
			}
		}
	});
})
	
