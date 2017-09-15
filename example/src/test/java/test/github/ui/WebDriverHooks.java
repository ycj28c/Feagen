package test.github.ui;

import java.net.MalformedURLException;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.springframework.core.env.Environment;

import cucumber.api.Scenario;
import cucumber.api.java.After;
import cucumber.api.java.Before;
import io.github.test.LogoutHelper;
import io.github.test.SharedEnvironment;
import io.github.test.UnSharedDriver;

public class WebDriverHooks {
	public static WebDriver driver;
	public static Environment env;

	/**
	 * Delete all cookies at the start of each scenario to avoid shared state
	 * between tests
	 */
	@Before
	public void initBrowser() throws MalformedURLException {
		System.out.println("** initBrowser: Before Class handler");
		driver = UnSharedDriver.getDriver();
		env = SharedEnvironment.getInstance().env;

		driver.manage().deleteAllCookies();
		driver.manage().window().maximize();
	}

	/**
	 * Embed a screenshot in test report if test is marked as failed
	 */
	@After
	public void embedScreenshotIfFailed(Scenario scenario) {
		System.out.println("embedScreenshotIfFailed: After Class handler");
		try {
			if (scenario.isFailed()) {
				try {
					scenario.write("Current Page URL is " + driver.getCurrentUrl());
					// byte[] screenshot = getScreenshotAs(OutputType.BYTES);
					byte[] screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
					scenario.embed(screenshot, "image/png");
				} catch (WebDriverException somePlatformsDontSupportScreenshots) {
					System.err.println(somePlatformsDontSupportScreenshots.getMessage());
				}
			}
		} finally {
			LogoutHelper.directLogout(env, driver);
//			driver.manage().deleteAllCookies();
//			driver.quit();
			UnSharedDriver.quitDriver();
		}
	}
}