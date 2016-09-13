var Snake = function() {
	this.snakes = [
		[0, 0],
		[1, 0],
		[2, 0]
	];
	this.x = 3;
	this.y = 0;
	this.longness = 25;
	this.scores = 0;
	this.foods = [];
	this.direction = 'right';
	this.start();
}
Snake.prototype = {
	//启动
	start: function() {
		this.init();
		this.run();
	},
	//初始化
	init: function() {
		this.food();
		$("#x" + this.foods[0] + "y" + this.foods[1] + "").css("background", "blue");
		for (var i = 0; i < this.snakes.length; i++) {
			$("#x" + this.snakes[i][0] + "y" + this.snakes[i][1] + "").css("background", "red");
		}
	},
	//移动
	move: function() {
		this.snakes.push([this.x, this.y]);
		this.snakes.shift();
		this.key();
	},
	//创造食物坐标
	food: function() {
		var ary1 = [];
		var ary2 = [];
		for (var i = 0; i < this.snakes.length; i++) {
			ary1.push([this.snakes[i][0], this.snakes[i][1]]);
		}
		for (var j = 0; j < this.longness; j++) {
			for (var l = 0; l < this.longness; l++) {
				ary2.push([l, j]);
			}
		}
		var sum = ary2.concat(ary1);
		sum.sort();
		var s = [];
		for (var k = 0; k < sum.length - 1; k++) {
			if (sum[k][0] == sum[k + 1][0] && sum[k][1] == sum[k + 1][1]) {
				k++;
			} else {
				s.push([(sum[k][0]), (sum[k][1])]);
			}
		}
		s.push([(sum[sum.length - 1][0]), (sum[sum.length - 1][1])]);
		var yui = Math.floor(Math.random() * s.length);
		this.foods[0] = s[yui][0];
		this.foods[1] = s[yui][1];
	},
	//吃到食物
	eatfood: function() {
		this.snakes.unshift([this.x, this.y]);
		this.food();
		this.scores += 1;
	},
	//吃到自己
	eatself: function() {
		this.death();
	},
	//碰到墙壁
	collisionwall: function() {
		this.death();
	},
	//死亡
	death: function() {
		alert("you die!!!");
		window.location.reload();
	},
	//碰撞判定
	determine: function() {
		//碰到食物
		if (this.foods[0] == this.snakes[this.snakes.length - 1][0] && this.foods[1] == this.snakes[this.snakes.length - 1][1]) {
			this.eatfood();
		}
		//碰到墙壁
		else if (this.snakes[this.snakes.length - 1][0] > this.longness - 1 || this.snakes[this.snakes.length - 1][0] < 0 || this.snakes[this.snakes.length - 1][1] > this.longness - 1 || this.snakes[this.snakes.length - 1][1] < 0) {
			this.collisionwall();
		}
		//什么都没碰到
		else {
			this.move();
		}
		//碰到身体
		for (var j = 0; j < this.snakes.length - 1; j++) {
			if (this.snakes[this.snakes.length - 1][0] == this.snakes[j][0] && this.snakes[this.snakes.length - 1][1] == this.snakes[j][1]) {
				this.eatself();
			}
		}
	},
	//键盘事件
	key: function() {
		var self = this;
		$(document).keydown(function(event) {
			var key = event.keyCode;
			switch (key) {
				case 38:
					if (self.direction == 'bottom') {
						return;
					}
					self.direction = 'top';
					break;
				case 40:
					if (self.direction == 'top') {
						return;
					}
					self.direction = 'bottom';
					break;
				case 37:
					if (self.direction == 'right') {
						return;
					}
					self.direction = 'left';
					break;
				case 39:
					if (self.direction == 'left') {
						return;
					}
					self.direction = 'right';
					break;
			}
		});
		if (self.direction == 'top') {
			this.y -= 1;
		} else if (self.direction == 'bottom') {
			this.y += 1;
		} else if (self.direction == 'left') {
			this.x -= 1;
		} else if (self.direction == 'right') {
			this.x += 1;
		}
	},
	//得分显示
	score: function() {
		$("#score").html(this.scores);
	},
	//遍历
	ergodic: function() {
		this.determine();
		this.score();
		$("td").css("background", "none");
		$("#x" + this.foods[0] + "y" + this.foods[1] + "").css("background", "blue");
		for (var i = 0; i < this.snakes.length; i++) {
			$("#x" + this.snakes[i][0] + "y" + this.snakes[i][1] + "").css("background", "red");
		}
	},
	//跑起来
	run: function() {
		var self = this;
		setInterval(function() {
			self.ergodic();
		}, 60);
	}
}
$(function() {
	var a = new Snake();
});