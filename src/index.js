let domContainer = document.getElementById('grid_container');

function Point(max) {
    this.x = Math.random() * max;
    this.y = Math.random() * max;

    // Function is y = 2*x + 1
    if(this.y > 1*this.x) {
        this.label = 1;
    } else {
        this.label = 0;
    }
}

function points(max) {
    let amount = 1000;
    let points = [];
    for(let i = 0; i < amount; i++) {
        points.push(new Point(max));
    }
    return points;
}

ReactDOM.render(<Grid generatePoints={points}/>, domContainer);
