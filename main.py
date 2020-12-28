from flask import Flask, render_template

app = Flask(__name__, template_folder = 'Templates')

@app.route('/')
def index():
    return render_template('mainPage.html')

@app.route('/home')
def home():
    return render_template('mainPage.html')

if __name__ == '__main__':
    app.run()
