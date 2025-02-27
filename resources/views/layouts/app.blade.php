<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
@section('htmlheader')
    @include('layouts.partials.htmlheader')
@show
<body>
    @yield('navigation')
    <main>
        <div class="row content">
            <div class="col-sm-2 sidenav">
                
            </div>
            <div class="col-sm-8 text-left">
                <div id="main-container">
                    @yield('content')
                </div>
            </div>
            <div class="col-sm-2 sidenav">

            </div>
        </div>
    </main>
</body>
</html>
