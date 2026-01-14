from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
from datetime import datetime
from hooks.useEnrollmentData import EnrollmentService
from hooks.useGraduateData import GraduateService
from hooks.useAuth import AuthService
from hooks.useUserService import UserService
from config.supabase import check_supabase_connection

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

@app.route('/api/health', methods=['GET'])
def health_check():
    db_status = check_supabase_connection()
    return jsonify({
        'status': 'ok', 
        'message': 'PSU ForeSight API is running',
        'database': db_status
    })

@app.route('/api/enrollment', methods=['GET'])
def get_enrollment():
    result = EnrollmentService.get_enrollment_data()
    if result['error']:
        return jsonify({'error': result['error']}), 500
    return jsonify(result['data'])

@app.route('/api/colleges', methods=['GET'])
def get_colleges():
    # Fetch enrollment data to get unique colleges
    result = EnrollmentService.get_enrollment_data()
    if result['error']:
        return jsonify({'error': result['error']}), 500
    
    # Extract unique colleges from data if available
    colleges = set()
    for item in result['data']:
        if 'college' in item:
            colleges.add(item['college'])
    
    return jsonify(list(colleges)) if colleges else jsonify(['Engineering', 'Business', 'Education', 'Agriculture', 'Computing'])

@app.route('/api/forecast', methods=['POST'])
def forecast_enrollment():
    """
    Forecast enrollment using historical data from database
    Expected request body: {'years': number of years to forecast}
    """
    try:
        data = request.json
        forecast_years = data.get('years', 3)
        
        # Get historical enrollment data
        enrollment_result = EnrollmentService.get_enrollment_data()
        if enrollment_result['error']:
            return jsonify({'error': enrollment_result['error']}), 500
        
        historical_data = enrollment_result['data']
        
        if not historical_data:
            return jsonify({'error': 'No historical data available'}), 400
        
        # Extract years and totals for forecasting
        years = []
        values = []
        
        for item in historical_data:
            if 'Year' in item and 'total' in item:
                years.append(int(item['Year']))
                values.append(item['total'])
        
        if len(years) < 2:
            return jsonify({'error': 'Insufficient data for forecasting'}), 400
        
        # Fit linear model
        years_array = np.array(years)
        values_array = np.array(values)
        coeffs = np.polyfit(years_array, values_array, 1)
        
        # Predict future years
        last_year = max(years)
        predictions = []
        for i in range(1, forecast_years + 1):
            future_year = last_year + i
            predicted = int(coeffs[0] * future_year + coeffs[1])
            predictions.append({
                'year': str(future_year),
                'predicted': predicted
            })
        
        return jsonify(predictions)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """
    Get statistics about enrollment and graduation
    """
    try:
        year = request.args.get('year')
        
        # Get enrollment data
        enrollment_result = EnrollmentService.get_enrollment_data()
        graduate_result = GraduateService.get_graduate_data()
        
        enrollment_data = enrollment_result['data'] if not enrollment_result['error'] else []
        graduate_data = graduate_result['data'] if not graduate_result['error'] else []
        
        # Filter by year if specified
        if year:
            enrollment_data = [e for e in enrollment_data if str(e.get('Year')) == year]
            graduate_data = [g for g in graduate_data if str(g.get('year')) == year]
        
        # Calculate stats
        total_students = sum([e.get('total', 0) for e in enrollment_data])
        total_graduates = sum([g.get('total', 0) for g in graduate_data])
        
        graduation_rate = 0
        if total_students > 0:
            graduation_rate = round((total_graduates / total_students) * 100, 2)
        
        stats = {
            'total_students': total_students,
            'graduation_rate': graduation_rate,
            'total_colleges': len(set([e.get('college') for e in enrollment_data if 'college' in e])) or 5,
            'total_graduates': total_graduates
        }
        
        return jsonify(stats)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/graduates', methods=['GET'])
def get_graduates():
    """
    Get graduate data from database
    """
    result = GraduateService.get_graduate_data()
    if result['error']:
        return jsonify({'error': result['error']}), 500
    return jsonify(result['data'])


@app.route('/api/auth/login', methods=['POST'])
def login():
    """
    User login endpoint
    Expected request body: {'email': 'user@example.com', 'password': 'password'}
    """
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password required'}), 400
        
        result = AuthService.login_user(email, password)
        
        if 'error' in result:
            return jsonify(result), 401
        
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/auth/logout', methods=['POST'])
def logout():
    """
    User logout endpoint
    """
    try:
        result = AuthService.logout_user()
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/user/profile', methods=['GET'])
def get_user_profile():
    """
    Get current user's profile from database
    Query params: email (required)
    Returns: name, email, role from users table
    """
    try:
        email = request.args.get('email')
        
        if not email:
            return jsonify({'error': 'Email parameter required'}), 400
        
        result = UserService.get_user_by_email(email)
        
        if result['error']:
            return jsonify({'error': result['error']}), 404
        
        return jsonify(result['data']), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)