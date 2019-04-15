class Canvas extends React.Component {
    constructor(props) {
        super(props);
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        this.state = {'canvas': canvas, 'ctx': ctx};
    }

    componentDidMount() {
        drawGrid(this.props.pixelWidth, this.props.pixelHeight, this.props.separation, this.props.lineThickness);
        drawPoints(this.props.pointRadius, this.props.points);
    }

    drawAreaPoints() {

    }

    drawGrid(pixelWidth, pixelHeight, separation, lineThickness) {
        let ctx = this.state.ctx;
        ctx.fillStyle = "black";
        ctx.clearRect(0, 0, pixelWidth, pixelHeight);
        ctx.strokeRect(0, 0, pixelWidth, pixelHeight);

        // Main drawing loops of the gridlines -->
        // Horizontal lines.
        let y = pixelHeight;
        while(y > 0) {
            let scaledY = y + (lineThickness / 2.0);
            ctx.fillRect(0, scaledY, pixelWidth, lineThickness);
            y = y - separation;
        }

        // Vertical lines.
        let x = 0;
        while(x < pixelWidth) {
            let scaledX = x - (lineThickness / 2.0);
            ctx.fillRect(scaledX, 0, lineThickness, pixelHeight);
            x = x + separation;
        }

        // Y-Axis
        ctx.fillRect(0, 0, 2*lineThickness, pixelHeight);

        // X-Axis
        ctx.fillRect(0, pixelHeight - 2*lineThickness, pixelWidth, 2*lineThickness);
    }

    // Method for drawing the points currently in state.data .
    drawPoints(pointRadius, points) {
        let ctx = this.state.ctx;
        // If points are not defined --> return.
        if(!points) {
            return;
        }
        // Loop.
        points.forEach((point) => {
            if(point.label == 1) {
                ctx.fillStyle = "green";
            } else {
                ctx.fillStyle = "red";
            }
            ctx.beginPath();
            ctx.arc(point.x * this.graphics.separation, this.state.canvas.height - point.y * this.graphics.separation, pointRadius, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    render() {
        return (
            <canvas ref="canvas"></canvas>
        );
    }
}

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        'data': [],
        'width': 10,
        'height': 10,
        'training': false
    };

    this.graphics = {
        'separation': 50,
        'thickness': 2,
        'pointRadius': 2
    }
  }

  /*
  * Datapoints should be of the form
  * p = {
  *     x: Number
  *     y: Number
  * }
  */
  setDataPoints(newPoints) {
      let p = newPoints || this.props.generatePoints(this.state.canvas.width / this.graphics.separation);
      this.setState({'data': p});
  }

  handleShowButton(e) {
      console.log("Generating points.")
      this.setDataPoints(null);
  }

  handleFeedButton(e) {

  }

  render() {
      return (
        <div>
            <Canvas pixelWidth={800}
                    pixelHeight={600}
                    separation={this.graphics.separation}
                    lineThickness={this.graphics.thickness}
                    pointRadius={this.graphics.pointRadius}
                    points={this.state.data} />
            <button onClick={(e) => this.handleShowButton(e)}>Show</button>
            <button onClick={(e) => this.handleFeedButton(e)}>Feed</button>
        </div>
      );
  }
}
