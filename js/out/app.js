(function () {
    'use strict';

    var Quiz = React.createClass({
        displayName: "Quiz",

        propTypes: {
            data: React.PropTypes.array.isRequired
        },
        getInitialState: function () {
            return this.props.data.selectGame();
        },
        render: function () {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-4" },
                        React.createElement("img", { src: this.state.author.imageUrl, className: "authorimage col-md-12" })
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-7" },
                        this.state.books.map(function (b) {
                            return React.createElement(Book, { title: b });
                        }, this)
                    ),
                    React.createElement("div", { className: "col-md-1" })
                )
            );
        }
    });

    var Book = React.createClass({
        displayName: "Book",

        propTypes: {
            title: React.PropTypes.string.isRequired
        },
        render: function () {
            return React.createElement(
                "div",
                { className: "answer" },
                React.createElement(
                    "h4",
                    null,
                    this.props.title
                )
            );
        }
    });

    var data = [{
        name: 'J.R.R Tolkien',
        imageUrl: 'images/authors/tolkein.jpg',
        books: ['The Fellowship of the Ring', 'The Hobbit']
    }, {
        name: 'Jane Austin',
        imageUrl: 'images/authors/austin.jpg',
        books: ['Pride and Prejudice', 'Emma']
    }, {
        name: 'J.K Rowling',
        imageUrl: 'images/authors/rowling.jpg',
        books: ['Harry Potter', 'Fantastic Beats and Where to Find Them']
    }];

    data.selectGame = function () {
        var books = _.shuffle(this.reduce(function (p, c, i) {
            return p.concat(c.books);
        }, [])).slice(0, 4);

        var answer = books[_.random(books.length - 1)];

        return {
            books: books,
            author: _.find(this, function (author) {
                return author.books.some(function (title) {
                    return title === answer;
                });
            })
        };
    };

    ReactDOM.render(React.createElement(Quiz, { data: data }), document.getElementById('app'));
})();