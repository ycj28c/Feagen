var mavenPath = "/apache-maven-3.3.3/bin/mvn";
var additionMvnParameter = "-Denv=qa -Dbrowser=chrome -Pdevelopment -Dforks=1";

/* parse the java code of bdd steps */
function codeAnalyze(currentPath){
	var fs = require('fs');

	/* recusively traverse each *.java file in the folder */
	var traverseFileSystem = function (currentPath) {
		//console.log(currentPath);
		var files = fs.readdirSync(currentPath);
		//console.log(files);
		for (var i in files) {
			var currentFile = currentPath + '/' + files[i];
			var stats = fs.statSync(currentFile);
			if (stats.isFile()) {
				//console.log(currentFile);
				var javaFileRegex = /.*Step\.java/g;
				var javaFile = javaFileRegex.exec(currentFile);
				if(javaFile){
					//alert(files.length);
					console.log("\n%%%%%%%%%%%%%%%%%% Parsing "+files[i]+" %%%%%%%%%%%%%%%%%%\n");
					console.log("File Location: "+javaFile+"\n\n");
					//readFile(currentFile, "C:/git/nodeWebkit/feagen/temp/"+files[i].substring(0, files[i].length-5)+".json");
					var tempFile = globalFolder + "/temp/"+files[i].substring(0, files[i].length-5)+".json";
					readFile(currentFile, tempFile);
				}
			} else if (stats.isDirectory()) {
				 traverseFileSystem(currentFile);
			}
		}
	};
	traverseFileSystem(currentPath);

	alert('Complete the code analyze!');
	//angular.element($('#stepOptions')).scope().updateModel("C:/git/nodeWebkit/feagen/temp/"+linkTo+".json");
	//angular.element($('#stepOptions')).scope().options("C:/git/nodeWebkit/feagen/temp"); //refresh the options
	//var tempJson = globalFolder + "/temp";
	//angular.element($('#stepOptions')).scope().options(tempJson); //refresh the options
	
	/* update the angular js data blind in the UI */
	angular.element($('#stepOptions')).scope().updateOptions();
	//angular.element($('#stepOptions')).scope().options = [
	//  {path:"C:/Users/ryang/AppData/Local/Temp/nw12404_32243/temp/CompanyProfilePageStep.json", abbr:"CompanyProfilePageStep"},
	//  {path:"C:/Users/ryang/AppData/Local/Temp/nw12404_32243/temp/DashboardSearchPageStep.json", abbr:"DashboardSearchPageStep"},
	//  {path:"C:/Users/ryang/AppData/Local/Temp/nw12404_32243/temp/DisclosureSearchPageStep.json", abbr:"DisclosureSearchPageStep"},
	//  {path:"C:/Users/ryang/AppData/Local/Temp/nw12404_32243/temp/HomePageStep.json", abbr:"HomePageStep"}
	//]
}

/* read *step.java file and format with json file */
function readFile(path, output){
	var fs = require('fs');
	var regexArray = new Array();

	var codeArray = fs.readFileSync(path).toString().split('\n');
	//console.log(codeArray);
	for(var i = 0, l = codeArray.length; i < l; i++) {
		var smodal = new stepModal();

		//console.log(codeArray[i]);

		/* support When/Then/Given/And BDD key */
		var annotationRegex = /(\s*)(@When|@Then|@Given|@And)(.*)/g;
		var annotation = annotationRegex.exec(codeArray[i]);
		/* find Java BDD cucumber annotation */
		if(annotation!=null){
			console.log("Get Annotation: "+codeArray[i]);

			var a1 = annotation[2];
			var a2 = annotation[3];
			console.log("Flag: "+a1.substring(1));

			smodal.flag = a1.substring(1);

			var sentenceRegex = /(\(\"\^)(.*)(\$\"\))/g;
			var sentence = sentenceRegex.exec(a2);
			console.log("Regular Express: "+sentence[2]);
			smodal.regularExpress = sentence[2];

			mode = "methodMode";
			i++;

			/* parse the Java method keyword */
			while(i < l){
				if(codeArray[i].trim().length>1){
					console.log("Get Java Method Line: "+codeArray[i]);
					var methodLineRegex = /(\s*)([0-9a-zA-Z]*)(\s*)([0-9a-z_A-Z]*)(\(.*\))/g;
					var method = methodLineRegex.exec(codeArray[i]);

					var linkToMethod = method[2]+"Step";
					console.log("Get LinkTo Method: "+linkToMethod);
					smodal.linkTo = linkToMethod;

					var methodName = method[4];
					console.log("Get Method Name: "+methodName);
					smodal.methodName = methodName;

					console.log(" ");

					break;
				}
				i++;
			}
			regexArray.push(smodal);
		}
	}

	/*
	var myarray = [];
	var myJSON = "";

	for (var i = 0; i < 10; i++) {

		var item = {
			"value": i+"aa",
			"label": i+"xx"
		};

		myarray.push(item);
	}
	console.log(myarray);
	myJSON = JSON.stringify({myarray: myarray});
	alert(myJSON); */

	/*
	var student = new Object();
	student.flag = "5485891512";
	student.linkTo = "Lanny";
	student.methodName = 25;
	student.regularExpress = "sdfsdgsdg";

	var sm = new Array();
	sm[0] = "flag";
	sm[1] = "linkTo";
	sm[2] = "methodName";
	sm[3] = "regularExpress";

	var testArray = new Array();
	testArray[0] = "aa";
	testArray[1] = "bb";
	testArray[2] = "cc";
	alert(JSON.stringify(student, sm)); */

	//console.log(regexArray);
	var myJsonString = JSON.stringify(regexArray);
	console.log(myJsonString);

	//var path = require('path');
	//console.log("console.log(process.cwd()): "+process.cwd());
	//console.log("process.execPath: "+process.execPath);

	//var tempFile = "C:/git/nodeWebkit/feagen/temp/test.json";
	//var tempFile = globalFolder + "/temp/test.json";
	var tempFile = output;
	fs.writeFile(tempFile, myJsonString, function (err) {
		if (err) throw err;
		console.log("Export Account Success!");
	});
}

/* call the maven and corresponse BDD project to run the feature file */
function runTest(){
	console.log("run Test");

	var optionTexts = [];
	$("#featureSteps ol li").each(function() {
		//optionTexts.push($(this).attr("regularExpress"));
		optionTexts.push($(this));
	});

	console.log(optionTexts);

	/*var featureOutput = "";
	featureOutput += "@ui\n";
	featureOutput += "Feature: Benchmarking (TrueView) sales demo\n";
	featureOutput += "  Scenario: user login and show the customer TrueView demo\n";
	for(i=0;i<optionTexts.length;i++){
		featureOutput+= "     ";
		featureOutput+= optionTexts[i].attr("flag");
		featureOutput+= " ";
		featureOutput+= optionTexts[i].attr("completeStep");
		featureOutput+= "\n";
	}*/
	var featureOutput = $("textarea#featureText").val();

	var fs = require('fs');
	var projectRoot = $('#upload-file-info').val();
	//var tempFile = "C:/git/nodeWebkit/feagen/temp/xxx.feature";
	var tempFile = globalFolder+"/temp/xxx.feature";
	//var targetFilePath = "src/test/resources/features/xxx.feature";
	//var targetFile = projectRoot + '/'+ targetFilePath;
	//src/test/resources/features/GovernanceP4P.feature
	//fs.createReadStream(tempFile).pipe(fs.createWriteStream(targetFile));
	//fs.writeFileSync(targetFile, fs.readFileSync(tempFile));
	//copyFile(tempFile, targetFile);

	fs.writeFile(tempFile, featureOutput, function (err) {
		if (err) throw err;
		console.log("Export Account Success!");
	});

	//fs.createReadStream(tempFile).pipe(fs.createWriteStream(targetFile));
	
	//myBatchCmd = globalFolder+'/apache-maven-3.3.3/bin/mvn -f '+projectRoot+' -Denv=demo -Dbrowser=chrome -Pdevelopment -Dcucumber.options="'+tempFile+'" -Dforks=1 test';
	myBatchCmd = globalFolder+mavenPath+' -f '+projectRoot+' -Dcucumber.options="'+tempFile+'" '+additionMvnParameter+' test';

	console.log("Command Generate: " + myBatchCmd);
	execCmd(myBatchCmd);
}

/* windows command line executor */
function execCmd(myCmd){
	var exec = require('child_process').exec;
	console.log("Start running command: " + myCmd);
	exec(myCmd,  function (error, stdout, stderr) {
		//detached: true;
		console.log('stdout: ' + stdout);
		$('#output').append('stdout: ' + stdout)
		if (error !== null) {
		  console.log('exec error: ' + error);
		}
	});
}