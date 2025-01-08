@extends('layouts.common')
@section('content')
    <div data-vue-component="sip"
         data-sip.parse="{{ json_encode($sip) }}">
    </div>
@endsection
