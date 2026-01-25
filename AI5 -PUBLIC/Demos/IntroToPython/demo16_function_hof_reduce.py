from functools import reduce

arr = [6,3,8,1]

total = reduce(lambda x,y : x + y,arr)
