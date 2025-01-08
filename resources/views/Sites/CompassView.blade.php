@extends('layouts.common')
@section('content')

    <div data-vue-component="compass"
        data-artists.parse="{{ $artists }}">
    </div>

@endsection
