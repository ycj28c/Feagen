package test.github.ui;

import org.junit.runner.RunWith;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;


@RunWith(Cucumber.class)
@CucumberOptions(
	features = "classpath:features",
	plugin = {"pretty", "html:target/cucumber-html-report","json:target/cucumber.json"},
	tags = {"~@smoke"}
)
public class RegressionTestAT{ //not end with Test, will not running by mvn test unless has setting in pom.xml

}