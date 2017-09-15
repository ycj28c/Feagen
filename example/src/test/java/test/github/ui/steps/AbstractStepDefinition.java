package test.github.ui.steps;

import org.openqa.selenium.WebDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;

import io.github.pageobject.LoginPage;
import io.github.pageobject.GoogleSearchResultPage;
import test.github.ui.WebDriverHooks;

//@TestPropertySource(locations = {"classpath:env-${env:default}.properties"})
public class AbstractStepDefinition {
	
	protected WebDriver driver;
	protected Environment env;

	// Not static: we want log information included from each of the subclasses, not from this one.
	protected final Logger log = LoggerFactory.getLogger(this.getClass());

	// @Autowired
	// protected Environment env;
	
	protected AbstractStepDefinition() {
		driver = WebDriverHooks.driver;
		env = WebDriverHooks.env;
	}
	
	// page define, global page
	protected LoginPage loginPage = PageFactorys.getLoginePage();
	protected GoogleSearchResultPage googleSearchResult = PageFactorys.getGoogleSearchResultPage();
}
