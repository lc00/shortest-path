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
	// console.log(linkList)\\
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

var getPreviousNode_Link= function(index, nodeArr, linkArr){
	var temp = finalArr.pop();
	var splitArr = temp.split('-');
	if(splitArr[0] === nodeArr[index]){
		var previousNode = splitArr[1];
	}
	else{
		var previousNode = splitArr[0]
	}

	var index = nodeArr.indexOf(previousNode)
	var previousNodeList = getMatchedNodeList(index, nodeArr, linkArr);

	if (previousNodeList.length !== 0){
		var previousNodeSortedList = getSortedList(nodeArr, previousNodeList);

		var currentLink = previousNodeSortedList[0]
		var currentLinkSplit = currentLink.split('-')

		if (currentLinkSplit[0] === nodeArr[index]){
			var nextNode = currentLinkSplit[1]
		}
		else {
			var nextNode = currentLinkSplit[0]
		}	
		var nextNodeIndex = nodeArr.indexOf(nextNode)

		finalArr.push(currentLink); 
		linkArr.splice(linkArr.indexOf(currentLink), 1) // remove current Link from linkArr
		shortestPath(nextNodeIndex, nodeArr, linkArr)
	}

	else { // if previous node sorted list doesn't have the next index
		if ( finalArr.length !== 0){
			getPreviousNode_Link();

		}
		else {
			return "no answer"
		}

	}
}

var finalArr = [];

var shortestPath = function(index, nodeArr, linkArr){

	var hello = getMatchedNodeList(index, nodeArr, linkArr);

	if (hello.length === 0){
		if (finalArr.length === 0){
			return "no answer"
		}
		else{
			getPreviousNode_Link(index, nodeArr, linkArr);
		}
	}
	else{
		var sortedList = getSortedList(nodeArr, hello); // ["A-B", "A-C", "A-D"]
		var link = sortedList[0];

		var nextNode = link.slice(-1);

		if ( link.indexOf(nodeArr[nodeArr.length - 1]) >= 0 ){
			finalArr.push(link)
		// console.log(hello, sortedList, link)
			console.log(index)
			return finalArr; 
		}
		else {
			// var nextNode = link.slice(-1);
			finalArr.push(link)
			index = nodeArr.indexOf(nextNode);
			linkArr.splice(linkArr.indexOf(link), 1) // remove lin in linkArr

			console.log(nextNode, index) // B, 1
			return shortestPath(index, nodeArr, linkArr)

		}
		

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












