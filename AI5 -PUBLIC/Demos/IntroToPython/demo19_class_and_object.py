class Product:
    def __init__(self):
        self.name = ""
        self.price = 0

    def print_data(self):
        print(self.name)
        print(self.price)



class Store:
    def __init__(self):
        self.products = []

    def add_product(self,p):
        self.products.append(p)

    def print_products_data(self):
        for p in self.products:
            p.print_data()



