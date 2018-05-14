export default (num) => {
	if (!isNaN(num)) {
		const numStr = num.toString();
		const decimal = ((numStr.indexOf(".") >= 0) ? numStr.substring(numStr.indexOf(".") + 1) : "");
		const numOnly = numStr.replace(("." + decimal), "");
		let prevSubt ;
		let nextSubt = 3,curSubt = 3;
		let numOnlyNew = numOnly;
		let indx = numOnly.length - nextSubt;
		while(indx > 0){
			numOnlyNew = numOnlyNew.slice(0, indx) + "," + numOnlyNew.slice(indx);
			nextSubt = nextSubtractor(curSubt,prevSubt);
			prevSubt = curSubt;
			curSubt = nextSubt;
			indx = numOnlyNew.indexOf(",") - nextSubt;
		}
		if(decimal === "")
			return numOnlyNew;
		else
			return numOnlyNew+"."+decimal;
	}else{
		return num;
	}
};

const nextSubtractor = (cur, prev) => {
	let ret;

	if(cur === 3)
		ret = 2;
	else if(cur === 2)
		ret = (prev === 3) ? 2 : 3 ;

	return ret;
};
