window.onload=function(){
	var 
beijing=document.getElementById('beijing'),
snake=[{x:0,y:0}],
MAXSNAKE=ROW*ROW,RIGHT=39,LEFT=37,UP=38,DOWN=40,
SNAKECOLOR='#c4c4c4',FOODCOLOR='#ff1a14',DEFAULTCOLOR='white',
defaultDirection=RIGHT,
ROW=20;
for(var i=0;i<ROW;i++){
	for(var j=0;j<ROW;j++){
		var screenb=document.createElement('div');
		screenb.setAttribute('class','scbox');
		screenb.setAttribute('id',i+'__'+j);
		screenb.style.width=Math.floor((600-ROW)/ROW)+'px';
		screenb.style.height=Math.floor((600-ROW)/ROW)+'px';
		beijing.appendChild(screenb);
	}
}
var isInSnake=function(cc,dd){
	for(var i=0;i<snake.length;i++){
		if(snake[i].x==cc&&snake[i].y==dd){
			return true;
		}
	}
	return false;
};
var dropSnake=function(){
	for(var i=0;i<snake.length;i++){
		document.getElementById(snake[i].x+'__'+snake[i].y).style.background=SNAKECOLOR;
	}
};
dropSnake();
var dropFood=function(){
	var x=Math.floor(Math.random()*ROW);
	var y=Math.floor(Math.random()*ROW);
	if( snake.length == MAXSNAKE ){return lacotion.reload();}
	while(isInSnake(x,y)){
		x=Math.floor(Math.random()*ROW);
		y=Math.floor(Math.random()*ROW);
	}
	document.getElementById(x+'__'+y).style.background=FOODCOLOR;
	return {foodx:x,foody:y};
};
var food=dropFood();
zou=function(){
	var newHead,last=snake.length-1;
	if(defaultDirection==RIGHT){
		newHead={x:snake[last].x,y:snake[last].y+1};
	}
	if(defaultDirection==LEFT){
		newHead={x:snake[last].x,y:snake[last].y-1};
	}
	if(defaultDirection==DOWN){
		newHead={x:snake[last].x+1,y:snake[last].y};
	}
	if(defaultDirection==UP){
		newHead={x:snake[last].x-1,y:snake[last].y};
	}
	if(newHead.x>(ROW-1)||newHead.x<0||newHead.y>(ROW-1)||newHead.y<0){
		alert('撞墙了!');
		clearInterval(shijian2);
		return;
	}
	if(isInSnake(newHead.x,newHead.y)){
		alert('咬到自己了');
		clearInterval(shijian2);
		return;
	}
	if(newHead.x==food.foodx&&newHead.y==food.foody){
		snake.push(newHead);
		document.getElementById(food.foodx+'__'+food.foody).style.background=SNAKECOLOR;
		food=dropFood();
		return;
	}
	var weiba=snake.shift();
	snake.push(newHead);
	var t=document.getElementById(weiba.x+'__'+weiba.y);
	t.style.background=DEFAULTCOLOR;
	var h=document.getElementById(newHead.x+'__'+newHead.y);
	h.style.background=SNAKECOLOR;
};
document.onkeydown=function(e){
	e.preventDefault();
	var direction=e.keyCode;
		if(Math.abs(direction-defaultDirection)!==2){
			defaultDirection =direction;
		}
};
var shijian2 =setInterval(zou,300);
};