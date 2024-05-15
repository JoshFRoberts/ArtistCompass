<aside id="main-sidebar">
    <div id="logoarea" class="flexrow">
        <a href="/" style="text-decoration: 'none'" class="logo-big">
            <img src="/masterychart_voronoi.png" alt="Masterychart" width="80" class="logo">
        </a>
        <h1 style="text-decoration: 'none'" class="app-name">
            {{ config('app.name') }}
        </h1>

    </div>
    @if (! Auth::guest())
        @yield('main-sidebar-before')
        <div id="main-nav-wrapper">
            <nav class="menu-vertical">
                @yield('main-sidebar-navigation')
            </nav>
        </div>
    @endif
</aside>
