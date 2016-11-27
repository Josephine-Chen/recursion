// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var str = ""; //String to be printed
  if (obj ==undefined){
  	return 'null'
  }
  if (typeof obj !=="object"){
		if(typeof obj === "string"){
			return '"'+obj+'"';
		}
		else{
			return obj.toString();
		}
	}
	if (typeof obj === "object"){
		if(Array.isArray(obj)&&obj.length===0){
			return '[]';
		}
		if(!Array.isArray(obj)&&Object.getOwnPropertyNames(obj).length == 0){
			return '{}';
		}
	}
	if (typeof obj == "function"){
				return '{}';
			}
	for (var prop in obj){
		if (Array.isArray(obj)&&str.length==0){ //Add brackets for new arrays
			str+="[";
		}
		else if (typeof obj == "object" && !Array.isArray(obj)&&str.length==0){
			str+="{"; //Add curly braces for new objects
		}
		if(obj.hasOwnProperty(prop)){
			//Check if array
			if (typeof obj[prop]=="function"){
				return '{}';
			}
			else if (Array.isArray(obj[prop])){
				if(/^\D/.test(prop)){ //Only add in key if it's not a number
					str+='"'+prop+'":';
				}
				str+=stringifyJSON(obj[prop])+",";//Handle nested arrays using recursion
			}
			//Check if object or a nested object
			else if (typeof obj || obj[prop]== "object"&& !Array.isArray(obj)){
				if(typeof obj[prop]=='object'){ //Check if there are nested objects
					if(/^\D/.test(prop)){ //Only print keys if they're not a number
					str+='"'+prop+'":';
				}
					str+=stringifyJSON(obj[prop])+","; //Handle nested objects
				}
				else{
					if (typeof obj[prop]=='string'){ //Add quotation marks if string, handle keys as appropriate
						/^\D/.test(prop) ? str+='"'+prop+'":"'+obj[prop]+'",': str+='"'+obj[prop]+'",';
					}
					else{ //handle keys as appropriate
						/^\D/.test(prop) ? str+='"'+prop+'":'+obj[prop]+",": str+=obj[prop]+",";
					}
				}
			}

		}
	}
	return str.substring(0,str.length-1)+(Array.isArray(obj)? "]":"}"); //Kill the extra comma and close as appropriate
};
console.log(stringifyJSON(null));
console.log(null==undefined);