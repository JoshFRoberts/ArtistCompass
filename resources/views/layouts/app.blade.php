<!DOCTYPE html>
<html lang="{{ $locale ?? App::getLocale() }}">
@section('htmlheader')
    @include('layouts.partials.htmlheader')
@show
<body data-name="body" @if(isset($bodyClass)) class="{{ $bodyClass }}" @endif>
@yield('notice')
@include('spc-widgets::layouts.partials.mainheader')
@include('layouts.partials.sidebar')
<main @if(isset($mainId)) id="{{ $mainId }}" @endif>
    @include('spc-widgets::layouts.partials.contentheader')
    <div id="app" class="padding-xs padding-md-2 padding-lg-4 padding-xl-8 padding-print-0 pagecontent">
        @include('spc-widgets::flash.notification')
        @yield('before-content')
        @yield('content')
        @yield('after-content')
    </div>
    @include('spc-widgets::layouts.partials.footer')
</main>
@yield('vue-js')
<div id="teleport-target"></div>
</body>
</html>
