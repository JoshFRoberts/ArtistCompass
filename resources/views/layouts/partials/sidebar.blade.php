<aside id="main-sidebar">
    <div id="logoarea">
        <a href="/" class="logo-big">
            <img src="{{ asset("/img/securepoint_sw.svg") }}" class="logo">
        </a>
        <a href="/" class="logo-small display-md-none">
            <img src="{{ asset("/img/securepoint-icon-w.svg") }}" class="logo">
            @if (config('app.short_name', null))
                <span class="app-name short display-sm-none">{{ config('app.short_name') }}</span>
            @endif
            <span class="app-name display-xs-none display-sm-block">{{ config('app.name') }}</span>
        </a>

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
