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
	constructor(text, png, value)
	{
		this.text = text;
		this.png = png;
		this.value = value;
	}
}

//Results class
class Result
{
	constructor(png, value)
	{
		this.png = png;
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
	new Result("<img class='questImg' src=../static/results/result1.png/>", 0),
	new Result("<img class='questImg' src=../static/results/result2.png/>", 4),
	new Result("<img class='questImg' src=../static/results/result3.png/>", 10),
	new Result("<img class='questImg' src=../static/results/result4.png/>", 14)
];

//Questions
const questions =
[
	new Question("In this implementation of an AVL tree, what information does a node have associated with it?", "",
	[
		new Answer("A key, a value, a left child, and a right child", "", 1),
		new Answer("A key", "", 0),
		new Answer("A key, a value, a left child, a right child, and a color", "", 0),
		new Answer("A key and children", "", 0)
	]),

	new Question("What do we call the first node of a tree?", "",
	[
		new Answer("The 'leaf'", "", 0),
		new Answer("The 'root'", "", 1),
		new Answer("The 'top'", "", 0),
		new Answer("The 'core'", "", 0)
	]),

	new Question("In this example tree, which node is not a leaf?", "<img class='questImg' src=../static/questions/question3.png/>",
	[
		new Answer("B", "", 0),
		new Answer("E", "", 0),
		new Answer("F", "", 0),
		new Answer("G", "", 1)
	]),

	new Question("What is depth in a tree?", "",
	[
		new Answer("The distance of a node from the center of the tree", "", 0),
		new Answer("The distance of a node from the root node", "", 1),
		new Answer("The maximum distance of a node to a leaf node", "", 0),
		new Answer("The minimum distance of a node to a leaf node", "", 0)
	]),

	new Question("In this example tree, what is the height of node D?", "<img class='questImg' src=../static/questions/question5.png/>",
	[
		new Answer("0", "", 0),
		new Answer("1", "", 1),
		new Answer("2", "", 0),
		new Answer("3", "", 0)
	]),

	new Question("Which of the following trees is not a binary tree?", "",
	[
		new Answer("", "<img class='buttonImg' src=../static/questions/question6a.png/>", 0),
		new Answer("", "<img class='buttonImg' src=../static/questions/question6b.png/>", 1),
		new Answer("", "<img class='buttonImg' src=../static/questions/question6c.png/>", 0),
		new Answer("", "<img class='buttonImg' src=../static/questions/question6d.png/>", 0)
	]),

	new Question("Which of the following is not a kind of traversal?", "",
	[
		new Answer("Pre-order", "", 0),
		new Answer("Level-order", "", 0),
		new Answer("Height-order", "", 1),
		new Answer("In-order", "", 0)
	]),

	new Question("In what order does an in-order traversal visit a node and its children?", "",
	[
		new Answer("The current node's right subtree, the current node, and the current node's left subtree", "", 0),
		new Answer("The current node, the current node's left subtree, and the current node's right subtree", "", 0),
		new Answer("The current node's left subtree, the current node's right subtree, and the current node", "", 0),
		new Answer("The current node's left subtree, the current node, and the current node's right subtree", "", 1)
	]),

	new Question("A level-order traversal uses a depth-first approach -- true or false?", "",
	[
		new Answer("True", "", 0),
		new Answer("False", "", 1),
	]),

	new Question("Which of the following is NOT an example of a binary search tree?", "",
	[
		new Answer("", "<img class='buttonImg' src=../static/questions/question10a.png/>", 1),
		new Answer("", "<img class='buttonImg' src=../static/questions/question10b.png/>", 0),
		new Answer("", "<img class='buttonImg' src=../static/questions/question10c.png/>", 0),
		new Answer("", "<img class='buttonImg' src=../static/questions/question10d.png/>", 0)
	]),

	new Question("What are the four kinds of unbalance in a tree?", "",
	[
		new Answer("Left-left, left-right, right-right, right-left", "", 1),
		new Answer("Left, right", "", 0),
		new Answer("Left-child, left-forward, right-child, right-forward", "", 0),
		new Answer("Node-left, node-middle, node-right", "", 0)
	]),

	new Question("When can a tree become unbalanced?", "",
	[
		new Answer("When updating the value of a node with a specific key, inserting a node, or removing a node", "", 0),
		new Answer("When checking if a tree contains a node with a specific key", "", 0),
		new Answer("When getting the size of the tree", "", 0),
		new Answer("When inserting or removing a node", "", 1)
	]),

	new Question("In an AVL tree, what kind of rotation(s) occur to fix a case of left-right unbalance?", "",
	[
		new Answer("Right", "", 0),
		new Answer("Left", "", 0),
		new Answer("Right and then left", "", 0),
		new Answer("Left and then right", "", 1)
	]),

	new Question("The image below correctly demonstrates how to fix a case of left-left unbalance -- true or false?", "<img class='questImg' src=../static/questions/question14.png/>",
	[
		new Answer("True", "", 1),
		new Answer("False", "", 0),
	]),
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

			if(quiz.questions[quiz.current].answers[i].text != ""){
				btn.innerHTML = quiz.questions[quiz.current].answers[i].text;
			} else {
				btn.innerHTML = quiz.questions[quiz.current].answers[i].png;
			}

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
		headElem.innerHTML = "";
		pngElem.innerHTML = quiz.results[quiz.result].png;
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

	setTimeout(Update, 500);
}
