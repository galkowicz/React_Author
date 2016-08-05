(function () {
    'use strict';

    var Quiz = React.createClass({
        displayName: 'Quiz',

        render: function () {
            return React.createElement(
                'div',
                null,
                'test'
            );
        }
    });
    console.log('yay!');
    ReactDOM.render(React.createElement(Quiz, { data: "foo" }), document.getElementById('app'));
})();