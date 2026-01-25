# Get two strings from the user
string1 = input("Enter the first string: ")
string2 = input("Enter the second string: ")

# Print the concatenation
print(string1 + string2)

#-----------------------------------------------------------------------
# Get two numbers from the user
num1 = float(input("Enter the first number: "))
num2 = float(input("Enter the second number: "))

# Check if sum is greater than 10
if num1 + num2 > 10:
    print("Big")
else:
    print("Small")
#-----------------------------------------------------------------------
# Get two numbers and a string from the user
num1 = float(input("Enter the first number: "))
num2 = float(input("Enter the second number: "))
string = input("Enter a string: ")

# Check if sum is greater than string length
if num1 + num2 > len(string):
    # Get two more strings
    str1 = input("Enter the first string: ")
    str2 = input("Enter the second string: ")
    
    # Print the longer string
    if len(str1) > len(str2):
        print(str1)
    else:
        print(str2)
#-----------------------------------------------------------------------
