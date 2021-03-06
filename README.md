# Feagen
The desktop tool which using Node-Webkit able to generate UI test cucumber feature file and run test

# Purpose
We are writing UI automation test use selenium and cucumber and maven. We know cucumber present the BDD test, which request the *.feature file like this:
```
  @ui @saledemo
  Feature: Login test
    @smoke
    Scenario: XXX user login and show welcome page
      When Login using your account
      And Go to the Normal login section
      Then You can see the welcome page
```
Then we code each "When", "And", "Then", "Given" such as
```
    @When("^Go to the Normal login section\\.$")
  	public HomePage go_to_the_Normal_login_section() throws Throwable {	    
  		SessionVarible.accountType = AccountTypeEnum.companyOverrdie;
  		loginServPage.waitForLoginServPagePageToLoad();
  		loginServPage.clickNormalLoginButton();		
  		return homePage;
  	}
```
We always write feature file first, then convert feature to code, is there a way to do it reversely, then answer it Yes.
That's why we develop this feagen tool.

# Idea
Here are the ideas:
1. write page object for each page/page module
2. write cucumber step class associate each page object with possible operations
3. link operations with the cucumber step class name
4. generate feature file by annotation

Instead of descript the steps, we can descript every possible operations in the page, such as:
*click the submit*, *navigate to about*, *get the user name in table*,
Then programming each step:
```
    @When("^click the submit\\.$")
  	public HomePage click_the_submit() throws Throwable {	    
  		driver.findElement('xxx').click()	
  		return homePage;
  	}
```
Every time we should return a page for the reference/link to the next step class, so when we choose one operation, it return a class, we display every methods in this step class, then choose next operation, link to next class etc.

# About This Tool
This is a desktop tool associate the cucumber project, if follow the above standard write the cucumber UI test, you can use this tool to generate the customize feature file. If add the running script, can also directly run it.
  
__Choose the steps__
![image](.README/1.png)  

__Generate the feture__  
![image](.README/2.png)
