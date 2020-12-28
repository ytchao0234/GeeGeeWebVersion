from flask import Flask, render_template

app = Flask(__name__,template_folder='/templates', static_url_path='/static')

@app.route('/')
def index():
    return redirect(url_for('home'))

@app.route('/home')
def home():
    return render_template('mainPage.html')

@app.route('/record')
def record():
    return render_template('record.html')

if __name__ == '__main__':
    app.run()
