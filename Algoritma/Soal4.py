matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]
diagonalA=0
diagonalB=0

besarMatrix = len(matrix)-1
i=0

while i<=besarMatrix:
    diagonalA += matrix[i][i]
    diagonalB += matrix[i][besarMatrix-i]
    i+=1

print("Matrix = ",matrix)
print ("Diagonal Pertama = ",diagonalA)
print ("Diagonal Kedua = ", diagonalB)
print("Diagonal Pertama - Diagonal Kedua = ",diagonalA-diagonalB)