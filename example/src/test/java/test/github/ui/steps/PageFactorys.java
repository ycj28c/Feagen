package test.github.ui.steps;

import io.github.pageobject.LoginPage;
import io.github.pageobject.GoogleSearchResultPage;
import test.github.ui.WebDriverHooks;

public class PageFactorys {
	
	public static LoginPage getLoginePage() {
		return new LoginPage(WebDriverHooks.driver);
	}

	public static GoogleSearchResultPage getGoogleSearchResultPage() {
		return new GoogleSearchResultPage(WebDriverHooks.driver);
	}
}
