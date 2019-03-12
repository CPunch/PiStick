/*	FILES.JS - OPENPUNK
 * 		- HANDLES GET REQUESTS TO /FILES
 */
const fs = require('fs');
const path = require('path');
const {combineARGS, reloadUSB} = require('./routerapi');

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
		let _path = req.params['0'];
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

	router.post('/create*', (req, res) => {
		let _path = req.params['0'];

		if (req.body.folderName) {
			let folderName = FOLDER + _path + "/" + req.body.folderName;
			console.log(folderName);
			if (!fs.existsSync(folderName)) // make sure directory doesn't already exist
			{
				fs.mkdirSync(folderName); // create directory

				reloadUSB(); // reload usb
			}
		}

		res.redirect('/files'+_path);
	});
	
	router.get('/remove*', (req, res) => {
		let _path = req.params['0'];

		let fileName = FOLDER + _path;
		console.log(fileName);
		if (fs.existsSync(fileName)) // make sure exists
		{
			fs.unlinkSync(fileName); // delete

			reloadUSB(); // reload usb
		}
		else
		{
			console.log(fileName + " doesn't exist!")
		}
		res.redirect('/files');
	});
}
