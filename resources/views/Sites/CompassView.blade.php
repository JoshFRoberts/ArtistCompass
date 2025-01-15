@extends('layouts.common')
@section('content')

    <div data-vue-component="compass"
        data-artists.parse="{{ $artists }}">
    </div>

    <div data-vue-component="artist-details">

    </div>

@endsection
