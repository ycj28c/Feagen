package io.github.test;

import org.openqa.selenium.WebDriver;
import org.springframework.core.env.Environment;

/**
 * Static methods around web elements
 */
public class LogoutHelper {	
	public static void directLogout(Environment env, WebDriver driver) {
		driver.get(env.getProperty("logoutUrl"));
	}
}
