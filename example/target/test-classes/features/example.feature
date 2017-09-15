@ui
Feature: Google Example

@smoke 
Scenario: 
	A common htmlUnit test, test google without open browser

	When go to www.google.com
	And enter feagen in to the search bar
	And click the search button
	Then you can find something
