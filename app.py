from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                          'favicon.ico',mimetype='image/vnd.microsoft.icon')

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/tutorial.html')
def tutorial():
    return render_template("tutorial.html")

@app.route('/implementation.html')
def implementation():
    return render_template("implementation.html")

@app.route('/visualization.html')
def visualization():
    return render_template("visualization.html")

@app.route('/quiz.html')
def quiz():
    return render_template("quiz.html")


if __name__ == "__main__":

    app.run(debug = True) 