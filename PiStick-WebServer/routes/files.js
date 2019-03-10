/*	ADMIN.JS - OPENPUNK
 * 		- HANDLES POST & GET REQUESTS TO /LOGIN, /SIGNUP, AND /SIGNOUT
 */
const fs = require('fs');
const path = require('path');
const {combineARGS} = require('./routerapi');

module.exports = function(router)
{
	router.get('/files', (req, res) => {
		let filesok = [];
		
		fs.readdirSync(FOLDER).forEach(file => {
			if (fs.statSync(path.join(FOLDER, file)).isDirectory())
			{
				filesok.push({Name: file, Type: 0, Path: ""}); // add folder
			}
			else
			{
				filesok.push({Name: file, Type: 1, Path: ""}); // add file
			}
		});
		
		res.render('files', {files: filesok, basepath: "/"});
	});
	
	router.get('/files*', (req, res) => {
		let filesok = [];
		let _path = req.params['0']
		fs.readdirSync(FOLDER+_path).forEach(file => {
			if (fs.statSync(path.join(FOLDER+_path, file)).isDirectory())
			{
				filesok.push({Name: file, Type: 0, Path: _path}); // add folder
			}
			else
			{
				filesok.push({Name: file, Type: 1, Path: _path}); // add file
			}
		});
		
		res.render('files', {files: filesok, root: "/files", basepath: _path});
	});
}
