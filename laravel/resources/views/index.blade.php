@extends('layouts.base')

@section('content')
<div>
    <div class="row">
        @foreach($travels as $travel)
        @if($travel->privacy === 'public' || (Auth::check() && $travel->user_id === Auth::user()->id))
        <div class="col-md-3 col-sm-6">
            <div class="mx-auto">
                @include('components.card', ['travel' => $travel])
            </div>
        </div>
        @endif
        @endforeach
    </div>

    <div>
        @include('components.modal')
    </div>
    @endsection