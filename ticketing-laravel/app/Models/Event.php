<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $guarded = [
        'id'
    ];

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'event_id');
    }

    public function ticketTypes()
    {
        return $this->hasMany(TicketType::class, 'event_id');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_event');
    }
}
