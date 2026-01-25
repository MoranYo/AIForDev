data = {
"nums1" : [4,1,2,5] ,
"nums2" : [6,1,8,3] ,
"Student" : {
        "Name" : "Avi",
        "ID" : 111111,
        "Grades" : {

                 "nums3" : [4,1,9,3]

    }
}
}

arr1 = data["num1"]
arr2= data["Student"]["Grades"]["nums3"]

avg1 = sum(arr1)/len(arr1)
avg2 = sum(arr2)/len(arr2)



