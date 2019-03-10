/* 	ROUTERAPI.JS - OPENPUNK
 * 		- HANDLES SOME RE-USED BACKEND CODE
 */

function combineARGS(ARG1, ARG2)
{
	for (var attrname in ARG2)
	{ 
		ARG1[attrname] = ARG2[attrname]; 
	}
	
	return ARG1;
}

module.exports = {
	combineARGS: combineARGS
};
