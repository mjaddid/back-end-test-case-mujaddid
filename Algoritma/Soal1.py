kata = input("Input kata : ")

panjang = len(kata)
hasilKata=""
i=panjang-2

while i>=0:
    hasilKata = hasilKata+kata[i]
    i-=1
hasilKata=hasilKata+kata[panjang-1]

print("Hasil Reverse : ",hasilKata)