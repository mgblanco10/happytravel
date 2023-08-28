namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Travel extends Model
{
    use HasFactory;

    protected $table = 'destinations';

    protected $fillable = ['name', 'location', 'image', 'description', 'privacy'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function search($searchTerm)
    {
        return self::where('name', 'like', '%' . $searchTerm . '%')
                   ->orWhere('location', 'like', '%' . $searchTerm . '%')
                   ->get();
    }
}