Feature: Tab panel
  In order to value
  As a role
  I want feature

@javascript
Scenario: Lazy loading of a component into a tab when the latter gets open
  Given I am on the SomeTabPanel test page
  When I press "Panel Two"
  Then I should see "Original HTML"
  When I press "Update html"
  Then I should see "Update for Panel Two"
