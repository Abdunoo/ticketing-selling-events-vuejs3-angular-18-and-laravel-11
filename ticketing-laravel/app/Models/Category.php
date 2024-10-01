<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = ['id'];

    public function events()
    {
        return $this->belongsToMany(Event::class, 'category_event');
    }
}
