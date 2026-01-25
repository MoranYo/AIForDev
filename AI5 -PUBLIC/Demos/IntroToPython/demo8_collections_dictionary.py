student = {
    "name" : "Avi",
    "age" : 20,
    "grades" : [89,99,100],
    "address" : {
        "city" : "Haifa",
        "street" : {
            "name" : "Herzel",
            "no" : 20
        }
    }
}

print(student["name"])
print(student["address"]["street"]["name"])