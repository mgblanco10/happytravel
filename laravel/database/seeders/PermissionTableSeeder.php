<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'create-users',
            'edit-users',
            'delete-users',
            'create-travels',
            'edit-travels',
            'delete-travels',
         ];
         
         foreach ($permissions as $permission) {
              Permission::create(['name' => $permission]);
         } }
}
