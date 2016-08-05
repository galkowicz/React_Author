(function () {
    'use strict';

    var Quiz = React.createClass({
        render: function () {
            return  <div>test {this.props.data}</div>;
        }
    });
    ReactDOM.render(<Quiz data={"foo"} />,
        document.getElementById('app'));
    console.log("working?");
})();