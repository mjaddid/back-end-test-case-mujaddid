input = ['xc', 'dz', 'bbb', 'dz']  
query = ['bbb', 'ac', 'dz']  
output = []

for i in query:
    similar = 0
    for j in input:
        if i == j:
            similar += 1
    output.append(similar)

print(output)