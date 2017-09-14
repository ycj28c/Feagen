function codeAnalyze(currentPath){
	var fs = require('fs');

	var traverseFileSystem = function (currentPath) {
		//console.log(currentPath);
		var files = fs.readdirSync(currentPath);
		//console.log(files);
		for (var i in files) {
			var currentFile = currentPath + '/' + files[i];
			var stats = fs.statSync(currentFile);
			if (stats.isFile()) {
				//console.log(currentFile);
				var myRegexp6 = /.*Step\.java/g;
				var matchMethod6 = myRegexp6.exec(currentFile);
				if(matchMethod6){
					//alert(files.length);
					console.log("%%%%%%%%%%%%%%%%%% "+files[i]+" %%%%%%%%%%%%%%%%% "+matchMethod6);
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
	angular.element($('#stepOptions')).scope().updateOptions();
	/*angular.element($('#stepOptions')).scope().options = [
	  {path:"C:/Users/ryang/AppData/Local/Temp/nw12404_32243/temp/CompanyProfilePageStep.json", abbr:"CompanyProfilePageStep"},
	  {path:"C:/Users/ryang/AppData/Local/Temp/nw12404_32243/temp/DashboardSearchPageStep.json", abbr:"DashboardSearchPageStep"},
	  {path:"C:/Users/ryang/AppData/Local/Temp/nw12404_32243/temp/DisclosureSearchPageStep.json", abbr:"DisclosureSearchPageStep"},
	  {path:"C:/Users/ryang/AppData/Local/Temp/nw12404_32243/temp/HomePageStep.json", abbr:"HomePageStep"}
	]	*/
}
/*function traverseFileSystem(currentPath){
	//console.log(currentPath);
	var files = fs.readdirSync(currentPath);
	for (var i in files) {
		var currentFile = currentPath + '/' + files[i];
		var stats = fs.statSync(currentFile);
		if (stats.isFile()) {
			//console.log(currentFile);
			var myRegexp6 = /.*Step\.java/g;
			var matchMethod6 = myRegexp6.exec(currentFile);
			if(matchMethod6){
				console.log("%%%%%%%%%%%%%%%%%% "+files[i]+" %%%%%%%%%%%%%%%%% "+matchMethod6);
				readFile(currentFile, "C:/git/nodeWebkit/feagen/temp/"+files[i].substring(0, files[i].length-5)+".json");
			}
		} else if (stats.isDirectory()) {
			 traverseFileSystem(currentFile);
		}
	}
}*/

//analyze the *step.java file
function readFile(path, output){
	var fs = require('fs');
	var regexArray = new Array();

	var codeArray = fs.readFileSync(path).toString().split('\n');
	//console.log(codeArray);
	for(var i = 0, l = codeArray.length; i < l; i++) {
		var smodal = new stepModal();

		//console.log(codeArray[i]);

		var myRegexp = /(\s*)(@When|@Then|@Given|@And)(.*)/g;
		var matchLine = myRegexp.exec(codeArray[i]);
		if(matchLine!=null){
			console.log("Get Sentence: "+codeArray[i]);

			var a1 = matchLine[2];
			var a2 = matchLine[3];
			console.log("Flag: "+a1.substring(1));

			smodal.flag = a1.substring(1);

			var myRegexp2 = /(\(\"\^)(.*)(\$\"\))/g;
			var matchRegu = myRegexp2.exec(a2);
			console.log("Regular Express: "+matchRegu[2]);
			smodal.regularExpress = matchRegu[2];

			mode = "methodMode";
			i++;

			while(i < l){
				if(codeArray[i].trim().length>1){
					console.log("Get Sentence: "+codeArray[i]);
					var myRegexp3 = /(\s*)([0-9a-zA-Z]*)(\s*)([0-9a-z_A-Z]*)(\(.*\))/g;
					var matchMethod = myRegexp3.exec(codeArray[i]);

					var linkTo = matchMethod[2]+"Step";
					console.log("LinkTo: "+linkTo);
					smodal.linkTo = linkTo;

					var methodName = matchMethod[4];
					console.log("Method Name: "+methodName);
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

	//setbehaviorCtrl("");
}

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
	featureOutput += "  Scenario: Equilar user login and show the customer TrueView demo\n";
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

	//myCmd1 = 'cd apache-maven-3.3.3/bin';
	//execCmd(myCmd1);			
	//myCmd2 = '/apache-maven-3.3.3/bin/mvn -f '+projectRoot+' -Denv=demo -Dbrowser=chrome -Pdevelopment -Dcucumber.options="C:\Users\XIN\Desktop\node webkit\insight-bdd-testing\src\test\resources\features\GovernanceP4P.feature" -Dforks=1 test';
	myCmd2 = globalFolder+'/apache-maven-3.3.3/bin/mvn -f '+projectRoot+' -Denv=demo -Dbrowser=chrome -Pdevelopment -Dcucumber.options="'+tempFile+'" -Dforks=1 test';
	//myCmd2 = '/apache-maven-3.3.3/bin/mvn -f '+projectRoot+' -Denv=demo -Dbrowser=chrome -Pdevelopment -Dcucumber.options="--tags @p4p" -Dforks=1 test';
	//myCmd2 = 'mvn -f C:\git\nodeWebkit\insight-bdd-testing -Denv=stage -Dbrowser=chrome -Pdevelopment -Dcucumber.options="--tags @p4p" -Dforks=1 test';
	//myCmd2 = '/apache-maven-3.3.3/bin/mvn -f C:\git\nodeWebkit\insight-bdd-testing -Denv=stage -Dbrowser=chrome -Pdevelopment -Dcucumber.options="--tags @p4p" -Dforks=1 test';
	execCmd(myCmd2);
}

//run bat command
function execCmd(myCmd){
	var exec = require('child_process').exec;
	exec(myCmd,  function (error, stdout, stderr) {
		console.log("run command: "+myCmd);
		//detached: true;
		console.log('stdout: ' + stdout);
		$('#output').append('stdout: ' + stdout)
		if (error !== null) {
		  console.log('exec error: ' + error);
		}
	});
}