// test_automation.js
const puppeteer = require('puppeteer');

(async () => {
    console.log("🚀 Starting 100/100 Robustness Check...");

    const browser = await puppeteer.launch({ 
        headless: false, // Set to true to run invisibly
        defaultViewport: null,
        args: ['--start-maximized'] 
    });
    
    const page = await browser.newPage();
    const APP_URL = 'http://localhost:5173'; // Change if your frontend port is different

    try {
        // --- TEST 1: LEARNER FLOW ---
        console.log("\n🔵 TEST 1: Checking Learner Registration...");
        await page.goto(`${APP_URL}/auth`);
        
        // 1. Select Learner Role
        await page.waitForSelector('text/I am a Learner');
        await page.click('text/I am a Learner');
        console.log("   ✅ Selected Learner Role");

        // 2. Switch to Sign Up
        await page.waitForSelector('text/Create Account');
        await page.click('text/Create Account'); // Click the "Create Account" toggle text

        // 3. Fill Form
        const learnerEmail = `learner${Date.now()}@test.com`;
        await page.type('input[id="name"]', 'Test Learner');
        await page.type('input[id="email"]', learnerEmail);
        await page.type('input[id="password"]', 'password123');
        await page.click('button[type="submit"]');
        console.log("   ✅ Submitted Registration Form");

        // 4. Handle "Success" state (switch to Login automatically)
        await page.waitForTimeout(2000); // Wait for backend
        // Now log in with same credentials
        await page.type('input[id="email"]', learnerEmail);
        await page.type('input[id="password"]', 'password123');
        await page.click('button[type="submit"]');
        console.log("   ✅ Submitted Login Form");

        // 5. Verify Redirection
        await page.waitForNavigation();
        const url = page.url();
        if (url.includes('/learner/marketplace')) {
            console.log("   ✅ PASS: Redirected to Learner Marketplace");
        } else {
            console.error("   ❌ FAIL: Wrong redirection -> " + url);
        }

        // 6. Logout
        // Assuming logout button is in sidebar/header.
        // For automation simplicity, we just clear storage and go back to auth
        await page.evaluate(() => localStorage.clear());
        await page.goto(`${APP_URL}/auth`);


        // --- TEST 2: INSTRUCTOR FLOW ---
        console.log("\n🟣 TEST 2: Checking Instructor Registration...");
        
        // 1. Select Instructor Role
        await page.waitForSelector('text/I am an Instructor');
        await page.click('text/I am an Instructor');
        console.log("   ✅ Selected Instructor Role");

        // 2. Switch to Sign Up
        await page.waitForSelector('text/Create Account');
        await page.click('text/Create Account');

        // 3. Fill Form
        const instructorEmail = `instructor${Date.now()}@test.com`;
        await page.type('input[id="name"]', 'Test Instructor');
        await page.type('input[id="email"]', instructorEmail);
        await page.type('input[id="password"]', 'password123');
        await page.click('button[type="submit"]');
        console.log("   ✅ Submitted Registration Form");

        // 4. Handle Success -> Login
        await page.waitForTimeout(2000);
        await page.type('input[id="email"]', instructorEmail);
        await page.type('input[id="password"]', 'password123');
        await page.click('button[type="submit"]');

        // 5. Verify Redirection
        await page.waitForNavigation();
        const url2 = page.url();
        if (url2.includes('/instructor/dashboard')) {
            console.log("   ✅ PASS: Redirected to Instructor Dashboard");
        } else {
            console.error("   ❌ FAIL: Wrong redirection -> " + url2);
        }

    } catch (error) {
        console.error("❌ ERROR:", error);
    } finally {
        console.log("\n🏁 Automation Complete. Closing Browser...");
        await browser.close();
    }
})();