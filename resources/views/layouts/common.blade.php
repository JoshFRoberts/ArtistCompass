@extends('layouts.app')

@if(isset($title_icon))
    @section('contentheader_icon')
        {{ $title_icon }}
    @endsection
@endif

@section('contentheader_title')
    @php
        if ( !isset($title_text))
            $title_text = '';
    @endphp
    {{ $title_text }}
@endsection

@section('breadcrumbs')
    @if (isset($breadcrumb_name))
        {!! Breadcrumbs::render($breadcrumb_name) !!}
    @endif
@endsection

@section('main-sidebar-navigation')
    @include('layouts.partials.sidebar-navigation')
@endsection

@section('before-content')
@endsection

@section('content')
    @yield('content')
@endsection
