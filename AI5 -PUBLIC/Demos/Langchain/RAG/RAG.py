from secret_key import open_api_key
import os
os.environ["OPENAI_API_KEY"] = open_api_key #"Put your own key"
# from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain.chains.retrieval import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain import hub


#PyPDFLoader: This is an instance of a class designed to load PDF files.
# It's initialized with the path to the PDF file (pdf_path).
loader = PyPDFLoader(file_path="data.pdf")

documents = loader.load()


#chunk_size=1000: This parameter specifies that each chunk of text should be 1000
# characters long.
#chunk_overlap=30: This parameter indicates that there should be an overlap of
# 30 characters between consecutive chunks.
# This overlap helps maintain context across chunks.
#separator="\n": This parameter specifies that the chunks should
# be separated by newline characters.
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=30, separator="\n")


# This method takes the documents (the text extracted from the PDF)
# and splits it into smaller chunks based on the specified parameters.
# The result, stored in split_documents, is a list of text chunks.
spitted_documents = text_splitter.split_documents(documents)

#This initializes an instance of a class that generates embeddings
# using OpenAI's models. Embeddings are numerical representations of
# the text that capture its semantic meaning.
embedding = OpenAIEmbeddings()



#This creates a FAISS (Facebook AI Similarity Search) vector store from the
# split documents. FAISS is a library for efficient similarity search and
# clustering of dense vectors. The from_documents method converts the split
# documents into embeddings and stores them in a vector store, which allows
# for efficient similarity searches.
vectorestore = FAISS.from_documents(spitted_documents, embedding)


# Save the vector store locally
vectorestore.save_local("faiss_index_ai5")


#his line pulls a pre-defined prompt template for retrieval-based question-answering
# (QA) from the LangChain AI hub. This template likely includes a structured
# prompt for interacting with the user in a QA format.
retreival_qa_chat_prompt = hub.pull("langchain-ai/retrieval-qa-chat")


#retrieval_qa_chat_prompt: The prompt template pulled from the hub is used
# to structure the QA interaction.
combine_docs_chain = create_stuff_documents_chain(ChatOpenAI(), retreival_qa_chat_prompt)

retreival_chain = create_retrieval_chain(
    vectorestore.as_retriever(), combine_docs_chain
)

#This method is used to invoke the retrieval chain created earlier with a
# specific input. The input in this case is a query:
# "Give me the gist of Retrieval-Augmented Generation (RAG) in 3 sentences".
#{"input": "Give me the gist of Retrieval-Augmented Generation (RAG) in 3 sentences"}
# : This dictionary contains the input query that will be processed by the retrieval chain. The chain will use the retriever to find relevant documents and then generate a concise answer using the OpenAI model and the specified prompt.
res = retreival_chain.invoke({"input": "Give me a summary of RAG architecture in 3 sentences" })
print(res["answer"])


