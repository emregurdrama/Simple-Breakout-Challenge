(function () {
    drawTable();

    var level = [
        '**************',
        '**************',
        '**************',
        '**************'
    ];

    var gameLoop;
    var gameSpeed = 20;
    var ballMovementSpeed = 5;
	var start = 0;
	var score = 0;
	var life = 3;
	var highScore = 0;

    var bricks = [];
    var bricksMargin = 1;
    var bricksWidth = 0;
    var bricksHeight = 18;

    var ball = {
        width: 6,
        height: 6,
        left: 0,
        top: 0,
        speedLeft: 0,
        speedTop: 0
    };

    var paddle = {
        width: 100,
        height: 6,
        left: (document.getElementById('breakout').offsetWidth / 2) - 30,
        top: document.getElementById('breakout').offsetHeight - 40
    };
	
	startMsg = function()
	{		
		document.getElementById('startMsg').onclick = function()
		{
			if(start == 0)
			{
				setEvents();
				startGame();
				startGameLoop();
				start = 1;
				var startMsg = document.getElementById('startMsg');
				startMsg.style.display = 'none';
			}
		}
	}

	restartMsg = function()
	{		
		document.getElementById('restartMsg').onclick = function()
		{
			setEvents();
			startGame();
			start = 1;

			document.getElementById('gameOverMsg').style.display = 'none';
			document.getElementById('restartMsg').style.display = 'none';
		}
	}

    function startGame () {
		score = 0;
		life = 3;
        resetBall();
        buildLevel();
        createBricks();
        updateObjects();

		document.getElementById('lifeMsg').style.display = 'block';
		document.getElementById('scoreMsg').style.display = 'block';

		document.getElementById('lifeMsg').innerHTML = "Life: " + life;
		document.getElementById('scoreMsg').innerHTML = "Score: " + score;

    }

    function drawTable() {
        document.body.style.background = '#0E5CAD';
        document.body.style.font = '18px Orbitron';
        document.body.style.color = '#FFF';
        
        var breakout = document.createElement('div');
		var startMsg = document.getElementById('startMsg');
		var gameOverMsg = document.getElementById('gameOverMsg');
		var restartMsg = document.getElementById('restartMsg');
		var lifeMsg = document.getElementById('lifeMsg');
		var scoreMsg = document.getElementById('scoreMsg');
		var highScoreMsg = document.getElementById('highScoreMsg');
        var paddle = document.createElement('div');
        var ball = document.createElement('div');
        
        breakout.id = 'breakout';
        breakout.style.width = '800px';
        breakout.style.height = '600px';
        breakout.style.position = 'fixed';
        breakout.style.left = '50%';
        breakout.style.top = '50%';
        breakout.style.transform = 'translate(-50%, -50%)';
        breakout.style.background = '#000000';
        
        startMsg.id = 'startMsg';
       	startMsg.style.fillStyle = "red";
       	startMsg.style.font = "28px comic sans MS";
        startMsg.style.width = '200px';
        startMsg.style.height = '50px';
		startMsg.style.position = 'fixed';
        startMsg.style.left = '50%';
        startMsg.style.top = '50%';
        startMsg.style.transform = 'translate(-50%, -50%)';
		startMsg.style.background = '#003430';
		startMsg.style.textAlign = 'center';
		
        gameOverMsg.id = 'gameOverMsg';
       	gameOverMsg.style.fillStyle = "red";
       	gameOverMsg.style.font = "28px comic sans MS";
        gameOverMsg.style.width = '200px';
        gameOverMsg.style.height = '50px';
		gameOverMsg.style.position = 'fixed';
        gameOverMsg.style.left = '50%';
        gameOverMsg.style.top = '40%';
        gameOverMsg.style.transform = 'translate(-50%, -50%)';
		gameOverMsg.style.background = '#003430';
		gameOverMsg.style.display = 'none';
		gameOverMsg.style.textAlign = 'center';

        restartMsg.id = 'restartMsg';
       	restartMsg.style.fillStyle = "red";
       	restartMsg.style.font = "28px comic sans MS";
        restartMsg.style.width = '200px';
        restartMsg.style.height = '50px';
		restartMsg.style.position = 'fixed';
        restartMsg.style.left = '50%';
        restartMsg.style.top = '60%';
        restartMsg.style.transform = 'translate(-50%, -50%)';
		restartMsg.style.background = '#003430';
		restartMsg.style.display = 'none';
		restartMsg.style.textAlign = 'center';

        lifeMsg.id = 'lifeMsg';
       	lifeMsg.style.fillStyle = "red";
       	lifeMsg.style.font = "20px comic sans MS";
        lifeMsg.style.width = '100px';
        lifeMsg.style.height = '25px';
		lifeMsg.style.position = 'fixed';
        lifeMsg.style.left = '70%';
        lifeMsg.style.top = '13%';
        lifeMsg.style.transform = 'translate(-50%, -50%)';
		lifeMsg.style.display = 'none';

        scoreMsg.id = 'scoreMsg';
       	scoreMsg.style.fillStyle = "red";
       	scoreMsg.style.font = "20px comic sans MS";
        scoreMsg.style.width = '100px';
        scoreMsg.style.height = '25px';
		scoreMsg.style.position = 'fixed';
        scoreMsg.style.left = '32%';
        scoreMsg.style.top = '13%';
        scoreMsg.style.transform = 'translate(-50%, -50%)';
		scoreMsg.style.display = 'none';

        highScoreMsg.id = 'highScoreMsg';
       	highScoreMsg.style.fillStyle = "red";
       	highScoreMsg.style.font = "24px comic sans MS";
        highScoreMsg.style.width = '170px';
        highScoreMsg.style.height = '30px';
		highScoreMsg.style.position = 'fixed';
        highScoreMsg.style.left = '50%';
        highScoreMsg.style.top = '5%';
        highScoreMsg.style.transform = 'translate(-50%, -50%)';
		highScoreMsg.style.display = 'block';
		highScoreMsg.style.textAlign = 'center';

        paddle.id = 'paddle';
        paddle.style.background = '#E80505';
        paddle.style.position = 'absolute';
        paddle.style.boxShadow = '0 15px 6px -2px rgba(0,0,0,.6)';

        ball.className = 'ball';
        ball.style.position = 'absolute';
        ball.style.background = '#FFF';
        ball.style.boxShadow = '0 15px 6px -1px rgba(0,0,0,.6)';
        ball.style.borderRadius = '50%';
        ball.style.zIndex = '9';
        
        breakout.appendChild(paddle);
        breakout.appendChild(ball);
        
        breakout.appendChild(startMsg);
        breakout.appendChild(gameOverMsg);
        breakout.appendChild(restartMsg);
		
        document.body.appendChild(breakout);
    }

    function removeElement(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }

    function buildLevel () {
        var arena = document.getElementById('breakout');
    
        bricks = [];
    
        for (var row = 0; row < level.length; row ++) {
            for (var column = 0; column <= level[row].length; column ++) {
    
                if (!level[row][column] || level[row][column] === ' ') {
                    continue;
                }
    
                bricksWidth = (arena.offsetWidth - bricksMargin * 2) / level[row].length;
    
                bricks.push({
                    left: bricksMargin * 2 + (bricksWidth * column),
                    top: bricksHeight * row + 60,
                    width: bricksWidth - bricksMargin * 2,
                    height: bricksHeight - bricksMargin * 2
                });
            }
        }
    }

    function removeBricks () {
        document.querySelectorAll('.brick').forEach(function (brick) {
            removeElement(brick);
        });
    }
	
	function removeOneBrick (index) {
		bricks[index].removed = true;
        removeElement(document.getElementById("brick-" + index));
    }
	

    function createBricks () {
        removeBricks();

        var arena = document.getElementById('breakout');

        bricks.forEach(function (brick, index) {
            var element = document.createElement('div');

            element.id = 'brick-' + index;
            element.className = 'brick';
            element.style.left = brick.left + 'px';
            element.style.top = brick.top + 'px';
            element.style.width = brick.width + 'px';
            element.style.height = brick.height + 'px';
            element.style.background = '#FFFFFF';
            element.style.position= 'absolute';
            element.style.boxShadow= '0 15px 20px 0px rgba(0,0,0,.4)';

            arena.appendChild(element)
        });
    }

    function updateObjects () {
        document.getElementById('paddle').style.width = paddle.width + 'px';
        document.getElementById('paddle').style.height = paddle.height + 'px';
        document.getElementById('paddle').style.left = paddle.left + 'px';
        document.getElementById('paddle').style.top = paddle.top + 'px';

        document.querySelector('.ball').style.width = ball.width + 'px';
        document.querySelector('.ball').style.height = ball.height + 'px';
        document.querySelector('.ball').style.left = ball.left + 'px';
        document.querySelector('.ball').style.top = ball.top + 'px';
    }

    function resetBall () {
        var arena = document.getElementById('breakout');

        ball.left = (arena.offsetWidth / 2) - (ball.width / 2);
        ball.top = (arena.offsetHeight / 1.6) - (ball.height / 2);
        ball.speedLeft = 1;
        ball.speedTop = ballMovementSpeed;
    
        if (Math.round(Math.random() * 1)) {
            ball.speedLeft = -1;
        }

        document.querySelector('.ball').style.left = ball.left + 'px';
        document.querySelector('.ball').style.top = ball.top + 'px';
    }

    function movePaddle (clientX) {
        var arena = document.getElementById('breakout');
        var arenaRect = arena.getBoundingClientRect();
        var arenaWidth = arena.offsetWidth;
        var mouseX = clientX - arenaRect.x;
        var halfOfPaddle = document.getElementById('paddle').offsetWidth / 2;

        if (mouseX <= halfOfPaddle) {
            mouseX = halfOfPaddle;
        }

        if (mouseX >= arenaWidth - halfOfPaddle) {
            mouseX = arenaWidth - halfOfPaddle;
        }

        paddle.left = mouseX - halfOfPaddle;
    }
	
	document.onkeydown = function(event){
		if(event.keyCode == 37){
			paddle.left -= 10;
		}

		else if(event.keyCode == 39){
			paddle.left += 10;
		}
	 }

 
    function moveBall () {
        
		if(life <= 0)
		{
			return;
		}

        detectCollision();

        var arena = document.getElementById('breakout');
    
        ball.top += ball.speedTop;
		ball.left += ball.speedLeft;
    
        if (ball.left <= 0 || ball.left + ball.width >= arena.offsetWidth) {
            ball.speedLeft = -ball.speedLeft;
        }
    
        if (ball.top <= 0 || ball.top + ball.height >= arena.offsetHeight) {
            ball.speedTop = -ball.speedTop;
        }

        if (ball.top + ball.height >= arena.offsetHeight) {
            resetBall();
			life--;
			document.getElementById('lifeMsg').innerHTML = "Life: " + life;

			if(life <= 0)
			{
				if(score >= highScore)
				{
					highScore = score;
				}

				document.getElementById('gameOverMsg').style.display = 'block';
				document.getElementById('restartMsg').style.display = 'block';

				document.getElementById('highScoreMsg').innerHTML = "High Score: " + highScore;
			}
        }
    }

    function detectCollision () {
        if (ball.top + ball.height >= paddle.top
         && ball.top + ball.height <= paddle.top + paddle.height
         && ball.left >= paddle.left
         && ball.left <= paddle.left + paddle.width
        ) {
            ball.speedTop = -ball.speedTop;
        }
    
        for (var i = 0; i < bricks.length; i ++) {
            var brick = bricks[i];
    
            if (ball.top + ball.height >= brick.top
             && ball.top <= brick.top + brick.height
             && ball.left + ball.width >= brick.left
             && ball.left <= brick.left + brick.width
             && !brick.removed
            ) {
                ball.speedTop = -ball.speedTop;
				ball.speedTop *= 1.05;
				ball.speedLeft *= 1.05;
				removeOneBrick(i);
				score++;
				document.getElementById('scoreMsg').innerHTML = "Score: " + score;

                break;
            }
        }
    }

    function setEvents () {
        document.addEventListener('mousemove', function (event) {
            movePaddle(event.clientX);
        });
    }

    function startGameLoop () {
        gameLoop = setInterval(function () {
            moveBall();
            updateObjects();
        }, gameSpeed);
    }
	
	if(start == 0)
	{
		startMsg();
	}

	restartMsg();
})();