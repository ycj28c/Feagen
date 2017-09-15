package test.github.ui;

import org.junit.runner.RunWith;

import com.github.mkolisnyk.cucumber.runner.ExtendedCucumber;
import com.github.mkolisnyk.cucumber.runner.ExtendedCucumberOptions;

import cucumber.api.CucumberOptions;

//@RunWith(Cucumber.class)
@RunWith(ExtendedCucumber.class)
@ExtendedCucumberOptions(jsonReport = "target/cucumber.json",
        retryCount = 1,
        detailedReport = true,
        detailedAggregatedReport = true,
        overviewReport = true,
        coverageReport = true,
        jsonUsageReport = "target/cucumber-usage.json",
        usageReport = true,
//        toPDF = true,
        excludeCoverageTags = {"@flaky" },
        includeCoverageTags = {"@passed" },
        outputFolder = "target/",
        screenShotLocation = "extendedScreenshot/")
@CucumberOptions(
	features = "classpath:features",
	plugin = {"pretty:target/cucumber-pretty.txt", 
			"html:target/cucumber-html-report",
			"json:target/cucumber.json",
			"usage:target/cucumber-usage.json"},
	tags = {"@ui"}
)
public class RunEquilarTest{

}