<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tickets</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .ticket-page {
            page-break-after: always;
            padding: 20px;
        }
        .ticket-page:last-child {
            page-break-after: auto; /* Avoid breaking after the last page */
        }
        .event-banner {
            width: 100%;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
        }
    </style>
</head>
<body>
    @foreach ($tickets as $ticket)
    <div class="ticket-page">
        <!-- Event Banner as Base64 Image -->
        <img src="{{ $event_banner_base64 }}" alt="Event Banner" class="event-banner">
        <!-- Ticket Details -->
        <div>
            <h2>Event Title: {{ $event_name }}</h2>
            <p>Date: {{ $event_date }}</p>
            <p>Ticket Code: {{ $ticket['unique_code'] }}</p>
            <p>Order No: {{ $order_no }}</p>
            <p>Customer Name: {{ $ticket['customer_name'] }}</p>
            <img src="{{ $ticket['qr_code_url'] }}" alt="QR Code" style="width: 100px; height: 100px;">
        </div>
    </div>
    @endforeach
</body>
</html>
