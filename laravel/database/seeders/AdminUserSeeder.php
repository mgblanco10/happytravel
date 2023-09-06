<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        // Create an admin user
        $adminUser = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('adminpassword'),
        ]);

        // Assign the "Admin" role to the admin user
        $adminRole = Role::where('name', 'Admin')->first();
        $adminUser->assignRole($adminRole);
    }
}
