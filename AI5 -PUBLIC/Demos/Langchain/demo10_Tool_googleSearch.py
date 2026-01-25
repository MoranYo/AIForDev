SERP_API_KEY = "b0043711d35b6c5e825905edaac1fc595e22657f7452c224031ef172d52afd4e"

from langchain_community.utilities import SerpAPIWrapper

serach = SerpAPIWrapper(serpapi_api_key=SERP_API_KEY)

print(serach.run("Trump's full name"))