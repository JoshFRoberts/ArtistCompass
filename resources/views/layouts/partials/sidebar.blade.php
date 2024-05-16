<aside id="main-sidebar w-25">
    <div id="logoarea" class="flexrow">
        <a href="/" style="text-decoration: 'none'" class="logo-big">
            <img src="/masterychart_voronoi.png" alt="Masterychart" width="80" class="logo">
            <span style="text-decoration: 'none'" class="app-name">
                {{ config('app.name') }}
            </span>
        </a>

    </div>
    @yield('main-sidebar-before')
    <div id="main-nav-wrapper">
        <nav class="menu-vertical">
            @yield('main-sidebar-navigation')
        </nav>
    </div>
</aside>
