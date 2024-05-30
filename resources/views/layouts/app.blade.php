<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
@section('htmlheader')
    @include('layouts.partials.htmlheader')
@show
<body>
    <div id="app" class="w-100">
        @yield('navigation')
        <main class="py-4">
            @yield('content')
        </main>
    </div>
</body>
</html>
