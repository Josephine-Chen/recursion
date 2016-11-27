// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
	//should use document.body, element.childNodes, and element.classList
  var elementsArr = [];
  function recursion(element){
  	//check if classList contains className, if it does, add it to elements array
  	if(_(element.classList).contains(className)){
  		elementsArr.push(element);
  	}
  	//do recursion if there are child nodes
  	_(element.childNodes).forEach(function(child){
  		recursion(child);
  	});
  }
  recursion(document.body);
  return elementsArr;
};
