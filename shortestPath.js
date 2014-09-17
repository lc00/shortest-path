// extract number of nodes;
// create two arrays
var getNumOfNodes = function(inputArr){
	return Number(inputArr.slice(0,1))
};
var arrayOfNodes = function(inputArr, numOfNodes){
	return inputArr.slice(1, numOfNodes+1);
};
var arrayOfLinks = function(inputArr, numOfNodes) {
	return inputArr.slice(numOfNodes+1)
};

// find all links that link to node
var nodeLinks = function(str, node){
	return str.indexOf(node)>=0? true:false;
}

// find links that have a certain node
var getMatchedNodeList = function(index, arrNodes, arrLinks){
	var matchedNodeList = [];	
	for(var i=0; i< arrLinks.length; i++){
		// console.log(arrLinks[i])
		if (nodeLinks(arrLinks[i], arrNodes[index]))
			matchedNodeList.push(arrLinks[i]);
	}
	return matchedNodeList;
}

// sort the links from shortest path(from point 1 to the point closest to the end)
// to the longest path
var getSortedList = function(nodeList, linkList){
	var list= [];
	for (var i=nodeList.length-1; i>=0; i--){
		for (var j=0; j<linkList.length; j++){
			if( linkList[j].indexOf(nodeList[i]) >= 0 ){
				list.push(linkList[j]);
				linkList.splice(j, 1)
			}
		}
	}
	return list;
}


// get the 2ndNode from the shortest path(starting from point 1) 
// and getMatchedNodeList(arrLinks, 2ndNode); if no result, go for 
// the next shortest path from point 1 and getMatchedNodeList(arrLinks, node)

// sort links from shortest to longest

// check if the link has the end node; 
// if yes, done;
// else, repeat the 3rdNode


var finalArr = [];
var i=0;
var nodeNum = 5

var shortestPath = function(index, nodeArr, linkArr){

	var linksToNode = getMatchedNodeList(index, nodeArr, linkArr)
	var sortedList = getSortedList(nodeArr, linksToNode); // ["A-B", "A-C", "A-D"]
	var link = sortedList[0];

	console.log(linksToNode, sortedList, link)

	finalArr.push(link);

	if (link.indexOf(nodeArr[nodeNum-1])){

		return finalArr;
	}
	else {
		var nextNode = link.slice(-1);
		index = nodeArr.indexOf(nextNode);
		console.log(finalArr)
		return shortestPath(index, nodeArr, linkArr)

	}
}



var input = ["5","A","B","C","D","E", "A-B", "B-C", "A-D", "C-E"];

var numOfNodes = getNumOfNodes(input); // 5
var arrNodes = arrayOfNodes(input, numOfNodes); // ["A", "B", "C", "D", "E"]
var arrLinks = arrayOfLinks(input, numOfNodes); // ["A-B", "A-C", "B-C", "A-D", "B-E"]



// var linksToA = getMatchedNodeList(arrLinks, 'A'); // ["A-B", "A-C", "A-D"]
// console.log(linksToA)

// console.log(sortedList(arrNodes, linksToA))


console.log(shortestPath(0, arrNodes, arrLinks))












