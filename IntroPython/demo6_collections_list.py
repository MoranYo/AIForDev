arr = [5,2,8,9]
print(arr)

print(arr[3])

print(len(arr))

arr.append(10)

print(arr)

arr.insert(3,20)
print(arr)

print(arr.pop())
print(arr.pop(3))

if 5 in arr:
    print("Exist")
else:
    print("Not exist")