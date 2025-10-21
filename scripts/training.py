import redis
import pandas as pd
import numpy as np

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

client = redis.Redis(host='localhost', port=6375, db=0, decode_responses=True)

keys = client.keys('*:ranges:*')

labels = []
sentences = []

for key in keys:
    l = client.lrange(key, 0, -1)
    s = client.lrange(key.replace(':ranges:', ':paragraph:'), 0, -1)
    labels += l
    sentences += s

df = pd.DataFrame({'label': labels, 'sentence': sentences})
df = df[df['sentence'].str.contains(' ')]

labels = df['label']
sentences = df['sentence']

vectorizer = CountVectorizer()
bow = vectorizer.fit_transform(sentences)

classifier = MultinomialNB()
classifier.fit(bow, labels)

with open('.tmp/model.pkl', 'wb') as file:
    pickle.dump(classifier, file)

with open('.tmp/vectorizer.pkl', 'wb') as file:
    pickle.dump(vectorizer, file)


