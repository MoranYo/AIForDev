class Person:
    def __init__(self,n,a):
        self.name = n
        self.age = a

    def print_data(self):
        print(self.name)
        print(self.age)

    def print_birth_year(self,current_year):
        print(current_year - self.age)



p1 = Person("Ron",20)
p1.name = "Gil"
p1.age = 30

p1.print_birth_year(2025)