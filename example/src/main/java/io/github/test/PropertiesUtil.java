package io.github.test;

import java.io.IOException;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

public class PropertiesUtil {
	
	public static final Logger log = LoggerFactory.getLogger(PropertiesUtil.class);
	
	/**
	 * get the screenshot status: on/off
	 * @return
	 */
	public static boolean getScreenshotStatus(Environment env){
		boolean screenShotStatus = false;
		String screenShotStatusSetting = env.getProperty("screenshot.status");
		if(screenShotStatusSetting == null || screenShotStatusSetting.toLowerCase().isEmpty()){ //default set to off
			screenShotStatusSetting = "off";
		}
		switch(screenShotStatusSetting.toLowerCase()){
			case "on":
				screenShotStatus = true;
				break;
			case "off":
				screenShotStatus = false;
				break;
			default:
				screenShotStatus = false;
				break;
		}
		return screenShotStatus;
	}
	
	/**
	 * get the testNG retry status: on/off
	 * @return
	 */
	public static boolean getTestNGRetrySwitch(){
		boolean testNGRetrySwitch = false;
		String testNGRetryStatusSetting = getPropertyConfig("testNG.retry.switch");
		if(testNGRetryStatusSetting == null || testNGRetryStatusSetting.toLowerCase().isEmpty()){ //default set to off
			testNGRetryStatusSetting = "off";
		}
		switch(testNGRetryStatusSetting.toLowerCase()){
			case "on":
				testNGRetrySwitch = true;
				break;
			case "off":
				testNGRetrySwitch = false;
				break;
			default:
				testNGRetrySwitch = false;
				break;
		}
		return testNGRetrySwitch;
	}
	
	/**
	 * get the testNG max retry times
	 * @return
	 */
	public static int getTestNGRetryTimes(){
		int maxRetry = 0;
		String testNGRetryTimesSetting = getPropertyConfig("testNG.retry.maxRetry");
		if(testNGRetryTimesSetting == null || testNGRetryTimesSetting.toLowerCase().isEmpty()){ //default set to off
			testNGRetryTimesSetting = "3";
		}
		
		//check if the maxRetry parameter is a positive integer 
		String pattern = "[0-9]*";
		Pattern p = Pattern.compile(pattern);  
		Matcher m = p.matcher(testNGRetryTimesSetting);  
        boolean b = m.matches(); 
        if(!b){  
        	log.error(" {} is not a valid positive integer", testNGRetryTimesSetting);
        	return maxRetry;
        } 
        
        //transfer the string to integer
		try{
        	maxRetry = Integer.parseInt(testNGRetryTimesSetting);
        } catch(Exception ex){
        	log.error(" can not transfer the {} to Integer", testNGRetryTimesSetting);
        }
		return maxRetry;
	}
	
	/**
	 * get the event listener switch status: on/off
	 * @return
	 */
	public static boolean getEventListenerSwitch(Environment env){
		boolean eventListenerSwitch = false;
		String eventListenerStatus = env.getProperty("event.listener.switch");
		if(eventListenerStatus == null || eventListenerStatus.toLowerCase().isEmpty()){ //default set to off
			eventListenerStatus = "off";
		}
		switch(eventListenerStatus.toLowerCase()){
			case "on":
				eventListenerSwitch = true;
				break;
			case "off":
				eventListenerSwitch = false;
				break;
			default:
				eventListenerSwitch = false;
				break;
		}
		return eventListenerSwitch;
	}
	
	/**
	 * get the selenium grid switch status: on/off
	 * @return
	 */
	public static boolean getSeleniumGridSwitch(Environment env){
		boolean seleniumGridSwitch = false;
		String seleniumGridSwitchStr = env.getProperty("selenium.grid.switch");
		if(seleniumGridSwitchStr == null || seleniumGridSwitchStr.toLowerCase().isEmpty()){ //default set to off
			seleniumGridSwitchStr = "off";
		}
		switch(seleniumGridSwitchStr.toLowerCase()){
			case "on":
				seleniumGridSwitch = true;
				break;
			case "off":
				seleniumGridSwitch = false;
				break;
			default:
				seleniumGridSwitch = false;
				break;
		}
		return seleniumGridSwitch;
	}
	
	/**
	 * get the event listener log switch status: on/off
	 * @return
	 */
	public static boolean getEventListenerLogSwitch(Environment env){
		boolean eventListenerLogSwitch = false;
		String eventListenerLogStatus = env.getProperty("event.listener.log.switch");
		if(eventListenerLogStatus == null || eventListenerLogStatus.toLowerCase().isEmpty()){ //default set to off
			eventListenerLogStatus = "off";
		}
		switch(eventListenerLogStatus.toLowerCase()){
			case "on":
				eventListenerLogSwitch = true;
				break;
			case "off":
				eventListenerLogSwitch = false;
				break;
			default:
				eventListenerLogSwitch = false;
				break;
		}
		return eventListenerLogSwitch;
	}
	
	/**
	 * get the retry type setting
	 * @return
	 */
	public static String getRetryType() {
		String retryType = PropertiesUtil.getPropertyConfig("testNG.retry.retryType");
		if(retryType == null||retryType.trim().equals("")){
			retryType = "default";
		}
		return retryType;
	}
	
	/** 
	 * read the configuration file, get the value
	 * @param key
	 * @return the value of the key
	 */
	public static String getPropertyConfig(String key) {
		String envStr = System.getProperty("env") == null ? SharedEnvironment
				.getInstance().DEFAULT_ENV : System.getProperty("env");
		String envName = "env-" + envStr + ".properties";
        Resource resource = new ClassPathResource(envName);
        Properties props = null;
        try {
            props = PropertiesLoaderUtils.loadProperties(resource);
        } catch (IOException e) {
        	log.error("getPropertyConfig {} error:", envName, e);
        }
        String propertyValue = null;
        try{
        	propertyValue = props.getProperty(key);
        } catch(Exception ex){
        	log.error("Can't get property {}:", key, ex);
        }
        return propertyValue;
    }
	
}
