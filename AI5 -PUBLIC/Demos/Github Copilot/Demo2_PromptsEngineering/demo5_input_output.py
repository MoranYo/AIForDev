# create a function that creates a proper XML from the following JSONs:
# [{name : 'Ron', age : 20}, {name : 'John', age : 30}]

import dicttoxml
def jsons_to_xml(jsons):
    xml = dicttoxml.dicttoxml(jsons, custom_root='people', attr_type=False)
    return xml.decode()

