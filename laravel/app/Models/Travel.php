<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Travel extends Model
{
    use HasFactory;

    protected $table = 'destinations';

    protected $fillable = ['name', 'location', 'image', 'description', 'user_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }







































    static function search($query){
      $results = Travel::where('name', 'LIKE', "%$query%")
                         ->orWhere('location', 'LIKE', "%$query%")
                         ->get();
       return $results;
                            }
}