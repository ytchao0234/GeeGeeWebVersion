from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return redirect(url_for('home'))

@app.route('/home')
def home():
    return render_template('mainPage.html')

@app.route('/record')
def record():
    return render_template('recordPage.html')

if __name__ == '__main__':
    app.run()
