package test.github.ui.steps.advance;

import cucumber.api.java.en.Then;
import io.github.pageobject.GoogleSearchResultPage;
import test.github.ui.steps.AbstractStepDefinition;

public class GoogleSearchResultPageStep extends AbstractStepDefinition{
	
	@Then("^you can find something$")
	public GoogleSearchResultPage you_can_find_something() throws Throwable {
		String aTitle = driver.getTitle();// get title
		System.out.println("current widnow title is:" + aTitle);
		assert aTitle.toLowerCase().contains("Google");
		return googleSearchResult;
	}

}
