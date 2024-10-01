<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;


class OtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public $otp;

    public function __construct($otp)
    {
        $this->otp = $otp;
    }

    public function build()
    {
        Log::info('send mail to ', $this->to);
        return $this->subject('OTP Verification')
                    ->view('emails.otp')
                    ->with(['otp' => $this->otp]);
    }
}
