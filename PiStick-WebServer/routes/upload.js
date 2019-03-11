/*	UPLOAD.JS - OPENPUNK
 * 		- HANDLES POST & GET REQUESTS TO /UPLOAD
 * 		- UPLOADS FILES TO USB MOUNTED DRIVE + RELOADS USB
 */

const {combineARGS, reloadUSB} = require('./routerapi');

module.exports = function(router)
{
	router.get('/upload*', (req, res) => {
		res.render('upload');
	});
	
	router.post('/upload*', (req, res) => {
		let _path = req.params['0']
		console.log(req.files);
		File = req.files.fileData;
		if (File) {
			File.mv(FOLDER+_path+"/"+File.name, function(err) {
				res.redirect('/files'+_path);
				// reset usb flash
				reloadUSB();
			});
		}
	});
}
