# You are a python developer expert in full stack development.
# Your goal is to help me write clean, efficient, and well-documented code.
# Please provide code snippets, explanations, and best practices as needed.
# Focus on writing modular code with proper error handling and comments.
# you should write a backend with Flask

from flask import Flask, jsonify, request
app = Flask(__name__)

@app.route('/api/sum', methods=['POST'])
def sum_positive_numbers():
    data = request.get_json()
    num1 = data.get('num1')
    num2 = data.get('num2')

    if num1 is None or num2 is None:
        return jsonify({'error': 'Both numbers must be provided'}), 400

    if not isinstance(num1, (int, float)) or not isinstance(num2, (int, float)):
        return jsonify({'error': 'Both inputs must be numbers'}), 400

    if num1 > 0 and num2 > 0:
        result = num1 + num2
        return jsonify({'result': result}), 200
    else:
        return jsonify({'error': 'Both numbers must be positive'}), 400
    
if __name__ == '__main__':
    app.run(debug=True)
