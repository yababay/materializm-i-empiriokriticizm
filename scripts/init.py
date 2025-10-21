import redis
import nltk
from nltk.tokenize import sent_tokenize

# Download the punkt data if not already present
try:
    nltk.data.find('tokenizers/punkt')
except nltk.downloader.DownloadError:
    nltk.download('punkt')


def split_text_into_paragraphs_and_sentences(text):

    # 1. Split the text into paragraphs using double newlines as delimiters
    #    We strip whitespace from each potential paragraph and filter out 
    #    any empty strings that might result from extra newlines.
    paragraphs = [p.strip() for p in text.split('\n\n') if p.strip()]

    # 2. Iterate through each valid paragraph and tokenize it into sentences
    structured_text = []
    for paragraph in paragraphs:
        # Use NLTK's sent_tokenize for accurate sentence boundary detection
        sentences = sent_tokenize(paragraph)
        structured_text.append(sentences)
        
    return structured_text

title = 'Ленин В.И. Материализм и эмпириокритицизм'

with open(f'corpus/{title}.txt', 'r', encoding='utf-8') as file:
    sample_text = file.read()

structured_data = split_text_into_paragraphs_and_sentences(sample_text)

client = redis.Redis(host='localhost', port=6375, db=0, decode_responses=True)
client.flushall() # clear db

for p_idx, paragraph_sentences in enumerate(structured_data):
    count = p_idx + 1000001
    client.rpush(f'materializm-i-empiriokriticizm:paragraph:{count}', *paragraph_sentences)
    client.set(  f'materializm-i-empiriokriticizm:title:{count}', title)
    client.set(f'materializm-i-empiriokriticizm:count:paragraphs', count)
    print(f"--- Paragraph {p_idx + 1} ({len(paragraph_sentences)} sentences) ---")

client.quit()
