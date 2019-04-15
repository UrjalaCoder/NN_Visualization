var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Canvas = function (_React$Component) {
    _inherits(Canvas, _React$Component);

    function Canvas(props) {
        _classCallCheck(this, Canvas);

        var _this = _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this, props));

        var canvas = _this.refs.canvas;
        var ctx = canvas.getContext('2d');
        _this.state = { 'canvas': canvas, 'ctx': ctx };
        return _this;
    }

    _createClass(Canvas, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            drawGrid(this.props.pixelWidth, this.props.pixelHeight, this.props.separation, this.props.lineThickness);
            drawPoints(this.props.pointRadius, this.props.points);
        }
    }, {
        key: 'drawAreaPoints',
        value: function drawAreaPoints() {}
    }, {
        key: 'drawGrid',
        value: function drawGrid(pixelWidth, pixelHeight, separation, lineThickness) {
            var ctx = this.state.ctx;
            ctx.fillStyle = "black";
            ctx.clearRect(0, 0, pixelWidth, pixelHeight);
            ctx.strokeRect(0, 0, pixelWidth, pixelHeight);

            // Main drawing loops of the gridlines -->
            // Horizontal lines.
            var y = pixelHeight;
            while (y > 0) {
                var scaledY = y + lineThickness / 2.0;
                ctx.fillRect(0, scaledY, pixelWidth, lineThickness);
                y = y - separation;
            }

            // Vertical lines.
            var x = 0;
            while (x < pixelWidth) {
                var scaledX = x - lineThickness / 2.0;
                ctx.fillRect(scaledX, 0, lineThickness, pixelHeight);
                x = x + separation;
            }

            // Y-Axis
            ctx.fillRect(0, 0, 2 * lineThickness, pixelHeight);

            // X-Axis
            ctx.fillRect(0, pixelHeight - 2 * lineThickness, pixelWidth, 2 * lineThickness);
        }

        // Method for drawing the points currently in state.data .

    }, {
        key: 'drawPoints',
        value: function drawPoints(pointRadius, points) {
            var _this2 = this;

            var ctx = this.state.ctx;
            // If points are not defined --> return.
            if (!points) {
                return;
            }
            // Loop.
            points.forEach(function (point) {
                if (point.label == 1) {
                    ctx.fillStyle = "green";
                } else {
                    ctx.fillStyle = "red";
                }
                ctx.beginPath();
                ctx.arc(point.x * _this2.graphics.separation, _this2.state.canvas.height - point.y * _this2.graphics.separation, pointRadius, 0, 2 * Math.PI);
                ctx.fill();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement('canvas', { ref: 'canvas' });
        }
    }]);

    return Canvas;
}(React.Component);

var Grid = function (_React$Component2) {
    _inherits(Grid, _React$Component2);

    function Grid(props) {
        _classCallCheck(this, Grid);

        var _this3 = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));

        _this3.state = {
            'data': [],
            'width': 10,
            'height': 10,
            'training': false
        };

        _this3.graphics = {
            'separation': 50,
            'thickness': 2,
            'pointRadius': 2
        };
        return _this3;
    }

    /*
    * Datapoints should be of the form
    * p = {
    *     x: Number
    *     y: Number
    * }
    */


    _createClass(Grid, [{
        key: 'setDataPoints',
        value: function setDataPoints(newPoints) {
            var p = newPoints || this.props.generatePoints(this.state.canvas.width / this.graphics.separation);
            this.setState({ 'data': p });
        }
    }, {
        key: 'handleShowButton',
        value: function handleShowButton(e) {
            console.log("Generating points.");
            this.setDataPoints(null);
        }
    }, {
        key: 'handleFeedButton',
        value: function handleFeedButton(e) {}
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(Canvas, { pixelWidth: 800,
                    pixelHeight: 600,
                    separation: this.graphics.separation,
                    lineThickness: this.graphics.thickness,
                    pointRadius: this.graphics.pointRadius,
                    points: this.state.data }),
                React.createElement(
                    'button',
                    { onClick: function onClick(e) {
                            return _this4.handleShowButton(e);
                        } },
                    'Show'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick(e) {
                            return _this4.handleFeedButton(e);
                        } },
                    'Feed'
                )
            );
        }
    }]);

    return Grid;
}(React.Component);