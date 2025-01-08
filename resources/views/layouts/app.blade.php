<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
@section('htmlheader')
    @include('layouts.partials.htmlheader')
@show
<body>
    @yield('navigation')
    <main>
        <div id="main-container">
            @yield('content')
        </div>
    </main>
</body>
</html>
