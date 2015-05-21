/**
 * @author  <Simone Di Nuovo>  <simone.dinuovo@it.adecco.net>
 * @desc    this node.js script update grunt_config directory and the gruntfile.js of your application
 */
var options = require("./package.json");
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var ncp,rimraf,_;
var fs = require('fs');
/**
 * Carichiamo le dipendenze rimraf, ncp e lodash.
 * Se non sono già state installate come dipendenze, le installa.
 */
try {
	rimraf = require('rimraf');
}
catch(e){
	console.log("installing rimraf dep...");
	var install_rimraf = execSync('npm install rimraf --save-dev');
	console.log("done");
	rimraf = require('rimraf');
}
try {
	ncp = require('ncp');
}
catch(e){
	console.log("installing ncp dep...");
	var install_ncp = execSync('npm install ncp --save-dev');
	console.log("done");
	ncp = require('ncp');
}
try {
	_ = require('lodash');
}
catch(e){
	console.log("installing lodash dep...");
	var install_ncp = execSync('npm install lodash --save-dev');
	console.log("done");
	_ = require('lodash');
}
// funzioni / tasks
/**
 * @desc clona una repository git
 * @param rep {string} - puntamento stringa alla repository GIT da clonare
 * @returns {Promise}
 */
var cloneProject = function(rep) {
	return new Promise(function(resolve,reject){
		exec('git clone ' + rep, function (error, stdout, stderr) {
			if (error)
				throw error;

			resolve();
		});
	})
};
/**
 * @desc funzione specifica per i file in grunt_config. Legge i file all'interno della repository "grunt-config", li compila con appName e author, li rinomina (togliendo gli underscore) e li copia
 * @param dir - puntamento stringa alla directory
 */
var renameConfig = function(dir,callback){

	var dive = function (dir) {
		var list = fs.readdirSync(dir);
		for( var i = 0;i<list.length;i++) {
			(function(i) {
				var file = list[i];
				var path = dir + "/" + file;
				var stat = fs.statSync(path);
				var fileContent = fs.readFileSync(path, { encoding : "utf-8" });
				var compiled = _.template(fileContent);
				var source = compiled({
					'appName': options.name,
					'author' : options.author
				});
				fs.writeFileSync(path,source,{ encoding : "utf-8" });
				console.log("File: " + path + " compiled.");
				if (stat && stat.isDirectory())
					dive(path);
				else {
					var newFile = file.replace("_", "");
					var newPath = dir + "/" + newFile;
					fs.renameSync(path, newPath);
					console.log("File: " + path + " renamed e copied in " + newPath);
				}
				/*if ( i == list.length-1)
				 callback();*/
			})(i);
		}
	};
	dive(dir);
};
/**
 * @desc copia una directory
 * @param path - puntamento stringa alla directory da copiare
 * @param destPath - path di destinazione
 */
var copyPath = function(path, destPath){
	var promise = new Promise(function (resolve, reject) {
		ncp(path, destPath, function (err) {
			if (err)
				throw err;

			resolve();
		});
	});
	return promise;
};
/**
 * @desc elimina una directory
 * @param path - puntamento stringa alla directory da eliminare
 */
var deletePath = function(path){
	var promise = new Promise(function (resolve, reject) {
		rimraf(path, function (err) {
			if (err)
				throw err;

			resolve();
		});
	});
	return promise;
};
/**
 * @desc clona il file package.json
 * @param path - puntamento stringa al file
 */
var clonePackage = function(packageFile){
	var newDep = require(packageFile);
	console.log("packageFile", packageFile);
	var compiled = _.template( JSON.stringify(newDep) );
	var source = compiled({
		'appName': options.name,
		'author' : options.author
	});
	fs.writeFileSync( "package.json",
		JSON.stringify(JSON.parse(source),null,4),
		{ encoding : "utf-8" } );

	console.log("devDependencies and paths in package.json succesfully update!");
	options = require("./package.json");
};

// controllo se esiste il path coreRepository nel package.json, sennò default https://scm.onewebuxp.allianz/scm/git/az-direct/az-direct-IT-JS-core
if ( typeof options.paths.coreRepository === 'undefined'){
	console.log("WARNING ! --- Your package.json doesn't seem to contain a string pointer to coreRepository");
	console.log("using https://scm.onewebuxp.allianz/scm/git/az-direct/az-direct-IT-JS-core as default repository...");
	options.paths.coreRepository = "https://scm.onewebuxp.allianz/scm/git/az-direct/az-direct-IT-JS-core";
}
// controllo se esiste il path corePath nel package.json, sennò default az-direct-IT-JS-core/app/templates
if ( typeof options.paths.corePath === 'undefined')
	options.paths.corePath = "az-direct-IT-JS-core/app/templates";

// controllo se esiste az-direct-IT-JS-core e se esiste la cancello per evitare errori
var exists = fs.existsSync( "./az-direct-IT-JS-core" );
if ( exists )
	rimraf.sync("./az-direct-IT-JS-core");


// cloniamo il progetto
cloneProject(options.paths.coreRepository)
	.then(function(repository){
		console.log("project cloned succesfully");

// aggiorniamo il package
		clonePackage("./" + options.paths.corePath + "/_package.json");
		console.log(clonePackage);
// cancelliamo la directory "./grunt_config"
		deletePath("./grunt_config").then(function() {
			console.log("grunt_config dir cleaned");

// copiamo la directory "./grunt_config"
			copyPath("./" + options.paths.corePath + "/grunt_config", "./grunt_config")
				.then(function () {
					console.log("grunt_config copied");

// rinominiamo e compiliamo dando in input i dati nel package.json a tutti i file nella directory "./grunt_config"
					renameConfig("./grunt_config");
					console.log("grunt_config files renamed succesfully");

// copiamo gruntfile.js
					copyPath("./" + options.paths.corePath + "/_Gruntfile.js","Gruntfile.js")
						.then(function() {
							console.log("gruntfile succesfully copied");

// eliminiamo la directory  az-direct-IT-JS-core
							deletePath("./az-direct-IT-JS-core")
								.then(function () {
									console.log("./az-direct-IT-JS-core dir cleaned");
									console.log("process succesfully exit");
								})
						})
				})
		})
	});

