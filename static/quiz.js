const headElem = document.getElementById("head");
const pngElem = document.getElementById("png");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
const pointsElem = document.getElementById("points");

//Class that represents the quiz
class Quiz
{
	constructor(questions, results)
	{

		//Questions
		this.questions = questions;

		//Potential results
		this.results = results;

		//Total Scores
		this.score = 0;

		//The number of the result
		this.result = 0;

		//The number of the current question
		this.current = 0;
	}

	Click(index)
	{
		//Adding scores/points
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//If at least one point was added -> the answer was right
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Otherwise searching for the right answer
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Next question
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//If no more questions -> counts the total scores
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Questions class
class Question 
{
	constructor(text, png, answers)
	{
		this.text = text; 
		this.png = png;
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Answers class
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Results class
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Check if enough score/points was scored
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Messages for the results
const results = 
[
	new Result("You should study more", 0),
	new Result("Not bad, not bad", 2),
	new Result("You are above average", 4),
	new Result("You nailed it!", 6)
];

//Questions
const questions = 
[
	new Question("A height balanced binary search tree is called: ", "",
	[
		new Answer("height tree", 0),
		new Answer("AVL tree", 1),
		new Answer("binary tree", 0),
		new Answer("binary search tree", 0)
	]),

	new Question("Test Question with the png:", "<img src=../static/question2.png />",
	[
		new Answer("2", 0),
		new Answer("3", 0),
		new Answer("4", 1),
		new Answer("0", 0)
	]),

	new Question("2 / 2 = ", "",
	[
		new Answer("0", 0),
		new Answer("1", 1),
		new Answer("2", 0),
		new Answer("3", 0)
	]),

	new Question("2 - 2 = ", "",
	[
		new Answer("0", 1),
		new Answer("1", 0),
		new Answer("2", 0),
		new Answer("3", 0)
	]),

	new Question("2 + 2 * 2 = ", "",
	[
		new Answer("4", 0),
		new Answer("6", 1),
		new Answer("8", 0),
		new Answer("10", 0)
	]),

	new Question("2 + 2 / 2 = ", "",
	[
		new Answer("1", 0),
		new Answer("2", 0),
		new Answer("3", 1),
		new Answer("4", 0)
	])
];

//The quiz itself
const quiz = new Quiz(questions, results);

Update();

//Update 
function Update()
{
	//Checks whether there are more questions
	if(quiz.current < quiz.questions.length) 
	{
		//If yes -> change the question
		headElem.innerHTML = quiz.questions[quiz.current].text;
		pngElem.innerHTML = quiz.questions[quiz.current].png;

		//Delete the old variants
		buttonsElem.innerHTML = "";

		//Create buttons for new answers
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Current number of the question
		
		pagesElem.innerHTML = "Questions: " + (quiz.current + 1) + " / " + quiz.questions.length;
		
		pointsElem.innerHTML = "Points: " + quiz.score;
		
		Init();
	}
	else
	{
		//If ends -> display results
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "";
		pointsElem.innerHTML = "Points: " + quiz.score;
	}
}

function Init()
{
	//All buttons
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	let correct = quiz.Click(index);

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(correct >= 0)
	{
		btns[correct].className = "button button_correct";
	}

	if(index != correct) 
	{
		btns[index].className = "button button_wrong";
	} 

	setTimeout(Update, 1000);
}