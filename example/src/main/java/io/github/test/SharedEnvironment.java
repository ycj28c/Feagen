package io.github.test;

import java.io.IOException;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.GenericApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.io.support.ResourcePropertySource;

public class SharedEnvironment {
	// singleton
	private static SharedEnvironment instance = null;

	private SharedEnvironment() {
		if(this.env == null){
			this.env = getPropertiesEnviroment();
		}
	}

	public static SharedEnvironment getInstance() {
		if (instance == null) {
			return new SharedEnvironment();
		}
		return instance;
	}

	public Environment env;
	private ResourcePropertySource propertySource;
	private String envParameter;
	public String DEFAULT_ENV = "qa";

	private Environment getPropertiesEnviroment() {
		// set the environment env
		@SuppressWarnings("resource")
		ConfigurableApplicationContext ctx = new GenericApplicationContext();
		Environment environment = ctx.getEnvironment();
		MutablePropertySources sources = ctx.getEnvironment()
				.getPropertySources();

		if (envParameter == null || envParameter.trim().isEmpty()) {
			envParameter  = System.getProperty("env"); // get -Denv parameter from maven
			if(envParameter == null || envParameter.trim().isEmpty()){
				System.out.println("Error! the env system parameter should not be null,"
						+ " set to default value 'qa'");
				envParameter = DEFAULT_ENV;
			}
		}
		String envParameterPath = "classpath:env-" + envParameter + ".properties";
		// add the properties to env
		try {
			propertySource = new ResourcePropertySource("resource",
					envParameterPath);
		} catch (IOException e) {
			e.printStackTrace();
		}
		sources.addFirst(propertySource);

		return environment;
	}

}
