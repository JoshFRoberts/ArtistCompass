<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
@section('htmlheader')
    @include('layouts.partials.htmlheader')
@show
<body>
    <div id="app">
        @yield('navigation')
        <main class="py-4">
            <div id="main-container">
                @yield('content')
            </div>
        </main>
    </div>
</body>
</html>
