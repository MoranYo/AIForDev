arr = [4, "Hello" ,[ True, "Avi" , [5,1,9,3] ] ]

# Extract the numbers: 4, 5, 1, 9, 3
numbers = [arr[0], arr[2][2][0], arr[2][2][1], arr[2][2][2], arr[2][2][3]]
average = sum(numbers) / len(numbers)
print(f"Average: {average}")
