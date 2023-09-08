<?php

namespace App\Models;
use App\Models\User;
use App\Models\Travel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'travel_id',
    ];

    // Relación con el usuario que dio el like

    public function user()
    {
        return $this->hasMany(User::class);
    }

    // Relación con el destino que fue marcado como favorito
    public function travel()
    {
        return $this->hasMany(Travel::class);
    }
}
