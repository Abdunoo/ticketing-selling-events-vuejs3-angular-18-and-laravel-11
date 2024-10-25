<?php

namespace App\Helpers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Xendit\Configuration;
use Xendit\Invoice\CreateInvoiceRequest;
use Xendit\Invoice\InvoiceApi;
use Xendit\XenditSdkException;
use Illuminate\Support\Str;

class Ticketku
{
    public static function createInvoice($params = [])
    {
        Configuration::setXenditKey(env('XENDIT_SECRET_KEY'));
        $apiInstance = new InvoiceApi();

        $create_invoice_request = new CreateInvoiceRequest([
            'external_id' => $params['order_no'],
            'description' => "Generate URL Invoice " . $params['order_no'],
            'amount' => $params['total_price'],
            'currency' => 'IDR',
            'success_redirect_url' => env('XENDIT_SUCCESS_REDIRECT_URL'),
            'invoice_duration' => 21600, #6 jam

        ]);

        $urlInvoice = '';
        try {
            $response = $apiInstance->createInvoice($create_invoice_request);
            $result = json_decode($response, true);
            return $result;
        } catch (XenditSdkException $e) {
            $log['error'] = $e->getFullError();
            Log::error('Generate Xendit URL Invoice', $log);
        }

        if ($urlInvoice) {
            return $urlInvoice;
        }
    }

    public function handleInvoiceCallback(Request $request)
    {
        // 1. Verify the callback signature (optional but highly recommended)
        //    You'll need to get your Xendit webhook key from your dashboard
        //    and use it to verify the signature in the `x-callback-token` header
        //    Refer to Xendit documentation for how to do this

        // 2. Log the callback data for debugging (optional)
        Log::info('Xendit Invoice Callback:', $request->all());

        // 3. Extract relevant data from the callback
        $order_no = $request->external_id;
        $status = $request->input('status');
        $payment_method = isset($request->payment_method) ? $request->payment_method : '';
        $bank = isset($request->payment_channel) ? $request->payment_channel : '';
        $no_rek = isset($request->payment_destination) ? $request->payment_destination : '';
        $name_of = isset($request->merchant_name) ? $request->merchant_name : '';

        if ($status == 'PAID') {
            try {
                Order::where('order_no', $order_no)->update([
                    'payment_status' => Str::lower($status),
                    'pay_date' => date('Y-m-d H:i:s'),
                    'payment_method' => $payment_method,
                    'bank' => $bank,
                    'no_rek' => $no_rek,
                    'name_of' => $name_of,
                ]);
            } catch (\Throwable $th) {
                throw $th;
            }
        }
        // 4. Update your database or perform other actions based on the callback data
        //    For example:
        //    - If `status` is 'PAID', mark the corresponding order as paid in your database
        //    - If `status` is 'EXPIRED', send a reminder email to the customer

        // 5. Return a 200 OK response to acknowledge the callback
        return response()->json(['message' => 'Callback received'], 200);
    }

    public function getOrderNo()
    {
        $latestOrder = \App\Models\Order::orderBy('id', 'desc')->first(); // Get the latest order

        if ($latestOrder) {
            // Increment the last order number
            $lastOrderNo = intval(substr($latestOrder->order_no, 3)); // Extract numeric part
            $newOrderNo = 'TIC' . str_pad($lastOrderNo + 1, 6, '0', STR_PAD_LEFT);
        } else {
            // First order, start with ORD000001
            $newOrderNo = 'ORD000001';
        }

        return $newOrderNo;
    }
}

if (!function_exists('prepend_base_url')) {
    function prepend_base_url($image_path, $event_name = '')
    {
        if (empty($image_path) || !Storage::disk()->exists($image_path)) {
            $image_path = 'images/not_found.webp';
        }
        if (!preg_match('/^https?:\/\//', $image_path)) {
            return env('APP_URL') . "/storage/" . ltrim($image_path, '/');
        }
        return $image_path;
    }
}

