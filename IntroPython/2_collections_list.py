arr = [5,2,8,9]
print("Array elements:", arr)
print("First element:", arr[0])
arr.append(12)
print("Array after appending 12:", arr)
arr.insert(2, 15)
print("Array after inserting 15 at index 2:", arr)
print (arr.pop())
print("Array after popping last element:", arr)
print(arr.pop(1))
print("Array after popping element at index 1:", arr)

if 5 in arr:
    print("5 is in the array")