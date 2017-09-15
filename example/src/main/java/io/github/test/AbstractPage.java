package io.github.test;

import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class AbstractPage {
	protected final Logger log = LoggerFactory.getLogger(this.getClass());
	protected int DEFAULT_TIMEOUT = 12;
	
	protected WebDriver driver;
	protected int ELEMENT_WAIT_TIME;
	
	protected AbstractPage(WebDriver driver) {
		this.driver = driver;
		this.ELEMENT_WAIT_TIME = DEFAULT_TIMEOUT;
		String timeout = PropertiesUtil.getPropertyConfig("ELEMENT_WAIT_TIME");
		this.ELEMENT_WAIT_TIME = (timeout == null || timeout.trim().equals("")) == true ? DEFAULT_TIMEOUT
				: Integer.parseInt(timeout.trim());
	}
	
	public String pageUrl() {
		return driver.getCurrentUrl();
	}
	
	public String pageTitle() {
		return driver.getTitle();
	}
	
	public void pause(int seconds){
		try {
			Thread.sleep(seconds);
		} catch (InterruptedException e) {
			log.error(e.getMessage());
		}
	}
	
	public boolean waitPageRefresh(WebElement trigger) {  
	    int refreshTime = 0;  
	    boolean isRefresh = false;  
	    try {  
	        for (int i = 1; i < 60; i++) {  
	            refreshTime = i;  
	            trigger.getTagName();  
	            Thread.sleep(1000);  
	        }  
	    } catch (StaleElementReferenceException e) {  
	        isRefresh = true;  
	        log.info("Page refresh time is: {} seconds!", refreshTime);  
	        return isRefresh;  
	    } catch (WebDriverException e) {  
	        e.printStackTrace();  
	    } catch (InterruptedException e) {  
	        e.printStackTrace();  
	    }  
	    log.error("Page didnt refresh in 60 seconds!");  
	    return isRefresh;  
	}
}
