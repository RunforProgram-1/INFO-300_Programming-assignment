README.TXT FILE
1. Example of user input/output for a sufficient subnet:

===== SUBNET HOST CHECKER =====
Enter VPC CIDR (16-30): 16
Enter Subnet CIDR (16-30): 24
Enter number of devices required: 200

===== RESULTS =====
Subnet CIDR is consistent with VPC CIDR.
Total IP addresses: 256
Usable IP addresses: 251
Devices required: 200

The subnet is SUFFICIENT.
Unused IP addresses: 51
=== MAIN MENU =====
1. Subnet Host Checker
2. Compute Environment Selector
Select a tool (1 or 2): 1

2. Example of user input/output for an insufficient subnet
===== SUBNET HOST CHECKER =====
Enter VPC CIDR (16-30): 16
Enter Subnet CIDR (16-30): 24
Enter number of devices required: 300

===== RESULTS =====
Subnet CIDR is consistent with VPC CIDR.
Total IP addresses: 256
Usable IP addresses: 251
Devices required: 300

The subnet is NOT SUFFICIENT.
Additional IP addresses needed: 49




