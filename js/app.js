(function () {
    'use strict';

    var Quiz = React.createClass({
        propTypes: {
          data: React.PropTypes.array.isRequired
        },
        getInitialState: function() {
          return this.props.data.selectGame();
        },
        render: function() {
            return  (<div>
                <div className="row">
                    <div className="col-md-4">
                        <img src={this.state.author.imageUrl} className="authorimage col-md-12"/>
                    </div>
                    <div className="col-md-7">
                        {this.state.books.map(function (b) {
                            return <Book title={b}/>
                        }, this)}
                    </div>
                    <div className="col-md-1"></div>
                </div>

            </div>);
        }
    });

    var Book = React.createClass({
        propTypes: {
          title: React.PropTypes.string.isRequired
        },
        render: function() {
            return <div className="answer"><h4>{this.props.title}</h4></div>;
        }
    });

    var data = [
        {
            name: 'J.R.R Tolkien',
            imageUrl: 'images/authors/tolkein.jpg',
            books: ['The Fellowship of the Ring','The Hobbit']
        },
        {
            name: 'Jane Austin',
            imageUrl: 'images/authors/austin.jpg',
            books: ['Pride and Prejudice','Emma']
        },
        {
            name: 'J.K Rowling',
            imageUrl: 'images/authors/rowling.jpg',
            books: ['Harry Potter','Fantastic Beats and Where to Find Them']
        }

    ];

    data.selectGame = function(){
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
        }
    };

    ReactDOM.render(<Quiz data={data} />,
        document.getElementById('app'));
})();