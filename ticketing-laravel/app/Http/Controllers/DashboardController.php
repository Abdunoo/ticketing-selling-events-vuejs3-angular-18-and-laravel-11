<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getMonthlyCounts()
    {
        $data = [];
        $end = Carbon::now();
        $start = $end->copy()->subMonths(5); // Get data for the last 6 months

        // Query monthly counts for each entity
        for ($date = $start; $date <= $end; $date->addMonth()) {
            $month = $date->format('Y-m');

            $events = DB::table('events')
                ->whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();

            $orders = DB::table('orders')
                ->whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();

            $users = DB::table('users')
                ->whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();

            $data[] = [
                'month' => $month,
                'events' => $events,
                'orders' => $orders,
                'users' => $users,
            ];
        }

        return response()->json($data);
    }
}

