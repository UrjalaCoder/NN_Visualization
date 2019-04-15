import sys, math, random, os
import numpy as np
from network import Network

# This time input takes 2-part data, x, y
def parseInput(input_lists):
    input_data = []
    for el in input_lists:
        x, y = el.split(',')

        x = float(x)
        y = float(y)
        input_data.append(np.array([x, y]).reshape((2, 1)))
    return np.array(input_data)
def createNetwork():
    n = Network([2, 2, 1])

    # If there is a file. Load the weights and biases.
    if os.path.isfile('./current_network.npy'):
        # Load network data
        network_data = Network.load("./current_network.npy")
        n.weights = network_data[0]
        n.biases = network_data[1]

    return n

def getResult(inputVector, n):
    x = n.feed_forward(inputVector)[0][-1][0][0]
    if x < 0.5:
        x = 0
    else:
        x = 1
    return x

def main():
    input_lists = sys.argv[1].split('-')
    input_data = parseInput(input_lists)
    n = createNetwork()

    results = []
    for inputVector in input_data:
        results.append(getResult(inputVector, n))
    print(results)

if __name__ == '__main__':
    main()
