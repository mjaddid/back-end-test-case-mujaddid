sentence = list(map(str,input("Masukkan Kalimat : ").strip().split()))

def longestSentence(sentence):
    kataTerpanjang = ""
    indexKataterpanjang = 0
    for i in range(len(sentence)):
        if len(sentence[i]) > len(kataTerpanjang):
            kataTerpanjang = sentence[i]
            indexKataterpanjang = i
    print ("Kata terpanjang : ",kataTerpanjang)
    print ("Panjang kata : ",len(kataTerpanjang))

longestSentence(sentence)