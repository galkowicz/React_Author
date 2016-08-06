(function () {
    'use strict';

    var Quiz = React.createClass({
        displayName: 'Quiz',

        propTypes: {
            data: React.PropTypes.array.isRequired
        },
        getInitialState: function () {
            return _.extend({
                bgClass: 'neutral',
                showContinue: false
            }, this.props.data.selectGame());
        },
        handleBookSelected: function (title) {
            var isCorrect = this.state.checkAnswer(title);
            this.setState({
                bgClass: isCorrect ? 'pass' : 'fail',
                showContinue: isCorrect
            });
        },
        handleContinue: function () {
            this.setState(this.getInitialState());
        },
        handleAddGame: function () {
            routie('add');
        },
        render: function () {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-4' },
                        React.createElement('img', { src: this.state.author.imageUrl, className: 'authorimage col-md-3' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-7' },
                        this.state.books.map(function (b) {
                            return React.createElement(Book, { onBookSelected: this.handleBookSelected, key: b, title: b });
                        }, this)
                    ),
                    React.createElement('div', { className: "col-md-1 " + this.state.bgClass })
                ),
                this.state.showContinue ? React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement('input', { onClick: this.handleContinue, type: 'button', className: 'btn btn-primary btn-lg pull-right', value: 'Continue' })
                    )
                ) : React.createElement('span', null),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement('input', { onClick: this.handleAddGame, id: 'addGameButton', type: 'button', value: 'Add Game', className: 'btn ' })
                    )
                )
            );
        }

    });

    var Book = React.createClass({
        displayName: 'Book',

        propTypes: {
            title: React.PropTypes.string.isRequired
        },
        handleClick: function () {
            this.props.onBookSelected(this.props.title);
        },
        render: function () {
            return React.createElement(
                'div',
                { onClick: this.props.handleClick, className: 'answer' },
                React.createElement(
                    'h4',
                    null,
                    this.props.title
                )
            );
        }
    });

    var AddGameForm = React.createClass({
        displayName: 'AddGameForm',

        propTypes: {
            onGameFormSubmitted: React.PropTypes.func.isRequired
        },
        handleSubmit: function () {
            this.props.onGameFormSubmitted(getRefs(this));
            return false;
        },
        render: function () {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'h1',
                            null,
                            'Add Game Form'
                        ),
                        React.createElement(
                            'form',
                            { role: 'form', onSubmit: this.handleSubmit },
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement('input', { ref: 'imageUrl', type: 'text', className: 'form-control', placeholder: 'Image Url' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement('input', { ref: 'answer1', type: 'text', className: 'form-control', placeholder: 'Answer 1' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement('input', { ref: 'answer2', type: 'text', className: 'form-control', placeholder: 'Answer 2' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement('input', { ref: 'answer3', type: 'text', className: 'form-control', placeholder: 'Answer 3' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement('input', { ref: 'answer4', type: 'text', className: 'form-control', placeholder: 'Answer 4' })
                            ),
                            React.createElement(
                                'button',
                                { type: 'submit', className: 'btn btn-default' },
                                'Submit'
                            )
                        )
                    )
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

    var selectGame = function () {
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
            }),

            checkAnswer: function (title) {
                return this.author.books.some(function (t) {
                    return t === title;
                });
            }
        };
    };

    data.selectGame = selectGame;

    routie({
        '': function () {
            ReactDOM.render(React.createElement(Quiz, { data: data }), document.getElementById('app'));
        },
        'add': function () {
            ReactDOM.render(React.createElement(AddGameForm, { onGameFormSubmitted: handleAddFormSubmitted }), document.getElementById('app'));
        }
    });

    function handleAddFormSubmitted(data) {
        var quizData = [{
            imageUrl: data.imageUrl,
            books: [data.answer1, data.answer2, data.answer3, data.answer4]
        }];
        quizData.selectGame = selectGame;
        ReactDOM.render(React.createElement(Quiz, { data: quizData }), document.getElementById('app'));
    }

    function getRefs(component) {
        var result = {};
        Object.keys(component.refs).forEach(function (refName) {
            result[refName] = ReactDOM.findDOMNode(component.refs[refName]).value;
        });
        return result;
    }
})();