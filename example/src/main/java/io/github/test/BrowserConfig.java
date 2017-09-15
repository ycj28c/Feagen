package io.github.test;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Supplier;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.safari.SafariDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.GenericApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.io.support.ResourcePropertySource;

/**
 * Selenium requires us to have some system properties set before it'll function right.
 * This class will take a list of properties in the Spring environment and push them into
 * Java system properties.
 */
public class BrowserConfig {

	private static final Logger log = LoggerFactory.getLogger(BrowserConfig.class);
	private String os = null;
	private ResourcePropertySource propertySource;
	private Environment environment = null;
	private final String browserProperties = "classpath:browsers.properties";
	
	public BrowserConfig(){
		
    	@SuppressWarnings("resource")
		ConfigurableApplicationContext ctx = new GenericApplicationContext();
    	environment = ctx.getEnvironment();
		MutablePropertySources sources = ctx.getEnvironment().getPropertySources();
		
		//add the properties to env
		try {
			propertySource = new ResourcePropertySource("resource", browserProperties);
		} catch (IOException e) {
			e.printStackTrace();
		} 
		sources.addFirst(propertySource);
		
		//System.out.println("------------------"+environ.getProperty("supportedOS"));
	}
	
	private void determineOS() {
		if (os == null) {
			String osProp = System.getProperty("os.name").toLowerCase();
			String osArch = System.getProperty("os.arch");
			
			if (osProp.contains("mac") || osProp.contains("darwin")) {
				log.info("This is mac");
				os = "osx";
			} else if (osProp.contains("linux")) {
				if(osArch.contains("64")){
					log.info("This is 64-bit linux: " + osArch);
					os = "linux64";
				} else {
					log.info("This is 32-bit linux: " + osArch);
					os = "linux32";
				}
			} else if (osProp.contains("win")) {
				if (osArch.contains("amd64")) {
					log.info("This is 64-bit windows: " + osArch);
					os = "windows64";
				} else {
					log.info("This is 32-bit windows: " + osArch);
					os = "windows32";
				}
			} else {
				os = osProp;
			}
		}
	}

	/**
	 * Side effects: sets system properties.
	 *
	 * @return The system properties set.
	 */
	private Map<String, String> getApplicationProperties() {
		determineOS();
		
		String supportedOS = environment.getProperty("supportedOS");
		//System.out.print("****************"+supportedOS);
		if (supportedOS == null) {
			throw new IllegalArgumentException("Properties does not specify a list of supportedOS");
		}
		if (!supportedOS.contains(os)) {
			throw new IllegalArgumentException("Current OS (" + os + ") is not in supported list: " + supportedOS);
		}
		
		Map<String, String> pushMap = new HashMap<>();
		return pushMap;
	}

	public Supplier<WebDriver> getDriverFactory() {
//		return HtmlUnitDriver::new;
		getApplicationProperties();
		
		// browser set through pom.xml by default to chrome
		// can override by using -Dbrowser=firefox (etc) on the mvn command line
		String selectedBrowser = System.getProperty("browser");
		if(selectedBrowser == null||selectedBrowser.trim().equals("")){
			selectedBrowser = "chrome";
			System.setProperty("browser", "chrome");
		}
		//System.out.print("################"+os+"##############"+selectedBrowser);
		
		String supportedBrowsers = environment.getProperty("supportedBrowsers." + os);
		//System.out.print("=============="+supportedBrowsers);
		if (!supportedBrowsers.contains(selectedBrowser)) {
			throw new IllegalArgumentException("Cannot support browser " + selectedBrowser + 
					" on OS " + os + ", only support: " + supportedBrowsers);
		}

		String prefix = os + "." + selectedBrowser;
		
		String propList = environment.getProperty(prefix + ".system.properties");
		if (propList != null) {
			for (String prop : propList.split(",")) {
				String key = environment.getProperty(prefix + "." + prop + ".key");
				String val = environment.getProperty(prefix + "." + prop + ".value");
				log.info("Set property {} to {}", key, val);
				System.setProperty(key, val);
			}
		}
		
		if (selectedBrowser.equals("firefox")) {
			return FirefoxDriver::new;
		} else if (selectedBrowser.equals("safari")) {
			DesiredCapabilities capabilities = DesiredCapabilities.safari();
			capabilities.setBrowserName("safari");
			return SafariDriver::new;
		} else if (selectedBrowser.equals("ie")) {
			return InternetExplorerDriver::new;
		} else if (selectedBrowser.equals("chrome")) {
			ChromeOptions options = new ChromeOptions();
			options.addArguments("--disable-extensions");
			return () -> new ChromeDriver(options);
//			return ChromeDriver::new;
		} else if (selectedBrowser.equals("headless")) {
			return HtmlUnitDriver::new;
		}
	
		throw new IllegalArgumentException("No browser specified");
	}

}
