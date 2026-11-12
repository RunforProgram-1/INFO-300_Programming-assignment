//Importing readline-sync
const readline = require('readline-sync');

// Main menu options

function mainMenu() {

    let continueProgram = true;

    console.log("======================================");
    console.log("       AWS COMPUTE & NETWORK TOOLS");
    console.log("======================================");

    while (continueProgram) {

        console.log("\n===== MAIN MENU =====");
        console.log("1. Subnet Host Checker");
        console.log("2. Compute Environment Selector");

        let choice = readline.question("Select a tool (1 or 2): ");

        if (choice === "1") {

            subnetHostChecker();

        } else if (choice === "2") {

            computeEnvironmentSelector();

        } else {

            console.log("\nInvalid selection. Please enter 1 or 2.");
            continue;
        }

        // Ask whether the user wants to continue or exit
        while (true) {

            let answer = readline.question(
                "\nWould you like to continue or exit? (continue/exit): "
            ).toLowerCase().trim();

            if (answer === "continue") {

                console.log("\nReturning to main menu...");
                break;

            } else if (answer === "exit") {

                continueProgram = false;
                console.log("\nThank you for using the tool!");
                break;

            } else {

                console.log("Invalid response: Please enter continue or exit.");
            }
        }
    }
}


// ==========================================
// PART A: SUBNET HOST CHECKER
// ==========================================

function subnetHostChecker() {

    console.log("\n===== SUBNET HOST CHECKER =====");

    let vpcCIDR;
    let subnetCIDR;
    let devices;

    // Validate VPC CIDR
    while (true) {

        vpcCIDR = readline.question("Enter VPC CIDR (16-30): ");

        if (/^\/?(1[6-9]|2[0-9]|30)$/.test(vpcCIDR)) {

            vpcCIDR = parseInt(vpcCIDR.replace("/", ""));
            break;

        } else {

            console.log("Invalid CIDR. Enter a value between /16 and /30.");
        }
    }

    // Validate Subnet CIDR
    while (true) {

        subnetCIDR = readline.question("Enter Subnet CIDR (16-30): ");

        if (/^\/?(1[6-9]|2[0-9]|30)$/.test(subnetCIDR)) {

            subnetCIDR = parseInt(subnetCIDR.replace("/", ""));
            break;

        } else {

            console.log("Invalid CIDR. Enter a value between /16 and /30.");
        }
    }

    // Validate number of devices
    while (true) {

        let input = readline.question("Enter number of devices required: ");

        if (/^[1-9]\d*$/.test(input)) {

            devices = parseInt(input);
            break;

        } else {

            console.log("Invalid input. Enter a positive integer.");
        }
    }

    // Check subnet consistency with VPC
    console.log("\n===== RESULTS =====");

    if (subnetCIDR >= vpcCIDR) {

        console.log("Subnet CIDR is consistent with VPC CIDR.");

    } else {

        console.log("Subnet CIDR is NOT consistent with VPC CIDR.");
        console.log("A subnet must be smaller than or equal to its VPC.");
        return;
    }

    // Calculate IP addresses
    let totalIPs = Math.pow(2, 32 - subnetCIDR);

    // 5 IP addresses
    let usableIPs = totalIPs - 5;

    console.log("Total IP addresses: " + totalIPs);
    console.log("Usable IP addresses: " + usableIPs);
    console.log("Devices required: " + devices);

    // Check subnet capacity
    if (usableIPs >= devices) {

        let unusedIPs = usableIPs - devices;

        console.log("\nThe subnet is SUFFICIENT.");
        console.log("Unused IP addresses: " + unusedIPs);

    } else {

        let additionalIPs = devices - usableIPs;

        console.log("\nThe subnet is NOT SUFFICIENT.");
        console.log("Additional IP addresses needed: " + additionalIPs);
    }
}


// ==========================================
// PART B: COMPUTE ENVIRONMENT SELECTOR
// ==========================================

function computeEnvironmentSelector() {

    console.log("\n===== COMPUTE ENVIRONMENT SELECTOR =====");

    let appName;
    let monthlyUsers;
    let monthlyBudget;
    let highAvailability;

    // Validate application name
    while (true) {

        appName = readline.question("Enter application name: ").trim();

        if (appName.length > 0) {

            break;

        } else {

            console.log("Application name cannot be empty.");
        }
    }

    // Validate monthly users
    while (true) {

        let input = readline.question("Enter estimated monthly users: ");

        if (/^(0|[1-9]\d*)$/.test(input)) {

            monthlyUsers = Number(input);
            break;

        } else {

            console.log("Invalid input. Enter a non-negative integer.");
        }
    }

    // Validate monthly budget
    while (true) {

        let input = readline.question("Enter monthly budget ($): ");

        if (/^\d+(\.\d{1,2})?$/.test(input) && Number(input) > 0) {

            monthlyBudget = Number(input);
            break;

        } else {

            console.log("Invalid budget. Enter a positive amount.");
        }
    }

    // Validate high availability
    while (true) {

        highAvailability = readline.question(
            "Does the application require high availability? (yes/no): "
        ).toLowerCase().trim();

        if (highAvailability === "yes" || highAvailability === "no") {

            break;

        } else {

            console.log("Please enter yes or no.");
        }
    }

    // Display results
    console.log("\n===== RECOMMENDATION =====");
    console.log("Application: " + appName);
    console.log("Monthly users: " + monthlyUsers);
    console.log("Monthly budget: $" + monthlyBudget.toFixed(2));
    console.log("High availability: " + highAvailability);

    let architecture;

    // Defining architecture
    if (monthlyUsers > 10000 || highAvailability === "yes") {

        architecture = "EC2 + Load Balancer + Auto Scaling";

    } else if (monthlyUsers >= 1000 && monthlyUsers <= 10000) {

        architecture = "EC2 + Load Balancer";

    } else {

        architecture = "Single EC2";
    }

    console.log("\nRecommended Architecture: " + architecture);

    // Budget warnings
    if (monthlyBudget < 1000 && architecture !== "Single EC2") {

        console.log("\nWARNING: Your budget is under $1,000.");
        console.log("The recommended architecture requires more than a single EC2.");
    }

    if (monthlyBudget >= 1000 &&
        monthlyBudget <= 3000 &&
        architecture === "EC2 + Load Balancer + Auto Scaling") {

        console.log("\nWARNING: Your budget is between $1,000 and $3,000.");
        console.log("The recommended architecture requires Auto Scaling.");
    }
}



mainMenu();
