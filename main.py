import flask

app = flask.Flask(__name__)

@app.route('/')
def index():
    redirect url_for( 'home' )

@app.route('/home')
def home():
    return render_template( 'mainPage.html' )

if __name__ == '__main__':
    app.run()
