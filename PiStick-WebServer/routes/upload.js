/*	UPLOAD.JS - OPENPUNK
 * 		- HANDLES POST & GET REQUESTS TO /UPLOAD
 * 		- UPLOADS FILES TO USB MOUNTED DRIVE + RELOADS USB
 */

const exec = require('child_process').exec;

const {combineARGS} = require('./routerapi');

module.exports = function(router)
{
	router.get('/upload*', (req, res) => {
		let _path = req.params['0']
		res.render('upload');
	});
	
	router.post('/upload*', (req, res) => {
		let _path = req.params['0']
		
		File = req.files.fileData;
		File.mv(FOLDER+_path+"/"+File.name, function(err) {
			if (err)
			{
				res.render('upload', {message: "File failed to upload!", error: true});
				return;
			}
			res.render('upload', {message: "File uploaded sucessfully!", error: false});

			// reset usb flash
			exec(SHELL_UNMOUNT, function(r) {
				exec(SHELL_MOUNT)
			});
		});
	});
}
