import sys, math, random, os
import numpy as np
from network import Network

# First parse the input data
# Training takes 3-part data: x, y, label
# Each block is separated by '-' and each element by ','
def parseInput(input_lists):
    input_data = []
    for el in input_lists:
        x, y, label = el.split(',')
        
        x = float(x)
        y = float(y)
        label = int(label)

        input_data.append((np.array([x, y]).reshape((2, 1)), label))
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

def main():
    input_lists = sys.argv[1].split('-')
    input_data = parseInput(input_lists)
    n = createNetwork()
    # Train network from data
    # n.train(input_data, len(input_data), 1.0, 1)
    n.train(generateData(100), 100, 1.0, 2)
    # Finally save the network.
    Network.store('./current_network', (n.weights, n.biases))


# Helper function for generating test training data.
def generateData(amount):
    data = []
    for i in range(amount):
        x = random.uniform(0, 10)
        y = random.uniform(0, 10)

        label = 1
        # Function 2*x + 1
        if (2*x + 1) > y:
            label = 0

        data.append((np.array([x, y]).reshape(2, 1), label))
    return np.array(data)

if __name__ == '__main__':
    main()
