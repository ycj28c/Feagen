package io.github.test;

import org.openqa.selenium.WebDriver;

public class UnSharedDriver {

	private static WebDriver driver = null;

	public static WebDriver getDriver() {
		if (driver == null || hasQuit(driver)) {
			initDriver();
		}
		return driver;
	}

	public static void quitDriver() {
		if (!hasQuit(driver)) {
			driver.quit();
		}
	}

	/**
	 * initial the webDriver from driver factory
	 */
	private static void initDriver() {
		try {
			quitDriver();
			driver = null;
			driver = new BrowserConfig().getDriverFactory().get();
		} catch (Exception e) {
			System.out.println(
					"Error occurs when test 'UnSharedDriver' to initial the browser driver.");
			e.printStackTrace();
		}
	}

	private static boolean hasQuit(WebDriver driver) {
		try {
			driver.getTitle();
			return false;
		} catch (org.openqa.selenium.NoSuchSessionException e) {
			return true;
		} catch (java.lang.NullPointerException ex) {
			return true;
		}
	}
}
