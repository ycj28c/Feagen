package test.github.ui.steps.advance;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import cucumber.api.java.en.And;
import cucumber.api.java.en.When;
import io.github.pageobject.GoogleSearchResultPage;
import io.github.pageobject.LoginPage;
import test.github.ui.steps.AbstractStepDefinition;

public class LoginPageStep extends AbstractStepDefinition{
	
	@When("^go to www\\.google\\.com$")
	public LoginPage go_to_www_google_com() throws Throwable {
		driver.get("https://www.google.com");
		return loginPage;
	}
	
	@And("^enter feagen in to the search bar$")
	public LoginPage enter_feagen_in_to_the_search_bar() throws Throwable {
		// Find the text input element by its name
		WebElement element = driver.findElement(By.name("q"));

		// Enter something to search for
		element.sendKeys("feagen");
		return loginPage;
	}

	@And("^click the search button$")
	public GoogleSearchResultPage click_the_search_button() throws Throwable {
		WebElement element = driver.findElement(By.name("q"));
		
		// Now submit the form. WebDriver will find the form for us from the element
		element.submit();
		return googleSearchResult;
	}

}
