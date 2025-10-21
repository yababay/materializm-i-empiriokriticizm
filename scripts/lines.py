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

with open(f'corpus/{title}.distilled.txt', 'r', encoding='utf-8') as file:
    sample_text = file.read()

structured_data = split_text_into_paragraphs_and_sentences(sample_text)

with open(f'corpus/{title}.sentences.txt', 'w', encoding='utf-8') as file:
    for p_idx, paragraph_sentences in enumerate(structured_data):
        for sent in paragraph_sentences:
            file.write(f'{sent}\n\n')
