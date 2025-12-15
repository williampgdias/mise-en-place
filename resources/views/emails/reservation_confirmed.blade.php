<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f4f6;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            color: #2563eb;
            margin-bottom: 20px;
        }

        .details {
            background-color: #f8fafc;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #2563eb;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            margin-top: 30px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1 class="header">🍽️ Mise en Place</h1>

        <h2>Hello, {{ $reservation->first_name }}!</h2>

        <p>Great news! Your table has been successfully reserved.</p>

        <div class="details">
            <p><strong>Date:</strong> {{ \Carbon\Carbon::parse($reservation->res_date)->format('d/m/Y H:i') }}</p>
            <p><strong>Table:</strong> {{ $reservation->table->name }}</p>
            <p><strong>Guests:</strong> {{ $reservation->guest_number }} people</p>
        </div>

        <p>Please arrive 10 minutes early. If you need to cancel, you can contact us.</p>

        <p>Bon appétit! 🍷</p>

        <div class="footer">
            Mise en Place Restaurant System
        </div>
    </div>
</body>

</html>
