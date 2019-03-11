/* 	ROUTERAPI.JS - OPENPUNK
 * 		- HANDLES SOME RE-USED BACKEND CODE
 */

const exec = require('child_process').exec;

function combineARGS(ARG1, ARG2)
{
	for (var attrname in ARG2)
	{ 
		ARG1[attrname] = ARG2[attrname]; 
	}
	
	return ARG1;
}

module.exports = {
	combineARGS: combineARGS,
	reloadUSB: function(callback=function(r){}) {
		exec(SHELL_UNMOUNT, function(r) {
			exec(SHELL_MOUNT, callback)
		});
	}
};
