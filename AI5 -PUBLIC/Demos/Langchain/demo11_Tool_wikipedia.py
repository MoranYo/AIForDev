from langchain_community.utilities import WikipediaAPIWrapper

wiki = WikipediaAPIWrapper()
print(wiki.run("Elon Musk"))