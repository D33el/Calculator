GV = { expression: "", typedOperation: false };

$(document).ready(function () {
	console.log("loaded");
});

function onClick(selector, cb) {
	$(document).on("click", selector, cb);
}

onClick(".reset", function () {
	GV.expression = "";
	$(".result").empty();
	$(".expressions").empty();
});

onClick(".delete-last", function () {
	GV.expression = "";
	showExpression();
});

onClick(".delete", function () {
	GV.expression = GV.expression.slice(0, -1);
	showExpression();
});

onClick(".number", function () {
	let val = $(this).html();
	addNumberToExpression(val);
});

onClick(".operation", function () {
	let operator = $(this).find(".icon").data("id");
	if (operator != "=") addOperatorToExpression(operator);
	else if (isValidExpression()) showResult();
});

function addNumberToExpression(number) {
	GV.typedOperation = false;
	GV.expression += number;
	showExpression();
}

function addOperatorToExpression(operator) {
	if (GV.expression.length == 0 || GV.typedOperation) return;
	GV.typedOperation = true;
	GV.expression += ` ${operator != "*" ? operator : "X"} `;
	showExpression();
}

function showExpression() {
	$(".result").html(GV.expression);
}

function showResult() {
	let result = evalExpression();
	$(".result").text(result);
	addExpressionToHistory(result);
}

function evalExpression() {
	let formattedExpression = GV.expression.replace(/X/g, "*").replace(/\s/g, "");
	return eval(formattedExpression);
}

function addExpressionToHistory(result) {
	let expression = GV.expression;
	expression += ` = ${result}`;
	$(".expressions").prepend(`<div class="expression">${expression}</div>`);
	GV.expression = "";
}

function isValidExpression() {
	return /[\X\-\/\+]/.test(GV.expression);
}
