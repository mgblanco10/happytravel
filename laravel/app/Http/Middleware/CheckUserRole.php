<?php

 namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth; 

 use Closure;
 use Illuminate\Http\Request;
 use Symfony\Component\HttpFoundation\Response;

 class CheckUserRole
 {
     public function handle($request, Closure $next)
     {
        if (Auth::check() && Auth::user()->hasRole('User')) {
             return $next($request);
        }

        return response()->json(['error' => 'Unauthorized. Only users with the "User" role can perform this action.'], 403);
    }
 }
