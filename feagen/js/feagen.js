//var globalFolder = "C:/git/nodeWebkit/feagen";
//var path = require('path');
//var globalFolder = path.dirname(process.execPath);
//console.log("globalFolder: "+globalFolder);

var globalFolder = process.cwd();
console.log("globalFolder: "+globalFolder);

/*$(function() {
	$( "#mysort1, #mysort2").sortable({
		connectWith: "#mysort3"
	});
	$( "#mysort3").sortable({
		out: function( event, ui ) {

		}
	});
});*/

//step modal
function stepModal()
{
	var flag;
	var regularExpress;
	var linkTo;
	var methodName;
}

function optionRefresh() {
	console.log("##################################");
	var fileList = walk(globalFolder+"/temp");
	var xxList = [];
	for(i=0;i<fileList.length;i++){
		var xxdata ={};

		//var myRegexp6 = /.*Step\.java/g;
		//C:/git/nodeWebkit/feagen/temp/CompanyProfilePageStep.json

		var myRegexp = /(.*)(\/)([0-9a-zA-Z]+Step)(\.json)/g;
		var matchMethod = myRegexp.exec(fileList[i]);
		console.log(fileList[i]);
		if(matchMethod){
			console.log("%%%%%%%%%%%%%%%%%% "+fileList[i]+" %%%%%%%%%%%%%%%%% "+matchMethod[3]);
			xxdata.abbr = matchMethod[3];
		} else {
			xxdata.abbr = "not matched";
		}
		//xxdata.abbr = fileList[i].toString().substring(fileList[i].length-10);

		xxdata.path = fileList[i];
		xxList.push(xxdata);
	}
	//var myJsonString = JSON.stringify(xxList);
	//console.log(myJsonString);
	console.log("====================test option list==========================");
	console.log(xxList);
	return xxList;
}
//search the current folder
function walk(path){
	var fs = require('fs');
	var fileList = [];
	var dirList = fs.readdirSync(path);
	dirList.forEach(function(item){
		if(fs.statSync(path + '/' + item).isDirectory()){

		}else{
			fileList.push(path + '/' + item);
			//fileList.push(item);
		}
	});
	return fileList;
}

//var xxx = walk('C:/Users/XIN/Desktop/node webkit/myNodeWebkitApps/feagen/temp');
//console.log(xxx);

function setbehaviorCtrl(path){
	$("#behaviors li").each(function() {
		$(this).remove();
	});
}

function enableDragAndDrop(){
	$( "#behaviors" ).accordion();
	$( "#behaviors li" ).draggable({
	  appendTo: "body",
	  helper: "clone"
	});

	$( "#asserts" ).accordion();
	$( "#asserts li" ).draggable({
	  appendTo: "body",
	  helper: "clone"
	});

	//api: http://api.jqueryui.com/droppable/#event-over
	$( "#featureSteps ol" ).droppable({
	  activeClass: "featureSolidRed",
	  hoverClass: "featureSolidGreen",
	  accept: ":not(.ui-sortable-helper)",
	  drop: function( event, ui ) {
		//$( this ).find( ".placeholder" ).remove();
		//$( "<li class='list-group-item'></li>" ).text( ui.draggable.text() ).appendTo( this );
		//console.info('ui.draggable.attr("regularExpress"):' + ui.draggable.attr('regularExpress'));
		var regularExpress = ui.draggable.attr('regularExpress');
		//regularExpress = reStringClean(regularExpress);
		var reStr = " regularExpress='"+regularExpress+"' ";
		var flag = ui.draggable.attr('flag');
		var flStr = " flag='"+flag+"' ";
		var linkTo = ui.draggable.attr('linkTo');
		var linkStr = " linkTo='"+linkTo+"' ";
		var completeStep = regularExpress;
		completeStep = reStringClean(completeStep);
		var csStr = " completeStep='"+completeStep+"' ";
		var str = "<li class='list-group-item'"+reStr+flStr+csStr+"></li>"
		console.info("str: "+str);
		var uiText = reStringClean(ui.draggable.text());
		$(str).text(uiText).appendTo( this );
		//$(str).text( ui.draggable.text() ).appendTo( this );
		//$( "<li class='list-group-item'></li>" ).text( ui.draggable.text() ).appendTo( this );
		//$( "<li class='list-group-item' ng-repeat='x in data' flag='{{x.flag}}' methodName='{{x.methodName}}' regularExpress={{x.regularExpress}} linkTo={{x.linkTo}}></li>" ).text( ui.draggable.text() ).appendTo( this );

		//call scope from outside
		//angular.element($('#stepOptions')).scope().updateModel("C:/git/nodeWebkit/feagen/temp/loginPageStep.json");
		//$('#stepOptions option').removeAttr('selected')
		//$("#stepOptions option[label="+linkTo).prop("selected", true);
		//angular.element($('#stepOptions')).scope().updateModel("C:/git/nodeWebkit/feagen/temp/"+linkTo+".json");
		var linkToJson = globalFolder + "/temp/" + linkTo + ".json";
		angular.element($('#stepOptions')).scope().updateModel(linkToJson);
		angular.element($('#stepOptions')).scope().applyAll();
		//angular.element($('#stepOptions')).scope().updateModel(angular.element($('#stepOptions')).scope().selected_id);

		if(completeStep.indexOf("(.*?)") >= 0 ){
			var count = completeStep.match(/"(.*?)"/g).length;
			$('#replaceLocator').empty();
			//alert(count);
			for(var i=0;i<count;i++){
				$('#replaceLocator').append('<input type="text" class="form-control" placeholder="Replace the word '+i+'">');
			}
			var highLightStr = completeStep.replace(/"(.*?)"/g, '<font color="red">"(.*?)"</font>');
			$('#highlightStr').remove();
			$('#reModalHeader').append("<p id='highlightStr'>"+highLightStr+"</p>");
			$("#reModal").modal();
			//alert(count);
		}
	  }
	}).sortable({
	  //items: "li:not(.placeholder)",
	  sort: function() {
		// gets added unintentionally by droppable interacting with sortable
		// using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
		//$( this ).removeClass( "ui-state-default" );
		$( this ).removeClass( "featureSolidRed" );
	  }
	});
}

function reStringClean(txt){
	var s = txt.replace(/\\/g, "");
	return s;
}

function handleRegularExpressString(){
	var str = $("#featureSteps ol li:last-child" ).attr('completeStep');
	var txt = $("#featureSteps ol li:last-child" ).text();

	$("#replaceLocator input" ).each(function( index ) {
		console.log( index + ": " + $( this ).val() );
		var temp = '"'+$(this).val()+'"';
		console.log(temp);
		str = str.replace(/"(.*?)"/g, temp);
		txt = txt.replace(/"(.*?)"/g, temp).substring(0,60);
	});

	//str = str.replace(/"(.*?)"/g, s);
	//txt = txt.replace(/"(.*?)"/g, s);
	$("#featureSteps ol li:last-child" ).attr('completeStep', str);
	$("#featureSteps ol li:last-child" ).text(txt);
	 $('#reModal').modal('toggle');
}

function generateFeature(){
	//alert("aaa");
	var txt = "";
	var tag = "@ui\n";
	var featureSample = "Feature: test line 1\n"
					+ "  test line 2\n"
					+ "  i want test line 3\n";
	var scenarioSample = "  Scenario: insight_test\n";
	txt += tag;
	txt += featureSample;
	txt += scenarioSample;
	$("#featureSteps ol li").each(function (index) {
		//if(index == 0) return true;
		console.log(index + ":cccccccccccccccc:" + $(this).text());
		console.log(index + ":dddddddddddddddd:" + $(this).attr("regularexpress"));
		console.log(index + ":eeeeeeeeeeeeeeee:" + $(this).attr("completeStep"));
		txt += "    " + $(this).attr("flag") + " " + $(this).attr("completeStep") + "\n";
		/*if ($(this).text != undefined) {
			console.log("cccccccccccccccc"+$(this).text);
		}*/
	});
	$("textarea#featureText").val(txt);
	//featureText
}

function cleanFeature(){
	$('#mysort3').empty();
}

function removeLastStep(){
	$('#mysort3').children("li:last-child").remove();
}

function addNewStep(){
	var stepflag = $('#stepFlag').val().trim();
	var step = $('#stepContent').val().trim();
	console.info("step: "+step+" step flag: "+stepflag);

	var regularExpress = step;
	var reStr = " regularExpress='"+regularExpress+"' ";
	//var flag = ui.draggable.attr('flag');
	var flStr = " flag='"+stepflag+"' ";
	var linkTo = "";
	var linkStr = " linkTo='"+linkTo+"' ";
	var completeStep = step;
	var csStr = " completeStep='"+completeStep+"' ";
	var str = "<li class='list-group-item'"+reStr+flStr+csStr+"></li>"
	console.info("str: "+str);
	var uiText = step.substring(0,60);
	$(str).text(uiText).appendTo( $('#mysort3') );
}