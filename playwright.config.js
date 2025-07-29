import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';

test('Add Provider User - Complete Test', async ({ page }) => {
  // Set viewport and timeout configuration
  await page.setViewportSize({ width: 1920, height: 1080 });
  page.setDefaultTimeout(30000);
  // Step 1: Navigate to the application URL
  await page.goto('https://stage_aithinkitive.uat.provider.ecarehealth.com/');
  
  // Wait for page to load and take screenshot for verification
  await page.screenshot({ path: 'screenshots/01_login_page.png' });
  
  // Step 2: Login with provided credentials
  // Fill username
  await page.fill('input[name="username"]', 'RubyVOlague@jourrapide.com');
  
  // Fill password (password field uses text type in this application)
  //await page.fill('input[type="text"]:not([name="username"]):not([name="XTENANTID"])', 'Pass@123');
  await page.fill('input[type="password"]', 'Pass@123');
  // Click login button
  await page.click('button:has-text("Let\'s get Started")');
  
  // Wait for dashboard to load
  await page.waitForSelector('text=Dashboard');
  await page.screenshot({ path: 'screenshots/02_dashboard.png' });
  
  // Step 3: Go to Settings
  await page.click('a:has-text("Settings"), button:has-text("Settings")');
  await page.waitForTimeout(1000);

   // Step 4: Click on User Settings
   await page.click('text=User Settings');
   await page.screenshot({ path: 'screenshots/04_user_settings.png' });
  
   // Step 5: Click on Providers tab
   await page.click('text=Providers');
   await page.screenshot({ path: 'screenshots/05_providers_tab.png' });
  
   // Step 6: Click on Add Provider User button
   await page.click('text=Add Provider User');
  
   // Wait for the modal/form to appear
   await page.waitForSelector('input[name="firstName"]');
   await page.screenshot({ path: 'screenshots/06_add_provider_form.png' });
  
   // Step 7: Fill First Name
//   await page.fill('input[name="firstName"]', 'Jeon');
   const Pname = faker.person.firstName();
   const PLastName = faker.person.lastName();
   await page.fill('input[name="firstName"]', Pname);
  
//   // Step 8: Fill Last Name
//   await page.fill('input[name="lastName"]', 'Riddle');
   await page.fill('input[name="lastName"]', PLastName);
   // Step 9: Select Role - provider
   await page.click('input[name="role"]');
   await page.click('li:has-text("provider"), [role="option"]:has-text("provider")');
  
   // Step 10: Select Gender - Male
   await page.click('input[name="gender"]');
   await page.click('li:has-text("Male"), [role="option"]:has-text("Male")');
  
   // Step 11: Enter Email
//   await page.fill('input[name="email"]', 'jeon@mailinator.com');
  await page.fill('input[name="email"]', Pname+'@example.com');
  
   // Step 12: Click Save button
   await page.click('button:has-text("Save")');
  
   // Wait for form to close and provider to be added
   await page.waitForTimeout(2000);
  
   // Step 13: Verify the added provider in the providers list
   //await page.fill('input[id=":r2s:"]', `${Pname} ${PLastName}`);
   await expect(page.locator('h4', { hasText: `${Pname} ${PLastName}` })).toBeVisible();

    console.log('✅ Provider creation workflow completed successfully!');
//    console.log('✅ Dr. Olivia Smith has been created as a provider');
  
   console.log(`✅ Test Passed: New provider ${Pname} ${PLastName} successfully added and verified in the providers list`);
});