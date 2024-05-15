@extends('layouts.common')
@section('content')

<div data-vue-component="vue-table"
             data-departments.parse="{{ $departments }}"
             data-config.parse="{{ $config }}">
</div>

@endsection