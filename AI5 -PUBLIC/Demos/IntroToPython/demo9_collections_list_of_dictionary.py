persons = [{"name" : "Ron","age" : 20},
           {"name" : "Gil","age" : 30},
           {"name" : "Dana","age" : 40}]


for i in range(len(persons)):
    print(persons[i]["name"])


for per in persons:
    print(per["name"])


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
grade = student["grades"][2]