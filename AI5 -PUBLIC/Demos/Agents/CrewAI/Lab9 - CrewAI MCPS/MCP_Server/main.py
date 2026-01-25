from mcp.server.fastmcp import FastMCP
from pymongo import MongoClient
import requests
mcp = FastMCP("scraper-mcp")

db_client = MongoClient("mongodb://localhost:27017")

@mcp.tool()
def find_in_database( database: str, collection: str):
    """ Use this tool to find documents in a MongoDB collection based on a query string. """
    db = db_client[database]
    collection = db[collection]
    results = collection.find({})
    return results

@mcp.tool()
def insert_to_database(data: dict, database: str, collection: str):
    """ Use this tool to insert a document into a MongoDB collection. """
    db = db_client[database]
    collection = db[collection]
    result = collection.insert_one(data)
    return str(result.inserted_id)

@mcp.tool()
def insert_many_to_database(data: list, database: str, collection: str):
    """ Use this tool to insert multiple documents into a MongoDB collection. """
    db = db_client[database]
    collection = db[collection]
    result = collection.insert_many(data)
    return [str(id) for id in result.inserted_ids]

@mcp.tool()
def get_collections(database: str):
    """ Use this tool to get the list of collections in a MongoDB database. """
    db = db_client[database]
    return db.list_collection_names()


@mcp.tool()
def get_databases():
    """ Use this tool to get the list of databases in the MongoDB server. """
    return db_client.list_database_names()


@mcp.tool()
def http_request_get(url: str, headers: dict = None):
    """ Use this tool to perform an HTTP GET request to a specified URL. """
    response = requests.get(url, headers=headers)
    return response.json()


mcp.run(transport="stdio")